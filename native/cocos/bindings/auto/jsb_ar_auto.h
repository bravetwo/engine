// clang-format off
#pragma once

#if USE_AR_MODULE > 0
#include <type_traits>
#include "cocos/bindings/jswrapper/SeApi.h"
#include "cocos/bindings/manual/jsb_conversions.h"
#include "cocos/xr/ar/IARAPI.h"
#include "cocos/xr/ar/ARModule.h"

bool register_all_ar(se::Object *obj);                   // NOLINT

JSB_REGISTER_OBJECT_TYPE(cc::ar::ARModule);


extern se::Object *__jsb_cc_ar_ARModule_proto;   // NOLINT
extern se::Class *__jsb_cc_ar_ARModule_class;    // NOLINT

bool js_register_cc_ar_ARModule(se::Object *obj); // NOLINT

SE_DECLARE_FUNC(js_ar_ARModule_addImageToLib);
SE_DECLARE_FUNC(js_ar_ARModule_addObjectToLib);
SE_DECLARE_FUNC(js_ar_ARModule_config);
SE_DECLARE_FUNC(js_ar_ARModule_enableFaceTracking);
SE_DECLARE_FUNC(js_ar_ARModule_enableImageTracking);
SE_DECLARE_FUNC(js_ar_ARModule_enableObjectTracking);
SE_DECLARE_FUNC(js_ar_ARModule_enablePlane);
SE_DECLARE_FUNC(js_ar_ARModule_enableSceneMesh);
SE_DECLARE_FUNC(js_ar_ARModule_endRequireSceneMesh);
SE_DECLARE_FUNC(js_ar_ARModule_getAPIState);
SE_DECLARE_FUNC(js_ar_ARModule_getAdded);
SE_DECLARE_FUNC(js_ar_ARModule_getCameraDepthBuffer);
SE_DECLARE_FUNC(js_ar_ARModule_getCameraId);
SE_DECLARE_FUNC(js_ar_ARModule_getCameraPose);
SE_DECLARE_FUNC(js_ar_ARModule_getCameraProjectionMatrix);
SE_DECLARE_FUNC(js_ar_ARModule_getCameraTexCoords);
SE_DECLARE_FUNC(js_ar_ARModule_getCameraTextureRef);
SE_DECLARE_FUNC(js_ar_ARModule_getCameraViewMatrix);
SE_DECLARE_FUNC(js_ar_ARModule_getHitId);
SE_DECLARE_FUNC(js_ar_ARModule_getSupportMask);
SE_DECLARE_FUNC(js_ar_ARModule_onPause);
SE_DECLARE_FUNC(js_ar_ARModule_onResume);
SE_DECLARE_FUNC(js_ar_ARModule_setCameraId);
SE_DECLARE_FUNC(js_ar_ARModule_setCameraTextureName);
SE_DECLARE_FUNC(js_ar_ARModule_setDisplayGeometry);
SE_DECLARE_FUNC(js_ar_ARModule_setImageMaxTrackingNumber);
SE_DECLARE_FUNC(js_ar_ARModule_setPlaneDetectionMode);
SE_DECLARE_FUNC(js_ar_ARModule_setPlaneMaxTrackingNumber);
SE_DECLARE_FUNC(js_ar_ARModule_start);
SE_DECLARE_FUNC(js_ar_ARModule_tryHitAttachAnchor);
SE_DECLARE_FUNC(js_ar_ARModule_tryHitTest);
SE_DECLARE_FUNC(js_ar_ARModule_update);
SE_DECLARE_FUNC(js_ar_ARModule_get);
SE_DECLARE_FUNC(js_ar_ARModule_ARModule);
#endif //#if USE_AR_MODULE > 0
// clang-format on
