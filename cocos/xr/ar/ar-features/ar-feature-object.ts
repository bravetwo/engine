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

import { ccclass } from '../../../core/data/class-decorator'
import { ARFeature, FeatureEvent, IFeatureData } from '../ar-feature-base';
import { Quat, Vec3 } from '../../../core/math';
import { ARModuleX } from '../ar-module';
import { ARAnchor, FeatureType } from '../ar-define';

export interface ARTrackingObject extends ARAnchor {
    libIndex : number;
    extent : Vec3;
    scale : Vec3;
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
    private _objectNames : string[] = [];

    private static readonly OBJECT_INFO_SIZE = 15;
    private _addedObjects : ARTrackingObject[] = [];
    private _updatedObjects : ARTrackingObject[] = [];
    private _removedObjects : ARTrackingObject[] = [];

    constructor (session : ARModuleX, config : IFeatureData);
    constructor (session : ARModuleX, config : IFeatureData, jsonObject? : any) {
        super(session, config, jsonObject);

        this._objectNames = jsonObject.objects;
    }

    isReady() : boolean {
        return true;
    }

    init() {
        super.init();
        this._objectNames.forEach(name => {
            this.session!.addObjectToLib(name);
        });
    }

    protected onEnable(): void {
        this.session!.enableObjectTracking(this._enable);
    }

    protected onDisable(): void {
        this.session!.enableObjectTracking(this._enable);
    }

    update() {
        // check start
        if(!this._enable || !this.isReady()) return;
        this.processChanges();
    }

    private processChanges() {
     
        let objectsInfo : number[];
        objectsInfo = this.session!.getAddedObjectsInfo();
        if(objectsInfo.length > 0) {    
            this._addedObjects.length = 0;
            this.assembleInfos(objectsInfo, this._addedObjects);
            // event
            if(this._addedObjects.length > 0)
                this.onAddEvent.trigger(this._addedObjects);
        }

        objectsInfo = this.session!.getUpdatedObjectsInfo();
        if(objectsInfo.length > 0) {
            this._updatedObjects.length = 0;
            this.assembleInfos(objectsInfo, this._updatedObjects);
            // event
            if(this._updatedObjects.length > 0)
                this.onUpdateEvent.trigger(this._updatedObjects);
        }

        objectsInfo = this.session!.getRemovedObjectsInfo();
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
                    id : src[offset],
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