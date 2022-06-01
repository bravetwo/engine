/*
 Copyright (c) 2021 Xiamen Yaji Software Co., Ltd.

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

import { EDITOR, BUILD } from 'internal:constants';
import { ccclass, menu, property, disallowMultiple, type } from '../core/data/class-decorator';
import { Component } from '../core/components/component';
import { legacyCC } from '../core/global-exports';

import { Camera } from '../core/renderer/scene/camera';
import { Camera as CameraComponent, ClearFlag } from '../core/components/camera-component';
import { Game, game, JsonAsset, math } from '../core';

import { ARModuleHelper } from './ar-module-helper';

import { director, Director } from '../core/director';
import { Color, Vec3, Rect, Vec2, Mat4, Quat } from '../core/math';
import { Node } from '../core/scene-graph/node';
import { Layers } from '../core/scene-graph/layers';

import * as features from './ar-features';
import { ARFeature, FeatureType, IFeature } from './ar-feature-base'
import { Property } from '../tiledmap/tiled-types';
import { DirectionalLight, Light, LightComponent } from '../3d';

interface FeaturesConfigs {
    //features : IFeature[]
    features : ARFeature[]
}

const _temp_vec3a = new Vec3();
const _temp_quat = new Quat();

/**
 * @en AR session component
 * @zh AR session 组件
 */
@ccclass('cc.ARSession')
@menu('AR/ARSession')
@disallowMultiple
export class ARSession extends Component {
    private static readonly FEATURE_PREFIX = "ARFeature";

    //#region background and pose control
    // for 3d object
    @property({ type: CameraComponent })
    protected _targetCamera: CameraComponent | null = null;
    @property({ type: CameraComponent })
    get targetCamera () {
        return this._targetCamera;
    }
    set targetCamera (val) {
        this._targetCamera = val;
    }
    //#endregion

    @property
    lightEstimate = false;
    @property(DirectionalLight)
    mainlight : DirectionalLight | null = null;

    // features config
    @property(JsonAsset)
    featuresConfigs : JsonAsset | null = null;
    private featuresMap = new Map<string, IFeature>();

    //@property
    smooth = false;

    //@property
    lerpPosition = false;

    initOrigin = new Vec3();
    initOrient = new Quat();

    targetOrigin = new Vec3();
    targetOrient = new Quat();
    private _matProj = new Mat4();

    private _curFrame = 0;
    skipFrame = 3;

    private anchorsMap = new Map<number, Array<Node>>();

    private _configMask = FeatureType.None;

    public onLoad() {
        const armodule = ARModuleHelper.getInstance();

        // check for AR support

        // create features from json
        // assembly feature config mask
        this.createFeatures();
        armodule.config(this._configMask);

        // init native features setting feature configs
        // after mask config and before native session start
        this.initFeatures();
        armodule.start();

        // check for feature support, eliminate unsupported features
        this.checkFeaturesSupport(armodule.getSupportMask());

        game.on(Game.EVENT_SHOW, this.onResume);
        game.on(Game.EVENT_HIDE, this.onPause);
        //legacyCC.director.on(legacyCC.Director.EVENT_BEFORE_UPDATE, this.beforeUpdateEvent, this);
        
    }

    

    public start() {
        this.featuresMap.forEach((feature, id) => {
            //if(feature.enable)
                feature.start();
        });
    }

    public onDestroy () {
        game.off(Game.EVENT_SHOW, this.onResume);
        game.off(Game.EVENT_HIDE, this.onPause);
        //legacyCC.director.off(legacyCC.Director.EVENT_BEFORE_UPDATE, this.beforeUpdateEvent, this);

        // stop ar session
    }

    public onEnable () {
        director.on(Director.EVENT_BEFORE_UPDATE, this.onBeforeUpdate, this);
    }

    public onDisable() {
        director.off(Director.EVENT_BEFORE_UPDATE, this.onBeforeUpdate, this);
    }

    onResume() {
        console.log("session resume");
        const instance = ARModuleHelper.getInstance();
        instance.onResume();
    }

    onPause() {
        console.log("session pause");
        const instance = ARModuleHelper.getInstance();
        instance.onPause();
    }

    onBeforeUpdate() {
        //console.log("session before update");
        const instance = ARModuleHelper.getInstance();
        instance.beforeUpdate();

        this.featuresMap.forEach((feature, id) => {
            feature.update();
        });
    }

    // consider move to EVENT_AFTER_UPDATE or EVENT_BEFORE_DRAW
    lateUpdate (dt: number) { 
        //*
        if (!BUILD) return;
        
        /*
        if (this.lerpPosition) {
            if (!Vec3.equals(this._targetCamera!.node.worldPosition, this.targetOrigin)) {
                Vec3.lerp(_temp_vec3a, this._targetCamera!.node.worldPosition, this.targetOrigin, 0.33333333);
                this._targetCamera!.node.setWorldPosition(_temp_vec3a);
            }
        }
        if (this.smooth) {
            Quat.slerp(_temp_quat, this._targetCamera!.node.worldRotation, this.targetOrient, 0.5);
            this._targetCamera!.node.setWorldRotation(_temp_quat);
        }
        if (this.lerpPosition || this.smooth) {
            if (this._curFrame < this.skipFrame) {
                this._curFrame++;
                return;
            }
            this._curFrame = 0;
        }
        //*/
        const instance = ARModuleHelper.getInstance();

        instance.update();
        const pose = instance.getCameraPose();
        if (Math.abs(pose[0]) < 200 && Math.abs(pose[1]) < 200 && Math.abs(pose[2]) < 200) {
            this.targetOrigin.x = pose[0], this.targetOrigin.y = pose[1], this.targetOrigin.z = pose[2];
            this.targetOrient.x = pose[3], this.targetOrient.y = pose[4], this.targetOrient.z = pose[5], this.targetOrient.w = pose[6];
            //*
            if (!this.lerpPosition) {
                this._targetCamera!.node.setWorldPosition(this.targetOrigin);
            }
            if (!this.smooth) {
                this._targetCamera!.node.setWorldRotation(this.targetOrient);
            }
            //*/
            //this._targetCamera!.node.setWorldPosition(this.targetOrigin);
            //this._targetCamera!.node.setWorldRotation(this.targetOrient);

            const matArr = instance.getCameraProjectionMatrix();
            /*
            var mat = new Array(16);
            Mat4.toArray(mat, this._targetCamera!.camera.matProj);
            console.log("bf camera fov", this._targetCamera!.fov);
            console.log("bf camera proj", mat);
            */
            Mat4.fromArray(this._targetCamera!.camera.matProj, matArr);
            var fov = 2 * Math.atan(1 / matArr[5]) * 180 / Math.PI;
            this._targetCamera!.fov = fov;
            /*
            Mat4.toArray(mat, this._targetCamera!.camera.matProj);
            console.log("af camera fov", this._targetCamera!.fov);
            console.log("af camera proj", mat);
            */
        }

        if(this.lightEstimate && this.mainlight) {
            this.mainlight.illuminance = instance.getMainLightIntensity();
            this.mainlight.color = instance.getMainLightColor();
        }
    }

    //#region features
    /*
    public addFeatureConfig (config : FeatureType) {
        this._configMask |= config;
    }*/

    tryGetFeature(featureName : string, outFeature : IFeature) : boolean {
        if (this.featuresMap.has(featureName)) {
            outFeature = this.featuresMap.get(featureName)!;
            return true;
        }
        return false;
    }

    getFeature<Type extends ARFeature>(fea : Type & Function) : Type | undefined {
        if (this.featuresMap.has(fea.name)) {
            return this.featuresMap.get(fea.name) as Type;
        }
    }

    private createFeatures() {
        let feaData : FeaturesConfigs = <FeaturesConfigs>this.featuresConfigs?.json;
        if(feaData == null) {
            console.log("Error! Need check feature configs json file");
            return;
        }

        feaData.features.forEach(element => {
            if(element != null) {
                console.log(element.name);
                let featureClass = ARSession.FEATURE_PREFIX + element.name;

                // check constructor
                if((<any>features)[featureClass]) {
                    //var featureInstance = new (<any>features)[featureClass](element, this);
                    var featureInstance = new (<any>features)[featureClass](this, null, element);
                    console.log(featureInstance instanceof ARFeature);

                    if(!this.featuresMap.has(featureClass)) {
                        this._configMask |= featureInstance.featureId;
                        this.featuresMap.set(featureClass, featureInstance);
                    } else {
                        console.log("Error! Duplicate Feature:", element.name);
                    }
                } else {
                    console.log("Feature name error:", element.name);
                }
            }
        });
    }

    private initFeatures() {
        this.featuresMap.forEach((feature, id) => {
            console.log(feature);

            feature.init();
        });
    }

    private checkFeaturesSupport(supportMask : number) {
        //const supportMask = armodule.getSupportMask();
        for (let index = 0; index < 8; index++) {
            let configBit = this._configMask & (1 << index);
            if (configBit == 0) continue;

            let supportBit = supportMask & (1 << index);
            if(supportBit == 0) {
                const feaName = (Math.pow(index, 2) as FeatureType).toString();
                this.featuresMap.delete(ARSession.FEATURE_PREFIX + feaName);
                console.log(`Do not support ${feaName}.`);
            }
        }
    }
    //#endregion

    
    tryHitTest (xPx : number, yPx : number) : boolean {
        const instance = ARModuleHelper.getInstance();
        return instance.tryHitTest(xPx, yPx);
    }

    getHitResult () : number[] {
        const instance = ARModuleHelper.getInstance();
        return instance.getHitResult();
    }

    getHitId () : number {
        const instance = ARModuleHelper.getInstance();
        return instance.getHitId();
    }

    tryHitAttachAnchor (planeIndex : number, node : Node) {
        const instance = ARModuleHelper.getInstance();
        let tryResult = instance.tryHitAttachAnchor(planeIndex);
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
        const instance = ARModuleHelper.getInstance();
        this.anchorsMap.forEach((nodes, index) => {
            let pose = instance.getAnchorPose(index);
            nodes.forEach((node) => {
                node.setWorldPosition(pose[0], pose[1], pose[2]);
                node.setWorldRotation(pose[3], pose[4], pose[5], pose[6]);
            })
        });
    }
}

//legacyCC.ARSession = ARSession;
