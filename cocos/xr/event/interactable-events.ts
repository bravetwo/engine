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

import { ccclass, help, menu, displayOrder, type, serializable, tooltip} from 'cc.decorator';
import { EventHandler as ComponentEventHandler } from '../../core/components';
import { XrControlEventType, XrEventHandle } from './xr-event-handle';
import { Collider } from '../../physics/framework/components/colliders/collider';
import { IXrInteractable } from '../interaction/xr-interactable';

/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.InteractableEvents')
@help('i18n:cc.InteractableEvents')
@menu('XR/Event/InteractableEvents')
export class InteractableEvents extends IXrInteractable {
    @type([ComponentEventHandler])
    @serializable
    @displayOrder(1)
    @tooltip('i18n:xr.interactable_events.hoverEnterEvents')
    public hoverEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(2)
    @tooltip('i18n:xr.interactable_events.hoverExitEvents')
    public hoverExitEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(3)
    @tooltip('i18n:xr.interactable_events.selectEnterEvents')
    public selectEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(4)
    @tooltip('i18n:xr.interactable_events.selectExitEvents')
    public selectExitEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(5)
    @tooltip('i18n:xr.interactable_events.activeEnterEvents')
    public activeEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(6)
    @tooltip('i18n:xr.interactable_events.activeExitEvents')
    public activeExitEvents: ComponentEventHandler[] = [];

    private _hover = false;

    onLoad () {
        this._colliderCom = this.node.getComponent(Collider);
        if (!this._colliderCom) {
            console.error("this node does not have");
        }
    }

    public onEnable() {
        if (!this._colliderCom) {
            return;
        }
        
        this._colliderCom.on(XrControlEventType.HOVER_ENTERED, this._hoverEntered, this);
        this._colliderCom.on(XrControlEventType.HOVER_EXITED, this._hoverExited, this);
        // xrEvent.on(XrControlEventType.HOVER_CANCELED, this._hoverCanceled, this);
        this._colliderCom.on(XrControlEventType.SELECT_ENTERED, this._selectEntered, this);
        this._colliderCom.on(XrControlEventType.SELECT_EXITED, this._selectExited, this);
        // xrEvent.on(XrControlEventType.SELECT_CANCELED, this._selectCanceled, this);
        this._colliderCom.on(XrControlEventType.ACTIVATED, this._selectEntered, this);
        this._colliderCom.on(XrControlEventType.DEACTIVITED, this._selectExited, this);
        // xrEvent.on(XrControlEventType.ACTIVATE_CANCELED, this._selectCanceled, this);
    }

    public onDisable() {
        if (!this._colliderCom) {
            return;
        }
        this._colliderCom.off(XrControlEventType.HOVER_ENTERED, this._hoverEntered, this);
        this._colliderCom.off(XrControlEventType.HOVER_EXITED, this._hoverExited, this);
        // xrEvent.off(XrControlEventType.HOVER_CANCELED, this._hoverCanceled, this);
        this._colliderCom.off(XrControlEventType.SELECT_ENTERED, this._selectEntered, this);
        this._colliderCom.off(XrControlEventType.SELECT_EXITED, this._selectExited, this);
        // xrEvent.off(XrControlEventType.SELECT_CANCELED, this._selectCanceled, this);
        this._colliderCom.off(XrControlEventType.ACTIVATED, this._selectEntered, this);
        this._colliderCom.off(XrControlEventType.DEACTIVITED, this._selectExited, this);
        // xrEvent.off(XrControlEventType.ACTIVATE_CANCELED, this._selectCanceled, this);
    }

    protected _hoverEntered(event?: XrEventHandle) {
        this._hover = true;
        ComponentEventHandler.emitEvents(this.hoverEnterEvents, event);
    }

    protected _hoverExited(event?: XrEventHandle) {
        this._hover = false;
        ComponentEventHandler.emitEvents(this.hoverExitEvents, event);
    }

    // protected _hoverCanceled(event?: XrEventHandle) {
    //     ComponentEventHandler.emitEvents(this.hoverCancelEvents, event);
    // }

    protected _selectEntered(event?: XrEventHandle) {
        ComponentEventHandler.emitEvents(this.selectEnterEvents, event);
    }

    protected _selectExited(event?: XrEventHandle) {
        ComponentEventHandler.emitEvents(this.selectExitEvents, event);
    }

    // protected _selectCanceled(event?: XrEventHandle) {
    //     ComponentEventHandler.emitEvents(this.selectCancelEvents, event);
    // }

    protected _activeEntered(event?: XrEventHandle) {
        if (this._hover) {
            ComponentEventHandler.emitEvents(this.activeEnterEvents, event);
        }
    }

    protected _activeExited(event?: XrEventHandle) {
        ComponentEventHandler.emitEvents(this.activeExitEvents, event);
    }

    // protected _activeCanceled(event?: XrEventHandle) {
    //     ComponentEventHandler.emitEvents(this.activeCancelEvents, event);
    // }
}