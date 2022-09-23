/*
 Copyright (c) 2021-2022 Xiamen Yaji Software Co., Ltd.

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

import { ccclass, property } from '../../core/data/class-decorator'
import { ARFeature, ARPose, ARTrackable, FeatureEvent, FeatureType, IFeatureData, ARFeatureData} from '../ar-feature-base';
import { ccenum } from '../../core/value-types/enum';
import { Quat, Vec2, Vec3 } from '../../core/math';
import { Prefab } from '../../core/assets/prefab';
import { resources } from '../../core/asset-manager/bundle';
import { ARModuleX } from '../ar-module';

export enum ARPlaneDetectionMode {
    Horizontal_Upward = 1 << 0,
    Horizontal_Downward = 1 << 1, 
    Vertical = 1 << 2,
    Horizontal = Horizontal_Upward | Horizontal_Downward,
    All = Horizontal | Vertical
}
ccenum(ARPlaneDetectionMode)

export interface ARPlane extends ARTrackable {
    type : ARPlaneDetectionMode;
    extent : Vec2;
    center : ARPose;
}

@ccclass('cc.PlaneDetectionConfig')
export class PlaneDetectionConfig extends ARFeatureData {
    @property
    direction : ARPlaneDetectionMode = ARPlaneDetectionMode.Horizontal;
    @property
    maxPlaneNumber : number = 5;
    @property
    planePrefab : Prefab | null = null;
}

@ccclass('cc.ARFeaturePlaneDetection')
export class ARFeaturePlaneDetection extends ARFeature {
    private static readonly PLANE_INFO_SIZE = 12;

    public get featureId(): FeatureType {
        return FeatureType.PlaneDetection;
    }
    
    mode : ARPlaneDetectionMode;

    // do not act plane display if null 
    public planePrefab : Prefab | null = null;

    private planesMaxSize = 0;

    readonly onAddEvent = new FeatureEvent<ARPlane[]>();
    readonly onUpdateEvent = new FeatureEvent<ARPlane[]>();
    readonly onRemoveEvent = new FeatureEvent<ARPlane[]>();
    private _addedPlanes : ARPlane[] = [];
    private _updatedPlanes : ARPlane[] = [];
    private _removedPlanes : ARPlane[] = [];

    constructor (session : ARModuleX, config : IFeatureData);
    constructor (session : ARModuleX, config : IFeatureData, jsonObject? : any) {
        super(session, config, jsonObject);

        // default values
        this.mode = ARPlaneDetectionMode.Horizontal;

        if(config) {
            let planeConfig = config as PlaneDetectionConfig;
            this.mode = planeConfig.direction;
            this.planesMaxSize = planeConfig.maxPlaneNumber;

            if(planeConfig.planePrefab) {
                this.planePrefab = planeConfig.planePrefab;
            } else {
                // load default
            }

        } else if (jsonObject) {
            if(jsonObject.mode) {
                this.mode = ARPlaneDetectionMode[jsonObject.mode as keyof typeof ARPlaneDetectionMode];
            }
            
            this.planesMaxSize = jsonObject.planesMaxSize;

            if(jsonObject.planePrefabPath) {
                var self = this;
                resources.load(jsonObject.planePrefabPath, Prefab, function (err, prefab) {
                    self.planePrefab = prefab;
                });
            } else {
                // load default
            }
        }
        console.log("plane detection mode:", this.mode);
    }

    isReady() : boolean {
        return this.planePrefab != null;
    }

    init(): void {
        super.init();
        this.session!.setPlaneDetectionMode(this.mode);
        this.session!.setPlaneMaxTrackingNumber(this.planesMaxSize);
    }

    protected onEnable(): void {
        this.session!.enablePlane(this._enable);
    }

    protected onDisable(): void {
        this.session!.enablePlane(this._enable);
    }

    update() {
        // check start
        if(!this._enable) {
            return;
        }
        this.processChanges();
    }

    public processChanges() {
        let removedPlanesInfo = this.session!.getRemovedPlanesInfo();
        if (removedPlanesInfo.length > 0) {
            this._removedPlanes.length = 0;
            this.assembleInfos(removedPlanesInfo, this._removedPlanes);
            if(this._removedPlanes.length > 0){
                this.onRemoveEvent.trigger(this._removedPlanes);
            }
        }
       
        let addedPlanesInfo = this.session!.getAddedPlanesInfo();
        if (addedPlanesInfo.length > 0) {
            this._addedPlanes.length = 0;
            this.assembleInfos(addedPlanesInfo, this._addedPlanes);
            if(this._addedPlanes.length > 0){
                this.onAddEvent.trigger(this._addedPlanes);
            }
        }
        
        let updatedPlanesInfo = this.session!.getUpdatedPlanesInfo();
        if (updatedPlanesInfo.length > 0) {
            this._updatedPlanes.length = 0;
            this.assembleInfos(updatedPlanesInfo, this._updatedPlanes);
            if(this._updatedPlanes.length > 0){
                this.onUpdateEvent.trigger(this._updatedPlanes);
            }
        }
    }

    private assembleInfos(src : number[], dst : ARPlane[]) {
        if(src) {
            let count = src.length / ARFeaturePlaneDetection.PLANE_INFO_SIZE;
            let offset = 0;
            for (let i = 0; i < count; i++) {
                offset = i * ARFeaturePlaneDetection.PLANE_INFO_SIZE;
                
                let plane : ARPlane = {
                    id: src[offset],
                    // in native : 0, 1, 2
                    type: 1 << src[offset + 1],
                    extent: new Vec2(
                        src[offset + 3],
                        src[offset + 4]
                    ),
                    center: {
                        position: new Vec3(
                            src[offset + 5],
                            src[offset + 6],
                            src[offset + 7]
                        ),
                        rotation: new Quat(
                            src[offset + 8],
                            src[offset + 9],
                            src[offset + 10],
                            src[offset + 11]
                        )
                    },
                };
                dst.push(plane);
            }
        }
    }
}