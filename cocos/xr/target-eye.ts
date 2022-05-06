/**
 * @packageDocumentation
 * @module xr
 */

import { ccclass, help, menu, type, executeInEditMode, displayOrder, serializable} from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Component } from '../core/components/component';
import { CameraComponent } from '../core';
import { CameraType } from '../core/renderer/scene/camera';

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

export enum TargetEye_Type {
    BOTH = 0,
    LEFT = 1,
    RIGHT = 2,
    MAINDISPLAY = 3,
}

ccenum(TargetEye_Type);
 
@ccclass('cc.TargetEye')
@help('i18n:cc.TargetEye')
@menu('XR/TargetEye')
@executeInEditMode
export class TargetEye extends Component {
    @serializable
    protected _targetEye : TargetEye_Type = TargetEye_Type.BOTH;

    @type(TargetEye_Type)
    @displayOrder(1)
    set targetEye (val) {
        if (val === this._targetEye) {
            return;
        }
        this._targetEye = val;

        this.setCameraType();
    }
    get targetEye () {
        return this._targetEye;
    }

    setCameraType() {
        let cameraComponent = this.node?.getComponent(CameraComponent);
        if (cameraComponent) {
            switch(this._targetEye) {
                case TargetEye_Type.LEFT:
                    cameraComponent.cameraType = CameraType.LEFT_CAMERA;
                    break;
                case TargetEye_Type.RIGHT:
                    cameraComponent.cameraType = CameraType.RIGHT_CAMERA;
                    break;
                default:
                    cameraComponent.cameraType = CameraType.MAIN;
                    break;
            }
        }
    }

    resetCameraType() {
        let cameraComponent = this.node?.getComponent(CameraComponent);
        if (cameraComponent) {
            cameraComponent.cameraType = CameraType.MAIN;
        }
    }

    public onEnable() { 
        this.setCameraType();
    }

    public onDisable() {
        this.resetCameraType();
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
