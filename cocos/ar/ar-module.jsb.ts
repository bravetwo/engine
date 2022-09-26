/*
 Copyright (c) 2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

declare const jsb: any;

import { Quat, Vec3 , Node} from '../core';
import { ARFeature, ARPose, FeatureType, ARFeatureData} from './ar-feature-base';
import * as features from './ar-features';
import { IARModule } from './ar-module-base';

export class ARModuleX extends IARModule {
    public static readonly FEATURE_PREFIX = "ARFeature";

    protected _nativeObj;

    private _cameraId: string | null = null;
    get CameraId () {
        return this._cameraId;
    }
    set CameraId (val) {
        this._nativeObj.setCameraId(val);
        this._cameraId = val;
    }

    private _configMask = FeatureType.None;
    private _featuresMap = new Map<string, ARFeature>();
    private anchorsMap = new Map<number, Array<Node>>();
    private static _instance : ARModuleX | null = null;
    public static getInstance() : ARModuleX | null {
        return this._instance;
    }

    // load
    public constructor(featuresDataset : ARFeatureData[]) {
        super();
        this._nativeObj = new jsb.ARModule();

        if(!this._nativeObj) {
            console.error("... armodule init in native failed! ...");
            return;
        }

        // create features from json
        // assembly feature config mask
        this.createFeatures(featuresDataset);
        this._nativeObj.config(this._configMask);

        // init native features setting feature configs
        // after mask config and before native session start
        this.initFeatures();
        this._nativeObj.start();

        // check for feature support, eliminate unsupported features
        this.checkFeaturesSupport(this._nativeObj.getSupportMask());

        ARModuleX._instance = this;
    }

    public start() {
        this._featuresMap.forEach((feature, id) => {
            feature.start();
        });
    }

    public release() {
        // stop ar session
    }

    public resume() {
        this._nativeObj.onResume();
    }

    public pause() {
        this._nativeObj.onPause();
    }

    public update() {
        this._nativeObj.update();

        this._featuresMap.forEach((feature, id) => {
            feature.update();
        });
    }

    public getAPIState() : number {
        return this._nativeObj.getAPIState();
    }

    //#region camera
    public setCameraFocus(enable : boolean) {

    }

    public setCameraClipPlane(near : number, far : number) {

    }

    public getCameraPose() : ARPose {
        const pose = this._nativeObj.getCameraPose();
        return {
            position: new Vec3(
                pose[0],
                pose[1],
                pose[2]
            ),
            rotation: new Quat(
                pose[3],
                pose[4],
                pose[5],
                pose[6]
            )
        };
    }

    public getCameraFov() : number {
        const matArr = this._nativeObj.getCameraProjectionMatrix();
        const fov = 2 * Math.atan(1 / matArr[5]) * 180 / Math.PI;
        return fov;
    }

    public getCameraTexCoords() : number[] {
        return this._nativeObj.getCameraTexCoords();
    }

    public setDisplayGeometry(rotation : number, width : number, height : number) {
        this._nativeObj.setDisplayGeometry(rotation, width, height);
    }

    public setCameraTextureName(id : number) {
        this._nativeObj.setCameraTextureName(id);
    }

    public updateRenderState(gl : WebGLRenderingContext) {}
    //#endregion

    //#region feature
    public tryGetFeature(featureName : string) : ARFeature | null {
        if (this._featuresMap.has(featureName)) {
            return this._featuresMap.get(featureName) as ARFeature;
        }
        return null;
    }

    public setAllFeaturesActive(enable : boolean) {
        this._featuresMap.forEach((feature, id) => {
            feature.enable = enable;
        });
    }

    private createFeatures(featuresDataset : ARFeatureData[]) {
        featuresDataset.forEach(configData => {
            if(configData != null) {
                let featureClass = ARModuleX.FEATURE_PREFIX + FeatureType[configData.type];
                console.log("feature class::", featureClass);

                // check constructor
                if((<any>features)[featureClass]) {
                    //var featureInstance = new (<any>features)[featureClass](element, this);
                    var featureInstance = new (<any>features)[featureClass](this, configData);
                    console.log("feature instance::", featureInstance instanceof ARFeature);

                    if(!this._featuresMap.has(featureClass)) {
                        this._configMask |= featureInstance.featureId;
                        this._featuresMap.set(featureClass, featureInstance);
                    } else {
                        console.log("Error! Duplicate Feature:", configData.type);
                    }
                } else {
                    console.log("Feature name error:", configData.type);
                }
            }
        });
    }

    private initFeatures() {
        this._featuresMap.forEach((feature, id) => {
            console.log(feature);

            feature.init();
        });
    }

    private checkFeaturesSupport(supportMask : number) {
        for (let index = 0; index < 8; index++) {
            let configBit = this._configMask & (1 << index);
            if (configBit == 0) continue;

            let supportBit = supportMask & (1 << index);
            if(supportBit == 0) {
                const feaName = FeatureType[Math.pow(index, 2)];
                this._featuresMap.delete(ARModuleX.FEATURE_PREFIX + feaName);
                console.log(`Do not support ${feaName}.`);
            }
        }
    }
    //#endregion

    tryHitTest (xPx : number, yPx : number) : boolean {
        return this._nativeObj.tryHitTest(xPx, yPx);
    }

    getHitResult () : number[] {
        return this._nativeObj.getHitResult();
    }

    getHitId () : number {
        return this._nativeObj.getHitId();
    }

    tryHitAttachAnchor (planeIndex : number, node : Node) {
        let tryResult = this._nativeObj.tryHitAttachAnchor(planeIndex);
        if(tryResult >= 0) {
            if(this.anchorsMap.has(tryResult)) {
                let nodes = this.anchorsMap.get(tryResult);
                nodes?.push(node);
            } else {
                let nodes = new Array<Node>();
                nodes.push(node);
                this.anchorsMap.set(tryResult, nodes);
            }
        }
    }

    updateAnchors () {
        this.anchorsMap.forEach((nodes, index) => {
            let pose = this._nativeObj.getAnchorPose(index);
            nodes.forEach((node) => {
                node.setWorldPosition(pose[0], pose[1], pose[2]);
                node.setWorldRotation(pose[3], pose[4], pose[5], pose[6]);
            })
        });
    }

    enablePlane (enable : boolean) {
        this._nativeObj.enablePlane(enable);
    }

    setPlaneDetectionMode (mode : number) {
        this._nativeObj.setPlaneDetectionMode(mode);
    }

    setPlaneMaxTrackingNumber (count : number) {
        this._nativeObj.setPlaneMaxTrackingNumber(count);
    }

    getAddedPlanesInfo(): number[] {
        return this._nativeObj.getAddedPlanesInfo();
    }

    getUpdatedPlanesInfo(): number[]{
        return this._nativeObj.getUpdatedPlanesInfo();
    }

    getRemovedPlanesInfo(): number[]{
        return this._nativeObj.getRemovedPlanesInfo();
    }

    enableImageTracking (enable : boolean) {
        this._nativeObj.enableImageTracking(enable);
    }

    addImageToLib(name: string){
        this._nativeObj.addImageToLib(name);
    }

    setImageMaxTrackingNumber (count : number) {
        this._nativeObj.setImageMaxTrackingNumber(count);
    }

    getAddedImagesInfo(): number[] {
        return this._nativeObj.getAddedImagesInfo();
    }

    getUpdatedImagesInfo(): number[]{
        return this._nativeObj.getUpdatedImagesInfo();
    }

    getRemovedImagesInfo(): number[]{
        return this._nativeObj.getRemovedImagesInfo();
    }

    enableSceneMesh (enable : boolean) {
        this._nativeObj.enableSceneMesh(enable);
    }

    getRemovedSceneMesh(): number[]{
        return this._nativeObj.getRemovedSceneMesh();
    }

    getAddedSceneMesh(): number[]{
        return this._nativeObj.getAddedSceneMesh();
    }

    getUpdatedSceneMesh(): number[]{
        return this._nativeObj.getUpdatedSceneMesh();
    }

    getSceneMeshVertices(meshRef: number) : number[]{
        return this._nativeObj.getSceneMeshVertices(meshRef);
    }

    getSceneMeshTriangleIndices(meshRef: number) : number[]{
        return this._nativeObj.getSceneMeshTriangleIndices(meshRef);
    }

    endRequireSceneMesh() {
        this._nativeObj.endRequireSceneMesh();
    }
}