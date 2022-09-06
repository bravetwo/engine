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

import { FeatureType } from "../../cocos/ar/ar-feature-base";

export declare class CocosWebXR {
    isSupported : boolean;

    constructor(mode : string);

    config(featureMask : FeatureType);
    getSupportMask() : number;
    start() : void;
    onResume() : void;
    onPause() : void;
    update() : void;
    getAPIState() : number;
    
    // camera & background
    getCameraPose() : number[];
    getCameraViewMatrix() : number[];
    getCameraProjectionMatrix() : number[];
    getCameraTexCoords() : number[];
    setDisplayGeometry(rotation : number, width : number, height : number) : void;
    setCameraTextureName(id) : void;
    getCameraTextureRef();
    getCameraDepthBuffer();
    updateRenderState(gl : WebGLRenderingContext);
    
    // raycast & anchor
    tryHitAttachAnchor(trackableId);
    getAnchorPose(anchorId);
    tryHitTest(xPx, yPx);
    getHitResult();
    getHitId();
    
    // plane detection
    enablePlane(enable);
    setPlaneDetectionMode(mode);
    setPlaneMaxTrackingNumber(count);
    getAddedPlanesInfo();
    getUpdatedPlanesInfo();
    getRemovedPlanesInfo();
    getAdded();
    
    // scene mesh reruction
    enableSceneMesh(enable);
    getAddedSceneMesh();
    getUpdatedSceneMesh();
    getRemovedSceneMesh();
    requireSceneMesh();
    getSceneMeshVertices(meshRef);
    getSceneMeshTriangleIndices(meshRef);
    endRequireSceneMesh();
    
    // image recognition & tracking
    enableImageTracking(enable);
    addImageToLib(name);
    setImageMaxTrackingNumber(number);
    getAddedImagesInfo();
    getUpdatedImagesInfo();
    getRemovedImagesInfo();
    
    // object recognition & tracking
    enableObjectTracking(enable);
    addObjectToLib(name);
    getAddedObjectsInfo();
    getUpdatedObjectsInfo();
    getRemovedObjectsInfo();
    
    // face detection & tracking
    enableFaceTracking(enable);
    getAddedFacesInfo();
    getUpdatedFacesInfo();
    getRemovedFacesInfo();
    getFaceBlendShapesOf(faceRef);
}