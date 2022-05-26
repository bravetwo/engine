// clang-format off
#pragma once

#if (USE_XR > 0)
#include <type_traits>
#include "cocos/bindings/jswrapper/SeApi.h"
#include "cocos/bindings/manual/jsb_conversions.h"
#include "external/sources/xr/Xr.h"

bool register_all_xr(se::Object *obj);                   // NOLINT

JSB_REGISTER_OBJECT_TYPE(cc::xr::XrEntry);


extern se::Object *__jsb_cc_xr_XrEntry_proto; // NOLINT
extern se::Class * __jsb_cc_xr_XrEntry_class; // NOLINT

bool js_register_cc_xr_XrEntry(se::Object *obj); // NOLINT

SE_DECLARE_FUNC(js_xr_XrEntry_AfterRenderFrame);
SE_DECLARE_FUNC(js_xr_XrEntry_BeforeRenderFrame);
SE_DECLARE_FUNC(js_xr_XrEntry_BeginRenderFrame);
SE_DECLARE_FUNC(js_xr_XrEntry_ComputeViewProjection);
SE_DECLARE_FUNC(js_xr_XrEntry_EndRenderFrame);
SE_DECLARE_FUNC(js_xr_XrEntry_GetFov);
SE_DECLARE_FUNC(js_xr_XrEntry_GetSwapchainImageIndexsByHandle);
SE_DECLARE_FUNC(js_xr_XrEntry_IsSessionRunning);
SE_DECLARE_FUNC(js_xr_XrEntry_PollActions);
SE_DECLARE_FUNC(js_xr_XrEntry_PollEvents);
SE_DECLARE_FUNC(js_xr_XrEntry_createXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_destroyXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_frameEnd);
SE_DECLARE_FUNC(js_xr_XrEntry_frameStart);
SE_DECLARE_FUNC(js_xr_XrEntry_getMultisamplesRTT);
SE_DECLARE_FUNC(js_xr_XrEntry_initXrSession);
SE_DECLARE_FUNC(js_xr_XrEntry_isCreatedXRinstance);
SE_DECLARE_FUNC(js_xr_XrEntry_pauseXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_renderLoopEnd);
SE_DECLARE_FUNC(js_xr_XrEntry_renderLoopStart);
SE_DECLARE_FUNC(js_xr_XrEntry_resumeXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntry_setMultisamplesRTT);
SE_DECLARE_FUNC(js_xr_XrEntry_setRenderingScale);
SE_DECLARE_FUNC(js_xr_XrEntry_getInstance);
#endif //#if (USE_XR > 0)
// clang-format on
