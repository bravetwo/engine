
// clang-format off
#include "cocos/bindings/auto/jsb_xr_auto.h"
#if (USE_XR > 0)
#include "cocos/bindings/manual/jsb_conversions.h"
#include "cocos/bindings/manual/jsb_global.h"
#include "Xr.h"

#ifndef JSB_ALLOC
#define JSB_ALLOC(kls, ...) new (std::nothrow) kls(__VA_ARGS__)
#endif

#ifndef JSB_FREE
#define JSB_FREE(ptr) delete ptr
#endif

#if CC_DEBUG
static bool js_xr_getter_return_true(se::State& s) // NOLINT(readability-identifier-naming)
{
    s.rval().setBoolean(true);
    return true;
}
SE_BIND_PROP_GET(js_xr_getter_return_true)
#endif
se::Object* __jsb_cc_xr_XrEntry_proto = nullptr; // NOLINT
se::Class* __jsb_cc_xr_XrEntry_class = nullptr;  // NOLINT

static bool js_xr_XrEntry_computeViewProjection(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_computeViewProjection : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 4) {
        HolderType<unsigned int, false> arg0 = {};
        HolderType<float, false> arg1 = {};
        HolderType<float, false> arg2 = {};
        HolderType<float, false> arg3 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        ok &= sevalue_to_native(args[2], &arg2, s.thisObject());
        ok &= sevalue_to_native(args[3], &arg3, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_computeViewProjection : Error processing arguments");
        std::vector<float> result = cobj->computeViewProjection(arg0.value(), arg1.value(), arg2.value(), arg3.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_computeViewProjection : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 4);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_computeViewProjection)

static bool js_xr_XrEntry_createXrInstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_createXrInstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<const char*, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_createXrInstance : Error processing arguments");
        cobj->createXrInstance(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_createXrInstance)

static bool js_xr_XrEntry_destroyXrInstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_destroyXrInstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->destroyXrInstance();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_destroyXrInstance)

static bool js_xr_XrEntry_frameEnd(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_frameEnd : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->frameEnd();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_frameEnd)

static bool js_xr_XrEntry_frameStart(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_frameStart : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->frameStart();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_frameStart : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_frameStart)

static bool js_xr_XrEntry_getCocosXrSwapchains(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_getCocosXrSwapchains : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::vector<cc::xr::XRSwapchain>& result = cobj->getCocosXrSwapchains();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_getCocosXrSwapchains : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getCocosXrSwapchains)

static bool js_xr_XrEntry_getHMDViewPosition(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_getHMDViewPosition : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_getHMDViewPosition : Error processing arguments");
        std::vector<float> result = cobj->getHMDViewPosition(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_getHMDViewPosition : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getHMDViewPosition)

static bool js_xr_XrEntry_getSwapchainImageIndex(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_getSwapchainImageIndex : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        unsigned int result = cobj->getSwapchainImageIndex();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_getSwapchainImageIndex : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getSwapchainImageIndex)

static bool js_xr_XrEntry_getXRConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_getXRConfig : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<cc::xr::XRConfigKey, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_getXRConfig : Error processing arguments");
        cc::xr::XRConfigValue result = cobj->getXRConfig(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_getXRConfig : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getXRConfig)

static bool js_xr_XrEntry_getXrViewCount(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_getXrViewCount : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        int result = cobj->getXrViewCount();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_getXrViewCount : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getXrViewCount)

static bool js_xr_XrEntry_initPlatformData(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_initPlatformData : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<void*, false> arg0 = {};
        HolderType<void*, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_initPlatformData : Error processing arguments");
        cobj->initPlatformData(arg0.value(), arg1.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_initPlatformData)

static bool js_xr_XrEntry_initXrSwapchains(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_initXrSwapchains : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->initXrSwapchains();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_initXrSwapchains)

static bool js_xr_XrEntry_isCreatedXrInstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_isCreatedXrInstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isCreatedXrInstance();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_isCreatedXrInstance : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_isCreatedXrInstance)

static bool js_xr_XrEntry_isRenderAllowable(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_isRenderAllowable : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isRenderAllowable();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_isRenderAllowable : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_isRenderAllowable)

static bool js_xr_XrEntry_isSessionRunning(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_isSessionRunning : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isSessionRunning();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_isSessionRunning : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_isSessionRunning)

static bool js_xr_XrEntry_pauseXrInstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_pauseXrInstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->pauseXrInstance();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_pauseXrInstance)

static bool js_xr_XrEntry_platformLoopEnd(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_platformLoopEnd : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->platformLoopEnd();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_platformLoopEnd : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_platformLoopEnd)

static bool js_xr_XrEntry_platformLoopStart(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_platformLoopStart : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->platformLoopStart();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_platformLoopStart : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_platformLoopStart)

static bool js_xr_XrEntry_renderLoopEnd(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_renderLoopEnd : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_renderLoopEnd : Error processing arguments");
        cobj->renderLoopEnd(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_renderLoopEnd)

static bool js_xr_XrEntry_renderLoopStart(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_renderLoopStart : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_renderLoopStart : Error processing arguments");
        cobj->renderLoopStart(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_renderLoopStart)

static bool js_xr_XrEntry_resumeXrInstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_resumeXrInstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->resumeXrInstance();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_resumeXrInstance)

static bool js_xr_XrEntry_setIPDOffset(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_setIPDOffset : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<float, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_setIPDOffset : Error processing arguments");
        cobj->setIPDOffset(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setIPDOffset)

static bool js_xr_XrEntry_setMultisamplesRTT(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_setMultisamplesRTT : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_setMultisamplesRTT : Error processing arguments");
        cobj->setMultisamplesRTT(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setMultisamplesRTT)

static bool js_xr_XrEntry_setRenderingScale(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntry_setRenderingScale : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<float, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_setRenderingScale : Error processing arguments");
        cobj->setRenderingScale(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setRenderingScale)

static bool js_xr_XrEntry_getInstance_static(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        cc::xr::XrEntry* result = cc::xr::XrEntry::getInstance();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntry_getInstance_static : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getInstance_static)

bool js_register_xr_XrEntry(se::Object* obj) // NOLINT(readability-identifier-naming)
{
    auto* cls = se::Class::create("XrEntry", obj, nullptr, nullptr);

#if CC_DEBUG
    cls->defineStaticProperty("isJSBClass", _SE(js_xr_getter_return_true), nullptr);
#endif
    cls->defineFunction("computeViewProjection", _SE(js_xr_XrEntry_computeViewProjection));
    cls->defineFunction("createXrInstance", _SE(js_xr_XrEntry_createXrInstance));
    cls->defineFunction("destroyXrInstance", _SE(js_xr_XrEntry_destroyXrInstance));
    cls->defineFunction("frameEnd", _SE(js_xr_XrEntry_frameEnd));
    cls->defineFunction("frameStart", _SE(js_xr_XrEntry_frameStart));
    cls->defineFunction("getCocosXrSwapchains", _SE(js_xr_XrEntry_getCocosXrSwapchains));
    cls->defineFunction("getHMDViewPosition", _SE(js_xr_XrEntry_getHMDViewPosition));
    cls->defineFunction("getSwapchainImageIndex", _SE(js_xr_XrEntry_getSwapchainImageIndex));
    cls->defineFunction("getXRConfig", _SE(js_xr_XrEntry_getXRConfig));
    cls->defineFunction("getXrViewCount", _SE(js_xr_XrEntry_getXrViewCount));
    cls->defineFunction("initPlatformData", _SE(js_xr_XrEntry_initPlatformData));
    cls->defineFunction("initXrSwapchains", _SE(js_xr_XrEntry_initXrSwapchains));
    cls->defineFunction("isCreatedXrInstance", _SE(js_xr_XrEntry_isCreatedXrInstance));
    cls->defineFunction("isRenderAllowable", _SE(js_xr_XrEntry_isRenderAllowable));
    cls->defineFunction("isSessionRunning", _SE(js_xr_XrEntry_isSessionRunning));
    cls->defineFunction("pauseXrInstance", _SE(js_xr_XrEntry_pauseXrInstance));
    cls->defineFunction("platformLoopEnd", _SE(js_xr_XrEntry_platformLoopEnd));
    cls->defineFunction("platformLoopStart", _SE(js_xr_XrEntry_platformLoopStart));
    cls->defineFunction("renderLoopEnd", _SE(js_xr_XrEntry_renderLoopEnd));
    cls->defineFunction("renderLoopStart", _SE(js_xr_XrEntry_renderLoopStart));
    cls->defineFunction("resumeXrInstance", _SE(js_xr_XrEntry_resumeXrInstance));
    cls->defineFunction("setIPDOffset", _SE(js_xr_XrEntry_setIPDOffset));
    cls->defineFunction("setMultisamplesRTT", _SE(js_xr_XrEntry_setMultisamplesRTT));
    cls->defineFunction("setRenderingScale", _SE(js_xr_XrEntry_setRenderingScale));
    cls->defineStaticFunction("getInstance", _SE(js_xr_XrEntry_getInstance_static));
    cls->install();
    JSBClassType::registerClass<cc::xr::XrEntry>(cls);

    __jsb_cc_xr_XrEntry_proto = cls->getProto();
    __jsb_cc_xr_XrEntry_class = cls;


    se::ScriptEngine::getInstance()->clearException();
    return true;
}
bool register_all_xr(se::Object* obj)    // NOLINT
{
    // Get the ns
    se::Value nsVal;
    if (!obj->getProperty("xr", &nsVal, true))
    {
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);
        obj->setProperty("xr", nsVal);
    }
    se::Object* ns = nsVal.toObject();

    js_register_xr_XrEntry(ns);
    return true;
}

#endif //#if (USE_XR > 0)
// clang-format on