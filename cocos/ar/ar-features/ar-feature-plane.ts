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

import { Prefab, instantiate, Vec3, resources } from '../../core';
//import { Prefab } from 'cocos/core/assets';
//import { instantiate } from 'cocos/core/data';
//import { Vec3 } from 'cocos/core';
//import { resources } from 'cocos/core';
import { ccclass, menu, property, disallowMultiple, type } from '../../core/data/class-decorator'
import { ARFeature, FeatureType, IFeatureData } from '../ar-feature-base';
import { ARSession } from '../ar-session-component';
import { Node } from 'cocos/core/scene-graph'
import load from 'cocos/core/asset-manager/load';
import { array } from 'cocos/core/utils/js';
import { ARModuleHelper } from '../ar-module-helper';

enum ARPlaneDetectionMode {
    //None, 
    Horizontal = 1 << 0, 
    Vertical = 1 << 1,
    All = Horizontal | Vertical
}

export interface PlaneDetectionConfig extends IFeatureData {
    direction:ARPlaneDetectionMode;
    maxPlaneNumber:number;
    showPlane:boolean;
    planePrefab:Prefab | null;
}

@ccclass('cc.ARFeaturePlane')
export class ARFeaturePlaneDetection extends ARFeature {
    public get featureId(): FeatureType {
        return FeatureType.PlaneDetection;
    }
    
    mode : ARPlaneDetectionMode;

    private planePrefab : Prefab | null = null;
    private planesMaxSize = 0;
    private planesInfo : number[];

    private planesNodeMap = new Map<number, Node>();
    addedPlanesInfo : number[];
    removedPlanesInfo : number[];
    updatedPlanesInfo : number[];

    constructor (session : ARSession, config : IFeatureData);
    //constructor (session : ARSession, jsonObject : any);
    constructor (session : ARSession, config : IFeatureData, jsonObject? : any) {
    //constructor(jsonObject : any, session : ARSession) {
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

        this.planesInfo = new Array();
        this.addedPlanesInfo = new Array();
        this.removedPlanesInfo = new Array();
        this.updatedPlanesInfo = new Array();

        console.log("plane detection mode:", this.mode);
    }

    isReady() : boolean {
        return this.planePrefab != null;
    }

    init(): void {
        super.init();
        const armodule = ARModuleHelper.getInstance();
        armodule.setPlaneDetectionMode(this.mode);
    }

    protected onEnable(): void {
        const armodule = ARModuleHelper.getInstance();
        armodule.enablePlane(this._enable);
    }

    protected onDisable(): void {
        //this._enable = false;
        const armodule = ARModuleHelper.getInstance();
        armodule.enablePlane(this._enable);
    }

    update() {
        // check start
        if(!this._enable || !this.isReady()) return;
        ARModuleHelper.getInstance().updatePlanesInfo();
        this.processChanges();
    }

    public processChanges() {
        const armodule = ARModuleHelper.getInstance();
        let planes = this._session.node;
        //*
        this.removedPlanesInfo = armodule.getRemovedPlanesInfo();
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
                    planes.addChild(node);
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
        
        this.updatedPlanesInfo = armodule.getUpdatedPlanesInfo();
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
    }

    public checkUpdatePlanesInfo() {}
}