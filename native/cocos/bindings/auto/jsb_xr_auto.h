// clang-format off
#pragma once

#if (CC_USE_XR > 0)
#include <type_traits>
#include "cocos/bindings/jswrapper/SeApi.h"
#include "cocos/bindings/manual/jsb_conversions.h"
#include "cocos/xr/Xr.h"

bool register_all_xr(se::Object *obj);                   // NOLINT

JSB_REGISTER_OBJECT_TYPE(cc::xr::XRConfigValue);
JSB_REGISTER_OBJECT_TYPE(cc::xr::XrEntry);


extern se::Object *__jsb_cc_xr_XRConfigValue_proto;   // NOLINT
extern se::Class *__jsb_cc_xr_XRConfigValue_class;    // NOLINT

bool js_register_cc_xr_XRConfigValue(se::Object *obj); // NOLINT

template <>
bool sevalue_to_native(const se::Value &, cc::xr::XRConfigValue *, se::Object *ctx); //NOLINT
SE_DECLARE_FUNC(js_xr_XRConfigValue_getBool);
SE_DECLARE_FUNC(js_xr_XRConfigValue_getFloat);
SE_DECLARE_FUNC(js_xr_XRConfigValue_getInt);
SE_DECLARE_FUNC(js_xr_XRConfigValue_getPointer);
SE_DECLARE_FUNC(js_xr_XRConfigValue_getString);
SE_DECLARE_FUNC(js_xr_XRConfigValue_isBool);
SE_DECLARE_FUNC(js_xr_XRConfigValue_isFloat);
SE_DECLARE_FUNC(js_xr_XRConfigValue_isInt);
SE_DECLARE_FUNC(js_xr_XRConfigValue_isPointer);
SE_DECLARE_FUNC(js_xr_XRConfigValue_isString);

extern se::Object *__jsb_cc_xr_XrEntry_proto;   // NOLINT
extern se::Class *__jsb_cc_xr_XrEntry_class;    // NOLINT

bool js_register_cc_xr_XrEntry(se::Object *obj); // NOLINT

SE_DECLARE_FUNC(js_xr_XrEntry_acquireXrSwapchain);
SE_DECLARE_FUNC(js_xr_XrEntry_computeViewProjection);
SE_DECLARE_FUNC(js_xr_XrEntry_createXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_destroyXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_frameEnd);
SE_DECLARE_FUNC(js_xr_XrEntry_frameStart);
SE_DECLARE_FUNC(js_xr_XrEntry_getCocosXrSwapchains);
SE_DECLARE_FUNC(js_xr_XrEntry_getCurrentXrSwapchain);
SE_DECLARE_FUNC(js_xr_XrEntry_getHMDViewPosition);
SE_DECLARE_FUNC(js_xr_XrEntry_getSwapchainImageIndex);
SE_DECLARE_FUNC(js_xr_XrEntry_getXRBoolConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_getXRConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_getXRFloatConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_getXRIntConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_getXRPointerConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_getXRStringConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_getXrViewCount);
SE_DECLARE_FUNC(js_xr_XrEntry_initPlatformData);
SE_DECLARE_FUNC(js_xr_XrEntry_initXrSwapchains);
SE_DECLARE_FUNC(js_xr_XrEntry_isCreatedXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_isRenderAllowable);
SE_DECLARE_FUNC(js_xr_XrEntry_isSessionRunning);
SE_DECLARE_FUNC(js_xr_XrEntry_pauseXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_platformLoopEnd);
SE_DECLARE_FUNC(js_xr_XrEntry_platformLoopStart);
SE_DECLARE_FUNC(js_xr_XrEntry_renderLoopEnd);
SE_DECLARE_FUNC(js_xr_XrEntry_renderLoopStart);
SE_DECLARE_FUNC(js_xr_XrEntry_resumeXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_setBaseSpaceType);
SE_DECLARE_FUNC(js_xr_XrEntry_setIPDOffset);
SE_DECLARE_FUNC(js_xr_XrEntry_setMultisamplesRTT);
SE_DECLARE_FUNC(js_xr_XrEntry_setRenderingScale);
SE_DECLARE_FUNC(js_xr_XrEntry_setXRBoolConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_setXRConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_setXRConfigCallback);
SE_DECLARE_FUNC(js_xr_XrEntry_setXRFloatConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_setXRIntConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_setXRPointerConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_setXRStringConfig);
SE_DECLARE_FUNC(js_xr_XrEntry_waitFrame);
SE_DECLARE_FUNC(js_xr_XrEntry_destroyInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_getInstance);
#endif //#if (CC_USE_XR > 0)
// clang-format on
