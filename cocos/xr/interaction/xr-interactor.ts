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

import { displayOrder, type, serializable, tooltip } from 'cc.decorator';
import { ccenum } from '../../core';
import { Component } from '../../core/components';
import { Node } from '../../core/scene-graph/node';
import { XrControlEventType, XrEventHandle } from '../event/xr-event-handle';
import { InteractorEvents } from '../event/interactor-events';
import { Collider } from '../../physics/framework/components/colliders/collider';
import { IXrInteractable } from './xr-interactable';

export enum SelectActionTrigger_Type {
    State = 0,
    State_Change = 1,
    Toggle = 2,
    Sticky = 3
}

ccenum(SelectActionTrigger_Type)

export class XrInteractor extends Component {
    @serializable
    protected _attachTransform: Node | null = null;
    @serializable
    protected _selectActionTrigger: SelectActionTrigger_Type = SelectActionTrigger_Type.State;

    protected _triggerState: boolean = false;
    protected _stateState: boolean = false;
    protected _interactorEvents: InteractorEvents | null = null;
    protected _event = new XrEventHandle;
    protected _collider: Collider | null = null;
    protected _accupyLine: boolean = false;

    // The triggered object Interactable
    protected _beTriggerNode: IXrInteractable | null = null;

    @type(Node)
    @displayOrder(1)
    @tooltip('i18n:xr.xr_interactor.attachTransform')
    set attachTransform(val) {
        if (val === this._attachTransform) {
            return;
        }
        this._attachTransform = val;
    }
    get attachTransform() {
        return this._attachTransform;
    }

    @type(SelectActionTrigger_Type)
    @displayOrder(12)
    @tooltip('i18n:xr.xr_interactor.selectActionTrigger')
    set selectActionTrigger(val) {
        if (val === this._selectActionTrigger) {
            return;
        }
        this._selectActionTrigger = val;
    }
    get selectActionTrigger() {
        return this._selectActionTrigger;
    }

    protected _judgeHit() {
        return false;
    }

    protected _judgeTrigger() {
        // Determine if the object is captured
        if (!this._beTriggerNode) {
            return false;
        }
        // Has captured the object, judge the captured object, its grasp is its own
        if (this._beTriggerNode.triggerId === this.uuid) {
            return true;
        }
        return false;
    }

    protected _emitSelectEntered() {
        if (this._event) {
            this._interactorEvents?.selectEntered(this._event);
        }
        this._collider?.emit(XrControlEventType.SELECT_ENTERED, this._event);
    }

    private _emitSelectEnd() {
        if (this._event) {
            this._interactorEvents?.selectExited(this._event);
        }
        this._collider?.emit(XrControlEventType.SELECT_EXITED, this._event);
        this._collider = null;
    }

    public selectStart(event: XrEventHandle) {
        this._event.model = event.model;
        this._event.eventHandle = event.eventHandle;

        switch (this._selectActionTrigger) {
            case SelectActionTrigger_Type.State:
                this._stateState = true;
                break;
            case SelectActionTrigger_Type.State_Change:
                if (!this._judgeTrigger()) {
                    if (this._judgeHit()) {
                        this._triggerState = true;
                        this._emitSelectEntered();
                    }
                }
                break;
            case SelectActionTrigger_Type.Toggle:
                if (this._triggerState && this._judgeTrigger()) {
                    this._emitSelectEnd();
                } else {
                    if (this._judgeHit()) {
                        this._triggerState = true;
                        this._emitSelectEntered();
                    }
                }
                break;
            case SelectActionTrigger_Type.Sticky:
                if (this._judgeTrigger()) {
                    this._triggerState = true;
                } else {
                    if (this._judgeHit()) {
                        this._emitSelectEntered();
                    }
                }
                break;
            default:
                break;
        }
    }

    public selectEnd(event: XrEventHandle) {
        this._event.model = event.model;
        this._event.eventHandle = event.eventHandle;
        switch (this._selectActionTrigger) {
            case SelectActionTrigger_Type.State:
                if (this._triggerState) {
                    this._emitSelectEnd();
                    this._triggerState = false;
                }
                this._stateState = false;
                break;
            case SelectActionTrigger_Type.State_Change:
                if (this._triggerState) {
                    this._emitSelectEnd();
                    this._triggerState = false;
                }
                break;
            case SelectActionTrigger_Type.Toggle:
                break;
            case SelectActionTrigger_Type.Sticky:
                if (this._triggerState) {
                    this._emitSelectEnd();
                    this._triggerState = false;
                }
                break;
            default:
                break;
        }
    }

    public activateStart() {
        this._collider?.emit(XrControlEventType.ACTIVATED, this._event);
    }

    public activateEnd() {
        this._collider?.emit(XrControlEventType.DEACTIVITED, this._event);
    }

    public uiPressStart() {
        this._collider?.emit(XrControlEventType.UIPRESS_ENTERED, this._event);
    }

    public uiPressEnd() {
        this._collider?.emit(XrControlEventType.UIPRESS_EXITED, this._event);
    }


}