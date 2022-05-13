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

import { ccclass, help, menu, type, visible, displayOrder, serializable, tooltip} from 'cc.decorator';
import { ccenum } from '../../core/value-types/enum';
import { Component } from '../../core/components/component';
import { Node } from '../../core/scene-graph/node';
import { VideoPlayer } from '../../video';

enum Layer_Type {
    BACK = 0,
    FRONT = 1,
}

enum GateFit_Type {
    FILL = 0,
    OVERSCAN = 1,
    HORIZONTAL = 2,
    VERTICAL = 3,
    MANUAL = 4
}

ccenum(Layer_Type);
ccenum(GateFit_Type);
 
/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.MRSight')
@help('i18n:cc.MRSight')
@menu('XR/Device/MRSight')
export class MRSight extends Component {
    @serializable
    protected _layer : Layer_Type = Layer_Type.BACK;
    @serializable
    protected _streamSource : VideoPlayer = null!;
    @serializable
    protected _targetCamera : Node | null = null;
    @serializable
    protected _perEyeCamera : GateFit_Type = GateFit_Type.FILL;
    @serializable
    protected _scaling = 1.00;

    @type(Layer_Type)
    @displayOrder(1)
    @tooltip('i18n:xr.mrsight.layer')
    set layer (val) {
        if (val === this._layer) {
            return;
        }
        this._layer = val;
    }
    get layer () {
        return this._layer;
    }

    @type(VideoPlayer)
    @displayOrder(2)
    set streamSource (val) {
        if (val === this._streamSource) {
            return;
        }
        this._streamSource = val;
    }
    get streamSource () {
        return this._streamSource;
    }

    @type(Node)
    @displayOrder(3)
    set targetCamera(val) {
        if (val === this._targetCamera) {
            return;
        }
        this._targetCamera = val;
    }
    get targetCamera() {
        return this._targetCamera;
    }    

    @type(GateFit_Type)
    @displayOrder(4)
    set perEyeCamera (val) {
        if (val === this._perEyeCamera) {
            return;
        }
        this._perEyeCamera = val;
    }
    get perEyeCamera () {
        return this._perEyeCamera;
    }

    @visible(function (this: MRSight) {
        return this._perEyeCamera === GateFit_Type.MANUAL;
    })
    @displayOrder(5)
    set scaling (val) {
        if (val === this._scaling) {
            return;
        }
        this._scaling = val;
    }
    get scaling () {
        return this._scaling;
    }
}
