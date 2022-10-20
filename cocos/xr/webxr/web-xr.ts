/*
 Copyright (c) 2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE ANDconst NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { Camera, geometry, Vec2, Vec3 } from '../../core';
import { WebXRPlane } from './ar-plane';

const _xr = navigator.xr;
declare type XRFrameFunction = (t: number, frame: any) => void;

// 'inline', AR - 'immersive-ar', VR - 'immersive-vr'
export class WebXR {
    private _mode = 'inline';
    private _isSupported = false;
    private _sessionInit = {
        requiredFeatures: ['local'],
        optionalFeatures: [],
    };
    private _session: any = null;
    private _features = [];
    private _featureSupportMask = 0;
    private _immersiveRefSpace = null;
    private _cameraPose: any = null;
    private _framebuffer = null;
    private _baseLayer: any = null;
    private _viewport: any = null;
    private _inputSource: any = null;
    private _gl: any = null;
    private _onXRFrame:XRFrameFunction | null = null;
    private _plane: WebXRPlane | null = null;
    private _camera: Camera | null = null;
    get Camera (): Camera | null {
        return this._camera;
    }
    set Camera (val: Camera | null) {
        this._camera = val;
    }

    constructor(mode: string, supportCallback: () => void, frameCallback: (t: number) => void) {
        this._mode = mode;
        
        console.log(_xr);
        if (_xr) {
            _xr.isSessionSupported(mode).then((isSupported) => {
                this._isSupported = isSupported;
                console.log("navigator.xr is supported", isSupported);
                supportCallback();
            });
        };

        this._onXRFrame = (t, frame) => {
            let session = frame.session;
            let refSpace = this.getSessionReferenceSpace(frame.session);
            //const baseLayer = session.renderState.baseLayer;
            this._baseLayer = session.renderState.baseLayer;

            this._plane && this._plane.processPlanes(frame, this._immersiveRefSpace);

            //window.cancelAnimationFrame();
            session.requestAnimationFrame(this._onXRFrame);

            this._cameraPose = frame.getViewerPose(refSpace);
            this._framebuffer = frame.session.renderState.baseLayer.framebuffer;

            if (this._inputSource) {
                let targetRayPose = frame.getPose(this._inputSource.targetRaySpace, this._immersiveRefSpace);
                if (targetRayPose !== null ) {
                    const eventInitDict = this.getTouchInit(targetRayPose.transform.position);
                    this._gl!.canvas.dispatchEvent(new TouchEvent("touchmove", eventInitDict));
				}
            }
            //console.log("framebuffer", this.framebuffer);
            frameCallback(t);
        }
    };

    get isSupported(){
        return this._isSupported;
    }

    config(featureMask) {
        
    };

    start() {
        console.log("WebXR start...");
        //根据特性启用
        if (true) {
            this._sessionInit.requiredFeatures.push('plane-detection');
            this._plane = new WebXRPlane();
        }
        this.requestSession();
    };

    private requestSession() {
        console.log('requestSession...', this._sessionInit);
        _xr.requestSession(this._mode, this._sessionInit).then((session) => { 
            session.mode = this._mode;
            session.isImmersive = true;
            this._session = session;

            // session start
            session.requestReferenceSpace('local').then((refSpace) => {
                this._immersiveRefSpace = refSpace;
                //console.log('Session refSpace', this.immersiveRefSpace);
                this._session.requestAnimationFrame(this._onXRFrame);

                this.attachController();
            });
        });
    };

    private attachController(){
        let that = this;
        function onSessionEvent(event) {
            //console.log("web xr onSessionEvent: ", event);
            switch (event.inputSource.targetRayMode) {
                case "tracked-pointer":
                    that.attachTrackedPointerRayMode(event);
                    break;
                case "gaze":
                    that.attachGazeMode(event);
                    break;
                case "screen":
                    that.attachScreenRayMode(event);
                    break;
                default:
                    break;
            }
        }
        
        function onSessionEnd(event) {
            that._session.removeEventListener('select', onSessionEvent );
            that._session.removeEventListener('selectstart', onSessionEvent);
            that._session.removeEventListener('selectend', onSessionEvent);
            that._session.removeEventListener('squeeze', onSessionEvent);
            that._session.removeEventListener('squeezestart', onSessionEvent);
            that._session.removeEventListener('squeezeend', onSessionEvent);
            that._session.removeEventListener('end', onSessionEnd);
            that._session.removeEventListener('inputsourceschange', onInputSourcesChange);
        }

        function onInputSourcesChange( event ) {
            //console.log("web xr onInputSourcesChange: ", event);
        }

        this._session.addEventListener('select', onSessionEvent );
        this._session.addEventListener('selectstart', onSessionEvent);
        this._session.addEventListener('selectend', onSessionEvent);
        this._session.addEventListener('squeeze', onSessionEvent);
        this._session.addEventListener('squeezestart', onSessionEvent);
        this._session.addEventListener('squeezeend', onSessionEvent);
        this._session.addEventListener('end', onSessionEnd);
        this._session.addEventListener('inputsourceschange', onInputSourcesChange);
    }

    private getTouchInit(worldPosition){
        let outPos = new Vec3();
        this._camera!.worldToScreen(worldPosition, outPos);
        
        console.log("screen pos:", outPos);

        let touchInitDict: TouchInit = {
            identifier: 0,
            target: this._gl.canvas,
            clientX: outPos.x,
            clientY: outPos.y,
            pageX: outPos.x,
            pageY: outPos.y,
            screenX: outPos.x,
            screenY: outPos.y,
            force: 1,
            radiusX: 1,
            radiusY: 1
        };

        const touch = new Touch(touchInitDict);
        const touches: Touch[] = [touch];
        let eventInitDict: TouchEventInit = {
            touches: touches,
            targetTouches: touches,
            changedTouches: touches,
        };
        //console.log("eventInitDict:", eventInitDict);
        return eventInitDict;
    }

    private attachScreenRayMode(event) {
        let source = event.inputSource;
        this._inputSource = source;
        let targetRayPose = event.frame.getPose(source.targetRaySpace, this._immersiveRefSpace);
        if (!targetRayPose || !this._camera) {
            return;
        }
        //console.log("targetRayPose =========", event.type, targetRayPose);
        const eventInitDict = this.getTouchInit(targetRayPose.transform.position);
  
        switch(event.type) {
          case "selectstart":
                this._gl!.canvas.dispatchEvent(new TouchEvent("touchstart", eventInitDict));
                break;
          case "selectend":
                this._inputSource = null;
                this._gl!.canvas.dispatchEvent(new TouchEvent("touchend", eventInitDict));
                break;
        }
    }

    private attachGazeMode(event){

    }

    private attachTrackedPointerRayMode(event){

    }

    onResume() {

    };
    onPause() {

    };
    update() {
       
    };

    private getSessionReferenceSpace(session) {
        return this._immersiveRefSpace;
    }

    getAPIState() {
        if(this._session) {
            return 3; 
        }
        return -1;
    };

    // camera & background
    getCameraPose() {
        let poseArray = [
            0, 0, 0,
            0, 0, 0, 1
        ];
        if(this._cameraPose) {
            let pos = this._cameraPose.transform.position;
            let rot = this._cameraPose.transform.orientation;
            poseArray = [
                pos.x, pos.y, pos.z,
                rot.x, rot.y, rot.z, rot.w
            ];
            //console.log("camera pos:", pos);
            //console.log("camera rot:", rot);
        }
        
        return poseArray;
    };
    getCameraViewMatrix() {};
    getCameraProjectionMatrix() {
        if(this._cameraPose) {
            return this._cameraPose.views[0].projectionMatrix;
        }
        return null;
    };
    getCameraTexCoords() {};
    setDisplayGeometry(rotation, width, height) {};
    setCameraTextureName(id) {};
    getCameraTextureRef() {
        let layer = this._session.renderState.baseLayer;
        if(layer){
            return layer.colorTexture;
        }
        return null;
    };
    getViewport() {
        // ar
        if(this._cameraPose && this._baseLayer) {
            this._viewport = this._baseLayer.getViewport(this._cameraPose.views[0]);
        }
        return this._viewport;
    }
    getCameraDepthBuffer() {};
    getXRLayerFrameBuffer() {
        return this._framebuffer;
    }
    updateRenderState(gl) {
        this._gl = gl;
        if(this._session) {
            this._session.updateRenderState({ baseLayer: new XRWebGLLayer(this._session, gl, {
                alpha: true,
                antialias: true,
                depth: true,
                framebufferScaleFactor: 0.5,
                ignoreDepthValues: false,
                stencil: true
            })});
            //console.log("gl ===", gl, gl.canvas);
        }
    };

    // raycast
    tryHitTest(touchPoint: Vec2): boolean {
        let outRay = new geometry.Ray();
        this._camera!.screenPointToRay(touchPoint.x, touchPoint.y, outRay);
        return this._plane!.tryHitTest(outRay);
    }
    getHitResult(): number[] {
        return this._plane!.getHitResult();
    }
    getHitId(): number {
        return this._plane!.getHitId();
    }

    // plane detection
    enablePlane(enable: boolean) {
        this._plane!.enablePlane(enable);
    };
    setPlaneDetectionMode(mode: number) {
        this._plane!.setPlaneDetectionMode(mode);
    };
    setPlaneMaxTrackingNumber(count: number) {
        this._plane!.setPlaneMaxTrackingNumber(count);
    };
    getAddedPlanesInfo() {
        return this._plane!.getAddedPlanesInfo();
    };
    getUpdatedPlanesInfo() {
        return this._plane!.getUpdatedPlanesInfo();
    };
    getRemovedPlanesInfo() {
        return this._plane!.getRemovedPlanesInfo();
    };
    getAdded() {};

    // scene mesh reruction
    enableSceneMesh(enable) {};
    getAddedSceneMesh() {};
    getUpdatedSceneMesh() {};
    getRemovedSceneMesh() {};
    requireSceneMesh() {};
    getSceneMeshVertices(meshRef) {};
    getSceneMeshTriangleIndices(meshRef) {};
    endRequireSceneMesh() {};

    // image recognition & tracking
    enableImageTracking(enable) {};
    addImageToLib(name) {};
    setImageMaxTrackingNumber(number) {};
    getAddedImagesInfo() {};
    getUpdatedImagesInfo() {};
    getRemovedImagesInfo() {};

    // object recognition & tracking
    enableObjectTracking(enable) {};
    addObjectToLib(name) {};
    getAddedObjectsInfo() {};
    getUpdatedObjectsInfo() {};
    getRemovedObjectsInfo() {};

    // face detection & tracking
    enableFaceTracking(enable) {};
    getAddedFacesInfo() {};
    getUpdatedFacesInfo() {};
    getRemovedFacesInfo() {};
    getFaceBlendShapesOf(faceRef) {};
};