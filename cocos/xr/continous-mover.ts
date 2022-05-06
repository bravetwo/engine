import { ccclass, help, menu, displayOrder, type, serializable} from 'cc.decorator';
import { Component } from '../core/components';
import { Node } from '../core/scene-graph/node';
import { ccenum, Vec2, Vec3 } from '../core';
import { XRController } from './xr-controller';
import { LocomotionChecker } from './locomotion-checker';
import { XrInputDeviceType } from './xr-event';
import { input, Input } from '../input/input';
import { EventHandle } from '../input/types/event/event-handle';

enum InputControl_Type {
    PRIMARY_2D_AXIS = 0,
    SECONDARY_2D_AXIS = 1,
}
ccenum(InputControl_Type);

@ccclass('cc.ContinousMover')
@help('i18n:cc.ContinousMover')
@menu('XR/ContinousMover')
export class ContinousMover extends Component {
    @serializable
    protected _checker: LocomotionChecker | null = null;
    @serializable
    protected _inputDevice: XRController | null = null;
    @serializable
    protected _inputControl: InputControl_Type = InputControl_Type.PRIMARY_2D_AXIS;
    @serializable
    protected _moveSpeed = 1;
    @serializable
    protected _forwardSource: Node | null = null;

    private _isMove: boolean = false;
    private _xrSessionNode: Node | undefined = undefined;
    private _move: Vec2 = new Vec2(0, 0);

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
        Vec3.transformQuat(result, result, this.node.getRotation());
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