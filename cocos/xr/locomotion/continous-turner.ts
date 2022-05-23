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
import { Component } from '../../core/components';
import { Node } from '../../core/scene-graph/node';
import { ccenum, director, Quat, Vec3 } from '../../core';
import { XRController, XrInputDeviceType } from '../device/xr-controller';
import { LocomotionChecker } from './locomotion-checker';
import { input, Input } from '../../input/input';
import { EventHandle } from '../../input/types/event/event-handle';
import { degreesToRadians } from '../../core/utils/misc';

enum TurnDir {
    OFF = 0,
    Left = 1,
    Right = 2
}

enum InputControl_Type {
    PRIMARY_2D_AXIS = 0,
    SECONDARY_2D_AXIS = 1,
}
ccenum(InputControl_Type);

/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.ContinousTurner')
@help('i18n:cc.ContinousTurner')
@menu('XR/Locomotion/ContinousTurner')
@executeInEditMode
export class ContinousTurner extends Component {
    @serializable
    protected _checker: LocomotionChecker | null = null;
    @serializable
    protected _inputDevice: XRController | null = null;
    @serializable
    protected _inputControl: InputControl_Type = InputControl_Type.PRIMARY_2D_AXIS;
    @serializable
    protected _turnSpeed = 60;

    private _isTurn: TurnDir = TurnDir.OFF;
    private _xrSessionNode: Node | undefined = undefined;

    @type(LocomotionChecker)
    @displayOrder(1)
    @tooltip('i18n:xr.continous_turner.checker')
    set checker (val) {
        if (val === this._checker) {
            return;
        }
        this._checker = val;
    }
    get checker () {
        return this._checker;
    }

    @type(XRController)
    @displayOrder(2)
    @tooltip('i18n:xr.continous_turner.inputDevice')
    set inputDevice (val) {
        if (val === this._inputDevice) {
            return;
        }
        this._inputDevice = val;
    }
    get inputDevice () {
        return this._inputDevice;
    }

    @type(InputControl_Type)
    @displayOrder(3)
    @tooltip('i18n:xr.continous_turner.inputControl')
    set inputControl (val) {
        if (val === this._inputControl) {
            return;
        }
        this._inputControl = val;
    }
    get inputControl () {
        return this._inputControl;
    }

    @displayOrder(4)
    @tooltip('i18n:xr.continous_turner.turnSpeed')
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
        if (!this._checker) {
            const scene = director.getScene() as any;
            if (scene) {
                const checker = scene.getComponentInChildren(LocomotionChecker);
                if (checker) {
                    this._checker = checker;
                }
            } 
        }
        if (this._inputControl === InputControl_Type.PRIMARY_2D_AXIS) {
            if (this.inputDevice?.inputDevice == XrInputDeviceType.Left_Hand) {
                input.on(Input.EventType.THUMBSTICK_MOVE_LEFT, this._turnOn, this);
                input.on(Input.EventType.THUMBSTICK_MOVE_END_LEFT, this._turnOff, this);
            } else {
                input.on(Input.EventType.THUMBSTICK_MOVE_RIGHT, this._turnOn, this);
                input.on(Input.EventType.THUMBSTICK_MOVE_END_RIGHT, this._turnOff, this);
            }
        }
    }

    onDisable() {
        if (this._inputControl === InputControl_Type.PRIMARY_2D_AXIS) {
            if (this.inputDevice?.inputDevice == XrInputDeviceType.Left_Hand) {
                input.off(Input.EventType.THUMBSTICK_MOVE_LEFT, this._turnOn, this);
                input.off(Input.EventType.THUMBSTICK_MOVE_END_LEFT, this._turnOff, this);
            } else {
                input.off(Input.EventType.THUMBSTICK_MOVE_RIGHT, this._turnOn, this);
                input.off(Input.EventType.THUMBSTICK_MOVE_END_RIGHT, this._turnOff, this);
            }
        }
    }

    private _turnOn(event: EventHandle) {
        this._xrSessionNode = this._checker?.getSession(this.uuid)?.node;
        if (event.x < 0) {
            this._isTurn = TurnDir.Left;
        } else if (event.x > 0) {
            this._isTurn = TurnDir.Right;
        } else {
            this._isTurn = TurnDir.OFF;
        }
    }

    private _turnOff(event: EventHandle) {
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