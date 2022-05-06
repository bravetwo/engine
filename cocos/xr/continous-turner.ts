import { ccclass, help, menu, displayOrder, type, serializable} from 'cc.decorator';
import { Component } from '../core/components';
import { Node } from '../core/scene-graph/node';
import { ccenum, Quat, Vec3 } from '../core';
import { XRController } from './xr-controller';
import { LocomotionChecker } from './locomotion-checker';
import { XrInputDeviceType } from './xr-event';
import { input, Input } from '../input/input';
import { EventHandle } from '../input/types/event/event-handle';
import { degreesToRadians } from '../core/utils/misc';

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

@ccclass('cc.ContinousTurner')
@help('i18n:cc.ContinousTurner')
@menu('XR/ContinousTurner')
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