/**
 * @packageDocumentation
 * @module xr
 */

import { ccclass, help, menu, type, visible, displayOrder, serializable} from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Component } from '../core/components/component';
import { Node } from '../core/scene-graph/node';

/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Fri Feb 11 2022 10:29:16 GMT+0800 (中国标准时间)
 * Author = linyuanyi
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/resources/prefab/ui/home/HMDCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

 enum TrackingOriginMode_Type {
    Unbond = 0,
    Device = 1, 
    Floor = 2
}

ccenum(TrackingOriginMode_Type);
 
@ccclass('cc.TrackingOrigin')
@help('i18n:cc.TrackingOrigin')
@menu('XR/TrackingOrigin')
export class TrackingOrigin extends Component {
    @serializable
    protected _offsetObject: Node | null = null; 
    @serializable
    protected _trackingOriginMode : TrackingOriginMode_Type = TrackingOriginMode_Type.Unbond;
    @serializable
    protected _yOffsetValue = 1.36144;

    @type(Node)
    @displayOrder(1)
    set offsetObject(val) {
        if (val === this._offsetObject) {
            return;
        }
        this._setYOffset(0);
        this._offsetObject = val;
        this._setYOffset(this._yOffsetValue);
    }
    get offsetObject() {
        return this._offsetObject;
    }

    @type(TrackingOriginMode_Type)
    @displayOrder(2)
    set trackingOriginMode (val) {
        if (val === this._trackingOriginMode) {
            return;
        }
        this._trackingOriginMode = val;
            if (this._trackingOriginMode === TrackingOriginMode_Type.Floor) {
                this._setYOffset(0);
            } else {
                this._setYOffset(this._yOffsetValue);
            }
    }
    get trackingOriginMode () {
        return this._trackingOriginMode;
    }

    @displayOrder(3)
    @visible(function (this: TrackingOrigin) {
        return this._trackingOriginMode !== TrackingOriginMode_Type.Floor;
    })
    set yOffsetValue (val) {
        if (val === this._yOffsetValue) {
            return;
        }
        this._yOffsetValue = val;
        this._setYOffset(this._yOffsetValue);
    }
    get yOffsetValue () {
        return this._yOffsetValue;
    }

    private _setYOffset(value) {
        if (this._offsetObject) {
            this._offsetObject.position.set(this._offsetObject.position.x, value, this._offsetObject.position.z);
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
