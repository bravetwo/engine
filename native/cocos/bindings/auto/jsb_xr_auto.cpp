
// clang-format off
#include "cocos/bindings/auto/jsb_xr_auto.h"
#if (CC_USE_XR > 0)
#include "cocos/bindings/manual/jsb_conversions.h"
#include "cocos/bindings/manual/jsb_global.h"
#include "xr/Xr.h"

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
se::Object* __jsb_cc_xr_XRConfigValue_proto = nullptr; // NOLINT
se::Class* __jsb_cc_xr_XRConfigValue_class = nullptr;  // NOLINT

static bool js_xr_XRConfigValue_getBool(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->getBool();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_getBool)

static bool js_xr_XRConfigValue_getFloat(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        float result = cobj->getFloat();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_getFloat)

static bool js_xr_XRConfigValue_getInt(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        int result = cobj->getInt();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_getInt)

static bool js_xr_XRConfigValue_getPointer(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        void* result = cobj->getPointer();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_getPointer)

static bool js_xr_XRConfigValue_getString(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::string result = cobj->getString();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_getString)

static bool js_xr_XRConfigValue_isBool(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isBool();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_isBool)

static bool js_xr_XRConfigValue_isFloat(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isFloat();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_isFloat)

static bool js_xr_XRConfigValue_isInt(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isInt();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_isInt)

static bool js_xr_XRConfigValue_isPointer(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isPointer();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_isPointer)

static bool js_xr_XRConfigValue_isString(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isString();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XRConfigValue_isString)

static bool js_xr_XRConfigValue_get_vInt(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;

    CC_UNUSED bool ok = true;
    se::Value jsret;
    ok &= nativevalue_to_se(cobj->vInt, jsret, s.thisObject() /*ctx*/);
    s.rval() = jsret;
    SE_HOLD_RETURN_VALUE(cobj->vInt, s.thisObject(), s.rval());
    return true;
}
SE_BIND_PROP_GET(js_xr_XRConfigValue_get_vInt)

static bool js_xr_XRConfigValue_set_vInt(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    SE_PRECONDITION2(cobj, false, "Invalid Native Object");

    CC_UNUSED bool ok = true;
    ok &= sevalue_to_native(args[0], &cobj->vInt, s.thisObject());
    SE_PRECONDITION2(ok, false, "Error processing new value");
    return true;
}
SE_BIND_PROP_SET(js_xr_XRConfigValue_set_vInt)

static bool js_xr_XRConfigValue_get_vFloat(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;

    CC_UNUSED bool ok = true;
    se::Value jsret;
    ok &= nativevalue_to_se(cobj->vFloat, jsret, s.thisObject() /*ctx*/);
    s.rval() = jsret;
    SE_HOLD_RETURN_VALUE(cobj->vFloat, s.thisObject(), s.rval());
    return true;
}
SE_BIND_PROP_GET(js_xr_XRConfigValue_get_vFloat)

static bool js_xr_XRConfigValue_set_vFloat(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    SE_PRECONDITION2(cobj, false, "Invalid Native Object");

    CC_UNUSED bool ok = true;
    ok &= sevalue_to_native(args[0], &cobj->vFloat, s.thisObject());
    SE_PRECONDITION2(ok, false, "Error processing new value");
    return true;
}
SE_BIND_PROP_SET(js_xr_XRConfigValue_set_vFloat)

static bool js_xr_XRConfigValue_get_vBool(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;

    CC_UNUSED bool ok = true;
    se::Value jsret;
    ok &= nativevalue_to_se(cobj->vBool, jsret, s.thisObject() /*ctx*/);
    s.rval() = jsret;
    SE_HOLD_RETURN_VALUE(cobj->vBool, s.thisObject(), s.rval());
    return true;
}
SE_BIND_PROP_GET(js_xr_XRConfigValue_get_vBool)

static bool js_xr_XRConfigValue_set_vBool(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    SE_PRECONDITION2(cobj, false, "Invalid Native Object");

    CC_UNUSED bool ok = true;
    ok &= sevalue_to_native(args[0], &cobj->vBool, s.thisObject());
    SE_PRECONDITION2(ok, false, "Error processing new value");
    return true;
}
SE_BIND_PROP_SET(js_xr_XRConfigValue_set_vBool)

static bool js_xr_XRConfigValue_get_vPtr(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;

    CC_UNUSED bool ok = true;
    se::Value jsret;
    ok &= nativevalue_to_se(cobj->vPtr, jsret, s.thisObject() /*ctx*/);
    s.rval() = jsret;
    SE_HOLD_RETURN_VALUE(cobj->vPtr, s.thisObject(), s.rval());
    return true;
}
SE_BIND_PROP_GET(js_xr_XRConfigValue_get_vPtr)

static bool js_xr_XRConfigValue_set_vPtr(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    SE_PRECONDITION2(cobj, false, "Invalid Native Object");

    CC_UNUSED bool ok = true;
    ok &= sevalue_to_native(args[0], &cobj->vPtr, s.thisObject());
    SE_PRECONDITION2(ok, false, "Error processing new value");
    return true;
}
SE_BIND_PROP_SET(js_xr_XRConfigValue_set_vPtr)

static bool js_xr_XRConfigValue_get_vString(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;

    CC_UNUSED bool ok = true;
    se::Value jsret;
    ok &= nativevalue_to_se(cobj->vString, jsret, s.thisObject() /*ctx*/);
    s.rval() = jsret;
    SE_HOLD_RETURN_VALUE(cobj->vString, s.thisObject(), s.rval());
    return true;
}
SE_BIND_PROP_GET(js_xr_XRConfigValue_get_vString)

static bool js_xr_XRConfigValue_set_vString(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    SE_PRECONDITION2(cobj, false, "Invalid Native Object");

    CC_UNUSED bool ok = true;
    ok &= sevalue_to_native(args[0], &cobj->vString, s.thisObject());
    SE_PRECONDITION2(ok, false, "Error processing new value");
    return true;
}
SE_BIND_PROP_SET(js_xr_XRConfigValue_set_vString)

static bool js_xr_XRConfigValue_get_valueType(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;

    CC_UNUSED bool ok = true;
    se::Value jsret;
    ok &= nativevalue_to_se(cobj->valueType, jsret, s.thisObject() /*ctx*/);
    s.rval() = jsret;
    SE_HOLD_RETURN_VALUE(cobj->valueType, s.thisObject(), s.rval());
    return true;
}
SE_BIND_PROP_GET(js_xr_XRConfigValue_get_valueType)

static bool js_xr_XRConfigValue_set_valueType(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    auto* cobj = SE_THIS_OBJECT<cc::xr::XRConfigValue>(s);
    SE_PRECONDITION2(cobj, false, "Invalid Native Object");

    CC_UNUSED bool ok = true;
    ok &= sevalue_to_native(args[0], &cobj->valueType, s.thisObject());
    SE_PRECONDITION2(ok, false, "Error processing new value");
    return true;
}
SE_BIND_PROP_SET(js_xr_XRConfigValue_set_valueType)


template<>
bool sevalue_to_native(const se::Value &from, cc::xr::XRConfigValue * to, se::Object *ctx)
{
    assert(from.isObject());
    se::Object *json = from.toObject();
    auto* data = reinterpret_cast<cc::xr::XRConfigValue*>(json->getPrivateData());
    if (data) {
        *to = *data;
        return true;
    }
    se::Value field;
    bool ok = true;
    json->getProperty("vInt", &field, true);
    if(!field.isNullOrUndefined()) {
        ok &= sevalue_to_native(field, &(to->vInt), ctx);
    }
    json->getProperty("vFloat", &field, true);
    if(!field.isNullOrUndefined()) {
        ok &= sevalue_to_native(field, &(to->vFloat), ctx);
    }
    json->getProperty("vBool", &field, true);
    if(!field.isNullOrUndefined()) {
        ok &= sevalue_to_native(field, &(to->vBool), ctx);
    }
    json->getProperty("vPtr", &field, true);
    if(!field.isNullOrUndefined()) {
        ok &= sevalue_to_native(field, &(to->vPtr), ctx);
    }
    json->getProperty("vString", &field, true);
    if(!field.isNullOrUndefined()) {
        ok &= sevalue_to_native(field, &(to->vString), ctx);
    }
    json->getProperty("valueType", &field, true);
    if(!field.isNullOrUndefined()) {
        ok &= sevalue_to_native(field, &(to->valueType), ctx);
    }
    return ok;
}

SE_DECLARE_FINALIZE_FUNC(js_cc_xr_XRConfigValue_finalize)

static bool js_xr_XRConfigValue_constructor(se::State& s) // NOLINT(readability-identifier-naming)
{
    CC_UNUSED bool ok = true;
    const auto& args = s.args();
    size_t argc = args.size();

    if(argc == 0)
    {
        auto *ptr = JSB_MAKE_PRIVATE_OBJECT(cc::xr::XRConfigValue);
        s.thisObject()->setPrivateObject(ptr);
        return true;
    }

    if(argc == 1 && args[0].isObject())
    {
        se::Object *json = args[0].toObject();
        se::Value field;
        auto *ptr = JSB_MAKE_PRIVATE_OBJECT(cc::xr::XRConfigValue);
        auto cobj = ptr->get<cc::xr::XRConfigValue>();
        ok &= sevalue_to_native(args[0], cobj, s.thisObject());
        if(!ok) {
            delete ptr;
            SE_REPORT_ERROR("argument convertion error");
            return false;
        }
        s.thisObject()->setPrivateObject(ptr);
        return true;
    }
    auto *ptr = JSB_MAKE_PRIVATE_OBJECT(cc::xr::XRConfigValue);
    auto cobj = ptr->get<cc::xr::XRConfigValue>();
    if (argc > 0 && !args[0].isUndefined()) {
        ok &= sevalue_to_native(args[0], &(cobj->vInt), nullptr);
    }
    if (argc > 1 && !args[1].isUndefined()) {
        ok &= sevalue_to_native(args[1], &(cobj->vFloat), nullptr);
    }
    if (argc > 2 && !args[2].isUndefined()) {
        ok &= sevalue_to_native(args[2], &(cobj->vBool), nullptr);
    }
    if (argc > 3 && !args[3].isUndefined()) {
        ok &= sevalue_to_native(args[3], &(cobj->vPtr), nullptr);
    }
    if (argc > 4 && !args[4].isUndefined()) {
        ok &= sevalue_to_native(args[4], &(cobj->vString), nullptr);
    }
    if (argc > 5 && !args[5].isUndefined()) {
        ok &= sevalue_to_native(args[5], &(cobj->valueType), nullptr);
    }

    if(!ok) {
        delete ptr;
        SE_REPORT_ERROR("Argument convertion error");
        return false;
    }
    s.thisObject()->setPrivateObject(ptr);
    return true;
}
SE_BIND_CTOR(js_xr_XRConfigValue_constructor, __jsb_cc_xr_XRConfigValue_class, js_cc_xr_XRConfigValue_finalize)

static bool js_cc_xr_XRConfigValue_finalize(se::State& s) // NOLINT(readability-identifier-naming)
{
    return true;
}
SE_BIND_FINALIZE_FUNC(js_cc_xr_XRConfigValue_finalize)

bool js_register_xr_XRConfigValue(se::Object* obj) // NOLINT(readability-identifier-naming)
{
    auto* cls = se::Class::create("XRConfigValue", obj, nullptr, _SE(js_xr_XRConfigValue_constructor));

#if CC_DEBUG
    cls->defineStaticProperty("isJSBClass", _SE(js_xr_getter_return_true), nullptr);
#endif
    cls->defineProperty("vInt", _SE(js_xr_XRConfigValue_get_vInt), _SE(js_xr_XRConfigValue_set_vInt));
    cls->defineProperty("vFloat", _SE(js_xr_XRConfigValue_get_vFloat), _SE(js_xr_XRConfigValue_set_vFloat));
    cls->defineProperty("vBool", _SE(js_xr_XRConfigValue_get_vBool), _SE(js_xr_XRConfigValue_set_vBool));
    cls->defineProperty("vPtr", _SE(js_xr_XRConfigValue_get_vPtr), _SE(js_xr_XRConfigValue_set_vPtr));
    cls->defineProperty("vString", _SE(js_xr_XRConfigValue_get_vString), _SE(js_xr_XRConfigValue_set_vString));
    cls->defineProperty("valueType", _SE(js_xr_XRConfigValue_get_valueType), _SE(js_xr_XRConfigValue_set_valueType));
    cls->defineFunction("getBool", _SE(js_xr_XRConfigValue_getBool));
    cls->defineFunction("getFloat", _SE(js_xr_XRConfigValue_getFloat));
    cls->defineFunction("getInt", _SE(js_xr_XRConfigValue_getInt));
    cls->defineFunction("getPointer", _SE(js_xr_XRConfigValue_getPointer));
    cls->defineFunction("getString", _SE(js_xr_XRConfigValue_getString));
    cls->defineFunction("isBool", _SE(js_xr_XRConfigValue_isBool));
    cls->defineFunction("isFloat", _SE(js_xr_XRConfigValue_isFloat));
    cls->defineFunction("isInt", _SE(js_xr_XRConfigValue_isInt));
    cls->defineFunction("isPointer", _SE(js_xr_XRConfigValue_isPointer));
    cls->defineFunction("isString", _SE(js_xr_XRConfigValue_isString));
    cls->defineFinalizeFunction(_SE(js_cc_xr_XRConfigValue_finalize));
    cls->install();
    JSBClassType::registerClass<cc::xr::XRConfigValue>(cls);

    __jsb_cc_xr_XRConfigValue_proto = cls->getProto();
    __jsb_cc_xr_XRConfigValue_class = cls;


    se::ScriptEngine::getInstance()->clearException();
    return true;
}
se::Object* __jsb_cc_xr_XrEntry_proto = nullptr; // NOLINT
se::Class* __jsb_cc_xr_XrEntry_class = nullptr;  // NOLINT

static bool js_xr_XrEntry_acquireXrSwapchain(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<unsigned int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        const cc::xr::XRSwapchain& result = cobj->acquireXrSwapchain(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_acquireXrSwapchain)

static bool js_xr_XrEntry_computeViewProjection(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
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
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        std::vector<float> result = cobj->computeViewProjection(arg0.value(), arg1.value(), arg2.value(), arg3.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<const char*, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->frameStart();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        std::vector<cc::xr::XRSwapchain>& result = cobj->getCocosXrSwapchains();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getCocosXrSwapchains)

static bool js_xr_XrEntry_getCurrentXrSwapchain(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        const cc::xr::XRSwapchain result = cobj->getCurrentXrSwapchain();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getCurrentXrSwapchain)

static bool js_xr_XrEntry_getHMDViewPosition(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<unsigned int, false> arg0 = {};
        HolderType<int, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        std::vector<float> result = cobj->getHMDViewPosition(arg0.value(), arg1.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getHMDViewPosition)

static bool js_xr_XrEntry_getSwapchainImageIndex(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        unsigned int result = cobj->getSwapchainImageIndex();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getSwapchainImageIndex)

static bool js_xr_XrEntry_getXRBoolConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        bool result = cobj->getXRBoolConfig(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getXRBoolConfig)

static bool js_xr_XrEntry_getXRConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<cc::xr::XRConfigKey, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cc::xr::XRConfigValue result = cobj->getXRConfig(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getXRConfig)

static bool js_xr_XrEntry_getXRFloatConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        float result = cobj->getXRFloatConfig(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getXRFloatConfig)

static bool js_xr_XrEntry_getXRIntConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        int result = cobj->getXRIntConfig(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getXRIntConfig)

static bool js_xr_XrEntry_getXRPointerConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        void* result = cobj->getXRPointerConfig(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getXRPointerConfig)

static bool js_xr_XrEntry_getXRStringConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        std::string result = cobj->getXRStringConfig(arg0.value());
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        SE_HOLD_RETURN_VALUE(result, s.thisObject(), s.rval());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_getXRStringConfig)

static bool js_xr_XrEntry_getXrViewCount(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        int result = cobj->getXrViewCount();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<void*, false> arg0 = {};
        HolderType<void*, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isCreatedXrInstance();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isRenderAllowable();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->isSessionRunning();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->platformLoopEnd();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        bool result = cobj->platformLoopStart();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
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

static bool js_xr_XrEntry_setBaseSpaceType(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setBaseSpaceType(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setBaseSpaceType)

static bool js_xr_XrEntry_setIPDOffset(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<float, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<float, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setRenderingScale(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setRenderingScale)

static bool js_xr_XrEntry_setXRBoolConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<int, false> arg0 = {};
        HolderType<bool, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setXRBoolConfig(arg0.value(), arg1.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setXRBoolConfig)

static bool js_xr_XrEntry_setXRConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<cc::xr::XRConfigKey, false> arg0 = {};
        HolderType<cc::xr::XRConfigValue, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setXRConfig(arg0.value(), arg1.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setXRConfig)

static bool js_xr_XrEntry_setXRConfigCallback(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<std::function<void (cc::xr::XRConfigKey, cc::xr::XRConfigValue)>, true> arg0 = {};
        do {
            if (args[0].isObject() && args[0].toObject()->isFunction())
            {
                se::Value jsThis(s.thisObject());
                se::Value jsFunc(args[0]);
                jsThis.toObject()->attachObject(jsFunc.toObject());
                auto * thisObj = s.thisObject();
                auto lambda = [=](cc::xr::XRConfigKey larg0, cc::xr::XRConfigValue larg1) -> void {
                    se::ScriptEngine::getInstance()->clearException();
                    se::AutoHandleScope hs;
        
                    CC_UNUSED bool ok = true;
                    se::ValueArray args;
                    args.resize(2);
                    ok &= nativevalue_to_se(larg0, args[0], nullptr /*ctx*/);
                    ok &= nativevalue_to_se(larg1, args[1], nullptr /*ctx*/);
                    se::Value rval;
                    se::Object* funcObj = jsFunc.toObject();
                    bool succeed = funcObj->call(args, thisObj, &rval);
                    if (!succeed) {
                        se::ScriptEngine::getInstance()->clearException();
                    }
                };
                arg0.data = lambda;
            }
            else
            {
                arg0.data = nullptr;
            }
        } while(false)
        ;
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setXRConfigCallback(arg0.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setXRConfigCallback)

static bool js_xr_XrEntry_setXRFloatConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<int, false> arg0 = {};
        HolderType<float, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setXRFloatConfig(arg0.value(), arg1.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setXRFloatConfig)

static bool js_xr_XrEntry_setXRIntConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<int, false> arg0 = {};
        HolderType<int, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setXRIntConfig(arg0.value(), arg1.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setXRIntConfig)

static bool js_xr_XrEntry_setXRPointerConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<int, false> arg0 = {};
        HolderType<void*, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setXRPointerConfig(arg0.value(), arg1.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setXRPointerConfig)

static bool js_xr_XrEntry_setXRStringConfig(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<int, false> arg0 = {};
        HolderType<std::string, false> arg1 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "Error processing arguments");
        cobj->setXRStringConfig(arg0.value(), arg1.value());
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_setXRStringConfig)

static bool js_xr_XrEntry_waitFrame(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::xr::XrEntry>(s);
    // SE_PRECONDITION2(cobj, false, "Invalid Native Object");
    if (nullptr == cobj) return true;
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->waitFrame();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_waitFrame)

static bool js_xr_XrEntry_destroyInstance_static(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cc::xr::XrEntry::destroyInstance();
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_xr_XrEntry_destroyInstance_static)

static bool js_xr_XrEntry_getInstance_static(se::State& s) // NOLINT(readability-identifier-naming)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        cc::xr::XrEntry* result = cc::xr::XrEntry::getInstance();
        ok &= nativevalue_to_se(result, s.rval(), nullptr /*ctx*/);
        SE_PRECONDITION2(ok, false, "Error processing arguments");
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
    cls->defineFunction("acquireXrSwapchain", _SE(js_xr_XrEntry_acquireXrSwapchain));
    cls->defineFunction("computeViewProjection", _SE(js_xr_XrEntry_computeViewProjection));
    cls->defineFunction("createXrInstance", _SE(js_xr_XrEntry_createXrInstance));
    cls->defineFunction("destroyXrInstance", _SE(js_xr_XrEntry_destroyXrInstance));
    cls->defineFunction("frameEnd", _SE(js_xr_XrEntry_frameEnd));
    cls->defineFunction("frameStart", _SE(js_xr_XrEntry_frameStart));
    cls->defineFunction("getCocosXrSwapchains", _SE(js_xr_XrEntry_getCocosXrSwapchains));
    cls->defineFunction("getCurrentXrSwapchain", _SE(js_xr_XrEntry_getCurrentXrSwapchain));
    cls->defineFunction("getHMDViewPosition", _SE(js_xr_XrEntry_getHMDViewPosition));
    cls->defineFunction("getSwapchainImageIndex", _SE(js_xr_XrEntry_getSwapchainImageIndex));
    cls->defineFunction("getXRBoolConfig", _SE(js_xr_XrEntry_getXRBoolConfig));
    cls->defineFunction("getXRConfig", _SE(js_xr_XrEntry_getXRConfig));
    cls->defineFunction("getXRFloatConfig", _SE(js_xr_XrEntry_getXRFloatConfig));
    cls->defineFunction("getXRIntConfig", _SE(js_xr_XrEntry_getXRIntConfig));
    cls->defineFunction("getXRPointerConfig", _SE(js_xr_XrEntry_getXRPointerConfig));
    cls->defineFunction("getXRStringConfig", _SE(js_xr_XrEntry_getXRStringConfig));
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
    cls->defineFunction("setBaseSpaceType", _SE(js_xr_XrEntry_setBaseSpaceType));
    cls->defineFunction("setIPDOffset", _SE(js_xr_XrEntry_setIPDOffset));
    cls->defineFunction("setMultisamplesRTT", _SE(js_xr_XrEntry_setMultisamplesRTT));
    cls->defineFunction("setRenderingScale", _SE(js_xr_XrEntry_setRenderingScale));
    cls->defineFunction("setXRBoolConfig", _SE(js_xr_XrEntry_setXRBoolConfig));
    cls->defineFunction("setXRConfig", _SE(js_xr_XrEntry_setXRConfig));
    cls->defineFunction("setXRConfigCallback", _SE(js_xr_XrEntry_setXRConfigCallback));
    cls->defineFunction("setXRFloatConfig", _SE(js_xr_XrEntry_setXRFloatConfig));
    cls->defineFunction("setXRIntConfig", _SE(js_xr_XrEntry_setXRIntConfig));
    cls->defineFunction("setXRPointerConfig", _SE(js_xr_XrEntry_setXRPointerConfig));
    cls->defineFunction("setXRStringConfig", _SE(js_xr_XrEntry_setXRStringConfig));
    cls->defineFunction("waitFrame", _SE(js_xr_XrEntry_waitFrame));
    cls->defineStaticFunction("destroyInstance", _SE(js_xr_XrEntry_destroyInstance_static));
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

    js_register_xr_XRConfigValue(ns);
    js_register_xr_XrEntry(ns);
    return true;
}

#endif //#if (CC_USE_XR > 0)
// clang-format on