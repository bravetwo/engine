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

#include <iostream>
#include "base/std/container/array.h"
#include "math/Vec2.h"
#include "platform/interfaces/OSInterface.h"
#ifdef CC_USE_VULKAN
    #include "gfx-vulkan/VKDevice.h"
#endif
#ifdef CC_USE_GLES3
    #include "gfx-gles-common/gles3w.h"
    #include "gfx-gles3/GLES3Device.h"
#endif

#include "XRCommon.h"

namespace cc {
class CC_DLL IXRInterface : public OSInterface {
public:
    virtual xr::XRVendor getVendor() = 0;
    virtual void setConfigParameterI(xr::XRConfigKey key, int value) = 0;
    virtual int getConfigParameterI(xr::XRConfigKey key) = 0;
    virtual void setConfigParameterF(xr::XRConfigKey key, float value) = 0;
    virtual float getConfigParameterF(xr::XRConfigKey key) = 0;
    virtual void setConfigParameterS(xr::XRConfigKey key, std::string value) = 0;
    virtual std::string getConfigParameterS(xr::XRConfigKey key) = 0;

    virtual uint32_t getRuntimeVersion() = 0;
    virtual void initialize(void *javaVM, void *activity, xr::XREventsCallback callback) = 0;

    // render thread lifecycle
    virtual void onRenderPause() = 0;
    virtual void onRenderResume() = 0;
    virtual void onRenderDestroy() = 0;
    // render thread lifecycle

    // gfx
    virtual void preGFXDeviceInitialize(gfx::API gfxApi) = 0;
    virtual void postGFXDeviceInitialize(gfx::API gfxApi) = 0;
    virtual const xr::XRSwapchain& doGFXDeviceAcquire(gfx::API gfxApi) = 0;
    virtual bool isGFXDeviceNeedsPresent(gfx::API gfxApi) = 0;
    virtual void postGFXDevicePresent(gfx::API gfxApi) = 0;
    virtual void createXRSwapchains() = 0;
    virtual const std::vector<cc::xr::XRSwapchain>& getXRSwapchains() = 0;
    virtual gfx::Format getXRSwapchainFormat() = 0;
    virtual void updateXRSwapchainHandle(uint32_t index, void* ccHandle) = 0;
    // gfx

    // vulkan
#ifdef CC_USE_VULKAN
    virtual uint32_t getXRVkApiVersion(uint32_t engineVkApiVersion) = 0;
    virtual void initializeVulkanData(const PFN_vkGetInstanceProcAddr &addr) = 0;
    virtual VkInstance createXRVulkanInstance(const VkInstanceCreateInfo &instInfo) = 0;
    virtual VkDevice createXRVulkanDevice(const VkDeviceCreateInfo *deviceInfo) = 0;
    virtual VkPhysicalDevice getXRVulkanGraphicsDevice() = 0;
    virtual void getXRSwapchainVkImages(std::vector<VkImage> &vkImages, void *ccSwapchainHandle) = 0;
#endif
    // vulkan

    // gles3
#ifdef CC_USE_GLES3
    virtual void initializeGLESData(PFNGLES3WLOADPROC gles3wLoadFuncProc, gfx::GLES3GPUContext *gpuContext) = 0;
    virtual void attachGLESFramebufferTexture2D() = 0;
#endif
    // gles3

    // stereo render loop
    virtual bool platformLoopStart() = 0;
    virtual bool beginRenderFrame() = 0;
    virtual bool beginRenderEyeFrame(uint32_t eye) = 0;
    virtual bool endRenderEyeFrame(uint32_t eye) = 0;
    virtual bool endRenderFrame() = 0;
    virtual bool platformLoopEnd() = 0;
    // stereo render loop

    virtual ccstd::vector<float> getXRViewProjectionData(uint32_t eye, float near, float far) = 0;

    // renderwindow
    virtual xr::XREye getXREyeByRenderWindow(void* window) = 0;
    virtual void bindXREyeWithRenderWindow(void* window, xr::XREye eye) = 0;
};
} // namespace cc
