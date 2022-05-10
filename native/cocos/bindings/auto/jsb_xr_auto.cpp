
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
se::Object* __jsb_cc_xr_XrEntrance_proto = nullptr; // NOLINT
se::Class* __jsb_cc_xr_XrEntrance_class = nullptr;  // NOLINT

static bool js_xr_XrEntrance_BeginRenderFrame(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_BeginRenderFrame : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->BeginRenderFrame();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_BeginRenderFrame : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_BeginRenderFrame)

static bool js_xr_XrEntrance_ByAfterRenderFrame(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_ByAfterRenderFrame : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_ByAfterRenderFrame : Error processing arguments");
        cobj->ByAfterRenderFrame(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_ByAfterRenderFrame)

static bool js_xr_XrEntrance_ByBeforeRenderFrame(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_ByBeforeRenderFrame : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_ByBeforeRenderFrame : Error processing arguments");
        cobj->ByBeforeRenderFrame(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_ByBeforeRenderFrame)

static bool js_xr_XrEntrance_ComputeViewProjection(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_ComputeViewProjection : Invalid Native Object");
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
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_ComputeViewProjection : Error processing arguments");
        std::vector<float> result = cobj->ComputeViewProjection(arg0.value(), arg1.value(), arg2.value(), arg3.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_ComputeViewProjection : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 4);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_ComputeViewProjection)

static bool js_xr_XrEntrance_EndRenderFrame(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_EndRenderFrame : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->EndRenderFrame();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_EndRenderFrame)

static bool js_xr_XrEntrance_GetFov(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_GetFov : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<unsigned int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_GetFov : Error processing arguments");
        std::vector<float> result = cobj->GetFov(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_GetFov : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_GetFov)

static bool js_xr_XrEntrance_GetSwapchainImageIndexsByHandle(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_GetSwapchainImageIndexsByHandle : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<void*, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_GetSwapchainImageIndexsByHandle : Error processing arguments");
        unsigned int result = cobj->GetSwapchainImageIndexsByHandle(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_GetSwapchainImageIndexsByHandle : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_GetSwapchainImageIndexsByHandle)

static bool js_xr_XrEntrance_IsSessionRunning(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_IsSessionRunning : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->IsSessionRunning();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_IsSessionRunning : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_IsSessionRunning)

static bool js_xr_XrEntrance_PollActions(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_PollActions : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->PollActions();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_PollActions)

static bool js_xr_XrEntrance_PollEvents(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_PollEvents : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->PollEvents();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_PollEvents : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_PollEvents)

static bool js_xr_XrEntrance_createXrInstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_createXrInstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 3) {
        HolderType<const char*, false> arg0 = {};
        HolderType<void*, false> arg1 = {};
        HolderType<void*, false> arg2 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        ok &= sevalue_to_native(args[2], &arg2, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_createXrInstance : Error processing arguments");
        cobj->createXrInstance(arg0.value(), arg1.value(), arg2.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 3);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_createXrInstance)

static bool js_xr_XrEntrance_destroyXrInstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_destroyXrInstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->destroyXrInstance();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_destroyXrInstance)

static bool js_xr_XrEntrance_frameEnd(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_frameEnd : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->frameEnd();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_frameEnd)

static bool js_xr_XrEntrance_frameStart(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_frameStart : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->frameStart();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_frameStart)

static bool js_xr_XrEntrance_initXrSession(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_initXrSession : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->initXrSession();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_initXrSession)

static bool js_xr_XrEntrance_isCreatedXRinstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_isCreatedXRinstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isCreatedXRinstance();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_isCreatedXRinstance : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_isCreatedXRinstance)

static bool js_xr_XrEntrance_pauseXrInstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_pauseXrInstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->pauseXrInstance();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_pauseXrInstance)

static bool js_xr_XrEntrance_renderLoopEnd(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_renderLoopEnd : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_renderLoopEnd : Error processing arguments");
        cobj->renderLoopEnd(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_renderLoopEnd)

static bool js_xr_XrEntrance_renderLoopStart(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_renderLoopStart : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_renderLoopStart : Error processing arguments");
        cobj->renderLoopStart(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_renderLoopStart)

static bool js_xr_XrEntrance_resumeXrInstance(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntrance>(s);
    SE_PRECONDITION2(cobj, false, "js_xr_XrEntrance_resumeXrInstance : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->resumeXrInstance();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_resumeXrInstance)

static bool js_xr_XrEntrance_getInstance_static(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        cc::xr::XrEntrance* result = cc::xr::XrEntrance::getInstance();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "js_xr_XrEntrance_getInstance_static : Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntrance_getInstance_static)

bool js_register_xr_XrEntrance(se::Object* obj) // NOLINT(readability-identifier-naming)
{
    auto* cls = se::Class::create("XrEntrance", obj, nullptr, nullptr);

#if CC_DEBUG
    cls->defineStaticProperty("isJSBClass", _SE(js_xr_getter_return_true), nullptr);
#endif
    cls->defineFunction("BeginRenderFrame", _SE(js_xr_XrEntrance_BeginRenderFrame));
    cls->defineFunction("ByAfterRenderFrame", _SE(js_xr_XrEntrance_ByAfterRenderFrame));
    cls->defineFunction("ByBeforeRenderFrame", _SE(js_xr_XrEntrance_ByBeforeRenderFrame));
    cls->defineFunction("ComputeViewProjection", _SE(js_xr_XrEntrance_ComputeViewProjection));
    cls->defineFunction("EndRenderFrame", _SE(js_xr_XrEntrance_EndRenderFrame));
    cls->defineFunction("GetFov", _SE(js_xr_XrEntrance_GetFov));
    cls->defineFunction("GetSwapchainImageIndexsByHandle", _SE(js_xr_XrEntrance_GetSwapchainImageIndexsByHandle));
    cls->defineFunction("IsSessionRunning", _SE(js_xr_XrEntrance_IsSessionRunning));
    cls->defineFunction("PollActions", _SE(js_xr_XrEntrance_PollActions));
    cls->defineFunction("PollEvents", _SE(js_xr_XrEntrance_PollEvents));
    cls->defineFunction("createXrInstance", _SE(js_xr_XrEntrance_createXrInstance));
    cls->defineFunction("destroyXrInstance", _SE(js_xr_XrEntrance_destroyXrInstance));
    cls->defineFunction("frameEnd", _SE(js_xr_XrEntrance_frameEnd));
    cls->defineFunction("frameStart", _SE(js_xr_XrEntrance_frameStart));
    cls->defineFunction("initXrSession", _SE(js_xr_XrEntrance_initXrSession));
    cls->defineFunction("isCreatedXRinstance", _SE(js_xr_XrEntrance_isCreatedXRinstance));
    cls->defineFunction("pauseXrInstance", _SE(js_xr_XrEntrance_pauseXrInstance));
    cls->defineFunction("renderLoopEnd", _SE(js_xr_XrEntrance_renderLoopEnd));
    cls->defineFunction("renderLoopStart", _SE(js_xr_XrEntrance_renderLoopStart));
    cls->defineFunction("resumeXrInstance", _SE(js_xr_XrEntrance_resumeXrInstance));
    cls->defineStaticFunction("getInstance", _SE(js_xr_XrEntrance_getInstance_static));
    cls->install();
    JSBClassType::registerClass<cc::xr::XrEntrance>(cls);

    __jsb_cc_xr_XrEntrance_proto = cls->getProto();
    __jsb_cc_xr_XrEntrance_class = cls;


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

    js_register_xr_XrEntrance(ns);
    return true;
}

#endif //#if (USE_XR > 0)
// clang-format on