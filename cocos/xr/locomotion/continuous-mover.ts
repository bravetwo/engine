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

import { ccclass, help, menu, displayOrder, type, serializable, tooltip, executeInEditMode} from 'cc.decorator';
import { Node } from '../../core/scene-graph/node';
import { Vec2, Vec3 } from '../../core';
import { XrInputDeviceType } from '../device/xr-controller';
import { input, Input } from '../../input/input';
import { EventHandle } from '../../input/types/event/event-handle';
import { InputControl_Type, LocomotionBase } from './locomotion-base';

/**
 * @en 连续移动控制 
 * @zh Continuous movement control
 */
@ccclass('cc.ContinuousMover')
@help('i18n:cc.ContinuousMover')
@menu('XR/Locomotion/ContinuousMover')
@executeInEditMode
export class ContinuousMover extends LocomotionBase {
    @serializable
    protected _moveSpeed = 1;
    @serializable
    protected _forwardSource: Node | null = null;

    private _isMove: boolean = false;
    private _xrSessionNode: Node | undefined = undefined;
    private _move: Vec2 = new Vec2(0, 0);

    @displayOrder(4)
    @tooltip('i18n:xr.continuous_mover.moveSpeed')
    set moveSpeed (val) {
        if (val === this._moveSpeed) {
            return;
        }
        this._moveSpeed = val;
    }
    get moveSpeed () {
        return this._moveSpeed;
    }

    @type(Node)
    @displayOrder(5)
    @tooltip('i18n:xr.continuous_mover.forwardSource')
    set forwardSource (val) {
        if (val === this._forwardSource) {
            return;
        }
        this._forwardSource = val;
    }
    get forwardSource () {
        return this._forwardSource;
    }

    onEnable() {
        this._findChecker();
        if (this._inputControl === InputControl_Type.PRIMARY_2D_AXIS) {
            if (this.inputDevice?.inputDevice == XrInputDeviceType.Left_Hand) {
                input.on(Input.EventType.THUMBSTICK_MOVE_LEFT, this._MoveOn, this);
                input.on(Input.EventType.THUMBSTICK_MOVE_END_LEFT, this._MoveOff, this);
            } else {
                input.on(Input.EventType.THUMBSTICK_MOVE_RIGHT, this._MoveOn, this);
                input.on(Input.EventType.THUMBSTICK_MOVE_END_RIGHT, this._MoveOff, this);
            }
        }
    }

    onDisable() {
        if (this._inputControl === InputControl_Type.PRIMARY_2D_AXIS) {
            if (this.inputDevice?.inputDevice == XrInputDeviceType.Left_Hand) {
                input.off(Input.EventType.THUMBSTICK_MOVE_LEFT, this._MoveOn, this);
                input.off(Input.EventType.THUMBSTICK_MOVE_END_LEFT, this._MoveOff, this);
            } else {
                input.off(Input.EventType.THUMBSTICK_MOVE_RIGHT, this._MoveOn, this);
                input.off(Input.EventType.THUMBSTICK_MOVE_END_RIGHT, this._MoveOff, this);
            }
        }
    }

    private _MoveOn(event: EventHandle) {
        this._xrSessionNode = this._checker?.getSession(this.uuid)?.node;
        this._move.set(event.x, event.y);
        this._isMove = true;
    }

    private _MoveOff(event: EventHandle) {
        this._isMove = false;
    }

    private _getDirection (x: number, y: number, z: number) {
        const result = new Vec3(x, y, z);
        if (this._forwardSource) {
            Vec3.transformQuat(result, result, this._forwardSource.getRotation());
        } else {
            Vec3.transformQuat(result, result, this.node.getRotation());
        }
        return result;
    }

    update(dt: number) {
        if (!this._xrSessionNode || !this._isMove) {
            return;
        }

        const position = this._xrSessionNode.getPosition();
        Vec3.scaleAndAdd(position, position, this._getDirection(this._move.x, 0, -this._move.y), this._moveSpeed * dt);
        this._xrSessionNode.setPosition(position);
    }
}