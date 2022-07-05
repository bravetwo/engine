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

import { ccclass, help, menu, displayOrder, type, serializable, executeInEditMode, visible, displayName, tooltip } from 'cc.decorator';
import { Component } from '../../core/components';
import { DeviceType, XrControlEventType, XrEventHandle } from '../event/xr-event-handle';
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

export enum InteractorEventType {
    Select = 0,
    Activate = 1,
    UIPress = 2
};

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

    private _xrEventHandle: XrEventHandle = new XrEventHandle("xrEventHandle");
    private _xrInteractor: XrInteractor | null = null;
    private _selectState = 0;
    private _activateState = 0;
    private _uiPressState = 0;

    @type(XrInputDeviceType)
    @displayOrder(1)
    @tooltip('i18n:xr.xr_controller.inputDevice')
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
    @tooltip('i18n:xr.xr_controller.selectActionLeft')
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
    @tooltip('i18n:xr.xr_controller.activateActionLeft')
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
    @tooltip('i18n:xr.xr_controller.UIPressActionLeft')
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
    @tooltip('i18n:xr.xr_controller.selectActionRight')
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
    @tooltip('i18n:xr.xr_controller.activateActionRight')
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
    @tooltip('i18n:xr.xr_controller.UIPressActionRight')
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
    @tooltip('i18n:xr.xr_controller.axisToPressThreshold')
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
    @tooltip('i18n:xr.xr_controller.model')
    set model(val) {
        if (val === this._model) {
            return;
        }
        this._model = val;
    }
    get model() {
        return this._model;
    }

    onLoad() {
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
        input.on(Input.EventType.HANDLE_INPUT, this._dispatchEventHandleInput, this);

        this._xrInteractor = this.getComponent(XrInteractor);
        if (this._inputDevice == XrInputDeviceType.Left_Hand) {
            if (this._xrInteractor) {
                this._xrInteractor.event.deviceType = DeviceType.Left;
            }
        } else if (this._inputDevice == XrInputDeviceType.Right_Hand) {
            if (this._xrInteractor) {
                this._xrInteractor.event.deviceType = DeviceType.Right;
            }
        }
    }

    public onDisable() {
        input.off(Input.EventType.HANDLE_INPUT, this._dispatchEventHandleInput, this);
    }

    private _dispatchEventHandleInput(event: EventHandle) {
        if (this._inputDevice == XrInputDeviceType.Left_Hand) {
            this._handleInputEvent(InteractorEventType.Select, this.selectActionLeft, event);
            this._handleInputEvent(InteractorEventType.Activate, this.activateActionLeft, event);
            this._handleInputEvent(InteractorEventType.UIPress, this.UIPressActionLeft, event);
        } else if (this._inputDevice == XrInputDeviceType.Right_Hand) {
            this._handleInputEvent(InteractorEventType.Select, this.selectActionRight, event);
            this._handleInputEvent(InteractorEventType.Activate, this.activateActionRight, event);
            this._handleInputEvent(InteractorEventType.UIPress, this.UIPressActionRight, event);
        }
    }

    private _handleInputEvent(type: InteractorEventType, eventType: XrEventTypeLeft | XrEventTypeRight, event: EventHandle) {
        const handleInputDevice = event.handleInputDevice;
        var value = 0;
        switch (eventType) {
            case XrEventTypeRight.BUTTON_A:
                value = handleInputDevice.buttonSouth.getValue();
                break;
            case XrEventTypeRight.BUTTON_B:
                value = handleInputDevice.buttonEast.getValue();
                break;
            case XrEventTypeLeft.BUTTON_X:
                value = handleInputDevice.buttonWest.getValue();
                break;
            case XrEventTypeLeft.BUTTON_Y:
                value = handleInputDevice.buttonNorth.getValue();
                break;
            case XrEventTypeLeft.TRIGGER_LEFT:
                value = handleInputDevice.triggerLeft.getValue();
                break;
            case XrEventTypeRight.TRIGGER_RIGHT:
                value = handleInputDevice.triggerRight.getValue();
                break;
            case XrEventTypeLeft.GRIP_LEFT:
                handleInputDevice.gripLeft.getValue();
                break;
            case XrEventTypeRight.GRIP_RIGHT:
                value = handleInputDevice.gripRight.getValue();
                break;
            case XrEventTypeLeft.THUMBSTICK_LEFT:
                value = handleInputDevice.buttonLeftStick.getValue();
                break;
            case XrEventTypeRight.THUMBSTICK_RIGHT:
                value = handleInputDevice.buttonRightStick.getValue();
                break;
            default:
                break;
        }
        switch (type) {
            case InteractorEventType.Select:
                if (value) {
                    this._selectStart(eventType, value);
                } else if (this._selectState && !value) {
                    this._selectEnd(value);
                }
                this._selectState = value;
                break;
            case InteractorEventType.Activate:
                if (value) {
                    this._activateStart(eventType, value);
                } else if (this._activateState && !value) {
                    this._activateEnd(value);
                }
                this._activateState = value;
                break;
            case InteractorEventType.UIPress:
                if (value) {
                    this._uiPressStart(eventType, value);
                } else if (this._uiPressState && !value) {
                    this._uiPressEnd(value);
                }
                this._uiPressState = value;
                break;
            default:
                break;
        }
    }

    protected _selectStart(type: XrEventTypeLeft | XrEventTypeRight, value: number) {
        if ((type === XrEventTypeLeft.GRIP_LEFT || type === XrEventTypeLeft.TRIGGER_LEFT
            || type === XrEventTypeRight.GRIP_RIGHT || type === XrEventTypeRight.TRIGGER_RIGHT) 
            && value < this._axisToPressThreshold) {
            return;
        }
        this._xrEventHandle.eventHandle = value;
        this._xrInteractor?.selectStart(this._xrEventHandle);
    }

    protected _selectEnd(value: number) {
        this._xrEventHandle.eventHandle = value;
        this._xrInteractor?.selectEnd(this._xrEventHandle);
    }

    protected _activateStart(type: XrEventTypeLeft | XrEventTypeRight, value: number) {
        if ((type === XrEventTypeLeft.GRIP_LEFT || type === XrEventTypeLeft.TRIGGER_LEFT
            || type === XrEventTypeRight.GRIP_RIGHT || type === XrEventTypeRight.TRIGGER_RIGHT) 
            && value < this._axisToPressThreshold) {
            return;
        }
        this._xrEventHandle.eventHandle = value;
        this._xrInteractor?.activateStart(this._xrEventHandle);
    }

    protected _activateEnd(value: number) {
        this._xrEventHandle.eventHandle = value;
        this._xrInteractor?.activateEnd(this._xrEventHandle);
    }

    protected _uiPressStart(type: XrEventTypeLeft | XrEventTypeRight, value: number) {
        if ((type === XrEventTypeLeft.GRIP_LEFT || type === XrEventTypeLeft.TRIGGER_LEFT
            || type === XrEventTypeRight.GRIP_RIGHT || type === XrEventTypeRight.TRIGGER_RIGHT) 
            && value < this._axisToPressThreshold) {
            return;
        }
        this._xrInteractor?.uiPressEnter(this._xrEventHandle);
    }

    protected _uiPressEnd(value: number) {
        this._xrEventHandle.eventHandle = value;
        this._xrInteractor?.uiPressExit(this._xrEventHandle);
    }
}
