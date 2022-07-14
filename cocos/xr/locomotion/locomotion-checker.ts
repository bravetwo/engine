/*
 Copyright (c) 2022-2022 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module component/xr
 */

import { ccclass, help, menu, displayOrder, type, serializable, executeInEditMode, tooltip} from 'cc.decorator';
import { Component } from '../../core/components';
import { director } from '../../core/director';
import { TrackingOrigin } from '../device/tracking-origin';
import { Node } from '../../core/scene-graph/node';

/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.LocomotionChecker')
@help('i18n:cc.LocomotionChecker')
@menu('XR/Locomotion/LocomotionChecker')
@executeInEditMode
export class LocomotionChecker extends Component {
    @serializable
    protected _timeout = 10;
    @serializable
    protected _xrAgent: Node | null = null;

    private _accupyId: string = "";
    private _time = 0;
   
    @displayOrder(1)
    @tooltip('i18n:xr.locomotion_checker.timeout')
    set timeout (val) {
        if (val === this._timeout) {
            return;
        }
        this._timeout = val;
    }
    get timeout () {
        return this._timeout;
    }

    @type(Node)
    @displayOrder(2)
    @tooltip('i18n:xr.locomotion_checker.xrAgent')
    set XR_Agent (val) {
        if (val === this._xrAgent) {
            return;
        }
        this._xrAgent = val;
    }
    get XR_Agent () {
        return this._xrAgent;
    }

    public onEnable() {
        if (!this._xrAgent) {
            const scene = director.getScene() as any;
            if (scene) {
                const agent = scene.getComponentInChildren(TrackingOrigin).node;
                if (agent) {
                    this._xrAgent = agent;
                }
            } 
        }
    }
    
    public getSession (inId: string) {
        if (this._accupyId === "" || this._accupyId === inId) {
            this._accupyId = inId;
            this._time = 0;
            return this._xrAgent;
        }
        return null;
    }

    update(dt: number) {
        this._time += dt;
        if (this._time >= this._timeout) {
            this._accupyId = "";
            this._time = 0;
        }
    }
}