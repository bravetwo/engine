import { ccclass, help, menu, displayOrder, type, serializable } from 'cc.decorator';
import { BoxColliderComponent, CapsuleColliderComponent, CylinderColliderComponent, MeshColliderComponent } from '../physics/framework/deprecated';
import { ccenum } from '../core';
import { Component } from '../core/components';
import { Node } from '../core/scene-graph/node';
import { ICollisionEvent, ITriggerEvent } from '../physics/framework/physics-interface';
import { XrControlEventType, XrEventHandle } from './xr-event-handle';
import { xrEvent } from './xr-event';
import { InteractorEvents } from './interactor-events';
import { Collider } from '../physics/framework/components/colliders/collider';
import { XrInteractor } from './xr-interactor';
import { XrInteractable } from './xr-interactable';

enum SelectActionTrigger_Type {
    State = 0,
    State_Change = 1,
    Toggle = 2,
    Sticky = 3
}

ccenum(SelectActionTrigger_Type)

@ccclass('cc.DirectInteractor')
@help('i18n:cc.DirectInteractor')
@menu('XR/DirectInteractor')
export class DirectInteractor extends XrInteractor {
    // @serializable
    // protected _keepSelectedTargetValid: boolean = false;
    // @serializable
    // protected _hideControllerOnSelect: boolean = false;
    @serializable
    protected _startingSelectedInteractable: Node | null = null;

    private _colliderCom: any = null;
    private _directHitCollider: Collider | null = null;

    // @displayOrder(3)
    // set keepSelectedTargetValid(val) {
    //     if (val === this._keepSelectedTargetValid) {
    //         return;
    //     }
    //     this._keepSelectedTargetValid = val;
    // }
    // get keepSelectedTargetValid() {
    //     return this._keepSelectedTargetValid;
    // }

    // @displayOrder(4)
    // set hideControllerOnSelect(val) {
    //     if (val === this._hideControllerOnSelect) {
    //         return;
    //     }
    //     this._hideControllerOnSelect = val;
    // }
    // get hideControllerOnSelect() {
    //     return this._hideControllerOnSelect;
    // }

    @type(Node)
    @displayOrder(5)
    set startingSelectedInteractable(val) {
        if (val === this._startingSelectedInteractable) {
            return;
        }
        this._startingSelectedInteractable = val;
    }
    get startingSelectedInteractable() {
        return this._startingSelectedInteractable;
    }

    onLoad() {
        this._colliderCom = this.node.getComponent(Collider);
        if (!this._colliderCom) {
            console.error("this node does not have");
        }
    }

    onEnable() {
        this._interactorEvents = this.getComponent(InteractorEvents);
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

    protected _judgeHit() {
        if (this._directHitCollider) {
            return false;
        }
        // 判断碰撞盒是否存在interactable
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
        // SelectActionType为STATE时，每次都触发
        if (this._directHitCollider && this._selectActionTrigger === SelectActionTrigger_Type.State && this._stateState) {
            // 判断碰撞盒是否存在interactable
            const xrInteractable = this._directHitCollider?.getComponent(XrInteractable);
            if (xrInteractable) {
                // 判断是否已经触发物体
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

    public uiPressStart() {
        this._directHitCollider?.emit(XrControlEventType.UIPRESS_ENTERED, this._event);
    }

    public uiPressEnd() {
        this._directHitCollider?.emit(XrControlEventType.UIPRESS_EXITED, this._event);
    }
}