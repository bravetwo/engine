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

import { ARFeature, ARPose, FeatureType, ARFeatureData } from './ar-feature-base';
import * as features from './ar-features';
import { CocosWebXR } from '../../external/compression/CocosWebXR.js';
import { Quat, Vec3 } from '../core/math';
import { IARModule } from './ar-module-base';

// WebXR
export class ARModuleX extends IARModule {
    public static readonly FEATURE_PREFIX = "ARFeature";

    private _cocosWebXR: CocosWebXR | null = null;

    private _cameraId: string | null = null;
    get CameraId () {
        return this._cameraId;
    }
    set CameraId (val) {
        this._cameraId = val;
    }

    private _configMask = FeatureType.None;
    private _featuresMap = new Map<string, ARFeature>();
  
    private static _instance : ARModuleX | null = null;
    public static getInstance() : ARModuleX | null {
        return this._instance;
    }

    // load
    public constructor(featuresDataset : ARFeatureData[]) {
        super();
        console.log("init ARModule Web...");

        this._cocosWebXR = new CocosWebXR('immersive-ar');
        this.createFeatures(featuresDataset);
        if(this._cocosWebXR.isSupported) {
            this._cocosWebXR.config(this._configMask);
            this.initFeatures();
            this._cocosWebXR.start();

        } else {

        }
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
      
    }

    public pause() {
    
    }

    public update() {
        this._featuresMap.forEach((feature, id) => {
            feature.update();
        });
    }

    public getAPIState() : number {
        return this._cocosWebXR!.getAPIState();
    }

    //#region camera
    public setCameraFocus(enable : boolean) {

    }

    public setCameraClipPlane(near : number, far : number) {

    }

    public getCameraPose() : ARPose {
        const pose = [0, 0, 0, 0, 0, 0, 0];
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
        const matArr = [0, 0, 0, 0, 0, 0, 0];
        const fov = 2 * Math.atan(1 / matArr[5]) * 180 / Math.PI;
        return fov;
    }

    public getCameraTexCoords() : number[] {
        return new Array();
    }

    public setDisplayGeometry(rotation : number, width : number, height : number) {

    }

    public setCameraTextureName(id : number) {

    }

    public updateRenderState(gl : WebGLRenderingContext) {
        this._cocosWebXR?.updateRenderState(gl);
    }
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

    
}