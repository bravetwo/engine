import { ccclass, help, menu, displayOrder, serializable, tooltip, type, executeInEditMode} from 'cc.decorator';
import { UITransform } from '../../2d/framework/ui-transform';
import { Component } from "../../core";
import { BoxCollider, Collider, ERigidBodyType } from "../../physics/framework";
import { XrControlEventType, XrEventHandle, XrUIPressEvent, XrUIPressEventType } from '../event/xr-event-handle';

@ccclass('cc.RaycastChecker')
@help('i18n:cc.RaycastChecker')
@menu('XR/UX/RaycastChecker')
@executeInEditMode
export class RaycastChecker extends Component {
    @serializable
    private _ignoreReversedUI = false;

    @type(Boolean)
    @displayOrder(1)
    @tooltip('i18n:xr.raycast_checker.ignoreReversedUI')
    set ignoreReversedUI(val) {
        if (val === this._ignoreReversedUI) {
            return;
        }
        this._ignoreReversedUI = val;
    }
    get ignoreReversedUI() {
        return this._ignoreReversedUI;
    }

    private _collider: Collider | null = null;
    private _event: XrUIPressEvent = new XrUIPressEvent("XrUIPressEvent");

    onLoad() {
        if (this.node.getComponent(Collider)) {
            return;
        }
        const collider = this.node.addComponent(BoxCollider);
        const uiTransform = this.node.getComponent(UITransform);
        if (uiTransform) {
            collider.center.set(0, 0, 0);
            collider.size.set(uiTransform.width, uiTransform.height, 0.01);
        }  
    }

    onEnable() {
        this._collider = this.node.getComponent(Collider);
        if (this._collider) {
            this._collider.on(XrControlEventType.HOVER_ENTERED, this._hoverEnter, this);
            this._collider.on(XrControlEventType.HOVER_EXITED, this._hoverExit, this);
            this._collider.on(XrControlEventType.HOVER_STAY, this._hoverStay, this);
            this._collider.on(XrControlEventType.UIPRESS_ENTERED, this._uiPressEnter, this);
            this._collider.on(XrControlEventType.UIPRESS_EXITED, this._uiPressExit, this);
        }
        if (this._collider?.attachedRigidBody) {
            this._collider.attachedRigidBody.type = ERigidBodyType.KINEMATIC;
            this._collider.attachedRigidBody.useGravity = false;
        }
    }

    onDisable() {
        if (this._collider) {
            this._collider.off(XrControlEventType.HOVER_ENTERED, this._hoverEnter, this);
            this._collider.off(XrControlEventType.HOVER_EXITED, this._hoverExit, this);
            this._collider.off(XrControlEventType.HOVER_STAY, this._hoverStay, this);
            this._collider.off(XrControlEventType.UIPRESS_ENTERED, this._uiPressEnter, this);
            this._collider.off(XrControlEventType.UIPRESS_EXITED, this._uiPressExit, this);
        }
    }

    update() {
        // Update node position synchronize collision box position (Note: only update parent node position does not synchronize collision box position)
        this.node.setWorldPosition(this.node.worldPosition);
        this.node.setWorldRotation(this.node.worldRotation);
    }
    
    private _hoverEnter(event: XrEventHandle) {
        this._event.deviceType = event.deviceType;
        this._event.hitPoint.set(event.hitPoint);
        this.node.emit(XrUIPressEventType.XRUI_HOVER_ENTERED, this._event);
    }

    private _hoverExit() {
        this.node.emit(XrUIPressEventType.XRUI_HOVER_EXITED, this);
    }

    private _hoverStay(event: XrEventHandle) {
        this._event.deviceType = event.deviceType;
        this._event.hitPoint.set(event.hitPoint);
        this.node.emit(XrUIPressEventType.XRUI_HOVER_STAY, this._event);
    }

    private _uiPressEnter(event: XrEventHandle) {
        this._event.deviceType = event.deviceType;
        this._event.hitPoint.set(event.hitPoint);
        this.node.emit(XrUIPressEventType.XRUI_CLICK, this._event);
    }

    private _uiPressExit() {
        this.node.emit(XrUIPressEventType.XRUI_UNCLICK, this);
    }
}