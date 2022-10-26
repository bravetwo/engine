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

import { ccclass } from '../../../core/data/class-decorator'
import { ARTrackable } from '../ar-define';
import { ARFeature, ARFeatureData, FeatureEvent, FeatureType, IFeatureData} from '../ar-feature-base';
import { ARModuleX } from '../ar-module';

export interface ARAnchor extends ARTrackable {

}

@ccclass('cc.AnchorTrackingConfig')
export class AnchorTrackingConfig extends ARFeatureData {

}

@ccclass('cc.ARFeatureAnchor')
export class ARFeatureAnchor extends ARFeature {
    public get featureId(): FeatureType {
        return FeatureType.Anchor;
    }
    
    readonly onAddEvent = new FeatureEvent<ARAnchor[]>();
    readonly onUpdateEvent = new FeatureEvent<ARAnchor[]>();
    readonly onRemoveEvent = new FeatureEvent<ARAnchor[]>();
    
    private _addedAnchors : ARAnchor[] = [];
    private _updatedAnchors : ARAnchor[] = [];
    private _removedAnchors : ARAnchor[] = [];

    constructor (session : ARModuleX, config : IFeatureData);
    constructor (session : ARModuleX, config : IFeatureData, jsonObject? : any) {
        super(session, config, jsonObject);
    }

    isReady() : boolean {
        return true;
    }

    init(): void {
        super.init();
    }

    protected onEnable(): void {
        this.session!.enableAnchor(this._enable);
    }

    protected onDisable(): void {
        this.session!.enableAnchor(this._enable);
    }

    update() {
        // check start
        if(!this._enable) {
            return;
        }
        if (globalThis.__globalXR.xrENV === 2) {
            this.processWebXRChanges();        
        } else {
            this.processChanges();
        }
    }

    public processWebXRChanges() {
        this._removedAnchors = this.session!.getRemovedAnchorsInfo();
        if (this._removedAnchors.length > 0) {
            this.onRemoveEvent.trigger(this._removedAnchors);
        }
       
        this._addedAnchors = this.session!.getAddedAnchorsInfo();
        if (this._addedAnchors.length > 0) {
            this.onAddEvent.trigger(this._addedAnchors);
        }
        
        this._updatedAnchors = this.session!.getUpdatedAnchorInfo();
        if(this._updatedAnchors.length > 0){
            this.onUpdateEvent.trigger(this._updatedAnchors);
        }
    }

    public processChanges() {
       
    }
}