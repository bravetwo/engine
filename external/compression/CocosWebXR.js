/*
 Copyright  = function (c) 2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files  = function (the "Software"), to deal
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
var CocosWebXR = function CocosWebXR(mode) {
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

CocosWebXR.config = function (featureMask) {
    if(featureMask & 1 == 1) {

    }
};
CocosWebXR.getSupportMask = function () {

};
CocosWebXR.start = function () {
    navigator.xr.requestSession(this.mode, this.sessionInit).then((session) => {
        session.mode = this.mode;
        session.isImmersive = true;
        this.session = session;
    });
};


CocosWebXR.onResume = function () {};
CocosWebXR.onPause = function () {};
CocosWebXR.update = function () {};

// camera & background
CocosWebXR.getCameraPose = function () {};
CocosWebXR.getCameraViewMatrix = function () {};
CocosWebXR.getCameraProjectionMatrix = function () {};
CocosWebXR.getCameraTexCoords = function () {};
CocosWebXR.setDisplayGeometry = function (rotation, width, height) {

};
CocosWebXR.setCameraTextureName = function (id) {};
CocosWebXR.getCameraTextureRef = function () {
    let layer = this.session.renderState.baseLayer;
    return layer.colorTexture;
};
CocosWebXR.getCameraDepthBuffer = function () {};
CocosWebXR.updateRenderState = function (gl) {
    session.updateRenderState({ baseLayer: new XRWebGLLayer(this.session, gl) });
};

// raycast & anchor
CocosWebXR.tryHitAttachAnchor = function (trackableId) {};
CocosWebXR.getAnchorPose = function (anchorId) {};
CocosWebXR.tryHitTest = function (xPx, yPx) {};
CocosWebXR.getHitResult = function () {};
CocosWebXR.getHitId = function () {};

// plane detection
CocosWebXR.enablePlane = function (enable) {};
CocosWebXR.setPlaneDetectionMode = function (mode) {};
CocosWebXR.setPlaneMaxTrackingNumber = function (count) {};
CocosWebXR.getAddedPlanesInfo = function () {};
CocosWebXR.getUpdatedPlanesInfo = function () {};
CocosWebXR.getRemovedPlanesInfo = function () {};
CocosWebXR.getAdded = function () {};

// scene mesh reruction
CocosWebXR.enableSceneMesh = function (enable) {};
CocosWebXR.getAddedSceneMesh = function () {};
CocosWebXR.getUpdatedSceneMesh = function () {};
CocosWebXR.getRemovedSceneMesh = function () {};
CocosWebXR.requireSceneMesh = function () {};
CocosWebXR.getSceneMeshVertices = function (meshRef) {};
CocosWebXR.getSceneMeshTriangleIndices = function (meshRef) {};
CocosWebXR.endRequireSceneMesh = function () {};

// image recognition & tracking
CocosWebXR.enableImageTracking = function (enable) {};
CocosWebXR.addImageToLib = function (name) {};
CocosWebXR.setImageMaxTrackingNumber = function (number) {};
CocosWebXR.getAddedImagesInfo = function () {};
CocosWebXR.getUpdatedImagesInfo = function () {};
CocosWebXR.getRemovedImagesInfo = function () {};

// object recognition & tracking
CocosWebXR.enableObjectTracking = function (enable) {};
CocosWebXR.addObjectToLib = function (name) {};
CocosWebXR.getAddedObjectsInfo = function () {};
CocosWebXR.getUpdatedObjectsInfo = function () {};
CocosWebXR.getRemovedObjectsInfo = function () {};

// face detection & tracking
CocosWebXR.enableFaceTracking = function (enable) {};
CocosWebXR.getAddedFacesInfo = function () {};
CocosWebXR.getUpdatedFacesInfo = function () {};
CocosWebXR.getRemovedFacesInfo = function () {};
CocosWebXR.getFaceBlendShapesOf = function (faceRef) {};