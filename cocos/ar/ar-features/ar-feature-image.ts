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
import { ARFeature, ARPose, ARTrackable, FeatureEvent, FeatureType, IFeatureData } from '../ar-feature-base';
import { ARSession } from '../ar-session-component';
import { Node } from '../../core/scene-graph'
import { createMesh } from '../../3d/misc';
import { ARModuleHelper } from '../ar-module-helper';
import { Mesh, MeshRenderer, ModelComponent } from '../../3d';
import { Model } from '../../core/renderer/scene';
import { MorphModel } from '../../3d/models/morph-model';
import { primitives } from '../../../exports/primitive';
import { PrimitiveMode } from '../../core/gfx';
import { TERRAIN_NORTH_INDEX } from '../../terrain';
import { ARFeatureData } from '../ar-feature-data';
import { ARModuleAdaptor } from '../ar-module-adaptor';
import { Quat, Vec3 } from '../../core/math';

export interface ARImage extends ARTrackable {
    libIndex : number;
}

@ccclass('cc.ImageTrackingConfig')
export class ImageTrackingConfig extends ARFeatureData {
    @property
    imageNames : string[] = [];
    @property
    maxTrackingNumber : number = 1;
}

@ccclass('cc.ARFeatureImageTracking')
export class ARFeatureImageTracking extends ARFeature {
    public get featureId(): FeatureType {
        return FeatureType.ImageTracking;
    }
    
    readonly onAddEvent = new FeatureEvent<ARImage[]>();
    readonly onUpdateEvent = new FeatureEvent<ARImage[]>();
    readonly onRemoveEvent = new FeatureEvent<ARImage[]>();

    // TODO: need a image lib editor window to create lib, add image and set image size.
    // currently add images in native project, as ar resources group
    private _imageNames : string[] = [];

    private _maxTrackingNumber : number = 1;

    private static readonly IMAGE_INFO_SIZE = 9;
    private _addedImages : ARImage[];
    private _updatedImages : ARImage[];
    private _removedImages : ARImage[];

    //constructor(jsonObject : any, session : ARSession) {
        //super(jsonObject, session);
    constructor (session : ARModuleAdaptor, config : IFeatureData);
    constructor (session : ARModuleAdaptor, config : IFeatureData, jsonObject? : any) {
        super(session, config, jsonObject);

        if(config) {
            let imageConfig = config as ImageTrackingConfig;
            this._imageNames = imageConfig.imageNames;
            this._maxTrackingNumber = imageConfig.maxTrackingNumber;

        } else if(jsonObject) {
            this._imageNames = jsonObject.images;

            if(jsonObject.maxTrackingNumber)
                this._maxTrackingNumber = jsonObject.maxTrackingNumber;
        }
        
        this._addedImages = new Array();
        this._updatedImages = new Array();
        this._removedImages = new Array();
    }

    isReady() : boolean {
        return true;
    }

    init() {
        super.init();
        const armodule = ARModuleHelper.getInstance();

        this._imageNames.forEach(imageName => {
            armodule.addImageToLib(imageName);
        });
        armodule.setMaxTrackingNumber(this._maxTrackingNumber);
    }

    protected onEnable(): void {
        const armodule = ARModuleHelper.getInstance();
        armodule.enableImageTracking(this._enable);
    }

    protected onDisable(): void {
        const armodule = ARModuleHelper.getInstance();
        armodule.enableImageTracking(this._enable);
    }

    update() {
        // check start
        if(!this._enable || !this.isReady()) return;
        this.processChanges();
    }

    private processChanges() {
        const armodule = ARModuleHelper.getInstance();

        let imagesInfo : number[];
        imagesInfo = armodule.getAddedImagesInfo();
        if(imagesInfo.length > 0) {
            console.log("add images:", imagesInfo.length);
            //this._addedImages = this.assembleInfos(imagesInfo);
            this._addedImages.length = 0;
            this.assembleInfos(imagesInfo, this._addedImages);
            // event
            if(this._addedImages.length > 0)
                this.onAddEvent.trigger(this._addedImages);
        }

        imagesInfo = armodule.getUpdatedImagesInfo();
        if(imagesInfo.length > 0) {
            console.log("update images:", imagesInfo.length);
            //this._updatedImages = this.assembleInfos(imagesInfo);
            this._updatedImages.length = 0;
            this.assembleInfos(imagesInfo, this._updatedImages);
            // event
            if(this._updatedImages.length > 0)
                this.onUpdateEvent.trigger(this._updatedImages);
        }

        imagesInfo = armodule.getRemovedImagesInfo();
        if(imagesInfo.length > 0) {
            console.log("remove images:", imagesInfo.length);
            //this._removedImages = this.assembleInfos(imagesInfo);
            this._removedImages.length = 0;
            this.assembleInfos(imagesInfo, this._removedImages);
            // event
            if(this._removedImages.length > 0)
                this.onRemoveEvent.trigger(this._removedImages);
        }
    }

    private assembleInfos(src : number[], dst : ARImage[]) {
        //let images : ARImage[] = new Array();
        if(src) {
            let count = src.length / ARFeatureImageTracking.IMAGE_INFO_SIZE;
            let offset = 0;
            for (let i = 0; i < count; i++) {
                offset = i * ARFeatureImageTracking.IMAGE_INFO_SIZE;
                
                let image : ARImage = {
                    id : src[offset],
                    libIndex : src[offset + 1],
                    pose : {
                        position : new Vec3(
                            src[offset + 2],
                            src[offset + 3],
                            src[offset + 4]
                        ),
                        rotation : new Quat(
                            src[offset + 5],
                            src[offset + 6],
                            src[offset + 7],
                            src[offset + 8]
                        )
                    }
                };
                dst.push(image);
            }
        }
        
        //return images;
    }
}