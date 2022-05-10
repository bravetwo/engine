// clang-format off
#pragma once

#if (USE_XR > 0)
#include <type_traits>
#include "cocos/bindings/jswrapper/SeApi.h"
#include "cocos/bindings/manual/jsb_conversions.h"
#include "external/sources/xr/Xr.h"

bool register_all_xr(se::Object *obj);                   // NOLINT

JSB_REGISTER_OBJECT_TYPE(cc::xr::XrEntrance);


extern se::Object *__jsb_cc_xr_XrEntrance_proto; // NOLINT
extern se::Class * __jsb_cc_xr_XrEntrance_class; // NOLINT

bool js_register_cc_xr_XrEntrance(se::Object *obj); // NOLINT

SE_DECLARE_FUNC(js_xr_XrEntrance_BeginRenderFrame);
SE_DECLARE_FUNC(js_xr_XrEntrance_ByAfterRenderFrame);
SE_DECLARE_FUNC(js_xr_XrEntrance_ByBeforeRenderFrame);
SE_DECLARE_FUNC(js_xr_XrEntrance_ComputeViewProjection);
SE_DECLARE_FUNC(js_xr_XrEntrance_EndRenderFrame);
SE_DECLARE_FUNC(js_xr_XrEntrance_GetFov);
SE_DECLARE_FUNC(js_xr_XrEntrance_GetSwapchainImageIndexsByHandle);
SE_DECLARE_FUNC(js_xr_XrEntrance_IsSessionRunning);
SE_DECLARE_FUNC(js_xr_XrEntrance_PollActions);
SE_DECLARE_FUNC(js_xr_XrEntrance_PollEvents);
SE_DECLARE_FUNC(js_xr_XrEntrance_createXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntrance_destroyXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntrance_frameEnd);
SE_DECLARE_FUNC(js_xr_XrEntrance_frameStart);
SE_DECLARE_FUNC(js_xr_XrEntrance_initXrSession);
SE_DECLARE_FUNC(js_xr_XrEntrance_isCreatedXRinstance);
SE_DECLARE_FUNC(js_xr_XrEntrance_pauseXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntrance_renderLoopEnd);
SE_DECLARE_FUNC(js_xr_XrEntrance_renderLoopStart);
SE_DECLARE_FUNC(js_xr_XrEntrance_resumeXrInstance);
SE_DECLARE_FUNC(js_xr_XrEntrance_getInstance);
#endif //#if (USE_XR > 0)
// clang-format on
