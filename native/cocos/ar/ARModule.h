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

#include <memory>
#include "base/Macros.h"

namespace se {

class Object;
class HandleObject;

}

namespace cc {
namespace ar {

class IARAPI;

class CC_DLL ARModule final {
public:
    static ARModule* get();

    ARModule();
    ~ARModule();

    void config(int featureMask);
    int getSupportMask();
    void start();
    void onResume();
    void onPause();
    void beforeUpdate();
    void update();
    bool checkStart();
    int getAPIState();

    float* getCameraPose() const;
    float* getCameraViewMatrix() const;
    float* getCameraProjectionMatrix() const;
    float* getCameraTexCoords() const;
    void setCameraTextureName(int id);
    void* getCameraTextureRef() const;
    uint8_t* getCameraDepthBuffer() const;

    //void setPlaneFeatureEnable(bool isOn) const;
    void enablePlane(bool enable) const;
    void setPlaneDetectionMode(int mode) const;
    void setPlaneMaxTrackingNumber(int count) const;
    
    int getAddedPlanesCount() const;
    int getRemovedPlanesCount() const;
    int getUpdatedPlanesCount() const;
    void updatePlanesInfo() const;
    float* getAddedPlanesInfo() const;
    int* getRemovedPlanesInfo() const;
    float* getUpdatedPlanesInfo() const;
    int getInfoLength() const;
    
    int tryHitAttachAnchor(int trackableId) const;
    float* getAnchorPose(int anchorId) const;
    bool tryHitTest(float xPx, float yPx) const;
    float* getHitResult() const;
    int getHitId() const;
    
    void enableSceneMesh(bool enable) const;
    float* getAddedSceneMesh() const;
    float* getUpdatedSceneMesh() const;
    int* getRemovedSceneMesh() const;
    int* requireSceneMesh() const;
    float* getSceneMeshVertices(int meshRef) const;
    int* getSceneMeshTriangleIndices(int meshRef) const;
    void endRequireSceneMesh() const;

    void enableImageTracking(bool enable) const;
    void addImageToLib(const std::string& imageName) const;
    void setMaxTrackingNumber(int number) const;
    float* getAddedImagesInfo() const;
    float* getUpdatedImagesInfo() const;
    float* getRemovedImagesInfo() const;

    void enableObjectTracking(bool enable) const;
    void addObjectToLib(const std::string& imageName) const;
    float* getAddedObjectsInfo() const;
    float* getUpdatedObjectsInfo() const;
    float* getRemovedObjectsInfo() const;

private:
    std::unique_ptr<IARAPI> _impl;
};

static std::unique_ptr<ARModule> arModuleInstance;

} // namespace ar
} // namespace cc
