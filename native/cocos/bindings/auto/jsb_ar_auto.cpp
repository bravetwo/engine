
// clang-format off
#include "cocos/bindings/auto/jsb_ar_auto.h"
#if USE_AR_MODULE > 0
#include "cocos/bindings/manual/jsb_conversions.h"
#include "cocos/bindings/manual/jsb_global.h"
#include "ar/IARAPI.h"
#include "ar/ARModule.h"

#ifndef JSB_ALLOC
#define JSB_ALLOC(kls, ...) new (std::nothrow) kls(__VA_ARGS__)
#endif

#ifndef JSB_FREE
#define JSB_FREE(ptr) delete ptr
#endif

#if CC_DEBUG
static bool js_ar_getter_return_true(se::State& s) // NOLINT(readability-identifier-naming)
{
    s.rval().setBoolean(true);
    return true;
}
SE_BIND_PROP_GET(js_ar_getter_return_true)
#endif
se::Object* __jsb_cc_ar_ARModule_proto = nullptr; // NOLINT
se::Class* __jsb_cc_ar_ARModule_class = nullptr;  // NOLINT

static bool js_ar_ARModule_addImageToLib(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<std::string, true> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->addImageToLib(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_addImageToLib)

static bool js_ar_ARModule_addObjectToLib(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<std::string, true> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->addObjectToLib(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_addObjectToLib)

static bool js_ar_ARModule_config(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->config(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_config)

static bool js_ar_ARModule_enableFaceTracking(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->enableFaceTracking(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enableFaceTracking)

static bool js_ar_ARModule_enableImageTracking(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->enableImageTracking(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enableImageTracking)

static bool js_ar_ARModule_enableObjectTracking(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->enableObjectTracking(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enableObjectTracking)

static bool js_ar_ARModule_enablePlane(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->enablePlane(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enablePlane)

static bool js_ar_ARModule_enableSceneMesh(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->enableSceneMesh(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enableSceneMesh)

static bool js_ar_ARModule_endRequireSceneMesh(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->endRequireSceneMesh();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_endRequireSceneMesh)

static bool js_ar_ARModule_getAPIState(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        int result = cobj->getAPIState();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getAPIState)

static bool js_ar_ARModule_getCameraDepthBuffer(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        unsigned char* result = cobj->getCameraDepthBuffer();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getCameraDepthBuffer)

static bool js_ar_ARModule_getCameraPose(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::array<float, 7> result = cobj->getCameraPose();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getCameraPose)

static bool js_ar_ARModule_getCameraProjectionMatrix(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::array<float, 16> result = cobj->getCameraProjectionMatrix();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getCameraProjectionMatrix)

static bool js_ar_ARModule_getCameraTexCoords(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::array<float, 8> result = cobj->getCameraTexCoords();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getCameraTexCoords)

static bool js_ar_ARModule_getCameraTextureRef(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        void* result = cobj->getCameraTextureRef();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getCameraTextureRef)

static bool js_ar_ARModule_getCameraViewMatrix(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::array<float, 16> result = cobj->getCameraViewMatrix();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getCameraViewMatrix)

static bool js_ar_ARModule_getHitId(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        int result = cobj->getHitId();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getHitId)

static bool js_ar_ARModule_getSupportMask(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        int result = cobj->getSupportMask();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getSupportMask)

static bool js_ar_ARModule_onPause(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->onPause();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_onPause)

static bool js_ar_ARModule_onResume(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->onResume();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_onResume)

static bool js_ar_ARModule_setCameraTextureName(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setCameraTextureName(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_setCameraTextureName)

static bool js_ar_ARModule_setImageMaxTrackingNumber(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setImageMaxTrackingNumber(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_setImageMaxTrackingNumber)

static bool js_ar_ARModule_setPlaneDetectionMode(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setPlaneDetectionMode(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_setPlaneDetectionMode)

static bool js_ar_ARModule_setPlaneMaxTrackingNumber(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setPlaneMaxTrackingNumber(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_setPlaneMaxTrackingNumber)

static bool js_ar_ARModule_start(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->start();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_start)

static bool js_ar_ARModule_tryHitAttachAnchor(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        int result = cobj->tryHitAttachAnchor(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_tryHitAttachAnchor)

static bool js_ar_ARModule_tryHitTest(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<float, false> arg0 = {};
        HolderType<float, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        bool result = cobj->tryHitTest(arg0.value(), arg1.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_tryHitTest)

static bool js_ar_ARModule_update(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->update();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_update)

static bool js_ar_ARModule_get_static(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        cc::ar::ARModule* result = cc::ar::ARModule::get();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_get_static)

SE_DECLARE_FINALIZE_FUNC(js_cc_ar_ARModule_finalize)

static bool js_ar_ARModule_constructor(se::State& s) // NOLINT(readability-identifier-naming) constructor.c
{
    auto *ptr = JSB_MAKE_PRIVATE_OBJECT(cc::ar::ARModule);
    s.thisObject()->setPrivateObject(ptr);
    return true;
}
SE_BIND_CTOR(js_ar_ARModule_constructor, __jsb_cc_ar_ARModule_class, js_cc_ar_ARModule_finalize)

static bool js_cc_ar_ARModule_finalize(se::State& s) // NOLINT(readability-identifier-naming)
{
    return true;
}
SE_BIND_FINALIZE_FUNC(js_cc_ar_ARModule_finalize)

bool js_register_ar_ARModule(se::Object* obj) // NOLINT(readability-identifier-naming)
{
    auto* cls = se::Class::create("ARModule", obj, nullptr, _SE(js_ar_ARModule_constructor));

#if CC_DEBUG
    cls->defineStaticProperty("isJSBClass", _SE(js_ar_getter_return_true), nullptr);
#endif
    cls->defineFunction("addImageToLib", _SE(js_ar_ARModule_addImageToLib));
    cls->defineFunction("addObjectToLib", _SE(js_ar_ARModule_addObjectToLib));
    cls->defineFunction("config", _SE(js_ar_ARModule_config));
    cls->defineFunction("enableFaceTracking", _SE(js_ar_ARModule_enableFaceTracking));
    cls->defineFunction("enableImageTracking", _SE(js_ar_ARModule_enableImageTracking));
    cls->defineFunction("enableObjectTracking", _SE(js_ar_ARModule_enableObjectTracking));
    cls->defineFunction("enablePlane", _SE(js_ar_ARModule_enablePlane));
    cls->defineFunction("enableSceneMesh", _SE(js_ar_ARModule_enableSceneMesh));
    cls->defineFunction("endRequireSceneMesh", _SE(js_ar_ARModule_endRequireSceneMesh));
    cls->defineFunction("getAPIState", _SE(js_ar_ARModule_getAPIState));
    cls->defineFunction("getCameraDepthBuffer", _SE(js_ar_ARModule_getCameraDepthBuffer));
    cls->defineFunction("getCameraPose", _SE(js_ar_ARModule_getCameraPose));
    cls->defineFunction("getCameraProjectionMatrix", _SE(js_ar_ARModule_getCameraProjectionMatrix));
    cls->defineFunction("getCameraTexCoords", _SE(js_ar_ARModule_getCameraTexCoords));
    cls->defineFunction("getCameraTextureRef", _SE(js_ar_ARModule_getCameraTextureRef));
    cls->defineFunction("getCameraViewMatrix", _SE(js_ar_ARModule_getCameraViewMatrix));
    cls->defineFunction("getHitId", _SE(js_ar_ARModule_getHitId));
    cls->defineFunction("getSupportMask", _SE(js_ar_ARModule_getSupportMask));
    cls->defineFunction("onPause", _SE(js_ar_ARModule_onPause));
    cls->defineFunction("onResume", _SE(js_ar_ARModule_onResume));
    cls->defineFunction("setCameraTextureName", _SE(js_ar_ARModule_setCameraTextureName));
    cls->defineFunction("setImageMaxTrackingNumber", _SE(js_ar_ARModule_setImageMaxTrackingNumber));
    cls->defineFunction("setPlaneDetectionMode", _SE(js_ar_ARModule_setPlaneDetectionMode));
    cls->defineFunction("setPlaneMaxTrackingNumber", _SE(js_ar_ARModule_setPlaneMaxTrackingNumber));
    cls->defineFunction("start", _SE(js_ar_ARModule_start));
    cls->defineFunction("tryHitAttachAnchor", _SE(js_ar_ARModule_tryHitAttachAnchor));
    cls->defineFunction("tryHitTest", _SE(js_ar_ARModule_tryHitTest));
    cls->defineFunction("update", _SE(js_ar_ARModule_update));
    cls->defineStaticFunction("get", _SE(js_ar_ARModule_get_static));
    cls->defineFinalizeFunction(_SE(js_cc_ar_ARModule_finalize));
    cls->install();
    JSBClassType::registerClass<cc::ar::ARModule>(cls);

    __jsb_cc_ar_ARModule_proto = cls->getProto();
    __jsb_cc_ar_ARModule_class = cls;


    se::ScriptEngine::getInstance()->clearException();
    return true;
}
bool register_all_ar(se::Object* obj)    // NOLINT
{
    // Get the ns
    se::Value nsVal;
    if (!obj->getProperty("jsb", &nsVal, true))
    {
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);
        obj->setProperty("jsb", nsVal);
    }
    se::Object* ns = nsVal.toObject();

    js_register_ar_ARModule(ns);
    return true;
}

#endif //#if USE_AR_MODULE > 0
// clang-format on