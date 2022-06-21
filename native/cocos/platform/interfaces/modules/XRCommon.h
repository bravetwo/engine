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

#ifndef XR_COMMON_H_
#define XR_COMMON_H_ 1
#include <functional>

namespace cc {
namespace xr {
#define XR_INTERFACE_RUNTIME_VERSION_1_0 1

enum class XREye {
    NONE = -1,
    LEFT = 0,
    RIGHT = 1,
    MONO = 2
};

enum class XRVendor {
    MOBILE,
    META,
    HUAWEIVR,
    PICO,
    ROKID,
};

enum class XRConfigKey {
    MULTI_SAMPLES,
    RENDER_SCALE,
    SESSION_RUNNING,
    INSTANCE_CREATED,
    VK_QUEUE_FAMILY_INDEX
};

struct XRQuaternion {
    float x = 0.f;
    float y = 0.f;
    float z = 0.f;
    float w = 1.f;

    XRQuaternion() {}

    XRQuaternion(float xx, float yy, float zz, float ww)
    : x(xx),
      y(yy),
      z(zz),
      w(ww) {}

    XRQuaternion(float *q)
    : x(q[0]),
      y(q[1]),
      z(q[2]),
      w(q[3]) {}

    XRQuaternion(const XRQuaternion &copy) {
        this->x = copy.x;
        this->y = copy.y;
        this->z = copy.z;
        this->w = copy.w;
    }
};

struct HandleInfo {
    float x = 0.f;
    float y = 0.f;
    float z = 0.f;
    float value = 0.f;
    XRQuaternion quaternion;

    HandleInfo() {}

    HandleInfo(float x, float y)
    : x(x),
      y(y) {}

    HandleInfo(float value)
    : value(value) {}

    HandleInfo(float x, float y, float z, float *quaternion)
    : x(x),
      y(y),
      z(z),
      quaternion(quaternion) {}

    HandleInfo(float x, float y, float z, const XRQuaternion &quaternion)
    : x(x),
      y(y),
      z(z),
      quaternion(quaternion) {}
};

struct HandleEvent {
    enum class Type {
        VIEW_POSE_ACTIVE_LEFT,
        HAND_POSE_ACTIVE_LEFT,
        AIM_POSE_ACTIVE_LEFT,
        TRIGGER_START_LEFT,
        TRIGGER_END_LEFT,
        TRIGGER_DOWN_LEFT,
        TRIGGER_UP_LEFT,
        THUMBSTICK_MOVE_LEFT,
        THUMBSTICK_MOVE_END_LEFT,
        THUMBSTICK_DOWN_LEFT,
        THUMBSTICK_UP_LEFT,
        GRIP_START_LEFT,
        GRIP_END_LEFT,
        BUTTON_X_DOWN,
        BUTTON_X_UP,
        BUTTON_Y_DOWN,
        BUTTON_Y_UP,
        MENU_DOWN,
        MENU_UP,
        VIEW_POSE_ACTIVE_RIGHT,
        HAND_POSE_ACTIVE_RIGHT,
        AIM_POSE_ACTIVE_RIGHT,
        TRIGGER_START_RIGHT,
        TRIGGER_END_RIGHT,
        TRIGGER_DOWN_RIGHT,
        TRIGGER_UP_RIGHT,
        THUMBSTICK_MOVE_RIGHT,
        THUMBSTICK_MOVE_END_RIGHT,
        THUMBSTICK_DOWN_RIGHT,
        THUMBSTICK_UP_RIGHT,
        GRIP_START_RIGHT,
        GRIP_END_RIGHT,
        BUTTON_A_DOWN,
        BUTTON_A_UP,
        BUTTON_B_DOWN,
        BUTTON_B_UP,
        HOME_DOWN,
        HOME_UP,
        BACK_DOWN,
        BACK_UP,
        START_DOWN,
        START_UP,
        DPAD_TOP_DOWN,
        DPAD_TOP_UP,
        DPAD_BOTTOM_DOWN,
        DPAD_BOTTOM_UP,
        DPAD_LEFT_DOWN,
        DPAD_LEFT_UP,
        DPAD_RIGHT_DOWN,
        DPAD_RIGHT_UP,
        UNKNOWN
    };

    static const constexpr char *TypeNames[] = {
        "onViewPoseActiveLeft",
        "onHandPoseActiveLeft",
        "onAimPoseActiveLeft",
        "onTriggerStartLeft",
        "onTriggerEndLeft",
        "onTriggerDownLeft",
        "onTriggerUpLeft",
        "onThumbstickMoveLeft",
        "onThumbstickMoveEndLeft",
        "onThumbstickDownLeft",
        "onThumbstickUpLeft",
        "onGripStartLeft",
        "onGripEndLeft",
        "onButtonXDown",
        "onButtonXUp",
        "onButtonYDown",
        "onButtonYUp",
        "onMenuDown",
        "onMenuUp",
        "onViewPoseActiveRight",
        "onHandPoseActiveRight",
        "onAimPoseActiveRight",
        "onTriggerStartRight",
        "onTriggerEndRight",
        "onTriggerDownRight",
        "onTriggerUpRight",
        "onThumbstickMoveRight",
        "onThumbstickMoveEndRight",
        "onThumbstickDownRight",
        "onThumbstickUpRight",
        "onGripStartRight",
        "onGripEndRight",
        "onButtonADown",
        "onButtonAUp",
        "onButtonBDown",
        "onButtonBUp",
        "onHomeDown",
        "onHomeUp",
        "onBackDown",
        "onBackUp",
        "onStartDown",
        "onStartUp",
        "onDpadTopDown",
        "onDpadTopUp",
        "onDpadBottomDown",
        "onDpadBottomUp",
        "onDpadLeftDown",
        "onDpadLeftUp",
        "onDpadRightDown",
        "onDpadRightUp",
        "unknown"};

    HandleInfo handleInfo;
    Type type = Type::UNKNOWN;
};
typedef std::function<void(const HandleEvent &handleEvent)> XREventsCallback;
using PFNGLES3WLOADPROC = void *(*)(const char *);

struct XRSwapchain {
    void *xrSwapchainHandle = nullptr;
    uint32_t ccSwapchainTypedID = 0;
    uint32_t width = 0;
    uint32_t height = 0;
    uint32_t glDrawFramebuffer = 0;
    uint32_t swapchainImageIndex = 0;
};

#define GraphicsApiOpenglES   "OpenGLES"
#define GraphicsApiVulkan_1_0 "Vulkan1"
#define GraphicsApiVulkan_1_1 "Vulkan2"

} // namespace xr
} // namespace cc
#endif //XR_COMMON_H_
