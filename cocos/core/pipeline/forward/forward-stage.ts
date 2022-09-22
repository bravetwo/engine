/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

import { ccclass, displayOrder, type, serializable } from 'cc.decorator';
import { SetIndex } from '../define';
import { getPhaseID } from '../pass-phase';
import { renderQueueClearFunc, RenderQueue, convertRenderQueue, renderQueueSortFunc } from '../render-queue';
import { ClearFlagBit, Color, ColorAttachment, DepthStencilAttachment, deviceManager, Filter, Rect, RenderPassInfo, StoreOp } from '../../gfx';
import { RenderBatchedQueue } from '../render-batched-queue';
import { RenderInstancedQueue } from '../render-instanced-queue';
import { IRenderStageInfo, RenderStage } from '../render-stage';
import { ForwardStagePriority } from '../enum';
import { RenderAdditiveLightQueue } from '../render-additive-light-queue';
import { BatchingSchemes } from '../../renderer/core/pass';
import { ForwardFlow } from './forward-flow';
import { ForwardPipeline } from './forward-pipeline';
import { RenderQueueDesc, RenderQueueSortMode } from '../pipeline-serialization';
import { PlanarShadowQueue } from '../planar-shadow-queue';
import { UIPhase } from '../ui-phase';
import { Camera } from '../../renderer/scene';
import { renderProfiler } from '../pipeline-funcs';
import { WebGL2CmdFuncBlitFramebuffer } from '../../gfx/webgl2/webgl2-commands';
import { WebGL2Device } from '../../gfx/webgl2/webgl2-device';
import { ARModuleX } from '../../../ar/ar-module';
import { IWebGL2GPUFramebuffer } from '../../gfx/webgl2/webgl2-gpu-objects';
import { WebGL2Framebuffer } from '../../gfx/webgl2/webgl2-framebuffer';
import { RenderWindow } from '../../renderer/core/render-window';
import { legacyCC } from '../../global-exports';
import { Root } from '../../root';
//import { ARBackground } from '../ar/ar-background';

const colors: Color[] = [new Color(0, 0, 0, 1)];

/**
 * @en The forward render stage
 * @zh 前向渲染阶段。
 */
@ccclass('ForwardStage')
export class ForwardStage extends RenderStage {
    public static initInfo: IRenderStageInfo = {
        name: 'ForwardStage',
        priority: ForwardStagePriority.FORWARD,
        tag: 0,
        renderQueues: [
            {
                isTransparent: false,
                sortMode: RenderQueueSortMode.FRONT_TO_BACK,
                stages: ['default'],
            },
            {
                isTransparent: true,
                sortMode: RenderQueueSortMode.BACK_TO_FRONT,
                stages: ['default', 'planarShadow'],
            },
        ],
    };

    @type([RenderQueueDesc])
    @serializable
    @displayOrder(2)
    protected renderQueues: RenderQueueDesc[] = [];
    protected _renderQueues: RenderQueue[] = [];

    private _renderArea = new Rect();
    private _batchedQueue: RenderBatchedQueue;
    private _instancedQueue: RenderInstancedQueue;
    private _phaseID = getPhaseID('default');
    private _clearFlag = 0xffffffff;
    private declare _additiveLightQueue: RenderAdditiveLightQueue;
    private declare _planarQueue: PlanarShadowQueue;
    private declare _uiPhase: UIPhase;

    //private declare _arBackground: ARBackground;
    private _xrSetFlag = false;
    private _updateStateFlag = false;

    constructor () {
        super();
        this._batchedQueue = new RenderBatchedQueue();
        this._instancedQueue = new RenderInstancedQueue();
        this._uiPhase = new UIPhase();
        //this._arBackground = new ARBackground();
    }

    public initialize (info: IRenderStageInfo): boolean {
        super.initialize(info);
        if (info.renderQueues) {
            this.renderQueues = info.renderQueues;
        }
        return true;
    }

    public activate (pipeline: ForwardPipeline, flow: ForwardFlow) {
        super.activate(pipeline, flow);
        for (let i = 0; i < this.renderQueues.length; i++) {
            this._renderQueues[i] = convertRenderQueue(this.renderQueues[i]);
        }

        this._additiveLightQueue = new RenderAdditiveLightQueue(this._pipeline as ForwardPipeline);
        this._planarQueue = new PlanarShadowQueue(this._pipeline);
        this._uiPhase.activate(pipeline);
        //this._arBackground.activate(pipeline);
    }

    public destroy () {
    }

    public render (camera: Camera) {
        this._instancedQueue.clear();
        this._batchedQueue.clear();
        const pipeline = this._pipeline as ForwardPipeline;
        const device = pipeline.device;
        this._renderQueues.forEach(renderQueueClearFunc);

        const renderObjects = pipeline.pipelineSceneData.renderObjects;
        let m = 0; let p = 0; let k = 0;
        for (let i = 0; i < renderObjects.length; ++i) {
            const ro = renderObjects[i];
            const subModels = ro.model.subModels;
            for (m = 0; m < subModels.length; ++m) {
                const subModel = subModels[m];
                const passes = subModel.passes;
                for (p = 0; p < passes.length; ++p) {
                    const pass = passes[p];
                    if (pass.phase !== this._phaseID) continue;
                    const batchingScheme = pass.batchingScheme;
                    if (batchingScheme === BatchingSchemes.INSTANCING) {
                        const instancedBuffer = pass.getInstancedBuffer();
                        instancedBuffer.merge(subModel, ro.model.instancedAttributes, p);
                        this._instancedQueue.queue.add(instancedBuffer);
                    } else if (batchingScheme === BatchingSchemes.VB_MERGING) {
                        const batchedBuffer = pass.getBatchedBuffer();
                        batchedBuffer.merge(subModel, p, ro.model);
                        this._batchedQueue.queue.add(batchedBuffer);
                    } else {
                        for (k = 0; k < this._renderQueues.length; k++) {
                            this._renderQueues[k].insertRenderPass(ro, m, p);
                        }
                    }
                }
            }
        }

        this._instancedQueue.sort();
        this._renderQueues.forEach(renderQueueSortFunc);

        const cmdBuff = pipeline.commandBuffers[0];
        pipeline.pipelineUBO.updateShadowUBO(camera);

        this._instancedQueue.uploadBuffers(cmdBuff);
        this._batchedQueue.uploadBuffers(cmdBuff);
        this._additiveLightQueue.gatherLightPasses(camera, cmdBuff);
        this._planarQueue.gatherShadowPasses(camera, cmdBuff);

        if (camera.clearFlag & ClearFlagBit.COLOR) {
            colors[0].x = camera.clearColor.x;
            colors[0].y = camera.clearColor.y;
            colors[0].z = camera.clearColor.z;
            colors[0].w = camera.clearColor.w;
        }
        pipeline.generateRenderArea(camera, this._renderArea);

        //* for webxr
        const armodule = ARModuleX.getInstance();
        if(armodule && !this._xrSetFlag && armodule.getAPIState() === 3 && armodule.CameraId === camera.node.uuid) {
            if(!this._updateStateFlag) {
                const { gl } = device as WebGL2Device;

                armodule.updateRenderState(gl as any);
                this._updateStateFlag = true;
            }
            //*
            const xrgpuframebuffer = armodule.getXRLayerFrameBuffer();
            if(xrgpuframebuffer) {
                const root = legacyCC.director.root as Root;
                const swapchain = deviceManager.swapchain;

                const colorAttachment = new ColorAttachment();
                colorAttachment.format = swapchain.colorTexture.format;
                const depthStencilAttachment = new DepthStencilAttachment();
                depthStencilAttachment.format = swapchain.depthStencilTexture.format;
                depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;
                depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
                const renderPassInfo = new RenderPassInfo([colorAttachment], depthStencilAttachment);

                const xrWindow = root.createWindow({
                    title: 'xrWindow',
                    width: swapchain.width,
                    height: swapchain.height,
                    renderPassInfo,
                    swapchain,
                    externalSrc: xrgpuframebuffer
                });
                camera.window = xrWindow!;
                console.log("window", camera.window);
                this._xrSetFlag = true;
            }
            //*/
        }
        //*/

        const framebuffer = camera.window.framebuffer;
        const renderPass = pipeline.getRenderPass(camera.clearFlag & this._clearFlag, framebuffer);
        cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea,
            colors, camera.clearDepth, camera.clearStencil);
        cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, pipeline.descriptorSet);
        this._renderQueues[0].recordCommandBuffer(device, renderPass, cmdBuff);
        this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);
        this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

        this._additiveLightQueue.recordCommandBuffer(device, renderPass, cmdBuff);

        cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, pipeline.descriptorSet);
        this._planarQueue.recordCommandBuffer(device, renderPass, cmdBuff);
        this._renderQueues[1].recordCommandBuffer(device, renderPass, cmdBuff);
        camera.geometryRenderer?.render(renderPass, cmdBuff, pipeline.pipelineSceneData);
        this._uiPhase.render(camera, renderPass);
        renderProfiler(device, renderPass, cmdBuff, pipeline.profiler, camera);
        cmdBuff.endRenderPass();
    }
}
