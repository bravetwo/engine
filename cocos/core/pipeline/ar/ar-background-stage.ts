/*
 Copyright (c) 2022 Xiamen Yaji Software Co., Ltd.

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

 import { ClearFlagBit, Color, ColorAttachment, DepthStencilAttachment, deviceManager, Framebuffer, Rect, RenderPassInfo, StoreOp } from '../../gfx';
import { IRenderStageInfo, RenderStage } from '../render-stage';
import { ForwardStagePriority } from '../enum';
import { ForwardFlow } from '../forward/forward-flow';
import { ForwardPipeline } from '../forward/forward-pipeline';
import { Camera } from '../../renderer/scene';
import { ARBackground } from './ar-background';
import { ARModuleX } from '../../../ar/ar-module';
import { WebGL2Device } from '../../gfx/webgl2/webgl2-device';
import { legacyCC } from '../../global-exports';
import { Root } from '../../root';

const colors: Color[] = [new Color(0, 0, 0, 1)];

export class ARBackgroundStage extends RenderStage {
    public static initInfo: IRenderStageInfo = {
        name: 'ARStage',
        priority: ForwardStagePriority.AR,
        tag: 0,
    };

    private _renderArea = new Rect();

    private _clearFlag = 0xffffffff;

    private declare _arBackground: ARBackground;
    private _updateStateFlag = false;
    private _xrWindowSetFlag = false;

    constructor () {
        super();
        this._arBackground = new ARBackground();
    }

    public initialize (info: IRenderStageInfo): boolean {
        super.initialize(info);
        return true;
    }

    public activate (pipeline: ForwardPipeline, flow: ForwardFlow) {
        super.activate(pipeline, flow);

        this._arBackground.activate(pipeline);
    }

    public destroy () {
    }

    public render (camera: Camera) {
        const armodule = ARModuleX.getInstance();
        if(!armodule) return;
        if(armodule.CameraId != camera.node.uuid) return;

        const state = armodule.getAPIState();
        if(state < 0) return;

        const pipeline = this._pipeline as ForwardPipeline;

        if(state === 3) { // webxr
            const device = pipeline.device;
            if(!this._updateStateFlag) {
                const { gl } = device as WebGL2Device;

                armodule.updateRenderState(gl as any);
                this._updateStateFlag = true;
            }
            if(!this._xrWindowSetFlag) {
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
                    this._xrWindowSetFlag = true;
                }
            }
            
        } else { // runtime
            const cmdBuff = pipeline.commandBuffers[0];
            const framebuffer = camera.window.framebuffer;
            const renderPass = pipeline.getRenderPass(camera.clearFlag & this._clearFlag, framebuffer);

            pipeline.generateRenderArea(camera, this._renderArea);

            cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea,
                colors, camera.clearDepth, camera.clearStencil);

            this._arBackground.render(camera, renderPass);

            cmdBuff.endRenderPass();
        }
    }
}
