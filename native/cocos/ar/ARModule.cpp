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

#include <memory>

#include "ar/ARModule.h"

#if CC_PLATFORM == CC_PLATFORM_ANDROID
//#include "ar/android/ARAndroidAPIImpl.h"
//using ARAPIImpl = cc::ar::ARAndroidAPIImpl;
#include "ar/ARAndroidLib.h"
using ARAPIImpl = cc::ar::ARAndroidLib;

#elif CC_PLATFORM == CC_PLATFORM_MAC_IOS
//#include "ar/ios/ARKitAPIImpl.h"
//using ARAPIImpl = cc::ar::ARKitAPIImpl;
//#include "ar/ios/ARKitLibImpl.h"
#include "ar/ARKitLibImpl.h"
using ARAPIImpl = cc::ar::ARKitLibImpl;
#elif CC_PLATFORM == CC_PLATFORM_WINDOWS
#include "ar/IARAPI.h"
#endif

#include  "bindings/jswrapper/SeApi.h"

namespace cc {
namespace ar {

ARModule::ARModule() {
#if CC_PLATFORM == CC_PLATFORM_ANDROID || CC_PLATFORM == CC_PLATFORM_MAC_IOS
    _impl = std::make_unique<ARAPIImpl>();
    arModuleInstance.reset(this);
#endif
}

ARModule::~ARModule()
{
    //DLLOG("Destruct ARModule %p", this);
}

// jsb skip
ARModule* ARModule::get() {
    return arModuleInstance.get();
}

void ARModule::config(int featureMask) {
    _impl->config(featureMask);
}

int ARModule::getSupportMask() {
    return _impl->getSupportMask();
}

void ARModule::start() {
    _impl->start();
}

void ARModule::onResume() {
    _impl->resume();
}

void ARModule::onPause() {
    _impl->pause();
}

void ARModule::beforeUpdate() {
    //_impl->beforeUpdate();
    //_impl->update();
}

void ARModule::update() {
    _impl->update();
}

// -1: not started, 0: arkit, 1: arcore, 2: arengine
int ARModule::getAPIState() {
    return _impl->getAPIState();
}

void ARModule::setCameraTextureName(int id) {
    _impl->setCameraTextureName(id);
}

// jsb manual
float* ARModule::getCameraPose() const {
    return _impl->getCameraPose();
}

float* ARModule::getCameraViewMatrix() const {
    return _impl->getCameraViewMatrix();
}

float* ARModule::getCameraProjectionMatrix() const {
    return _impl->getCameraProjectionMatrix();
}

// jsb skip
float* ARModule::getCameraTexCoords() const {
    return _impl->getCameraTexCoords();
}

void* ARModule::getCameraTextureRef() const {
    return _impl->getCameraTextureRef();
}
uint8_t* ARModule::getCameraDepthBuffer() const {
    return _impl->getCameraDepthBuffer();
}


void ARModule::enablePlane(bool enable) const {
    return _impl->enablePlane(enable);
}

void ARModule::setPlaneDetectionMode(int mode) const {
    return _impl->setPlaneDetectionMode(mode);
}

void ARModule::setPlaneMaxTrackingNumber(int count) const {
    return _impl->setPlaneMaxTrackingNumber(count);
}

int ARModule::getAddedPlanesCount() const {
    //return _impl->getAddedPlanesCount();
    return _impl->getInfoLength() / 12;
}
int ARModule::getRemovedPlanesCount() const {
    //return _impl->getRemovedPlanesCount();
    return _impl->getInfoLength();
}
int ARModule::getUpdatedPlanesCount() const {
    //return _impl->getUpdatedPlanesCount();
    return _impl->getInfoLength() / 12;
}
void ARModule::updatePlanesInfo() const {
    _impl->updatePlanesInfo();
}
float* ARModule::getAddedPlanesInfo() const {
    return _impl->getAddedPlanesInfo();
}

int* ARModule::getRemovedPlanesInfo() const {
    return _impl->getRemovedPlanesInfo();
}
float* ARModule::getUpdatedPlanesInfo() const {
    return _impl->getUpdatedPlanesInfo();
}

int ARModule::getInfoLength() const {
    return _impl->getInfoLength();
}

int ARModule::tryHitAttachAnchor(int trackableId) const {
    return _impl->tryHitAttachAnchor(trackableId);
}
float* ARModule::getAnchorPose(int anchorId) const {
    return _impl->getAnchorPose(anchorId);
}

bool ARModule::tryHitTest(float xPx, float yPx) const {
    return _impl->raycast(xPx, yPx);
}

float* ARModule::getHitResult() const {
    return _impl->getRaycastPose();
}

int ARModule::getHitId() const {
    return _impl->getRaycastTrackableId();
}

void ARModule::enableSceneMesh(bool enable) const {
    return _impl->enableSceneMesh(enable);
}
float* ARModule::getAddedSceneMesh() const {
    return _impl->getAddedSceneMesh();
}
float* ARModule::getUpdatedSceneMesh() const {
    return _impl->getUpdatedSceneMesh();
}
int* ARModule::getRemovedSceneMesh() const {
    return _impl->getRemovedSceneMesh();
}
int* ARModule::requireSceneMesh() const {
    return _impl->requireSceneMesh();
}
float* ARModule::getSceneMeshVertices(int meshRef) const {
    return _impl->getSceneMeshVertices(meshRef);
}
int* ARModule::getSceneMeshTriangleIndices(int meshRef) const {
    return _impl->getSceneMeshTriangleIndices(meshRef);
}
void ARModule::endRequireSceneMesh() const {
    return _impl->endRequireSceneMesh();
}

// Image Tracking
void ARModule::enableImageTracking(bool enable) const {
    _impl->enableImageTracking(enable);
}
void ARModule::addImageToLib(const std::string& imageName) const {
    _impl->addImageToLib(imageName);
}
void ARModule::setMaxTrackingNumber(int number) const {
    _impl->setMaxTrackingNumber(number);
}
float* ARModule::getAddedImagesInfo() const {
    return _impl->getAddedImagesInfo();
}
float* ARModule::getUpdatedImagesInfo() const {
    return _impl->getUpdatedImagesInfo();
}
float* ARModule::getRemovedImagesInfo() const {
    return _impl->getRemovedImagesInfo();
}

// Object Tracking
void ARModule::enableObjectTracking(bool enable) const {
    _impl->enableObjectTracking(enable);
}
void ARModule::addObjectToLib(const std::string& imageName) const {
    _impl->addObjectToLib(imageName);
}
float* ARModule::getAddedObjectsInfo() const {
    return _impl->getAddedObjectsInfo();
}
float* ARModule::getUpdatedObjectsInfo() const {
    return _impl->getUpdatedObjectsInfo();
}
float* ARModule::getRemovedObjectsInfo() const {
    return _impl->getRemovedObjectsInfo();
}

// face detection & tracking
void ARModule::enableFaceTracking(bool enable) const {
    _impl->enableFaceTracking(enable);
}
float* ARModule::getAddedFacesInfo() const {
    return _impl->getAddedFacesInfo();
}
float* ARModule::getUpdatedFacesInfo() const {
    return _impl->getUpdatedFacesInfo();
}
float* ARModule::getRemovedFacesInfo() const {
    return _impl->getRemovedFacesInfo();
}
float* ARModule::getFaceBlendShapesOf(int faceRef)  const {
    return _impl->getFaceBlendShapesOf(faceRef);
}

} // namespace ar
} // namespace cc
