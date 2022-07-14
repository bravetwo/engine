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
import { ccenum, Quat, Vec2, Vec3 } from '../../core';
import { XrInputDeviceType } from '../device/xr-controller';
import { Input, input } from '../../input';
import { EventHandle } from '../../input/types/event/event-handle';
import { degreesToRadians } from '../../core/utils/misc';
import { InputControl_Type, LocomotionBase } from './locomotion-base';
import { EventGamepad } from '../../input/types/event/event-gamepad';

enum EnableTurnAround_Type {
    ON = 0,
    OFF = 1
}

enum Trigger_Type {
    THUMBSTICK_MOVE = 0,
}

ccenum(EnableTurnAround_Type);
ccenum(Trigger_Type);

/**
 * @en 急转弯控制
 * @zh Sharp turn control
 */
@ccclass('cc.SharpTurner')
@help('i18n:cc.SharpTurner')
@menu('XR/Locomotion/SharpTurner')
export class SharpTurner extends LocomotionBase {
    @serializable
    protected _turnAngle: number = 45;
    @serializable
    protected _enableTurnAround: EnableTurnAround_Type = EnableTurnAround_Type.ON;
    @serializable
    protected _activationTimeout: number = 0.5;

    private _waitEnd: boolean = true;
    private _xrSessionNode: Node | undefined = undefined;
    private _stickClickState = 0;

    @displayOrder(4)
    @tooltip('i18n:xr.sharp_turner.turnAngle')
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
    @tooltip('i18n:xr.sharp_turner.enableTurnAround')
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
    @tooltip('i18n:xr.sharp_turner.activationTimeout')
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
        this._findChecker();
        input.on(Input.EventType.HANDLE_INPUT, this._dispatchEventHandleInput, this);
        input.on(Input.EventType.GAMEPAD_INPUT, this._dispatchEventHandleInput, this);
    }

    onDisable() {
        input.off(Input.EventType.HANDLE_INPUT, this._dispatchEventHandleInput, this);
        input.off(Input.EventType.GAMEPAD_INPUT, this._dispatchEventHandleInput, this);
    }

    private _dispatchEventHandleInput(event: EventHandle | EventGamepad) {
        let handleInputDevice;
        if (event instanceof EventGamepad) {
            handleInputDevice = event.gamepad;
        } else if (event instanceof EventHandle) {
            handleInputDevice = event.handleInputDevice;
        }
        var stickValue;
        var stickClick;
        if (this._inputControl === InputControl_Type.PRIMARY_2D_AXIS) {
            if (this.inputDevice?.inputDevice == XrInputDeviceType.Left_Hand) {
                stickValue = handleInputDevice.leftStick.getValue();
                if (this._enableTurnAround === EnableTurnAround_Type.ON) {
                    stickClick = handleInputDevice.buttonLeftStick.getValue();
                }
            } else {
                stickValue = handleInputDevice.rightStick.getValue();
                if (this._enableTurnAround === EnableTurnAround_Type.ON) {
                    stickClick = handleInputDevice.buttonRightStick.getValue();
                }
            }
        }

        this._turnMove(stickValue);
        if (!this._stickClickState && stickClick) {
            this._turnAround();
        }
        this._stickClickState = stickClick;
    }

    private _turnMove(event: Vec2) {
        const xrAgentNode = this._checker?.getSession(this.uuid);
        if (xrAgentNode) {
            this._xrSessionNode = xrAgentNode;
        }
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

    private _turnAround() {
        const xrAgentNode = this._checker?.getSession(this.uuid);
        if (xrAgentNode) {
            this._xrSessionNode = xrAgentNode;
        }
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