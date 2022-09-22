/**
 * @category pipeline.ar
 */

//import { GFXCommandBuffer } from '../../gfx/command-buffer';
//import { GFXCommandBufferType, GFXColor } from '../../gfx/define';
import { screenAdapter } from 'pal/screen-adapter';
import { RenderFlow } from '../render-flow';
import { IRenderStageInfo, RenderStage } from '../render-stage';
import { ForwardPipeline } from '../forward/forward-pipeline';
import { Orientation } from '../../../../pal/screen-adapter/enum-type';
//import { RenderQueueDesc, RenderQueueSortMode } from '../pipeline-serialization';
//import { opaqueCompareFn, RenderQueue, transparentCompareFn } from '../render-queue';
//import { JSB } from 'internal:constants';
import { sys } from '../../platform/sys';
import { OS } from '../../../../pal/system-info/enum-type';
import { Camera } from '../../renderer/scene';
import { ARModuleX } from '../../../ar/ar-module';
import { Attribute, BlendState, Buffer, BufferInfo, BufferUsageBit, CullMode, DepthStencilState, DescriptorSet, DescriptorSetInfo, DescriptorSetLayout, DescriptorSetLayoutBinding, DescriptorSetLayoutInfo, DescriptorType, Device, DrawInfo, DRAW_INFO_SIZE, Format, IndirectBuffer, InputAssembler, InputAssemblerInfo, InputState, MemoryAccessBit, MemoryUsageBit, PipelineLayout, PipelineLayoutInfo, PipelineStateInfo, PolygonMode, RasterizerState, RenderPass, SamplerInfo, ShadeModel, Shader, ShaderInfo, ShaderStage, ShaderStageFlagBit, SurfaceTransform, Texture, TextureFlagBit, TextureInfo, TextureType, TextureUsageBit, Type, Uniform, UniformBlock, UniformSampler, UniformSamplerTexture, UniformStorageBuffer } from '../../gfx';
import { RenderPipeline } from '../render-pipeline';
import { size } from '../../math/size';
import { float } from '../../data/decorators';
import { PipelineStateManager } from '../pipeline-state-manager';
import { SetIndex } from '../define';
import { BufferSource } from '../../gfx';
import { IPassInfoFull, Pass, MacroRecord } from '../../renderer';
import { Root } from '../..';
import { legacyCC } from '../../global-exports';
import { WebGL2Device } from '../../gfx/webgl2/webgl2-device';

const orientationMap: Record<Orientation, SurfaceTransform> = {
    [Orientation.PORTRAIT]: SurfaceTransform.IDENTITY,
    [Orientation.LANDSCAPE_RIGHT]: SurfaceTransform.ROTATE_90,
    [Orientation.PORTRAIT_UPSIDE_DOWN]: SurfaceTransform.ROTATE_180,
    [Orientation.LANDSCAPE_LEFT]: SurfaceTransform.ROTATE_270,
};

const vsWeb = `
    in vec2 a_position;
    in vec2 a_texCoord;
    layout(std140) uniform Mats {
        uniform mat4 u_MVP;
        uniform mat4 u_CoordMatrix;
    };
    out vec2 v_texCoord;
    void main(){
        v_texCoord = (u_CoordMatrix * vec4(a_texCoord, 0, 1)).xy;
        gl_Position = u_MVP * vec4(a_position, 0, 1);
    }`;
const fsWeb = `
    precision mediump float;
    in vec2 v_texCoord;
    uniform sampler2D u_texture;
    out vec4 o_color;
    void main() {
        o_color = texture(u_texture, v_texCoord);
        o_color = o_color * vec4(0, 1, 1, 1);
        //o_color = vec4(0, 1, 1, 1);
    }`;

/**
 * @zh
 * AR
 */
export class ARBackground {
    private declare _pipeline: RenderPipeline;
    private _inputAssemblerInfo: InputAssemblerInfo | null = null;

    private _vertexBuffers: Buffer[] = [];

    private _attributes: Attribute[] = [];

    private _indexBuffer: Buffer | null = null;

    private _indirectBuffer: Buffer | null = null;

    private _shader: Shader | null = null;
    private _inputAssembler: InputAssembler | null = null;
    private _descriptorSetLayout: DescriptorSetLayout | null = null;
    private _descriptorSet: DescriptorSet | null = null;
    private _uniformBuffer: Buffer | null = null;
    private _pipelineLayout: PipelineLayout | null = null;

    private _texture: Texture | null = null;

    private _updateStateFlag = false;

    public activate (pipeline: RenderPipeline) {
        this._pipeline = pipeline;
        /*
        this._cmdBuff = this._device!.createCommandBuffer({
            allocator: this._device!.commandAllocator,
            type: GFXCommandBufferType.PRIMARY,
        });
        //*/

        //this.gl = (pipeline.device as any).gl;
        //this.init();

        const device = pipeline.device;

        this.inits(device);
        this._descriptorSet!.bindBuffer(0, this._uniformBuffer!);
    }

    public inits(device : Device) {
        this._attributes = [
            new Attribute("a_position", Format.RG32F, false, 0, false, 0),
            new Attribute("a_texCoord", Format.RG32F, false, 0, false, 1)
        ];

        // shader
        const stages = [
            new ShaderStage(ShaderStageFlagBit.VERTEX, vsWeb),
            new ShaderStage(ShaderStageFlagBit.FRAGMENT, fsWeb)
        ];
        const uniforms = [
            new Uniform("u_MVP", Type.MAT4, 1),
            new Uniform("u_CoordMatrix", Type.MAT4, 1)
        ]
        const blocks = [
            new UniformBlock(SetIndex.MATERIAL, 0, "Mats", uniforms, 2)
        ];
        // const buffers = [
        //     new UniformStorageBuffer(SetIndex.MATERIAL, 0, "Mats", 2, MemoryAccessBit.READ_ONLY)
        // ]
        const samplerTextures = [
            new UniformSamplerTexture(SetIndex.MATERIAL, 1, "u_texture", Type.SAMPLER2D, 1)
        ];
        const samplers = [
            new UniformSampler(SetIndex.MATERIAL, 1, "u_texture", 1)
        ];
        const shaderInfo = new ShaderInfo(
            "ARBackGround", stages, this._attributes, blocks, [], samplerTextures, samplers
        );
        this._shader = device.createShader(shaderInfo);

        // inputAssembler
        const vertices = new Float32Array([
            -1, -1, 0, 0,
            -1, 1, 0, 1,
            1, -1, 1, 0,
            1, 1, 1, 1
        ]);
        let bytes = vertices.length * Float32Array.BYTES_PER_ELEMENT;
        const vertexBuffer = device.createBuffer(new BufferInfo(
            BufferUsageBit.VERTEX, MemoryUsageBit.DEVICE, bytes, 4 * Float32Array.BYTES_PER_ELEMENT
        ));
        vertexBuffer.update(vertices, bytes);
        this._vertexBuffers.length = 0;
        this._vertexBuffers.push(vertexBuffer);

        const indices = new Uint16Array([0, 2, 1, 1, 2, 3]);
        bytes = indices.length * Uint16Array.BYTES_PER_ELEMENT;
        this._indexBuffer = device.createBuffer(new BufferInfo(
            BufferUsageBit.INDEX, MemoryUsageBit.DEVICE, bytes, Uint16Array.BYTES_PER_ELEMENT
        ));
        this._indexBuffer.update(indices, bytes);

        const drawInfo = new DrawInfo();
        drawInfo.indexCount = 6;
        const iaInfo = new IndirectBuffer([drawInfo]);
        this._indirectBuffer = device.createBuffer(new BufferInfo(
            BufferUsageBit.INDIRECT, MemoryUsageBit.DEVICE, DRAW_INFO_SIZE, DRAW_INFO_SIZE
        ));
        this._indirectBuffer.update(iaInfo);

        this._inputAssemblerInfo = new InputAssemblerInfo(this._attributes, 
            this._vertexBuffers, this._indexBuffer, this._indirectBuffer);
        this._inputAssembler = device.createInputAssembler(this._inputAssemblerInfo);

        // descriptor set
        const dslInfo : DescriptorSetLayoutInfo = new DescriptorSetLayoutInfo();
        dslInfo.bindings.push(
            new DescriptorSetLayoutBinding(0, DescriptorType.UNIFORM_BUFFER, 1, ShaderStageFlagBit.VERTEX)
        );
        dslInfo.bindings.push(
            new DescriptorSetLayoutBinding(1, DescriptorType.SAMPLER_TEXTURE, 1, ShaderStageFlagBit.FRAGMENT)
        );
        this._descriptorSetLayout = device.createDescriptorSetLayout(dslInfo);
        this._descriptorSet = device.createDescriptorSet(new DescriptorSetInfo(this._descriptorSetLayout));

        // uniform buffer
        const mats = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, -1, 1,
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        bytes = mats.length * Float32Array.BYTES_PER_ELEMENT;
        this._uniformBuffer = device.createBuffer(new BufferInfo(
            BufferUsageBit.UNIFORM, MemoryUsageBit.DEVICE, bytes
        ));
        this._uniformBuffer.update(mats, bytes);

        this._texture = device.createTexture(new TextureInfo(
            TextureType.TEX2D, TextureUsageBit.SAMPLED | TextureUsageBit.TRANSFER_SRC, Format.RGBA8,
            300, 400));
            /*
        this._descriptorSet.bindBuffer(0, this._uniformBuffer);
        this._descriptorSet.bindSampler(1, device.getSampler(new SamplerInfo()));
        this._descriptorSet.bindTexture(1, this._texture);
        this._descriptorSet.update();*/

        // pipeline layout
        this._pipelineLayout = device.createPipelineLayout(new PipelineLayoutInfo([
            this._pipeline.descriptorSetLayout, this._descriptorSetLayout 
        ]));
    }

    public render (camera: Camera, renderPass: RenderPass) {
        const armodule = ARModuleX.getInstance();
        /*
        if(!armodule) return;
        if(armodule.CameraId != camera.node.uuid) return;*/

        const state = armodule!.getAPIState();
        //if(state < 0) return;

        //*
        if(state === 3) {
            this.renderWeb(renderPass, armodule!);
        }
        //*/
        //this.renderWeb(renderPass, armodule!);
    }

    private renderWeb (renderPass: RenderPass, armodule: ARModuleX) {
        const pipeline = this._pipeline;
        const device = pipeline.device as WebGL2Device;
        const cmdBuff = pipeline.commandBuffers[0];

        //this.inits(device);

        // descriptor set
        //this._descriptorSet!.bindBuffer(0, this._uniformBuffer!);
        

        /*
        if(!this._updateStateFlag) {
            const { gl } = device;
            armodule.updateRenderState(gl as any);
            this._updateStateFlag = true;
        }
        //*/

        this._descriptorSet!.bindSampler(1, device.getSampler(new SamplerInfo()));
        const colorTex = armodule.getCameraTextureRef() as Texture;
        if(!colorTex) {
            this._descriptorSet!.bindTexture(1, colorTex);
        } else {
            this._descriptorSet!.bindTexture(1, this._texture!);
        }
        
        //this._descriptorSet!.bindTexture(1, this._texture!);
        this._descriptorSet!.update();
        //*/

        //const pso = PipelineStateManager.getOrCreatePipelineState(device, pass, this._shader!, renderPass, this._inputAssembler!);
        
        const psoInfo =  new PipelineStateInfo(
            this._shader!, this._pipelineLayout!, renderPass, 
            new InputState(this._inputAssembler?.attributes),
            new RasterizerState(false, PolygonMode.FILL, ShadeModel.GOURAND, CullMode.NONE),
            new DepthStencilState(false)
        );
        const pso = device.createPipelineState(psoInfo);
        cmdBuff.bindPipelineState(pso);
        cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, this._descriptorSet!);
        //cmdBuff.bindDescriptorSet(SetIndex.LOCAL, this._descriptorSet!)
        cmdBuff.bindInputAssembler(this._inputAssembler!);
        const webgl2Device = device as WebGL2Device;
        const useVAO = webgl2Device.extensions.useVAO;
        webgl2Device.extensions.useVAO = false;
        cmdBuff.draw(this._inputAssembler!);
        webgl2Device.extensions.useVAO = useVAO;
    }
}
