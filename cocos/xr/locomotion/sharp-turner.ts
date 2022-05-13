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

import { ccclass, help, menu, displayOrder, type, serializable} from 'cc.decorator';
import { Component } from '../../core/components';
import { Node } from '../../core/scene-graph/node';
import { ccenum, Quat, Vec3 } from '../../core';
import { XRController, XrInputDeviceType } from '../device/xr-controller';
import { Input, input } from '../../input';
import { EventHandle } from '../../input/types/event/event-handle';
import { LocomotionChecker } from './locomotion-checker';
import { degreesToRadians } from '../../core/utils/misc';

enum InputControl_Type {
    PRIMARY_2D_AXIS = 0,
    SECONDARY_2D_AXIS = 1,
}

enum EnableTurnAround_Type {
    ON = 0,
    OFF = 1
}

enum Trigger_Type {
    THUMBSTICK_MOVE = 0,
}

ccenum(InputControl_Type);
ccenum(EnableTurnAround_Type);
ccenum(Trigger_Type);

/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.SharpTurner')
@help('i18n:cc.SharpTurner')
@menu('XR/Locomotion/SharpTurner')
export class SharpTurner extends Component {
    @serializable
    protected _checker: LocomotionChecker | null = null;
    @serializable
    protected _inputDevice: XRController | null = null;
    @serializable
    protected _inputControl: InputControl_Type = InputControl_Type.PRIMARY_2D_AXIS;
    @serializable
    protected _turnAngle: number = 45;
    @serializable
    protected _enableTurnAround: EnableTurnAround_Type = EnableTurnAround_Type.ON;
    @serializable
    protected _activationTimeout: number = 0.5;

    private _waitEnd: boolean = true;
    private _xrSessionNode: Node | undefined = undefined;

    @type(LocomotionChecker)
    @displayOrder(1)
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
    set turnAngle (val) {
        if (val === this._turnAngle) {
            return;
        }
        this._turnAngle = val;
    }
    get turnAngle () {
        return this._turnAngle;
    }

    @type(EnableTurnAround_Type)
    @displayOrder(5)
    set enableTurnAround (val) {
        if (val === this._enableTurnAround) {
            return;
        }
        this._enableTurnAround = val;
    }
    get enableTurnAround () {
        return this._enableTurnAround;
    }

    @displayOrder(6)
    set activationTimeout (val) {
        if (val === this._activationTimeout) {
            return;
        }
        this._activationTimeout = val;
    }
    get activationTimeout () {
        return this._activationTimeout;
    }

    onEnable() {
        if (this._inputControl === InputControl_Type.PRIMARY_2D_AXIS) {
            if (this.inputDevice?.inputDevice == XrInputDeviceType.Left_Hand) {
                input.on(Input.EventType.THUMBSTICK_MOVE_LEFT, this._turnMove, this);
                if (this._enableTurnAround === EnableTurnAround_Type.ON) {
                    input.on(Input.EventType.THUMBSTICK_DOWN_LEFT, this._turnAround, this);
                }
            } else {
                input.on(Input.EventType.THUMBSTICK_MOVE_RIGHT, this._turnMove, this);
                if (this._enableTurnAround === EnableTurnAround_Type.ON) {
                    input.on(Input.EventType.THUMBSTICK_DOWN_RIGHT, this._turnAround, this);
                }
            }
        }
    }

    onDisable() {
        if (this._inputControl === InputControl_Type.PRIMARY_2D_AXIS) {
            if (this.inputDevice?.inputDevice == XrInputDeviceType.Left_Hand) {
                input.off(Input.EventType.THUMBSTICK_MOVE_LEFT, this._turnMove, this);
                if (this._enableTurnAround === EnableTurnAround_Type.ON) {
                    input.off(Input.EventType.THUMBSTICK_DOWN_LEFT, this._turnAround, this);
                }
            } else {
                input.off(Input.EventType.THUMBSTICK_MOVE_RIGHT, this._turnMove, this);
                if (this._enableTurnAround === EnableTurnAround_Type.ON) {
                    input.off(Input.EventType.THUMBSTICK_DOWN_RIGHT, this._turnAround, this);
                }
            }
        }
    }

    private _turnMove(event: EventHandle) {
        this._xrSessionNode = this._checker?.getSession(this.uuid)?.node;
        if (!this._xrSessionNode || !this._waitEnd) {
            return;
        }
        const out = new Quat;
        if (event.x < 0) {
            Quat.rotateAround(out, this._xrSessionNode.rotation, Vec3.UP, degreesToRadians(this._turnAngle));
        } else if (event.x > 0) {
            Quat.rotateAround(out, this._xrSessionNode.rotation, Vec3.UP, degreesToRadians(-this._turnAngle));
        }
        this._xrSessionNode.setRotation(out);
        // 延时
        this._waitEnd = false;
        this.scheduleOnce(() => {
            this._waitTimeout()
        }, this._activationTimeout);
    }

    private _turnAround(event: EventHandle) {
        this._xrSessionNode = this._checker?.getSession(this.uuid)?.node;
        if (!this._xrSessionNode) {
            return;
        }
        const out = new Quat;
        Quat.rotateAround(out, this._xrSessionNode.rotation, Vec3.UP, degreesToRadians(180));
        this._xrSessionNode.setRotation(out);
    }

    private _waitTimeout() {
        this._waitEnd = true;
    }
}