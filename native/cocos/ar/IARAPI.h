/****************************************************************************
 Copyright (c) 2021-2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
****************************************************************************/

#pragma once

#include <array>

namespace cc {
namespace ar {

using Pose      = std::array<float, 7>;
using Matrix    = std::array<float, 16>;
using TexCoords = std::array<float, 8>;

class IARAPI {
public:
    virtual ~IARAPI()     = default;
    virtual void config(int featureMask) = 0;
    virtual uint32_t getSupportMask() = 0;
    virtual void start() = 0;
    virtual void start(void *context) = 0;
    virtual void start(void *env, void *context) = 0;
    virtual void resume() = 0;
    virtual void resume(void *context) = 0;
    virtual void pause() = 0;
    //virtual void beforeUpdate() {}
    virtual void update() = 0;
    virtual int getAPIState() = 0;

    virtual float* getCameraPose() = 0;
    virtual float* getCameraViewMatrix() = 0;
    virtual float* getCameraProjectionMatrix() = 0;
    virtual float* getCameraTexCoords() = 0;
    virtual void setCameraTextureName(int id) = 0;
    virtual void* getCameraTextureRef() = 0;

    virtual uint8_t* getCameraDepthBuffer() = 0;

    //virtual void setPlaneFeatureEnable(bool isOn) = 0;
    virtual int getAddedPlanesCount() = 0;
    virtual int getRemovedPlanesCount() = 0;
    virtual int getUpdatedPlanesCount() = 0;

    virtual void enablePlane(bool enable) {};
    virtual void setPlaneDetectionMode(int mode) {};
    virtual void setPlaneMaxTrackingNumber(int count) {};

    //virtual void updatePlanesInfo() = 0;
    virtual float* getAddedPlanesInfo() = 0;
    virtual float* getRemovedPlanesInfo() = 0;
    virtual float* getUpdatedPlanesInfo() = 0;
    virtual int getInfoLength() = 0;

    virtual int tryHitAttachAnchor(int planeIndex) = 0;
    virtual float* getAnchorPose(int index) = 0;

    virtual bool raycast(float xPx, float yPx) = 0;
    virtual float* getRaycastPose() = 0;
    virtual int getRaycastTrackableId() = 0;
    virtual int getRaycastTrackableType() = 0;

    virtual void enableSceneMesh(bool enable) {};
    virtual float* getAddedSceneMesh() = 0;
    virtual float* getUpdatedSceneMesh() = 0;
    virtual int* getRemovedSceneMesh() = 0;
    virtual int* requireSceneMesh() = 0;
    virtual float* getSceneMeshVertices(int meshRef) = 0;
    virtual int* getSceneMeshTriangleIndices(int meshRef) = 0;
    virtual void endRequireSceneMesh() = 0;

    virtual void enableImageTracking(bool enable) = 0;
    virtual void addImageToLib(const std::string& imageName) = 0;
    virtual void setMaxTrackingNumber(int number) = 0;
    virtual float* getAddedImagesInfo() = 0;
    virtual float* getUpdatedImagesInfo() = 0;
    virtual float* getRemovedImagesInfo() = 0;

    virtual void enableObjectTracking(bool enable) = 0;
    virtual void addObjectToLib(const std::string& imageName) = 0;
    virtual float* getAddedObjectsInfo() = 0;
    virtual float* getUpdatedObjectsInfo() = 0;
    virtual float* getRemovedObjectsInfo() = 0;

    virtual void enableFaceTracking(bool enable) = 0;
    virtual float* getAddedFacesInfo() = 0;
    virtual float* getUpdatedFacesInfo() = 0;
    virtual float* getRemovedFacesInfo() = 0;
    virtual float* getFaceBlendShapesOf(int faceRef)  = 0;
};

} // namespace ar
} // namespace cc
