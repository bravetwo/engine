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
    constructor(mode) {
        if (navigator.xr) {
            navigator.xr.isSessionSupported(mode).then((isSupported) => {
                this.isSupported = isSupported;
            });
        }

        this.mode = mode;

        // 'anchors', 'plane-detection'
        this.sessionInit = {
            requiredFeatures: [],
            optionalFeatures: [],
        };

        this.session = null;
        this.features = [];
        this.featureSupportMask = 0;
    };

    config(featureMask) {
        if(featureMask & 1 == 1) {

        }
    };
    getSupportMask() {

    };
    start() {
        navigator.xr.requestSession(this.mode, this.sessionInit).then((session) => {
            session.mode = this.mode;
            session.isImmersive = true;
            this.session = session;
        });
    };

    onResume() {};
    onPause() {};
    update() {};
    getAPIState() {
        if(this.session) {
            return 3; 
        }
        return -1;
    };

    // camera & background
    getCameraPose() {};
    getCameraViewMatrix() {};
    getCameraProjectionMatrix() {};
    getCameraTexCoords() {};
    setDisplayGeometry(rotation, width, height) {

    };
    setCameraTextureName(id) {};
    getCameraTextureRef() {
        let layer = this.session.renderState.baseLayer;
        return layer.colorTexture;
    };
    getCameraDepthBuffer() {};
    updateRenderState(gl) {
        session.updateRenderState({ baseLayer: new XRWebGLLayer(this.session, gl) });
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