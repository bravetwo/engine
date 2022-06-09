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

import { ccclass, help, menu, displayOrder, type, serializable, tooltip } from 'cc.decorator';
import { ccenum } from '../../core';
import { Node } from '../../core/scene-graph/node';
import { ICollisionEvent, ITriggerEvent } from '../../physics/framework/physics-interface';
import { XrControlEventType } from '../event/xr-event-handle';
import { InteractorEvents } from '../event/interactor-events';
import { Collider } from '../../physics/framework/components/colliders/collider';
import { XrInteractor } from './xr-interactor';
import { XrInteractable } from './xr-interactable';

enum SelectActionTrigger_Type {
    State = 0,
    State_Change = 1,
    Toggle = 2,
    Sticky = 3
}

ccenum(SelectActionTrigger_Type)

/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.DirectInteractor')
@help('i18n:cc.DirectInteractor')
@menu('XR/Interaction/DirectInteractor')
export class DirectInteractor extends XrInteractor {
    @serializable
    protected _startingSelectedInteractable: Node | null = null;

    private _colliderCom: any = null;
    private _directHitCollider: Collider | null = null;

    onLoad() {
        this._colliderCom = this.node.getComponent(Collider);
        if (!this._colliderCom) {
            console.error("this node does not have");
        }
    }

    onEnable() {
        this._interactorEvents = this.getComponent(InteractorEvents);
        this._setAttachNode();
        if (this._colliderCom.isTrigger) {
            this._colliderCom.on('onTriggerEnter', this._onTriggerEnterCb, this);
            this._colliderCom.on('onTriggerStay', this._onTriggerEnterCb, this);
            this._colliderCom.on('onTriggerExit', this._onTriggerEnterCb, this);
        } else {
            this._colliderCom.on('onCollisionEnter', this._onCollisionEnterCb, this);
            this._colliderCom.on('onCollisionStay', this._onCollisionEnterCb, this);
            this._colliderCom.on('onCollisionExit', this._onCollisionEnterCb, this);
        }

    }

    onDisable() {
        if (this._colliderCom.isTrigger) {
            this._colliderCom.off('onTriggerEnter', this._onTriggerEnterCb, this);
        } else {
            this._colliderCom.off('onCollisionEnter', this._onCollisionEnterCb, this);
            this._colliderCom.off('onCollisionStay', this._onCollisionEnterCb, this);
            this._colliderCom.off('onCollisionExit', this._onCollisionEnterCb, this);
        }
    }

    protected _setAttachNode() {
        if (this._attachTransform) {
            this._event.attachNode = this._attachTransform;
        } else {
            this._event.attachNode = this.node;
        }
    }

    protected _judgeHit() {
        if (this._directHitCollider) {
            return false;
        }
        // Check whether interacTable exists in the collision box
        const xrInteractable = this._collider?.getComponent(XrInteractable);
        if (xrInteractable) {
            this._beTriggerNode = xrInteractable;
            this._event.triggerId = this.uuid;
            return true;
        }

        return false;
    }

    private _onTriggerEnterCb(event: ITriggerEvent) {
        switch (event.type) {
            case 'onTriggerEnter':
                this._interactorEvents?.hoverEntered(this._event);
                this._directHitCollider = event.otherCollider;
                break;
            case 'onTriggerStay':
                break;
            case 'onTriggerExit':
                this._interactorEvents?.hoverExited(this._event);
                this._directHitCollider = null;
                break;
            default:
                break;
        }
    }

    private _onCollisionEnterCb(event: ICollisionEvent) {
        switch (event.type) {
            case 'onCollisionEnter':
                this._interactorEvents?.hoverEntered(this._event);
                this._directHitCollider = event.otherCollider;
                break;
            case 'onCollisionStay':
                break;
            case 'onCollisionExit':
                this._interactorEvents?.hoverExited(this._event);
                this._directHitCollider = null;
                break;
            default:
                break;
        }
    }

    update(deltaTime: number) {
        // Raised each time when SelectActionType is STATE
        if (this._directHitCollider && this._selectActionTrigger === SelectActionTrigger_Type.State && this._stateState) {
            // Check whether the collision box has an XrInteractable
            const xrInteractable = this._directHitCollider?.getComponent(XrInteractable);
            if (xrInteractable) {
                // Determines if the object has been triggered
                if (!this._judgeTrigger()) {
                    this._beTriggerNode = xrInteractable;
                    this._event.triggerId = this.uuid;
                    this._collider = this._directHitCollider;
                    this._triggerState = true;
                    this._emitSelectEntered();
                    this._directHitCollider = null;
                }
            }
        }
    }

    public activateStart() {
        this._directHitCollider?.emit(XrControlEventType.ACTIVATED, this._event);
    }

    public activateEnd() {
        this._directHitCollider?.emit(XrControlEventType.DEACTIVITED, this._event);
    }

    public uiPressEnter() {
        this._directHitCollider?.emit(XrControlEventType.UIPRESS_ENTERED, this._event);
    }

    public uiPressExit() {
        this._directHitCollider?.emit(XrControlEventType.UIPRESS_EXITED, this._event);
    }
}