/****************************************************************************
 Copyright (c) 2021 Xiamen Yaji Software Co., Ltd.

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

#include "jsb_ar_manual.h"

#if USE_AR_MODULE > 0

#include "bindings/manual/jsb_conversions.h"
#include "bindings/manual/jsb_global.h"
#include "ar/ARModule.h"
#include "bindings/auto/jsb_ar_auto.h"

static bool js_ar_ARModule_config(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_config : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_config : Error processing arguments");

        cobj->config(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_config)

static bool js_ar_ARModule_getSupportMask(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getSupportMask : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        int result = cobj->getSupportMask();
        s.rval().setInt32(result);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getSupportMask)

static bool js_ar_ARModule_getCameraPose(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getCameraPose : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getCameraPose();
        se::Object* pose = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 28);
        s.rval().setObject(pose);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getCameraPose)

static bool js_ar_ARModule_getCameraViewMatrix(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getCameraViewMatrix : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getCameraViewMatrix();
        se::Object* viewMatrix = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 64);
        s.rval().setObject(viewMatrix);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getCameraViewMatrix)

static bool js_ar_ARModule_getCameraProjectionMatrix(se::State& s) // NOLINT(readability-identifier-naming)
{
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getCameraProjectionMatrix : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getCameraProjectionMatrix();
        se::Object* projMatrix = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 64);
        s.rval().setObject(projMatrix);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getCameraProjectionMatrix)

static bool js_ar_ARModule_enablePlane(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_enablePlane : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_enablePlane : Error processing arguments");

        cobj->enablePlane(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enablePlane)

static bool js_ar_ARModule_setPlaneDetectionMode(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_setPlaneDetectionMode : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_setPlaneDetectionMode : Error processing arguments");

        cobj->setPlaneDetectionMode(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_setPlaneDetectionMode)

static bool js_ar_ARModule_setPlaneMaxTrackingNumber(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_setPlaneMaxTrackingNumber : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_setPlaneMaxTrackingNumber : Error processing arguments");

        cobj->setPlaneMaxTrackingNumber(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_setPlaneMaxTrackingNumber)

static bool js_ar_ARModule_updatePlanesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_updatePlanesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        cobj->updatePlanesInfo();
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_updatePlanesInfo)

static bool js_ar_ARModule_getAddedPlanesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getAddedPlanesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getAddedPlanesInfo();
        int len = cobj->getInfoLength();
        //se::Object* planesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * 5 * 12);
        se::Object* planesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(planesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getAddedPlanesInfo)

static bool js_ar_ARModule_getRemovedPlanesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getRemovedPlanesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        int* buffer = cobj->getRemovedPlanesInfo();
        int len = cobj->getInfoLength();
        se::Object* planesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::UINT32, buffer, 4 * len);
        s.rval().setObject(planesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getRemovedPlanesInfo)

static bool js_ar_ARModule_getUpdatedPlanesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getUpdatedPlanesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getUpdatedPlanesInfo();
        int len = cobj->getInfoLength();
        //int count = cobj->getAddedPlanesCount();
        se::Object* planesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(planesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getUpdatedPlanesInfo)

static bool js_ar_ARModule_getAddedPlanesCount(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getAddedPlanesCount : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        int result = cobj->getAddedPlanesCount();
        s.rval().setInt32(result);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getAddedPlanesCount)

static bool js_ar_ARModule_getRemovedPlanesCount(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getRemovedPlanesCount : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        int result = cobj->getRemovedPlanesCount();
        s.rval().setInt32(result);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getRemovedPlanesCount)

static bool js_ar_ARModule_getUpdatedPlanesCount(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getUpdatedPlanesCount : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        int result = cobj->getUpdatedPlanesCount();
        s.rval().setInt32(result);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getUpdatedPlanesCount)

static bool js_ar_ARModule_tryHitAttachAnchor(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_tryHitAttachAnchor : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_tryHitAttachAnchor : Error processing arguments");

        int result = cobj->tryHitAttachAnchor(arg0.value());
        s.rval().setInt32(result);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_tryHitAttachAnchor)

static bool js_ar_ARModule_getAnchorPose(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getAnchorPose : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_getAnchorPose : Error processing arguments");

        float* buffer = cobj->getAnchorPose(arg0.value());
        se::Object* planesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * 7);
        s.rval().setObject(planesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getAnchorPose)

static bool js_ar_ARModule_tryHitTest(se::State& s) { // NOLINT(readability-identifier-naming)
    auto* cobj = SE_THIS_OBJECT<cc::ar::ARModule>(s);
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_tryHitTest : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 2) {
        HolderType<float, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_tryHitTest : Error processing arguments");
        HolderType<float, false> arg1 = {};
        ok &= sevalue_to_native(args[1], &arg1, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_tryHitTest : Error processing arguments");

        bool result = cobj->tryHitTest(arg0.value(), arg1.value());
        s.rval().setBoolean(result);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_tryHitTest) // NOLINT(readability-identifier-naming)

static bool js_ar_ARModule_getHitResult(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getHitResult : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getHitResult();
        se::Object* hitPose = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 28);
        s.rval().setObject(hitPose);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getHitResult)

static bool js_ar_ARModule_getHitId(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getHitId : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        int result = cobj->getHitId();
        s.rval().setInt32(result);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getHitId)

static bool js_ar_ARModule_enableSceneMesh(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_enableSceneMesh : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_enableSceneMesh : Error processing arguments");

        cobj->enableSceneMesh(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enableSceneMesh)

static bool js_ar_ARModule_getAddedSceneMesh(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getAddedSceneMesh : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getAddedSceneMesh();
        int len = cobj->getInfoLength();
        se::Object* planesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(planesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getAddedSceneMesh)

static bool js_ar_ARModule_getUpdatedSceneMesh(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getUpdatedSceneMesh : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getUpdatedSceneMesh();
        int len = cobj->getInfoLength();
        se::Object* planesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(planesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getUpdatedSceneMesh)

static bool js_ar_ARModule_getRemovedSceneMesh(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getRemovedSceneMesh : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        int* buffer = cobj->getRemovedSceneMesh();
        int len = cobj->getInfoLength();
        se::Object* meshesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::UINT32, buffer, 4 * len);
        s.rval().setObject(meshesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getRemovedSceneMesh)

static bool js_ar_ARModule_requireSceneMesh(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_requireSceneMesh : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        int* buffer = cobj->requireSceneMesh();
        int len = cobj->getInfoLength();
        se::Object* meshesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::UINT32, buffer, 4 * len);
        s.rval().setObject(meshesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_requireSceneMesh)

static bool js_ar_ARModule_endRequireSceneMesh(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_endRequireSceneMesh : Invalid Native Object");

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

static bool js_ar_ARModule_getSceneMeshVertices(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getSceneMeshVertices : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_getSceneMeshVertices : Error processing arguments");

        float* buffer = cobj->getSceneMeshVertices(arg0.value());
        int len = cobj->getInfoLength();
        se::Object* verticesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(verticesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getSceneMeshVertices)

static bool js_ar_ARModule_getSceneMeshTriangleIndices(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getSceneMeshTriangleIndices : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_getSceneMeshTriangleIndices : Error processing arguments");

        int* buffer = cobj->getSceneMeshTriangleIndices(arg0.value());
        int len = cobj->getInfoLength();
        se::Object* indicesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::UINT32, buffer, 4 * len);
        s.rval().setObject(indicesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getSceneMeshTriangleIndices)

static bool js_ar_ARModule_enableImageTracking(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_enableImageTracking : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_enableImageTracking : Error processing arguments");

        cobj->enableImageTracking(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enableImageTracking)

static bool js_ar_ARModule_addImageToLib(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_addImageToLib : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<std::string, true> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_addImageToLib : Error processing arguments");

        cobj->addImageToLib(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_addImageToLib)

static bool js_ar_ARModule_setMaxTrackingNumber(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_setMaxTrackingNumber : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_setMaxTrackingNumber : Error processing arguments");

        cobj->setMaxTrackingNumber(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_setMaxTrackingNumber)

static bool js_ar_ARModule_getAddedImagesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getAddedImagesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getAddedImagesInfo();
        int len = cobj->getInfoLength();
        se::Object* imagesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(imagesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getAddedImagesInfo)

static bool js_ar_ARModule_getUpdatedImagesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getUpdatedImagesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getUpdatedImagesInfo();
        int len = cobj->getInfoLength();
        se::Object* imagesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(imagesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getUpdatedImagesInfo)

static bool js_ar_ARModule_getRemovedImagesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getRemovedImagesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getRemovedImagesInfo();
        int len = cobj->getInfoLength();
        se::Object* imagesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(imagesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getRemovedImagesInfo)

static bool js_ar_ARModule_enableObjectTracking(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_enableObjectTracking : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_enableObjectTracking : Error processing arguments");

        cobj->enableObjectTracking(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enableObjectTracking)

static bool js_ar_ARModule_addObjectToLib(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_addObjectToLib : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<std::string, true> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_addObjectToLib : Error processing arguments");

        cobj->addObjectToLib(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_addObjectToLib)

static bool js_ar_ARModule_getAddedObjectsInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getAddedObjectsInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getAddedObjectsInfo();
        int len = cobj->getInfoLength();
        se::Object* info = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(info);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getAddedObjectsInfo)

static bool js_ar_ARModule_getUpdatedObjectsInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getUpdatedObjectsInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getUpdatedObjectsInfo();
        int len = cobj->getInfoLength();
        se::Object* info = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(info);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getUpdatedObjectsInfo)

static bool js_ar_ARModule_getRemovedObjectsInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getRemovedObjectsInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getRemovedObjectsInfo();
        int len = cobj->getInfoLength();
        se::Object* info = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(info);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getRemovedObjectsInfo)

static bool js_ar_ARModule_enableFaceTracking(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_enableFaceTracking : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<bool, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_enableFaceTracking : Error processing arguments");

        cobj->enableFaceTracking(arg0.value());
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_enableFaceTracking)

static bool js_ar_ARModule_getAddedFacesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getAddedFacesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getAddedFacesInfo();
        int len = cobj->getInfoLength();
        se::Object* info = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(info);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getAddedFacesInfo)

static bool js_ar_ARModule_getUpdatedFacesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getUpdatedFacesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getUpdatedFacesInfo();
        int len = cobj->getInfoLength();
        se::Object* info = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(info);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getUpdatedFacesInfo)

static bool js_ar_ARModule_getRemovedFacesInfo(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getRemovedFacesInfo : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    if (argc == 0) {
        float* buffer = cobj->getRemovedFacesInfo();
        int len = cobj->getInfoLength();
        se::Object* info = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(info);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getRemovedFacesInfo)

static bool js_ar_ARModule_getFaceBlendShapesOf(se::State& s)
{
    cc::ar::ARModule* cobj = (cc::ar::ARModule*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_ar_ARModule_getFaceBlendShapesOf : Invalid Native Object");

    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 1) {
        HolderType<int, false> arg0 = {};
        ok &= sevalue_to_native(args[0], &arg0, s.thisObject());
        SE_PRECONDITION2(ok, false, "js_ar_ARModule_getFaceBlendShapesOf : Error processing arguments");

        float* buffer = cobj->getFaceBlendShapesOf(arg0.value());
        int len = cobj->getInfoLength();
        se::Object* verticesInfo = se::Object::createTypedArray(se::Object::TypedArrayType::FLOAT32, buffer, 4 * len);
        s.rval().setObject(verticesInfo);
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_ar_ARModule_getFaceBlendShapesOf)

bool register_all_ar_manual(se::Object *obj) {
    __jsb_cc_ar_ARModule_proto->defineFunction("config", _SE(js_ar_ARModule_config));
    __jsb_cc_ar_ARModule_proto->defineFunction("getSupportMask", _SE(js_ar_ARModule_getSupportMask));
    __jsb_cc_ar_ARModule_proto->defineFunction("getCameraPose", _SE(js_ar_ARModule_getCameraPose));
    __jsb_cc_ar_ARModule_proto->defineFunction("getCameraViewMatrix", _SE(js_ar_ARModule_getCameraViewMatrix));
    __jsb_cc_ar_ARModule_proto->defineFunction("getCameraProjectionMatrix", _SE(js_ar_ARModule_getCameraProjectionMatrix));

    __jsb_cc_ar_ARModule_proto->defineFunction("enablePlane", _SE(js_ar_ARModule_enablePlane));
    __jsb_cc_ar_ARModule_proto->defineFunction("setPlaneDetectionMode", _SE(js_ar_ARModule_setPlaneDetectionMode));
    __jsb_cc_ar_ARModule_proto->defineFunction("setPlaneMaxTrackingNumber", _SE(js_ar_ARModule_setPlaneMaxTrackingNumber));
    __jsb_cc_ar_ARModule_proto->defineFunction("updatePlanesInfo", _SE(js_ar_ARModule_updatePlanesInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getAddedPlanesInfo", _SE(js_ar_ARModule_getAddedPlanesInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getRemovedPlanesInfo", _SE(js_ar_ARModule_getRemovedPlanesInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getUpdatedPlanesInfo", _SE(js_ar_ARModule_getUpdatedPlanesInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getAddedPlanesCount", _SE(js_ar_ARModule_getAddedPlanesCount));
    __jsb_cc_ar_ARModule_proto->defineFunction("getRemovedPlanesCount", _SE(js_ar_ARModule_getRemovedPlanesCount));
    __jsb_cc_ar_ARModule_proto->defineFunction("getUpdatedPlanesCount", _SE(js_ar_ARModule_getUpdatedPlanesCount));

    __jsb_cc_ar_ARModule_proto->defineFunction("tryHitAttachAnchor", _SE(js_ar_ARModule_tryHitAttachAnchor));
    __jsb_cc_ar_ARModule_proto->defineFunction("getAnchorPose", _SE(js_ar_ARModule_getAnchorPose));
    __jsb_cc_ar_ARModule_proto->defineFunction("tryHitTest", _SE(js_ar_ARModule_tryHitTest));
    __jsb_cc_ar_ARModule_proto->defineFunction("getHitResult", _SE(js_ar_ARModule_getHitResult));
    __jsb_cc_ar_ARModule_proto->defineFunction("getHitId", _SE(js_ar_ARModule_getHitId));

    __jsb_cc_ar_ARModule_proto->defineFunction("enableSceneMesh", _SE(js_ar_ARModule_enableSceneMesh));
    __jsb_cc_ar_ARModule_proto->defineFunction("getAddedSceneMesh", _SE(js_ar_ARModule_getAddedSceneMesh));
    __jsb_cc_ar_ARModule_proto->defineFunction("getUpdatedSceneMesh", _SE(js_ar_ARModule_getUpdatedSceneMesh));
    __jsb_cc_ar_ARModule_proto->defineFunction("getRemovedSceneMesh", _SE(js_ar_ARModule_getRemovedSceneMesh));
    __jsb_cc_ar_ARModule_proto->defineFunction("requireSceneMesh", _SE(js_ar_ARModule_requireSceneMesh));
    __jsb_cc_ar_ARModule_proto->defineFunction("endRequireSceneMesh", _SE(js_ar_ARModule_endRequireSceneMesh));
    __jsb_cc_ar_ARModule_proto->defineFunction("getSceneMeshVertices", _SE(js_ar_ARModule_getSceneMeshVertices));
    __jsb_cc_ar_ARModule_proto->defineFunction("getSceneMeshTriangleIndices", _SE(js_ar_ARModule_getSceneMeshTriangleIndices));

    __jsb_cc_ar_ARModule_proto->defineFunction("enableImageTracking", _SE(js_ar_ARModule_enableImageTracking));
    __jsb_cc_ar_ARModule_proto->defineFunction("addImageToLib", _SE(js_ar_ARModule_addImageToLib));
    __jsb_cc_ar_ARModule_proto->defineFunction("setMaxTrackingNumber", _SE(js_ar_ARModule_setMaxTrackingNumber));
    __jsb_cc_ar_ARModule_proto->defineFunction("getAddedImagesInfo", _SE(js_ar_ARModule_getAddedImagesInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getUpdatedImagesInfo", _SE(js_ar_ARModule_getUpdatedImagesInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getRemovedImagesInfo", _SE(js_ar_ARModule_getRemovedImagesInfo));

    __jsb_cc_ar_ARModule_proto->defineFunction("enableObjectTracking", _SE(js_ar_ARModule_enableObjectTracking));
    __jsb_cc_ar_ARModule_proto->defineFunction("addObjectToLib", _SE(js_ar_ARModule_addObjectToLib));
    __jsb_cc_ar_ARModule_proto->defineFunction("getAddedObjectsInfo", _SE(js_ar_ARModule_getAddedObjectsInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getUpdatedObjectsInfo", _SE(js_ar_ARModule_getUpdatedObjectsInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getRemovedObjectsInfo", _SE(js_ar_ARModule_getRemovedObjectsInfo));

    __jsb_cc_ar_ARModule_proto->defineFunction("enableFaceTracking", _SE(js_ar_ARModule_enableFaceTracking));
    __jsb_cc_ar_ARModule_proto->defineFunction("getAddedFacesInfo", _SE(js_ar_ARModule_getAddedFacesInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getUpdatedFacesInfo", _SE(js_ar_ARModule_getUpdatedFacesInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getRemovedFacesInfo", _SE(js_ar_ARModule_getRemovedFacesInfo));
    __jsb_cc_ar_ARModule_proto->defineFunction("getFaceBlendShapesOf", _SE(js_ar_ARModule_getFaceBlendShapesOf));

    return true;
}

#endif //#if USE_AR_MODULE > 0
