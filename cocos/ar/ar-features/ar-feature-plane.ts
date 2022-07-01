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

import { Prefab, instantiate, Vec3, resources, ccenum, Quat, Vec2 } from '../../core';
import { ccclass, property } from '../../core/data/class-decorator'
import { ARFeature, ARPose, ARTrackable, FeatureEvent, FeatureType, IFeatureData } from '../ar-feature-base';
import { ARSession } from '../ar-session-component';
import { Node } from '../../core/scene-graph/node';
import { ARModuleHelper } from '../ar-module-helper';
import { ARFeatureData } from '../ar-feature-data';
import { ARModuleAdaptor } from '../ar-module-adaptor';

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
    //private planesInfo : number[];

    private planesNodeMap = new Map<number, Node>();
    addedPlanesInfo : number[];
    removedPlanesInfo : number[];
    updatedPlanesInfo : number[];

    readonly onAddEvent = new FeatureEvent<ARPlane[]>();
    readonly onUpdateEvent = new FeatureEvent<ARPlane[]>();
    readonly onRemoveEvent = new FeatureEvent<number[]>();
    private _addedPlanes : ARPlane[];
    private _updatedPlanes : ARPlane[];
    private _removedPlanes : number[];

    private _planesParent : Node | null = null;

    constructor (session : ARModuleAdaptor, config : IFeatureData);
    constructor (session : ARModuleAdaptor, config : IFeatureData, jsonObject? : any) {
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

        //this.planesInfo = new Array();
        this.addedPlanesInfo = new Array();
        this.updatedPlanesInfo = new Array();
        this.removedPlanesInfo = new Array();
        
        this._addedPlanes = new Array();
        this._updatedPlanes = new Array();
        this._removedPlanes = new Array();

        /*
        this._planesParent = new Node("_PLANES_");
        this._session.node.addChild(this._planesParent);
        */

        console.log("plane detection mode:", this.mode);
    }

    isReady() : boolean {
        return this.planePrefab != null;
    }

    init(): void {
        super.init();
        const armodule = ARModuleHelper.getInstance();
        armodule.setPlaneDetectionMode(this.mode);
        armodule.setPlaneMaxTrackingNumber(this.planesMaxSize);
    }

    protected onEnable(): void {
        /*
        if(!this._planesParent) {
            this._planesParent = new Node("_PLANES_");
            this._session.node.addChild(this._planesParent);
        }
        this._planesParent.active = true;
        */

        const armodule = ARModuleHelper.getInstance();
        armodule.enablePlane(this._enable);
    }

    protected onDisable(): void {
        //this._enable = false;
        const armodule = ARModuleHelper.getInstance();
        armodule.enablePlane(this._enable);
    }

    /*
    show() {
        if(this._planesParent)
            this._planesParent!.active = true;
    }

    hide() {
        if(this._planesParent)
            this._planesParent!.active = false;
    }
    
    destroy() {
        this._planesParent?.destroy();
    }
    */
   
    update() {
        // check start
        if(!this._enable || !this.isReady()) return;
        //ARModuleHelper.getInstance().updatePlanesInfo();
        this.processChanges();
    }

    public processChanges() {
        const armodule = ARModuleHelper.getInstance();
        //let planes = this._session.node;
        //*
        this.removedPlanesInfo = armodule.getRemovedPlanesInfo();
        //this._removedPlanes.length = 0;
        this._removedPlanes = this.removedPlanesInfo;
        if(this._removedPlanes.length > 0)
                this.onRemoveEvent.trigger(this._removedPlanes);

        /*/ TODO: Need Move to Agent Process Logic
        let planesInfo = this.removedPlanesInfo;
        if(planesInfo.length > 0) {
            console.log(`remove planes length: ${planesInfo.length}`);
            console.log(`remove planes count: ${armodule.getRemovedPlanesCount()}`);
        }
        for (let i = 0; i < armodule.getRemovedPlanesCount(); i++) {
            let index = this.removedPlanesInfo[i];
            console.log(`remove plane: ${index}`);
            console.log(`map contains: ${this.planesNodeMap.has(index)}`);
            //??
            if (index >= 0 && this.planesNodeMap.has(index)) {
                let node = this.planesNodeMap.get(index)!;
                node.destroy();
                this.planesNodeMap.delete(index);
                console.log(`destroy plane: ${index}`);
            }
        }
        //*/
        this.addedPlanesInfo = armodule.getAddedPlanesInfo();
        this._addedPlanes.length = 0;
        this.assembleInfos(this.addedPlanesInfo, this._addedPlanes);
        if(this._addedPlanes.length > 0)
                this.onAddEvent.trigger(this._addedPlanes);

        /*/ TODO: Need Move to Agent Process Logic
        planesInfo = this.addedPlanesInfo;
        if(planesInfo.length > 0) {
            console.log(`add planes length: ${planesInfo.length}`);
            console.log(`add planes count: ${armodule.getAddedPlanesCount()}`);
        }

        let offset = 0;
        for (let i = 0; i < armodule.getAddedPlanesCount(); i++) {
            offset = i * 12;
            //let planesInfo = this.addedPlanesInfo;
            const width = planesInfo[offset + 3];
            const height = planesInfo[offset + 4];
            if (width > 0 && height > 0) {
                let node: Node;
                let index = planesInfo[offset];
                if (index >= 0 && !this.planesNodeMap.has(index)) {
                    node = instantiate(this.planePrefab as Prefab);
                    //planes.addChild(node);
                    this._planesParent?.addChild(node);

                    this.planesNodeMap.set(index, node);

                    const vec3 = new Vec3();
                    vec3.set(width, 1, height);
                    node.setWorldScale(vec3);
                    vec3.set(planesInfo[offset + 5], planesInfo[offset + 6], planesInfo[offset + 7]);
                    //Vec3.add(vec3, vec3, ORIGIN)
                    node.setWorldPosition(vec3);
                    node.setWorldRotation(planesInfo[offset + 8], planesInfo[offset + 9], 
                        planesInfo[offset + 10], planesInfo[offset + 11]);
                    console.log(`add plane: ${index}`);
                    for (let k = 1; k < 12; k++) {
                        console.log(`${k} : ${planesInfo[k]}`);
                    }
                }
            }
        }
        //*/
        this.updatedPlanesInfo = armodule.getUpdatedPlanesInfo();
        this._updatedPlanes.length = 0;
        this.assembleInfos(this.updatedPlanesInfo, this._updatedPlanes);
        if(this._updatedPlanes.length > 0)
                this.onUpdateEvent.trigger(this._updatedPlanes);

        /*/ TODO: Need Move to Agent Process Logic
        planesInfo = this.updatedPlanesInfo;
        offset = 0;
        for (let i = 0; i < armodule.getUpdatedPlanesCount(); i++) {
            offset = i * 12;
            //let planesInfo = this.updatedPlanesInfo;
            const width = planesInfo[offset + 3];
            const height = planesInfo[offset + 4];
            if (width > 0 && height > 0) {
                let node: Node;
                let index = planesInfo[offset];
                if (index >= 0 && this.planesNodeMap.has(index)) {
                    node = this.planesNodeMap.get(index)!;
                    
                    const vec3 = new Vec3();
                    vec3.set(width, 1, height);
                    node.setWorldScale(vec3);
                    vec3.set(planesInfo[offset + 5], planesInfo[offset + 6], planesInfo[offset + 7]);
                    //Vec3.add(vec3, vec3, ORIGIN)
                    node.setWorldPosition(vec3);
                    node.setWorldRotation(planesInfo[offset + 8], planesInfo[offset + 9], 
                        planesInfo[offset + 10], planesInfo[offset + 11]);
                    //console.log(`update plane: ${index}`);
                }
            }
        }
        */
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