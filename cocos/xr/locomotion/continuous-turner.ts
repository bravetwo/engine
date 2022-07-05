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

import { ccclass, help, menu, displayOrder, serializable, tooltip, executeInEditMode} from 'cc.decorator';
import { Node } from '../../core/scene-graph/node';
import { Quat, Vec2, Vec3 } from '../../core';
import { XrInputDeviceType } from '../device/xr-controller';
import { input, Input } from '../../input/input';
import { EventHandle } from '../../input/types/event/event-handle';
import { degreesToRadians } from '../../core/utils/misc';
import { InputControl_Type, LocomotionBase } from './locomotion-base';

enum TurnDir {
    OFF = 0,
    Left = 1,
    Right = 2
}

/**
 * @en 连续转弯控制
 * @zh Continuous turn control
 */
@ccclass('cc.ContinuousTurner')
@help('i18n:cc.ContinuousTurner')
@menu('XR/Locomotion/ContinuousTurner')
@executeInEditMode
export class ContinuousTurner extends LocomotionBase {
    @serializable
    protected _turnSpeed = 60;

    private _isTurn: TurnDir = TurnDir.OFF;
    private _xrSessionNode: Node | undefined = undefined;

    @displayOrder(4)
    @tooltip('i18n:xr.continuous_turner.turnSpeed')
    set turnSpeed (val) {
        if (val === this._turnSpeed) {
            return;
        }
        this._turnSpeed = val;
    }
    get turnSpeed () {
        return this._turnSpeed;
    }


    onEnable() {
        this._findChecker();
        input.on(Input.EventType.HANDLE_INPUT, this._dispatchEventHandleInput, this);
    }

    onDisable() {
        input.off(Input.EventType.HANDLE_INPUT, this._dispatchEventHandleInput, this);
    }

    private _dispatchEventHandleInput(event: EventHandle) {
        const handleInputDevice = event.handleInputDevice;
        var value;
        if (this._inputControl === InputControl_Type.PRIMARY_2D_AXIS) {
            if (this.inputDevice?.inputDevice == XrInputDeviceType.Left_Hand) {
                value = handleInputDevice.leftStick.getValue();
            } else {
                value = handleInputDevice.rightStick.getValue();
            }
        }

        if (value.equals(Vec2.ZERO)) {
            this._turnOff();
        } else {
            this._turnOn(value);
        }
    }

    private _turnOn(event: Vec2) {
        this._xrSessionNode = this._checker?.getSession(this.uuid)?.node;
        if (event.x < 0) {
            this._isTurn = TurnDir.Left;
        } else if (event.x > 0) {
            this._isTurn = TurnDir.Right;
        } else {
            this._isTurn = TurnDir.OFF;
        }
    }

    private _turnOff() {
        this._isTurn = TurnDir.OFF;
    }

    update(dt: number) {
        if (!this._xrSessionNode || this._isTurn === TurnDir.OFF) {
            return;
        }

        const out = new Quat;
        switch (this._isTurn) {
            case TurnDir.Left:
                Quat.rotateAroundLocal(out, this._xrSessionNode.rotation, Vec3.UP, degreesToRadians(this._turnSpeed * dt));
                break;
            case TurnDir.Right:
                Quat.rotateAroundLocal(out, this._xrSessionNode.rotation, Vec3.UP, degreesToRadians(-this._turnSpeed * dt));
                break;
            default:
                break;
        }

        this._xrSessionNode.setRotation(out);
    }
}