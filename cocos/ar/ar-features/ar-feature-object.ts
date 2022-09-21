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

//import { Prefab, instantiate, Vec3, resources, Material, builtinResMgr, director, Vec4, Quat } from '../../core';
import { ccclass, menu, property, disallowMultiple, type } from '../../core/data/class-decorator'
import { ARFeature, ARPose, FeatureEvent, FeatureType, IFeatureData } from '../ar-feature-base';
import { ARSession } from '../ar-session-component';
import { Node } from '../../core/scene-graph'
import { createMesh } from '../../3d/misc';
import { ARModuleHelper } from '../ar-module-helper';
import { Mesh, MeshRenderer, ModelComponent } from '../../3d';
import { Model } from '../../core/renderer/scene';
import { MorphModel } from '../../3d/models/morph-model';
import { primitives } from '../../../exports/primitive';
import { PrimitiveMode } from '../../core/gfx';
import { ARModuleAdaptor } from '../ar-module-adaptor';
import { Quat, Vec3 } from '../../core/math';

export interface ARTrackingObject {
    anchorId : number;
    libIndex : number;
    extent : Vec3;
    scale : Vec3;
    pose : ARPose;
}

@ccclass('cc.ARFeatureObject')
export class ARFeatureObject extends ARFeature {
    public get featureId(): FeatureType {
        return FeatureType.ObjectTracking;
    }
    
    readonly onAddEvent = new FeatureEvent<ARTrackingObject[]>();
    readonly onUpdateEvent = new FeatureEvent<ARTrackingObject[]>();
    readonly onRemoveEvent = new FeatureEvent<ARTrackingObject[]>();

    // TODO: need a ar ref lib editor window to create lib, add image or obj.
    // currently add objs in native project, as ar resources group
    private _objectNames : string[];

    private static readonly OBJECT_INFO_SIZE = 15;
    private _addedObjects : ARTrackingObject[];
    private _updatedObjects : ARTrackingObject[];
    private _removedObjects : ARTrackingObject[];

    //constructor(jsonObject : any, session : ARSession) {
        //super(jsonObject, session);
    constructor (session : ARModuleAdaptor, config : IFeatureData);
    constructor (session : ARModuleAdaptor, config : IFeatureData, jsonObject? : any) {
        super(session, config, jsonObject);

        this._objectNames = jsonObject.objects;

        this._addedObjects = new Array();
        this._updatedObjects = new Array();
        this._removedObjects = new Array();
    }

    isReady() : boolean {
        return true;
    }

    init() {
        super.init();
        const armodule = ARModuleHelper.getInstance();

        this._objectNames.forEach(name => {
            armodule.addObjectToLib(name);
        });
    }

    protected onEnable(): void {
        const armodule = ARModuleHelper.getInstance();
        armodule.enableObjectTracking(this._enable);
    }

    protected onDisable(): void {
        const armodule = ARModuleHelper.getInstance();
        armodule.enableObjectTracking(this._enable);
    }

    update() {
        // check start
        if(!this._enable || !this.isReady()) return;
        this.processChanges();
    }

    private processChanges() {
        const armodule = ARModuleHelper.getInstance();

        let objectsInfo : number[];
        objectsInfo = armodule.getAddedObjectsInfo();
        if(objectsInfo.length > 0) {    
            this._addedObjects.length = 0;
            this.assembleInfos(objectsInfo, this._addedObjects);
            // event
            if(this._addedObjects.length > 0)
                this.onAddEvent.trigger(this._addedObjects);
        }

        objectsInfo = armodule.getUpdatedObjectsInfo();
        if(objectsInfo.length > 0) {
            this._updatedObjects.length = 0;
            this.assembleInfos(objectsInfo, this._updatedObjects);
            // event
            if(this._updatedObjects.length > 0)
                this.onUpdateEvent.trigger(this._updatedObjects);
        }

        objectsInfo = armodule.getRemovedObjectsInfo();
        if(objectsInfo.length > 0) {
            this._removedObjects.length = 0;
            this.assembleInfos(objectsInfo, this._removedObjects);
            // event
            if(this._removedObjects.length > 0)
                this.onRemoveEvent.trigger(this._removedObjects);
        }
    }

    private assembleInfos(src : number[], dst : ARTrackingObject[]) {
        if(src) {
            let count = src.length / ARFeatureObject.OBJECT_INFO_SIZE;
            let offset = 0;
            for (let i = 0; i < count; i++) {
                offset = i * ARFeatureObject.OBJECT_INFO_SIZE;
                
                let obj : ARTrackingObject = {
                    anchorId : src[offset],
                    libIndex : src[offset + 1],
                    extent : new Vec3(src[offset + 2], src[offset + 3], src[offset + 4]),
                    scale : new Vec3(src[offset + 5], src[offset + 6], src[offset + 7]),
                    pose : {
                        position : new Vec3(
                            src[offset + 8],
                            src[offset + 9],
                            src[offset + 10]
                        ),
                        rotation : new Quat(
                            src[offset + 11],
                            src[offset + 12],
                            src[offset + 13],
                            src[offset + 14]
                        )
                    }
                };
                dst.push(obj);
            }
        }
    }
}