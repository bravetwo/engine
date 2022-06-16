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

#include "XRInterface.h"
#include <fcntl.h>
#include <unistd.h>
#include <functional>
#include <unordered_map>
#include "base/Log.h"
#include "base/Macros.h"
#include "renderer/GFXDeviceManager.h"
#ifdef CC_USE_GLES3
    #include "gfx-gles3/GLES3GPUObjects.h"
#endif
#if USE_XR
    #include "Xr.h"
#endif
//const bool IS_ENABLE_XR_LOG = true;

namespace cc {
xr::XRVendor XRInterface::getVendor() {
#if XR_OEM_HUAWEIVR
    return xr::XRVendor::HUAWEIVR;
#elif XR_OEM_META
    return xr::XRVendor::META;
#elif XR_OEM_PICO
    return xr::XRVendor::PICO;
#elif XR_OEM_ROKID
    return xr::XRVendor::ROKID;
#endif
    return xr::XRVendor::MOBILE;
}

void XRInterface::setConfigParameterI(xr::XRConfigKey key, int value) {
#if USE_XR
    CC_LOG_INFO("[XR] setConfigParameterI %d=%d", key, value);
    switch (key) {
        case xr::XRConfigKey::VK_QUEUE_FAMILY_INDEX:
            _vkQueueFamilyIndex = value;
            break;
        default:
            break;
    }
#endif
}

int XRInterface::getConfigParameterI(xr::XRConfigKey key) {
#if USE_XR
    switch (key) {
        case xr::XRConfigKey::INSTANCE_CREATED:
            return xr::XrEntry::getInstance()->isCreatedXrInstance();
        case xr::XRConfigKey::SESSION_RUNNING:
            return xr::XrEntry::getInstance()->isSessionRunning();
        case xr::XRConfigKey::MULTI_SAMPLES:
            // todo
            return 4;
        default:
            break;
    }
#endif
    return 0;
}

void XRInterface::setConfigParameterF(xr::XRConfigKey key, float value) {
#if USE_XR
    CC_LOG_INFO("[XR] setConfigParameterF %d=%f", key, value);
#endif
}

float XRInterface::getConfigParameterF(xr::XRConfigKey key) {
#if USE_XR
#endif
    return 0;
}

void XRInterface::setConfigParameterS(xr::XRConfigKey key, std::string value) {
#if USE_XR
    CC_LOG_INFO("[XR] setConfigParameterS %d=%s", key, value.c_str());
#endif
}

std::string XRInterface::getConfigParameterS(xr::XRConfigKey key) {
#if USE_XR
#endif
    return "";
}

uint32_t XRInterface::getRuntimeVersion() {
#if USE_XR
#endif
    return 1;
}

void XRInterface::initialize(void *javaVM, void *activity, xr::XREventsCallback callback) {
#if USE_XR
    #if CC_USE_VULKAN
    _graphicsApiName = GraphicsApiVulkan_1_1;
        #if XR_OEM_PICO
    _graphicsApiName = GraphicsApiVulkan_1_0;
        #endif
    #elif CC_USE_GLES3
    _graphicsApiName = GraphicsApiOpenglES;
    #endif

    CC_LOG_INFO("[XR] initialize vm.%p,aty.%p | %s", javaVM, activity, _graphicsApiName.c_str());
    xr::XrEntry::getInstance()->initPlatformData(javaVM, activity);
    xr::XrEntry::getInstance()->setEventsCallback(&EventDispatcher::dispatchHandleEvent);
    #if XR_OEM_PICO
    xr::XrEntry::getInstance()->createXrInstance(_graphicsApiName.c_str());
    #endif
#endif
}

// render thread lifecycle
void XRInterface::onRenderPause() {
#if USE_XR
    if(!_renderPaused) {
        _renderPaused = true;
        _renderResumed = false;
        CC_LOG_INFO("[XR] onRenderPause");
        xr::XrEntry::getInstance()->pauseXrInstance();
    }
#endif
}

void XRInterface::onRenderResume() {
#if USE_XR
    if(!_renderResumed) {
        _renderResumed = true;
        _renderPaused = false;
        CC_LOG_INFO("[XR] onRenderResume");
        xr::XrEntry::getInstance()->resumeXrInstance();
    }
#endif
}

void XRInterface::onRenderDestroy() {
#if USE_XR
    CC_LOG_INFO("[XR] onRenderDestroy");
    xr::XrEntry::getInstance()->destroyXrInstance();
#endif
}
// render thread lifecycle

// gfx
void XRInterface::preGFXDeviceInitialize(gfx::API gfxApi) {
#if USE_XR
    CC_LOG_INFO("[XR] preGFXDeviceInitialize.api.%d", gfxApi);
    if (gfxApi == gfx::API::GLES3 || gfxApi == gfx::API::VULKAN) {
    #if !XR_OEM_PICO
        xr::XrEntry::getInstance()->createXrInstance(_graphicsApiName);
    #endif
    }
#endif
}

void XRInterface::postGFXDeviceInitialize(gfx::API gfxApi) {
#if USE_XR
    CC_LOG_INFO("[XR] postGFXDeviceInitialize.api.%d", gfxApi);
    if (gfxApi == gfx::API::GLES3) {
    #if CC_USE_GLES3
        xr::XrEntry::getInstance()->initXrSession(_gles3wLoadFuncProc,
                                                  _gles3GPUContext->eglDisplay,
                                                  _gles3GPUContext->eglConfig,
                                                  _gles3GPUContext->eglDefaultContext);
    #endif
    } else if (gfxApi == gfx::API::VULKAN) {
    #if CC_USE_VULKAN
        cc::xr::XrEntry::getInstance()->initXrSession(_vkInstance, _vkPhysicalDevice, _vkDevice, _vkQueueFamilyIndex);
    #endif
    }
#endif
}

const xr::XRSwapchain &XRInterface::doGFXDeviceAcquire(gfx::API gfxApi) {
#if USE_XR
    //CC_LOG_INFO("[XR] doGFXDeviceAcquire.api.%d", gfxApi);
    if (gfxApi == gfx::API::GLES3 || gfxApi == gfx::API::VULKAN) {
    #ifdef CC_USE_GLES3
        _acquireSwapchain.glDrawFramebuffer = xr::XrEntry::getInstance()->getXrFrameBuffer();
    #endif
        _acquireSwapchain.swapchainImageIndex = xr::XrEntry::getInstance()->getSwapchainImageIndex();
        return _acquireSwapchain;
    }
#endif
    return _acquireSwapchain;
}

bool XRInterface::isGFXDeviceNeedsPresent(gfx::API gfxApi) {
#if USE_XR
    //CC_LOG_INFO("[XR] isGFXDeviceNeedsPresent.api.%d", gfxApi);
    //if (gfxApi == gfx::API::GLES3 || gfxApi == gfx::API::VULKAN) {
    //}
#endif
    return false;
}

void XRInterface::postGFXDevicePresent(gfx::API gfxApi) {
#if USE_XR
    // CC_LOG_INFO("[XR] postGFXDevicePresent.api.%d", gfxApi);
    if (gfxApi == gfx::API::GLES3 || gfxApi == gfx::API::VULKAN) {
    }
#endif
}

void XRInterface::createXRSwapchains() {
#if USE_XR
    CC_LOG_INFO("[XR] createXRSwapchains");
    xr::XrEntry::getInstance()->initXrSwapchains();
#endif
}

const std::vector<cc::xr::XRSwapchain>& XRInterface::getXRSwapchains() {
#if USE_XR
    CC_LOG_INFO("[XR] getXRSwapchains");
    if(_xrSwapchains.size() == 0)
        _xrSwapchains = xr::XrEntry::getInstance()->getCocosXrSwapchains();
#endif
    return _xrSwapchains;
}

gfx::Format XRInterface::getXRSwapchainFormat() {
    return gfx::Format::SRGB8_A8;
}

void XRInterface::updateXRSwapchainHandle(uint32_t index, void* ccHandle) {
#if USE_XR
    auto &cocosXrSwapchain = xr::XrEntry::getInstance()->getCocosXrSwapchains().at(index);
    cocosXrSwapchain.ccSwapchainHandle = ccHandle;
#endif
}
// gfx

// vulkan
#ifdef CC_USE_VULKAN
uint32_t XRInterface::getXRVkApiVersion(uint32_t engineVkApiVersion) {
#if USE_XR
    return xr::XrEntry::getInstance()->getXrVkApiVersion(engineVkApiVersion);
#else
    return engineVkApiVersion;
#endif
}

void XRInterface::initializeVulkanData(const PFN_vkGetInstanceProcAddr &addr) {
    _vkGetInstanceProcAddr = addr;
}

VkInstance XRInterface::createXRVulkanInstance(const VkInstanceCreateInfo &instInfo) {
#if USE_XR
    _vkInstance = xr::XrEntry::getInstance()->xrVkCreateInstance(instInfo, _vkGetInstanceProcAddr);
    _vkPhysicalDevice = xr::XrEntry::getInstance()->getXrVkGraphicsDevice(_vkInstance);
    return _vkInstance;
#else
    return nullptr;
#endif
}

VkDevice XRInterface::createXRVulkanDevice(const VkDeviceCreateInfo *deviceInfo) {
#if USE_XR
    VK_CHECK(xr::XrEntry::getInstance()->xrVkCreateDevice(deviceInfo, _vkGetInstanceProcAddr, _vkPhysicalDevice, &_vkDevice));
#endif
    return _vkDevice;
}

VkPhysicalDevice XRInterface::getXRVulkanGraphicsDevice() {
    return _vkPhysicalDevice;
}

void XRInterface::getXRSwapchainVkImages(std::vector<VkImage> &vkImages, void *ccSwapchainHandle) {
#if USE_XR
    xr::XrEntry::getInstance()->getSwapchainImages(vkImages, ccSwapchainHandle);
#endif
}
#endif
// vulkan

// gles
#ifdef CC_USE_GLES3
void XRInterface::initializeGLESData(PFNGLES3WLOADPROC gles3wLoadFuncProc, gfx::GLES3GPUContext *gpuContext) {
#if USE_XR
    _gles3wLoadFuncProc = gles3wLoadFuncProc;
    _gles3GPUContext = gpuContext;
    void *eglDisplay = gpuContext->eglDisplay;
    void *eglConfig = gpuContext->eglConfig;
    void *eglDefaultContext = gpuContext->eglDefaultContext;
    CC_LOG_INFO("[XR] initializeGLESData.egl.%p/%p/%p", eglDisplay, eglConfig, eglDefaultContext);
#endif
}

void XRInterface::attachGLESFramebufferTexture2D() {
#if USE_XR
    xr::XrEntry::getInstance()->attachXrFramebufferTexture2D();
#endif
}
#endif
// gles

// stereo render loop
bool XRInterface::platformLoopStart() {
#if USE_XR
    //CC_LOG_INFO("[XR] platformLoopStart");
    return xr::XrEntry::getInstance()->platformLoopStart();
#else
    return false;
#endif
}

bool XRInterface::beginRenderFrame() {
#if USE_XR
    return xr::XrEntry::getInstance()->frameStart();
#else
    return false;
#endif
}

bool XRInterface::beginRenderEyeFrame(uint32_t eye) {
#if USE_XR
    xr::XrEntry::getInstance()->renderLoopStart(eye);
#endif
    return true;
}

bool XRInterface::endRenderEyeFrame(uint32_t eye) {
#if USE_XR
    xr::XrEntry::getInstance()->renderLoopEnd(eye);
#endif
    return true;
}

bool XRInterface::endRenderFrame() {
#if USE_XR
    xr::XrEntry::getInstance()->frameEnd();
#endif
    return true;
}

bool XRInterface::platformLoopEnd() {
#if USE_XR
    return xr::XrEntry::getInstance()->platformLoopEnd();
#else
    return false;
#endif
}
// stereo render loop

ccstd::vector<float> XRInterface::getXRViewProjectionData(uint32_t eye, float near, float far) {
#if USE_XR
    return xr::XrEntry::getInstance()->computeViewProjection(eye, near, far, 1.0f);
#else
    ccstd::vector<float> res;
    res.reserve(16);
    return res;
#endif
}

// renderwindow
xr::XREye XRInterface::getXREyeByRenderWindow(void* window) {
    if (_xrWindowMap.count(window) > 0) {
        return _xrWindowMap[window];
    } else {
        return xr::XREye::NONE;
    }
}

void XRInterface::bindXREyeWithRenderWindow(void *window, xr::XREye eye) {
    if (_xrWindowMap.count(window) > 0) {
        _xrWindowMap[window] = eye;
    } else {
        _xrWindowMap.emplace(std::make_pair(window, eye));
    }
}

} // namespace cc
