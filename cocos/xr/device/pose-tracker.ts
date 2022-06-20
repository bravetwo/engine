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

import { ccclass, help, menu, type, displayOrder, serializable, executeInEditMode, tooltip } from 'cc.decorator';
import { ccenum } from '../../core/value-types/enum';
import { Component } from '../../core/components/component';
import { Input, input } from '../../input';
import { EventHandle } from '../../input/types';
import { Mat4, Quat, Vec3 } from '../../core/math';
import { CameraComponent } from '../../core';
import { EDITOR } from 'internal:constants';

enum TrackingSource_Type {
    VIEW_POSE_ACTIVE_LEFT = 0,
    VIEW_POSE_ACTIVE_RIGHT = 1,
    VIEW_POSE_ACTIVE_HMD = 2,
    HAND_POSE_ACTIVE_LEFT = 3,
    HAND_POSE_ACTIVE_RIGHT = 4,
}

enum TrackingType_Type {
    POSITION_AND_ROTATION = 1,
    POSITION = 2,
    ROTATION = 3
}

enum UpdateType_Type {
    UPDATE_AND_BEFORE_RENDER = 0,
    UPDATE_ONLY = 1,
    BEFORE_RENDER_ONLY = 2
}

ccenum(TrackingSource_Type);
ccenum(TrackingType_Type);
ccenum(UpdateType_Type);
 
/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.PoseTracker')
@help('i18n:cc.PoseTracker')
@menu('XR/Device/PoseTracker')
@executeInEditMode
export class PoseTracker extends Component {
    @serializable
    protected _trackingSource : TrackingSource_Type = TrackingSource_Type.HAND_POSE_ACTIVE_LEFT;
    @serializable
    protected _trackingType : TrackingType_Type = TrackingType_Type.POSITION_AND_ROTATION;

    @type(TrackingSource_Type)
    @displayOrder(1)
    @tooltip('i18n:xr.pose_tracker.trackingSource')
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
    @tooltip('i18n:xr.pose_tracker.trackingType')
    set trackingType (val) {
        if (val === this._trackingType) {
            return;
        }
        this._trackingType = val;
    }
    get trackingType () {
        return this._trackingType;
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
            input.on(Input.EventType.AIM_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_RIGHT) {
            this.setCameraHMD(false);
            input.on(Input.EventType.AIM_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
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
            input.off(Input.EventType.AIM_POSE_ACTIVE_LEFT, this._dispatchEventPose, this);
        } else if (this.trackingSource === TrackingSource_Type.HAND_POSE_ACTIVE_RIGHT) {
            input.off(Input.EventType.AIM_POSE_ACTIVE_RIGHT, this._dispatchEventPose, this);
        }
    }

    private _dispatchEventPose(eventHandle: EventHandle) {
        this._quatPose.set(eventHandle.quaternionX, eventHandle.quaternionY, eventHandle.quaternionZ, eventHandle.quaternionW);

        if (this._trackingType === TrackingType_Type.POSITION_AND_ROTATION) {
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

    update() {
        if (!EDITOR) {
            this.node.setRTS(this._quatPose, this._positionPose, Vec3.ONE);
        }
    }
}
