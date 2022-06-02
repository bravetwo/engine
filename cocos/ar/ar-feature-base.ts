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

import { math } from '../core';
import { ccclass, menu, property, disallowMultiple, type } from '../core/data/class-decorator'
import { convertWraps } from '../spine';
import { ARSession } from './ar-session-component'

interface IFeatureEvent<T> {
    on(handler : {(data? : T) : void }) : void;
    off(handler : {(data? : T) : void }) : void;
}

export class FeatureEvent<T> implements IFeatureEvent<T> {
    private _handlers : {(data? : T) : void}[] = [];

    on(handler: (data?: T) => void): void {
        this._handlers.push(handler);
    }
    off(handler: (data?: T) => void): void {
        this._handlers = this._handlers.filter(h => h != handler);
    }
    
    trigger(data?: T) {
        this._handlers.forEach(h => h(data));
    }
}

export interface ARPose {
    position : math.Vec3;
    rotation : math.Quat;
}

export interface IFeature {
    name : string;
    enable : boolean;
    init();
    start();
    update();
}

export interface IFeatureData {
    type : FeatureType;
    enable : boolean;
}

export enum FeatureType {
    None = 0,
    PlaneDetection = 1 << 0, 
    SceneMesh = 1 << 1,
    ImageTracking = 1 << 2,
    ObjectTracking = 1 << 3
}

export abstract class ARFeature implements IFeature {
    public get name() : string {
        return this._name;
    }

    public get enable() : boolean {
        return this._enable;
    }

    public set enable(value) {
        if (this._enable === value) return;
        this._enable = value;
        if (this._enable) {
            this.onEnable();
        } else {
            this.onDisable();
        }
    }

    public get session() : ARSession {
        return this._session;
    }

    public abstract get featureId() : FeatureType;

    protected _name: string = "";
    protected _enable : boolean = true;
    //protected _support : boolean = false;

    protected _session: ARSession;

    constructor (session : ARSession, config : IFeatureData);
    constructor (session : ARSession, config : IFeatureData, jsonObject : any);
    constructor (session : ARSession, config : IFeatureData | IFeature, jsonObject? : any) {
        this._session = session;
        
        if(config) {
            //this._name = ;
            this._enable = config.enable;

        } else if(jsonObject) {
            this._name = jsonObject.name;
            if(jsonObject.enable) this._enable = jsonObject.enable;

        } else {
            console.log(`constructing feature need use either feature-data or json data`);
        }

        if(this.isJsonConfig(config)) {
            this._name = (config as IFeature).name;
        }
    }

    protected isJsonConfig(config : IFeatureData | IFeature) : boolean {
        if(typeof(config as IFeature)["name"] != "undefined") {
            return true;
        }
        return false;
    }

    init() : void {
        console.log(`init ${this._name}`);
        //this._session.addFeatureConfig(this.featureId);
    }
    start() : void {
        //if(!this._support) return;

        console.log(`start ${this._name}`);
        //this.enable = true;
        if (this._enable) {
            this.onEnable();
        } else {
            this.onDisable();
        }
    }
    update() : void {
        console.log(`update ${this._name}`);
    }

    protected onEnable() {}
    protected onDisable() {}
}