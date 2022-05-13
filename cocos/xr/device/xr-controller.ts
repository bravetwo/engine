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

import { ccclass, help, menu, displayOrder, type, serializable, executeInEditMode, visible, displayName} from 'cc.decorator';
import { Component } from '../../core/components';
import { XrControlEventType, XrEventHandle } from '../event/xr-event-handle';
import { Node } from '../../core/scene-graph/node';
import { Input, input } from '../../input';
import { EventHandle } from '../../input/types';
import { XrInteractor } from '../interaction/xr-interactor';
import { ccenum } from '../../core';

export enum XrEventTypeLeft {
    BUTTON_X = 0,
    BUTTON_Y = 2,
    TRIGGER_LEFT = 4,
    GRIP_LEFT = 6,
    THUMBSTICK_LEFT = 8,
    THUMBSTICK_MOVE_LEFT = 10
};

export enum XrEventTypeRight {
    BUTTON_A = 1,
    BUTTON_B = 3,
    TRIGGER_RIGHT = 5,
    GRIP_RIGHT = 7,
    THUMBSTICK_RIGHT = 9,
    THUMBSTICK_MOVE_RIGHT = 11
};

export enum XrInputDeviceType {
    Left_Hand,
    Right_Hand
};

ccenum(XrEventTypeLeft);
ccenum(XrEventTypeRight);
ccenum(XrInputDeviceType);

/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.XRController')
@help('i18n:cc.XRController')
@menu('XR/Device/XRController')
@executeInEditMode
export class XRController extends Component {
    @serializable
    protected _inputDevice: XrInputDeviceType = XrInputDeviceType.Left_Hand;

    @serializable
    protected _selectActionLeft: XrEventTypeLeft = XrEventTypeLeft.GRIP_LEFT;
    @serializable
    protected _selectActionRight: XrEventTypeRight = XrEventTypeRight.GRIP_RIGHT;

    @serializable
    protected _activateActionLeft: XrEventTypeLeft = XrEventTypeLeft.TRIGGER_LEFT;
    @serializable
    protected _activateActionRight: XrEventTypeRight = XrEventTypeRight.TRIGGER_RIGHT;

    @serializable
    protected _UIPressActionLeft: XrEventTypeLeft = XrEventTypeLeft.TRIGGER_LEFT;
    @serializable
    protected _UIPressActionRight: XrEventTypeRight = XrEventTypeRight.TRIGGER_RIGHT;

    @serializable
    protected _axisToPressThreshold = 0.1; 

    @serializable
    protected _model: Node | null = null;

    private _xrEventHandle: XrEventHandle = new XrEventHandle();
    private _xrInteractor: XrInteractor | null = null;

    @type(XrInputDeviceType)
    @displayOrder(1)
    set inputDevice(val) {
        if (val === this._inputDevice) {
            return;
        }
        this._inputDevice = val;
    }
    get inputDevice() {
        return this._inputDevice;
    }

    @type(XrEventTypeLeft)
    @displayName("SelectAction")
    @visible(function (this: XRController) {
        return this._inputDevice === XrInputDeviceType.Left_Hand;
    })
    @displayOrder(2)
    set selectActionLeft(val) {
        if (val === this._selectActionLeft) {
            return;
        }
        this._selectActionLeft = val;
    }
    get selectActionLeft() {
        return this._selectActionLeft;
    }

    @type(XrEventTypeLeft)
    @displayName("ActivateAction")
    @visible(function (this: XRController) {
        return this._inputDevice === XrInputDeviceType.Left_Hand;
    })
    @displayOrder(3)
    set activateActionLeft(val) {
        if (val === this._activateActionLeft) {
            return;
        }
        this._activateActionLeft = val;
    }
    get activateActionLeft() {
        return this._activateActionLeft;
    }

    @type(XrEventTypeLeft)
    @displayName("UIPressAction")
    @visible(function (this: XRController) {
        return this._inputDevice === XrInputDeviceType.Left_Hand;
    })
    @displayOrder(4)
    set UIPressActionLeft(val) {
        if (val === this._UIPressActionLeft) {
            return;
        }
        this._UIPressActionLeft = val;
    }
    get UIPressActionLeft() {
        return this._UIPressActionLeft;
    }

    @type(XrEventTypeRight)
    @displayName("SelectAction")
    @visible(function (this: XRController) {
        return this._inputDevice === XrInputDeviceType.Right_Hand;
    })
    @displayOrder(2)
    set selectActionRight(val) {
        if (val === this._selectActionRight) {
            return;
        }
        this._selectActionRight = val;
    }
    get selectActionRight() {
        return this._selectActionRight;
    }

    @type(XrEventTypeRight)
    @displayName("ActivateAction")
    @visible(function (this: XRController) {
        return this._inputDevice === XrInputDeviceType.Right_Hand;
    })
    @displayOrder(3)
    set activateActionRight(val) {
        if (val === this._activateActionRight) {
            return;
        }
        this._activateActionRight = val;
    }
    get activateActionRight() {
        return this._activateActionRight;
    }

    @type(XrEventTypeRight)
    @displayName("UIPressAction")
    @visible(function (this: XRController) {
        return this._inputDevice === XrInputDeviceType.Right_Hand;
    })
    @displayOrder(4)
    set UIPressActionRight(val) {
        if (val === this._UIPressActionRight) {
            return;
        }
        this._UIPressActionRight = val;
    }
    get UIPressActionRight() {
        return this._UIPressActionRight;
    }

    @type(Number)
    @displayOrder(5)
    set axisToPressThreshold(val) {
        if (val === this._axisToPressThreshold) {
            return;
        }
        this._axisToPressThreshold = val;
    }
    get axisToPressThreshold() {
        return this._axisToPressThreshold;
    }

    @type(Node)
    @displayOrder(6)
    set model(val) {
        if (val === this._model) {
            return;
        }
        this._model = val;
    }
    get model() {
        return this._model;
    }

    onLoad () {
        if (this.model) {
            const position = this.model.position;
            const rotation = this.model.rotation;
            const scale = this.model.scale;
            this.node.addChild(this.model);
            this.model.setPosition(position);
            this.model.setRotation(rotation);
            this.model.setScale(scale);
            this._xrEventHandle.model = this.model;
        }
    }

    public onEnable() {
        this._xrInteractor = this.getComponent(XrInteractor);
        if (this._inputDevice == XrInputDeviceType.Left_Hand) {
            this.registerInputEvent(this._getInputEventType(this.selectActionLeft), XrControlEventType.SELECT_ENTERED);
            this.registerInputEvent(this._getInputEventType(this.activateActionLeft), XrControlEventType.ACTIVATED);
            this.registerInputEvent(this._getInputEventType(this.UIPressActionLeft), XrControlEventType.UIPRESS_ENTERED);
        } else if (this._inputDevice == XrInputDeviceType.Right_Hand) {
            this.registerInputEvent(this._getInputEventType(this.selectActionRight), XrControlEventType.SELECT_ENTERED);
            this.registerInputEvent(this._getInputEventType(this.activateActionRight), XrControlEventType.ACTIVATED);
            this.registerInputEvent(this._getInputEventType(this.UIPressActionRight), XrControlEventType.UIPRESS_ENTERED);
        }    
    }

    public onDisable() {
        if (this._inputDevice == XrInputDeviceType.Left_Hand) {
            this.unregisterInputEvent(this._getInputEventType(this.selectActionLeft), XrControlEventType.SELECT_ENTERED);
            this.unregisterInputEvent(this._getInputEventType(this.activateActionLeft), XrControlEventType.ACTIVATED);
            this.unregisterInputEvent(this._getInputEventType(this.UIPressActionLeft), XrControlEventType.UIPRESS_ENTERED);
        } else if (this._inputDevice == XrInputDeviceType.Right_Hand) {
            this.unregisterInputEvent(this._getInputEventType(this.selectActionRight), XrControlEventType.SELECT_ENTERED);
            this.unregisterInputEvent(this._getInputEventType(this.activateActionRight), XrControlEventType.ACTIVATED);
            this.unregisterInputEvent(this._getInputEventType(this.UIPressActionRight), XrControlEventType.UIPRESS_ENTERED);
        }    
    }

    protected _getInputEventType(type: XrEventTypeLeft | XrEventTypeRight) {
        var eventType = new Array(2);
        switch (type) {
            case XrEventTypeRight.BUTTON_A:
                eventType[0] = Input.EventType.BUTTON_A_DOWN;
                eventType[1] = Input.EventType.BUTTON_A_UP;
                break;
            case XrEventTypeRight.BUTTON_B:
                eventType[0] = Input.EventType.BUTTON_B_DOWN;
                eventType[1] = Input.EventType.BUTTON_B_UP;
                break;
            case XrEventTypeLeft.BUTTON_X:
                eventType[0] = Input.EventType.BUTTON_X_DOWN;
                eventType[1] = Input.EventType.BUTTON_X_UP;
                break;
            case XrEventTypeLeft.BUTTON_Y:
                eventType[0] = Input.EventType.BUTTON_Y_DOWN;
                eventType[1] = Input.EventType.BUTTON_Y_UP;
                break;
            case XrEventTypeLeft.TRIGGER_LEFT:
                eventType[0] = Input.EventType.TRIGGER_DOWN_LEFT;
                eventType[1] = Input.EventType.TRIGGER_UP_LEFT;
                break;
            case XrEventTypeRight.TRIGGER_RIGHT:
                eventType[0] = Input.EventType.TRIGGER_DOWN_RIGHT;
                eventType[1] = Input.EventType.TRIGGER_UP_RIGHT;
                break;
            case XrEventTypeLeft.GRIP_LEFT:
                eventType[0] = Input.EventType.GRIP_START_LEFT;
                eventType[1] = Input.EventType.GRIP_END_LEFT;
                break;
            case XrEventTypeRight.GRIP_RIGHT:
                eventType[0] = Input.EventType.GRIP_START_RIGHT;
                eventType[1] = Input.EventType.GRIP_END_RIGHT;
                break;
            case XrEventTypeLeft.THUMBSTICK_LEFT:
                eventType[0] = Input.EventType.THUMBSTICK_DOWN_LEFT;
                eventType[1] = Input.EventType.THUMBSTICK_UP_LEFT;
                break;
            case XrEventTypeRight.THUMBSTICK_RIGHT:
                eventType[0] = Input.EventType.THUMBSTICK_DOWN_RIGHT;
                eventType[1] = Input.EventType.THUMBSTICK_UP_RIGHT;
                break;
            default:
                break;
        }

        return eventType;
    }

    public registerInputEvent(eventType: Input.EventType[], xrControlEventType: XrControlEventType) {
        if (eventType.length !== 2) {
            return;
        }
        switch (xrControlEventType) {
            case XrControlEventType.SELECT_ENTERED:
                input.on(eventType[0], this._selectStart, this);
                input.on(eventType[1], this._selectEnd, this);
                break;
            case XrControlEventType.ACTIVATED:
                input.on(eventType[0], this._activateStart, this);
                input.on(eventType[1], this._activateEnd, this);
                break;
            case XrControlEventType.UIPRESS_ENTERED:
                input.on(eventType[0], this._uiPressStart, this);
                input.on(eventType[1], this._uiPressEnd, this);
                break;
            case XrControlEventType.TURNER_ENTERED:
                input.on(eventType[0], this._turnerEntered, this);
                input.on(eventType[1], this._turnerExited, this);
                break;
            default:
                break;
        }
    }

    public unregisterInputEvent(eventType: Input.EventType[], xrControlEventType: XrControlEventType) {
        if (eventType.length !== 2) {
            return;
        }
        switch (xrControlEventType) {
            case XrControlEventType.SELECT_ENTERED:
                input.off(eventType[0], this._selectStart, this);
                input.off(eventType[1], this._selectEnd, this);
                break;
            case XrControlEventType.ACTIVATED:
                input.off(eventType[0], this._activateStart, this);
                input.off(eventType[1], this._activateEnd, this);
                break;
            case XrControlEventType.UIPRESS_ENTERED:
                input.off(eventType[0], this._uiPressStart, this);
                input.off(eventType[1], this._uiPressEnd, this);
                break;
            case XrControlEventType.TURNER_ENTERED:
                input.off(eventType[0], this._turnerEntered, this);
                input.off(eventType[1], this._turnerExited, this);
                break;
            default:
                break;
        }
    }

    protected _selectStart(event: EventHandle) {
        if ((event.type === Input.EventType.GRIP_START_LEFT || event.type === Input.EventType.GRIP_START_RIGHT) && event.value < this._axisToPressThreshold) {
            return;
        }
        this._xrEventHandle.eventHandle = event;
        this._xrInteractor?.selectStart(this._xrEventHandle);
        // xrEvent.selectStart(this._xrEventHandle);
    }

    protected _selectEnd(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        this._xrInteractor?.selectEnd(this._xrEventHandle);
        // xrEvent.selectEnd(this._xrEventHandle);
    }

    protected _activateStart(event: EventHandle) {
        if ((event.type === Input.EventType.GRIP_START_LEFT || event.type === Input.EventType.GRIP_START_RIGHT) && event.value < this._axisToPressThreshold) {
            return;
        }
        this._xrEventHandle.eventHandle = event;
        this._xrInteractor?.activateStart();
        // xrEvent.activateStart(this._xrEventHandle);
    }

    protected _activateEnd(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        this._xrInteractor?.activateEnd();
        // xrEvent.activateEnd();
    }

    protected _uiPressStart(event: EventHandle) {
        if ((event.type === Input.EventType.GRIP_START_LEFT || event.type === Input.EventType.GRIP_START_RIGHT) && event.value < this._axisToPressThreshold) {
            return;
        }
        this._xrInteractor?.uiPressStart();
        // xrEvent.uiPressStart(this._xrEventHandle);
    }

    protected _uiPressEnd(event: EventHandle) {
        this._xrInteractor?.uiPressEnd();
        // xrEvent.uiPressEnd();
    }

    protected _turnerEntered(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        // xrEvent.turnerEntered(this._xrEventHandle);
    }

    protected _turnerExited(event: EventHandle) {
        this._xrEventHandle.eventHandle = event;
        // xrEvent.turnerExited(this._xrEventHandle);
    }
}
