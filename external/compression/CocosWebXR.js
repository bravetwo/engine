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

// AR - 'immersive-ar', VR - 'immersive-vr'
export class CocosWebXR {
    constructor(mode, supportCallback, frameCallback) {
        this.isSupported = false;
        
        this.mode = mode;

        // 'anchors', 'plane-detection'
        this.sessionInit = {
            requiredFeatures: [ 'local' ],
            optionalFeatures: [],
        };

        console.log(navigator.xr);
        if (navigator.xr) {
            navigator.xr.isSessionSupported(mode).then((isSupported) => {
                this.isSupported = isSupported;
                console.log("navigator.xr is supported", isSupported);

                /*
                navigator.xr.addEventListener('sessiongranted', (evt) => {
                    // One could check for the type of session granted.
                    // Events notifies of session creation after navigation, UA action, or requestSession.
                    // The session object is provided as part of this event.
                    //console.log('sessiongranted event', evt.mode);
                    //if (evt.mode === 'immersive-vr' || evt.mode === 'immersive-ar') {
                       // set up app state for immersive vr, if that's what the app wants
                       this.requestSession();

                    //} else {
                       // notify user that this app only works in immersive vr mode, if desired
                    //}
                });
                //*/

                supportCallback();
            });
        };

        this.session = null;
        this.features = [];
        this.featureSupportMask = 0;
        this.immersiveRefSpace = null;
        this.cameraPose = null;
        this.framebuffer = null;

        this.onXRFrame = (t, frame) => {
            let session = frame.session;
            let refSpace = this.getSessionReferenceSpace(frame.session);

            //window.cancelAnimationFrame();
            session.requestAnimationFrame(this.onXRFrame);

            this.cameraPose = frame.getViewerPose(refSpace);
            this.framebuffer = frame.session.renderState.baseLayer.framebuffer;
            //console.log("framebuffer", this.framebuffer);
            frameCallback(t);
        }
    };

    config(featureMask) {
        if(featureMask & 1 == 1) {

        }
    };

    getSupportMask() {

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
        navigator.xr.requestSession(this.mode, this.sessionInit).then((session) => {
        //navigator.xr.requestSession(this.mode).then((session) => {    
            session.mode = this.mode;
            session.isImmersive = true;
            this.session = session;

            // session start
            session.requestReferenceSpace('local').then((refSpace) => {
                this.immersiveRefSpace = refSpace;
                //console.log('Session refSpace', this.immersiveRefSpace);
                this.session.requestAnimationFrame(this.onXRFrame);
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
        return this.immersiveRefSpace;
    }

    getAPIState() {
        if(this.session) {
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
        if(this.cameraPose) {
            let pos = this.cameraPose.transform.position;
            let rot = this.cameraPose.transform.orientation;
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
        if(this.cameraPose) {
            return this.cameraPose.views[0].projectionMatrix;
        }
        return null;
    };
    getCameraTexCoords() {};
    setDisplayGeometry(rotation, width, height) {

    };
    setCameraTextureName(id) {};
    getCameraTextureRef() {
        let layer = this.session.renderState.baseLayer;
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
        
        return this.framebuffer;
    }
    updateRenderState(gl) {
        if(this.session) {
            /*
            var x = document.createElement("CANVAS");
            x.getContext('webgl2', {
                xrCompatible: true
            });
            console.log("x:", x);

            let offscreenCanvas = new OffscreenCanvas(256, 256);
            let osGL = offscreenCanvas.getContext('webgl2', {
                xrCompatible: true
            });
            console.log("offscreenCanvas:", offscreenCanvas);
            console.log("osGL:", osGL);
            */

            this.session.updateRenderState({ baseLayer: new XRWebGLLayer(this.session, gl, {
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