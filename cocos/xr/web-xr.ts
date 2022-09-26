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
const _xr = navigator.xr;

declare type XRFrameFunction = (t: number, frame: any) => void;

// 'inline', AR - 'immersive-ar', VR - 'immersive-vr'
export class WebXR {
    private _mode = 'inline';
    private _isSupported = false;
    private _sessionInit = {
        requiredFeatures: [ 'local' ],
        optionalFeatures: [],
    };
    private _session: any = null;
    private _features = [];
    private _featureSupportMask = 0;
    private _immersiveRefSpace = null;
    private _cameraPose: any = null;
    private _framebuffer = null;
    private _onXRFrame:XRFrameFunction | null = null;

    constructor(mode: string, supportCallback, frameCallback) {
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
        /*
        var event = new Event('sessiongranted', { mode : this.mode });
        navigator.xr.dispatchEvent(event);
        //*/
        this.requestSession();
    };

    requestSession() {
        console.log('requestSession...');
        _xr.requestSession(this._mode, this._sessionInit).then((session) => { 
            session.mode = this._mode;
            session.isImmersive = true;
            this._session = session;

            // session start
            session.requestReferenceSpace('local').then((refSpace) => {
                this._immersiveRefSpace = refSpace;
                //console.log('Session refSpace', this.immersiveRefSpace);
                this._session.requestAnimationFrame(this._onXRFrame);
            });
        });
    };

    onResume() {};
    onPause() {};
    update() {
        /*
        if(this.session)
            this.session.requestAnimationFrame(this.onXRFrame);
        //*/
    };

    getSessionReferenceSpace(session) {
        //return session.isImmersive ? this.immersiveRefSpace : this.inlineViewerHelper.referenceSpace;
        //console.log('refSpace', this.immersiveRefSpace);
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
    setDisplayGeometry(rotation, width, height) {

    };
    setCameraTextureName(id) {};
    getCameraTextureRef() {
        let layer = this._session.renderState.baseLayer;
        if(layer)
            return layer.colorTexture;

        return null;
    };
    getCameraDepthBuffer() {};
    getXRLayerFrameBuffer() {
        /*
        if(this.session) {
            if(this.session.renderState) {
                let layer = this.session.renderState.baseLayer;
                if(layer) {
                    console.log("xr framebuffer", layer.framebuffer)
                    return layer.framebuffer;
                }
            }
        }*/
        
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

            /*
            this.session.requestReferenceSpace('local').then((refSpace) => {
                this.immersiveRefSpace = refSpace;
                console.log('State refSpace', this.immersiveRefSpace);
                this.session.requestAnimationFrame(this.onXRFrame);
            });*/
        }
    };

    // raycast & anchor
    tryHitAttachAnchor(trackableId) {};
    getAnchorPose(anchorId) {};
    tryHitTest(xPx, yPx) {};
    getHitResult() {};
    getHitId() {};

    // plane detection
    enablePlane(enable) {};
    setPlaneDetectionMode(mode) {};
    setPlaneMaxTrackingNumber(count) {};
    getAddedPlanesInfo() {};
    getUpdatedPlanesInfo() {};
    getRemovedPlanesInfo() {};
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