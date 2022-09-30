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
import { Camera } from '../../core';
import { InputEventType } from '../../input/types/event-enum';
import { WebXRPlane } from './ar-plane';
import { webXRInputEvent, WebXRInputEventType } from './webxr-input-event';

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

    private _onXRFrame:XRFrameFunction | null = null;

    private _plane: WebXRPlane | null = null;

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

            //console.log("framebuffer", this.framebuffer);
            frameCallback(t);
        }
    };

    get isSupported(){
        return this._isSupported;
    }

    config(featureMask) {
        if(featureMask) {

        }
    };

    start() {
        console.log("WebXR start...");
        //根据特性启用
        if (1) {
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

                function onSelectionEvent(event) {
                    //console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyy", event);
                    let source = event.inputSource;

                    if (source.targetRayMode !== "screen") {
                        return;
                    }
                  
                    let targetRayPose = event.frame.getPose(source.targetRaySpace, refSpace);
                    if (!targetRayPose) {
                        return;
                    }
                    console.log("targetRayPose =========", event.type, targetRayPose);
                    switch(event.type) {
                      case "selectstart":
                            webXRInputEvent.dispatch(WebXRInputEventType.SELECT_START, {transform : targetRayPose.transform} );
                            break;
                      case "select":
                            webXRInputEvent.dispatch(WebXRInputEventType.SELECT, {transform : targetRayPose.transform} );
                            break;
                      case "selectend":
                            webXRInputEvent.dispatch(WebXRInputEventType.SELECT_END, {transform : targetRayPose.transform} );
                            break;
                    }
                }
    
                session.addEventListener("selectstart", onSelectionEvent);
                session.addEventListener("select", onSelectionEvent);
                session.addEventListener("selectend", onSelectionEvent);

                session.addEventListener('touchstart', this._createCallback(InputEventType.TOUCH_START));
                session.addEventListener('touchmove', this._createCallback(InputEventType.TOUCH_MOVE));
                session.addEventListener('touchend', this._createCallback(InputEventType.TOUCH_END));
                session.addEventListener('touchcancel', this._createCallback(InputEventType.TOUCH_CANCEL));
            });
        });
    };

    private _createCallback (eventType: InputEventType) {
        return (event: TouchEvent) => {
           console.log("========================", event);
        };
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
        if(this._session) {
            this._session.updateRenderState({ baseLayer: new XRWebGLLayer(this._session, gl, {
                alpha: true,
                antialias: true,
                depth: true,
                framebufferScaleFactor: 0.5,
                ignoreDepthValues: false,
                stencil: true
            })});
        }
    };
    
    // raycast
    tryWebXRHitTest(transform: XRRigidTransform): boolean {
        return this._plane!.tryWebXRHitTest(transform);
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