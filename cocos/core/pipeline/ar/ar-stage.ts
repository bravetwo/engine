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
import { SurfaceTransform } from '../../gfx';

const orientationMap: Record<Orientation, SurfaceTransform> = {
    [Orientation.PORTRAIT]: SurfaceTransform.IDENTITY,
    [Orientation.LANDSCAPE_RIGHT]: SurfaceTransform.ROTATE_90,
    [Orientation.PORTRAIT_UPSIDE_DOWN]: SurfaceTransform.ROTATE_180,
    [Orientation.LANDSCAPE_LEFT]: SurfaceTransform.ROTATE_270,
};

//const bufs: GFXCommandBuffer[] = [];
//const colors: GFXColor[] = [];
const GL_TEXTURE_EXTERNAL_OES = 0x8D65;

const vsAndroid = 'attribute vec4 vPosition;\n attribute vec2 vCoord;\n uniform mat4 vMatrix;\n uniform mat4 vCoordMatrix;\n varying vec2 textureCoordinate;\n void main(){\n gl_Position = vMatrix*vPosition;\n textureCoordinate = (vCoordMatrix*vec4(vCoord,0,1)).xy;\n }';
const fsAndroid = '#extension GL_OES_EGL_image_external:require\n precision mediump float;\n varying vec2 textureCoordinate;\n uniform samplerExternalOES vTexture;\n void main() {\n gl_FragColor = texture2D(vTexture, textureCoordinate);\n }';
const vsIOS = 'attribute vec2 position;\n varying vec2 vUv;\n void main(){\n vUv = position;\n gl_Position = vec4(1.0 - 2.0 * position, 0, 1);\n }';
const fsIOS = 'precision mediump float;\n uniform sampler2D yMap;\n uniform sampler2D uvMap;\n varying vec2 vUv;\n void main() {\n vec2 textureCoordinate = vec2(vUv.t, vUv.s);\n mat3 colorConversionMatrix = mat3(1.164, 1.164, 1.164, 0.0, -0.213, 2.112, 1.793, -0.533, 0.0);\n mediump vec3 yuv;\n lowp vec3 rgb;\n yuv.x = texture2D(yMap, textureCoordinate).r - (16.0/255.0);\n yuv.yz = texture2D(uvMap, textureCoordinate).ra - vec2(0.5, 0.5);\n rgb = colorConversionMatrix * yuv;\n gl_FragColor = vec4(rgb,1.);\n }';
function createShader (gl: WebGLRenderingContext, type: number, source: string) {
    let shader = gl.createShader(type);
    if (!shader) {
        console.error('create shader error', source);
        return;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    } else {
        console.error('compile shader error', shader);
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
}

function createProgram (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    let program = gl.createProgram();
    if (!program) {
        console.error('create program error');
        return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    } else {
        console.error('link program error', success);
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
}

/**
 * @zh
 * UI渲阶段。
 */
export class ARModuleStage extends RenderStage {
    private program!: WebGLProgram;
    private vertexShader!: WebGLShader;
    private fragmentShader!: WebGLShader;
    private positionBuffer!: WebGLBuffer;
    private texcoordBuffer!: WebGLBuffer;
    private texture!: WebGLTexture;
    private textureY!: WebGLTexture;
    private textureCb!: WebGLTexture;
    private mPosition: any;
    private mCoord: any;
    private mMatrix: any;
    private mTexture: any;
    private mCoordMatrix: any;
    private gl:any;

    //private vertics = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    private vertics = new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]);
    private uvs = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);
    private uvsIOS = new Float32Array([0, 1, 0, 0, 1, 1, 1, 0]);

    private coordMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    private matProj = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, -1, 1]);
    
    public static initInfo: IRenderStageInfo = {
        name: 'ARModuleStage',
        priority: 0,
        /*
        renderQueues: [{
            isTransparent: false,
            stages: ['default'],
            sortMode: RenderQueueSortMode.BACK_TO_FRONT,
        }],
        framebuffer: 'window',
        */
    };
    
    //protected renderQueues: RenderQueueDesc[] = [];
    //protected _renderQueues: RenderQueue[] = [];

    public initialize (info: IRenderStageInfo): boolean {
        super.initialize(info);

        return true;
    }

    public activate (pipeline: ForwardPipeline, flow: RenderFlow) {
        super.activate(pipeline, flow);
        /*
        this._cmdBuff = this._device!.createCommandBuffer({
            allocator: this._device!.commandAllocator,
            type: GFXCommandBufferType.PRIMARY,
        });
        //*/

        this.gl = (pipeline.device as any).gl;
        //if (JSB) {
            this.init();
            //cc.director.on(cc.Director.EVENT_BEFORE_FORWARD, this.renderBackground, this);
        //}
    }

    public destroy () {
        /*
        if (this._cmdBuff) {
            this._cmdBuff.destroy();
            this._cmdBuff = null;
        }
        //*/
    }

    public resize (width: number, height: number) {
    }

    public rebuild () {
    }

    public render (camera: Camera) {

        //*
        const instance = ARModuleX.getInstance();
        if(!instance) return;
        
        const state = instance.getAPIState();
        if(state < 0) return;

        if(instance.CameraId != camera.node.uuid) return;
        if(state == 3) {
            this.renderWeb();

        } else {
            if (state == 0) {
                //this.renderIOS();
            } else {
                this.renderAndroid();
            }
        }
        //*/
        //this.renderAndroid();
    }

    private renderWeb () {
        const armodule = ARModuleX.getInstance()!;
        const gl = this.gl;
        armodule.updateRenderState(this.gl);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.875, 0.875, 0.875, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        gl.depthMask(false);
        gl.linkProgram(this.program);
        gl.useProgram(this.program);

        // Set texture
        gl.bindTexture(GL_TEXTURE_EXTERNAL_OES, this.texture);
        let location = gl.getUniformLocation(this.program, "vMatrix");

        // Set projection matrix
        gl.uniformMatrix4fv(location, false, this.matProj);
        location = gl.getUniformLocation(this.program, "vCoordMatrix");

        // Set mapping matrix
        gl.uniformMatrix4fv(location, false, this.coordMatrix);
        const size = 2;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        
        // // Set vertices
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.mPosition);
        gl.vertexAttribPointer(this.mPosition, size, type, normalize, stride, 0);

        // Set texture coordinates
        // for (let i = 0; i < this.uvs.length; i++) {
        //     this.uvs[i] = shareData[i];
        // }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.mCoord);
        gl.vertexAttribPointer(this.mCoord, size, type, normalize, stride, 0);

        // Number of vertices.
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // gl.disableVertexAttribArray(mPosition);
        // GLES20.glDisableVertexAttribArray(mCoord);
        gl.depthMask(true);
        gl.enable(gl.DEPTH_TEST);
    }

    private renderAndroid () {
        const gl = this.gl;

        //*
        const instance = ARModuleX.getInstance();
        if(!instance) return;
        instance.setCameraTextureName((this.texture as any)._id);
        instance.setDisplayGeometry(orientationMap[screenAdapter.orientation], gl.canvas.width, gl.canvas.height);
        //const shareData = ARModuleHelper.getShareData();
        const shareData = instance.getCameraTexCoords();
        //*/
        
        gl.viewport(0, 0, gl.canvas.width * 0.5, gl.canvas.height * 0.5);
        gl.clearColor(0.875, 0.875, 0.875, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        gl.depthMask(false);
        gl.linkProgram(this.program);
        gl.useProgram(this.program);

        // Set texture
        gl.bindTexture(GL_TEXTURE_EXTERNAL_OES, this.texture);
        let location = gl.getUniformLocation(this.program, "vMatrix");

        // Set projection matrix
        gl.uniformMatrix4fv(location, false, this.matProj);
        location = gl.getUniformLocation(this.program, "vCoordMatrix");

        // Set mapping matrix
        gl.uniformMatrix4fv(location, false, this.coordMatrix);
        const size = 2;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        
        // // Set vertices
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.mPosition);
        gl.vertexAttribPointer(this.mPosition, size, type, normalize, stride, 0);

        // Set texture coordinates
        for (let i = 0; i < this.uvs.length; i++) {
            this.uvs[i] = shareData[i];
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.mCoord);
        gl.vertexAttribPointer(this.mCoord, size, type, normalize, stride, 0);

        // Number of vertices.
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // gl.disableVertexAttribArray(mPosition);
        // GLES20.glDisableVertexAttribArray(mCoord);
        gl.depthMask(true);
        gl.enable(gl.DEPTH_TEST);
    }
    /*
    private renderIOS () {
        const gl = this.gl;

        const instance = ARModuleHelper.getInstance();
        const shareData = ARModuleHelper.getShareData();
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.875, 0.875, 0.875, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        gl.depthMask(false);
        gl.linkProgram(this.program);
        gl.useProgram(this.program);
        const id = instance.getExternalTextureYId();

        if (!this.textureY) {
            this.textureY = gl.createTexture() as WebGLTexture;
        }
        
        this.textureY._id = id;

        gl.bindTexture(gl.TEXTURE_2D, this.textureY);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        const cid = instance.getExternalTextureCbId();

        if (!this.textureCb) {
            this.textureCb = gl.createTexture() as WebGLTexture;
        }
        this.textureCb._id = cid;

        gl.bindTexture(gl.TEXTURE_2D, this.textureCb);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.textureY);
        gl.uniform1i(gl.getUniformLocation(this.program, "yMap"), 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.textureCb);
        gl.uniform1i(gl.getUniformLocation(this.program, "uvMap"), 1);
        // let location = gl.getUniformLocation(this.program, "vMatrix");
        // // Set projection matrix
        // gl.uniformMatrix4fv(location, false, this.matProj);
        // location = gl.getUniformLocation(this.program, "vCoordMatrix");
        // // Set mapping matrix
        // gl.uniformMatrix4fv(location, false, this.coordMatrix);
        const size = 2;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        // // Set vertices
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.mPosition);
        gl.vertexAttribPointer(this.mPosition, size, type, normalize, stride, 0);

        // gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
        // gl.enableVertexAttribArray(this.mCoord);
        // gl.vertexAttribPointer(this.mCoord, size, type, normalize, stride, 0);

        // Number of vertices.
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // gl.disableVertexAttribArray(this.mPosition);
        // GLES20.glDisableVertexAttribArray(mCoord);
        gl.depthMask(true);
        gl.enable(gl.DEPTH_TEST);
    }
    //*/

    private init () {
        // adapt for native mac & ios
        this.initMatrix();
        this.initProgram();
        if (sys.os == OS.ANDROID) {
            this.initBuffer();
            this.initTexture();
        } else {
            this.initBufferIOS();
        }

        // add WebXR support
    }

    private initMatrix () {
        // const screenWidth = this.gl.canvas.width;
        // const screenHeight = this.gl.canvas.height;
        // let logoW = screenWidth / 2;
        // let logoH = screenHeight / 2;

        // PROJ[0] = logoW;
        // PROJ[5] = logoH;
        // PROJ[9] = screenWidth / 2;
        // PROJ[13] = screenHeight / 2;
    }

    private initBufferIOS () {
        const gl = this.gl;
        gl.useProgram(this.program);

        this.mPosition = gl.getAttribLocation(this.program, "position");
        //this.mCoord = gl.getAttribLocation(this.program, "vUv");

        this.positionBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertics, gl.STATIC_DRAW);

        // this.texcoordBuffer = gl.createBuffer() as WebGLBuffer;
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);

        var positionLocation = gl.getAttribLocation(this.program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

        // var texcoordLocation = gl.getAttribLocation(this.program, "vUv");
        // gl.enableVertexAttribArray(texcoordLocation);
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        // var size = 2;          // 2 components per iteration
        // var type = gl.FLOAT;   // the data is 32bit floats
        // var normalize = false; // don't normalize the data
        // var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        // var offset = 0;        // start at the beginning of the buffer
        // gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);
    }

    private initBuffer () {
        const gl = this.gl;
        gl.useProgram(this.program);

        this.mPosition = gl.getAttribLocation(this.program, "vPosition");
        this.mCoord = gl.getAttribLocation(this.program, "vCoord");
        this.mMatrix = gl.getUniformLocation(this.program, "vMatrix");
        this.mTexture = gl.getUniformLocation(this.program, "vTexture");
        this.mCoordMatrix = gl.getUniformLocation(this.program, "vCoordMatrix");

        this.positionBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertics, gl.STATIC_DRAW);

        this.texcoordBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);

        var positionLocation = gl.getAttribLocation(this.program, "vPosition");
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

        var texcoordLocation = gl.getAttribLocation(this.program, "vCoord");
        gl.enableVertexAttribArray(texcoordLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);
    }

    private initTexture () {
        const gl = this.gl;

        this.texture = gl.createTexture() as WebGLTexture;
        gl.bindTexture(GL_TEXTURE_EXTERNAL_OES, this.texture);
        gl.texParameteri(GL_TEXTURE_EXTERNAL_OES, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(GL_TEXTURE_EXTERNAL_OES, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(GL_TEXTURE_EXTERNAL_OES, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(GL_TEXTURE_EXTERNAL_OES, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }

    private initProgram () {
        const gl = this.gl;
        if (sys.os == OS.ANDROID) {
            this.vertexShader = createShader(gl, gl.VERTEX_SHADER, vsAndroid)!;
            this.fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsAndroid)!;
            this.program = createProgram(gl, this.vertexShader, this.fragmentShader)!;
        } else {
            this.vertexShader = createShader(gl, gl.VERTEX_SHADER, vsIOS)!;
            this.fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsIOS)!;
            this.program = createProgram(gl, this.vertexShader, this.fragmentShader)!;
        }
    }
}
