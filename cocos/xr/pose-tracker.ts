/**
 * @packageDocumentation
 * @module xr
 */

import { ccclass, help, menu, type, displayOrder, serializable, executeInEditMode } from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Component } from '../core/components/component';
import { Input, input } from '../input';
import { EventHandle } from '../input/types';
import { Mat4, Quat, Vec3 } from '../core/math';
import { CameraComponent } from '../core';

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

enum TrackingSource_Type {
    VIEW_POSE_ACTIVE_LEFT = 0,
    VIEW_POSE_ACTIVE_RIGHT = 1,
    VIEW_POSE_ACTIVE_HMD = 2,
    HAND_POSE_ACTIVE_LEFT = 3,
    HAND_POSE_ACTIVE_RIGHT = 4,
}

enum TrackingType_Type {
    UP_TO_3DOF = 0,
    UP_TO_6DOF = 1,
}

enum UpdateType_Type {
    UPDATE_AND_BEFORE_RENDER = 0,
    UPDATE_ONLY = 1,
    BEFORE_RENDER_ONLY = 2
}

ccenum(TrackingSource_Type);
ccenum(TrackingType_Type);
ccenum(UpdateType_Type);
 
@ccclass('cc.PoseTracker')
@help('i18n:cc.PoseTracker')
@menu('XR/PoseTracker')
@executeInEditMode
export class PoseTracker extends Component {
    @serializable
    protected _trackingSource : TrackingSource_Type = TrackingSource_Type.HAND_POSE_ACTIVE_LEFT;
    @serializable
    protected _trackingType : TrackingType_Type = TrackingType_Type.UP_TO_6DOF;
    @serializable
    protected _updateType : UpdateType_Type = UpdateType_Type.UPDATE_AND_BEFORE_RENDER;

    @type(TrackingSource_Type)
    @displayOrder(1)
    set trackingSource (val) {
        if (val === this._trackingSource) {
            return;
        }
        this._trackingSource = val;
        if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_LEFT ||
            this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_RIGHT ||
            this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_HMD) {
            this.setCameraHMD(true);
        } else {
            this.setCameraHMD(false);
        }
    }
    get trackingSource () {
        return this._trackingSource;
    }

    @type(TrackingType_Type)
    @displayOrder(2)
    set trackingType (val) {
        if (val === this._trackingType) {
            return;
        }
        this._trackingType = val;
    }
    get trackingType () {
        return this._trackingType;
    }

    @type(UpdateType_Type)
    @displayOrder(3)
    set updateType (val) {
        if (val === this._updateType) {
            return;
        }
        this._updateType = val;
    }
    get updateType () {
        return this._updateType;
    }

    private _quatPose: Quat = new Quat();
    private _positionPose: Vec3 = new Vec3();
    @serializable
    private _ipdOffset = 0;

    set ipdOffset (val) {
        if (val === this._ipdOffset) {
            return;
        }
        this._ipdOffset = val;
    }
    get ipdOffset () {
        return this._ipdOffset;
    }

    setCameraHMD (isHMD: boolean) {
        let cameraComponent = this.node?.getComponent(CameraComponent);
        if (cameraComponent) {
            cameraComponent.isHMD = isHMD;
        }
    }

    onEnable () {
        if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_LEFT) {
            this.setCameraHMD(true);
            input.on(Input.EventType.VIEW_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_RIGHT) {
            this.setCameraHMD(true);
            input.on(Input.EventType.VIEW_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_HMD) {
            this.setCameraHMD(true);
            input.on(Input.EventType.VIEW_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
            input.on(Input.EventType.VIEW_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_LEFT) {
            this.setCameraHMD(false);
            input.on(Input.EventType.HAND_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_RIGHT) {
            this.setCameraHMD(false);
            input.on(Input.EventType.HAND_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        }
    }

    onDisable() {
        this.setCameraHMD(false);
        if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_LEFT) {
            input.off(Input.EventType.VIEW_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_RIGHT) {
            input.off(Input.EventType.VIEW_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.VIEW_POSE_ACTIVE_HMD) {
            input.off(Input.EventType.VIEW_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
            input.off(Input.EventType.VIEW_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_LEFT) {
            input.off(Input.EventType.HAND_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_RIGHT) {
            input.off(Input.EventType.HAND_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        }
    }

    private _dispatchEventPose(eventHandle: EventHandle) {
        this._quatPose.set(eventHandle.quaternionX, eventHandle.quaternionY, eventHandle.quaternionZ, eventHandle.quaternionW);

        if (this._trackingType === TrackingType_Type.UP_TO_6DOF) {
            if (eventHandle.getType() === Input.EventType.VIEW_POSE_ACTIVE_LEFT) {
                this._positionPose.set(eventHandle.x - this._ipdOffset, eventHandle.y, eventHandle.z);
            } else if (eventHandle.getType() === Input.EventType.VIEW_POSE_ACTIVE_RIGHT) {
                this._positionPose.set(eventHandle.x + this._ipdOffset, eventHandle.y, eventHandle.z);
            } else {
                this._positionPose.set(eventHandle.x, eventHandle.y, eventHandle.z);
            }
        } else {
            if (eventHandle.getType() === Input.EventType.VIEW_POSE_ACTIVE_LEFT) {
                this._positionPose.set(-this._ipdOffset, 0, 0);
            } else if (eventHandle.getType() === Input.EventType.VIEW_POSE_ACTIVE_RIGHT) {
                this._positionPose.set(this._ipdOffset, 0, 0);
            } else {
                this._positionPose.set(0, 0, 0);
            }
        }

        this.node.setRTS(this._quatPose, this._positionPose, Vec3.ONE);
        this.node.updateWorldTransform();
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
