const ARModule = cc.ARModule;

const JSB_ARModule = jsb.ARModule;

cc.ARModuleHelper.getARConstructor = function () {
    return ARModuleNative;
}

class ARModuleNative extends ARModule {
    constructor() {
        super();
        this._native = new JSB_ARModule();
    }

    config(featureMask) {
        this._native.config(featureMask);
    }

    getSupportMask() {
        return this._native.getSupportMask();
    }

    start() {
        this._native.start();
    }

    onResume() {
        this._native.onResume();
    }

    onPause() {
        this._native.onPause();
    }

    update() {
        this._native.update();
    }

    setCameraTextureName (id) {
        this._native.setCameraTextureName(id);
    }

    getCameraPose () {
        return this._native.getCameraPose();
    }

    getCameraViewMatrix () {
        return this._native.getCameraViewMatrix();
    }

    getCameraProjectionMatrix () {
        return this._native.getCameraProjectionMatrix();
    }

    getMainLightIntensity () {
        return this._native.getMainLightIntensity();
    }

    getMainLightColor () {
        return this._native.getMainLightColor();
    }


    tryHitAttachAnchor (planeIndex) {
        return this._native.tryHitAttachAnchor(planeIndex);
    }

    getAnchorPose (anchorIndex) {
        return this._native.getAnchorPose(anchorIndex);
    }

    tryHitTest (px, py) {
        return this._native.tryHitTest(px, py);
    }

    getHitResult () {
        return this._native.getHitResult();
    }

    getHitId () {
        return this._native.getHitId();
    }


    enablePlane (enable) {
        this._native.enablePlane(enable);
    }

    setPlaneDetectionMode (mode) {
        this._native.setPlaneDetectionMode(mode);
    }

    setPlaneMaxTrackingNumber (count) {
        this._native.setPlaneMaxTrackingNumber(count);
    }

    getAddedPlanesInfo () {
        //return this._native.getAddedPlanesInfo();
        return this._native.getAdded();
    }

    getUpdatedPlanesInfo () {
        return this._native.getUpdatedPlanesInfo();
    }

    getRemovedPlanesInfo () {
        return this._native.getRemovedPlanesInfo();
    }
    

    enableSceneMesh (enable) {
        this._native.enableSceneMesh(enable);
    }
    getAddedSceneMesh() {
        return this._native.getAddedSceneMesh();
    }
    getUpdatedSceneMesh() {
        return this._native.getUpdatedSceneMesh();
    }
    getRemovedSceneMesh() {
        return this._native.getRemovedSceneMesh();
    }
    requireSceneMesh() {
        return this._native.requireSceneMesh();
    }
    getSceneMeshVertices(meshRef) {
        return this._native.getSceneMeshVertices(meshRef);
    }
    getSceneMeshTriangleIndices(meshRef) {
        return this._native.getSceneMeshTriangleIndices(meshRef);
    }
    endRequireSceneMesh() {
        this._native.endRequireSceneMesh();
    }


    enableImageTracking(enable) {
        this._native.enableImageTracking(enable);
    }
    addImageToLib(imageName) {
        this._native.addImageToLib(imageName);
    }
    setMaxTrackingNumber(number) {
        this._native.setImageMaxTrackingNumber(number);
    }
    getAddedImagesInfo() {
        return this._native.getAddedImagesInfo();
    }
    getUpdatedImagesInfo() {
        return this._native.getUpdatedImagesInfo();
    }
    getRemovedImagesInfo() {
        return this._native.getRemovedImagesInfo();
    }


    enableObjectTracking(enable) {
        this._native.enableObjectTracking(enable);
    }
    addObjectToLib(name) {
        this._native.addObjectToLib(name);
    }
    getAddedObjectsInfo() {
        return this._native.getAddedObjectsInfo();
    }
    getUpdatedObjectsInfo() {
        return this._native.getUpdatedObjectsInfo();
    }
    getRemovedObjectsInfo() {
        return this._native.getRemovedObjectsInfo();
    }


    enableFaceTracking(enable) {
        this._native.enableFaceTracking(enable);
    }
    getAddedFacesInfo() {
        return this._native.getAddedFacesInfo();
    }
    getUpdatedFacesInfo() {
        return this._native.getUpdatedFacesInfo();
    }
    getRemovedFacesInfo() {
        return this._native.getRemovedFacesInfo();
    }
    getFaceBlendShapesOf(faceRef) {
        return this._native.getFaceBlendShapesOf(faceRef);
    }
}
