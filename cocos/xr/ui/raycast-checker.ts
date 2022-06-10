import { ccclass, help, menu, displayOrder, serializable, tooltip, executeInEditMode, type} from 'cc.decorator';
import { ccenum, Component, Vec3, EventHandler as ComponentEventHandler, sys, CameraComponent, Quat } from "../../core";
import { Collider, ERigidBodyType, RigidBody } from "../../physics/framework";
import { XrControlEventType, XrEventHandle, XrUIPressEvent, XrUIPressEventType } from '../event/xr-event-handle';
import { Node } from '../../core/scene-graph/node';
import { RenderRoot2D } from '../../2d';

@ccclass('cc.RaycastChecker')
@help('i18n:cc.RaycastChecker')
@menu('XR/UI/RaycastChecker')
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

    /**
     * @en
     * If Button is clicked, it will trigger event's handler.
     *
     * @zh
     * 按钮的点击事件列表。
     */
    //  @type([ComponentEventHandler])
    //  @serializable
    //  @displayOrder(1)
    //  public events: ComponentEventHandler[] = [];

    // onLoad() {
    //     console.log("xr0207 onLoad");
    //     switch (this._type) {
    //         case UI3DType.BUTTON:
    //             this._collider = this.node.addComponent(BoxCollider);
    //             break;
    //         default:
    //             break;
    //     }
    //     if (this._collider) {
    //         // this._collider.isTrigger = false;
    //         this._collider.center.set(0, 0, 0);

    //         const uiTransform = this.node.getComponent(UITransform);
    //         // const box = this._collider as BoxCollider;
    //         if (uiTransform) {
    //             this._collider.size.set(uiTransform?.width, uiTransform?.height, 1);
    //             console.log("xr0207 onLoad : " + uiTransform?.width + " " + uiTransform?.height + "  " + this._collider.size);
    //         }

    //         const co = this.node.getComponent(BoxCollider);
    //         if (co) {
    //             console.log("xr0207 co is not null");
    //         }

    //         this._collider.on(XrControlEventType.HOVER_ENTERED, this._hoverEnter, this);
    //         this._collider.on(XrControlEventType.HOVER_EXITED, this._hoverExit, this);
    //     }
    // }

    onLoad() {
        this._collider = this.node.getComponent(Collider);
        if (this._collider) {
            this._collider.on(XrControlEventType.HOVER_ENTERED, this._hoverEnter, this);
            this._collider.on(XrControlEventType.HOVER_EXITED, this._hoverExit, this);
            this._collider.on(XrControlEventType.HOVER_STAY, this._hoverStay, this);
            this._collider.on(XrControlEventType.UIPRESS_ENTERED, this._uiPressEnter, this);
            this._collider.on(XrControlEventType.UIPRESS_EXITED, this._uiPressExit, this);
        }
    }

    onDestroy() {
        if (this._collider) {
            this._collider.off(XrControlEventType.HOVER_ENTERED, this._hoverEnter, this);
            this._collider.off(XrControlEventType.HOVER_EXITED, this._hoverExit, this);
            this._collider.off(XrControlEventType.HOVER_STAY, this._hoverStay, this);
            this._collider.off(XrControlEventType.UIPRESS_ENTERED, this._uiPressEnter, this);
            this._collider.off(XrControlEventType.UIPRESS_EXITED, this._uiPressExit, this);
        }
    }

    onEnable() {
        if (this._collider?.attachedRigidBody) {
            this._collider.attachedRigidBody.type = ERigidBodyType.KINEMATIC;
            this._collider.attachedRigidBody.useGravity = false;
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