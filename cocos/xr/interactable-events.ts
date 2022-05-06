import { ccclass, help, menu, displayOrder, type, serializable} from 'cc.decorator';
import { BoxColliderComponent, CapsuleColliderComponent, CylinderColliderComponent, MeshColliderComponent } from '../physics/framework/deprecated';
import { Component, EventHandler as ComponentEventHandler } from '../core/components';
import { XrControlEventType, XrEventHandle } from './xr-event-handle';
import { Vec3 } from '../core/math/vec3';
import { xrEvent } from './xr-event';
import { Collider } from '../physics/framework/components/colliders/collider';
import { IXrInteractable } from './xr-interactable';

@ccclass('cc.InteractableEvents')
@help('i18n:cc.InteractableEvents')
@menu('XR/InteractableEvents')
export class InteractableEvents extends IXrInteractable {
    @type([ComponentEventHandler])
    @serializable
    @displayOrder(1)
    public hoverEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(2)
    public hoverExitEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(3)
    public selectEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(4)
    public selectExitEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(5)
    public activeEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(6)
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