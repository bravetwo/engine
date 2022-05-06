/**
 * @packageDocumentation
 * @module xr
 */

import { ccclass, help, menu, type, visible, displayOrder, serializable, tooltip} from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Component } from '../core/components/component';
import { VideoPlayer } from '../video/video-player';
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
 
@ccclass('cc.MRSight')
@help('i18n:cc.MRSight')
@menu('XR/MRSight')
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

    /**
     * @en Visibility mask, declaring a set of node layers that will be visible to this camera.
     * @zh 可见性掩码，声明在当前相机中可见的节点层级集合。
     */
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

    start () {
        
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
