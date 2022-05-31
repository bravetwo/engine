import { ccclass, help, menu, displayOrder, serializable, tooltip, executeInEditMode, type} from 'cc.decorator';
import { ccenum, Component, Vec3, EventHandler as ComponentEventHandler } from "../../core";
import { BoxCollider, Collider, EColliderType } from "../../physics/framework";
import { XrControlEventType } from '../event/xr-event-handle';

export enum UI3DType {
    BUTTON
}
ccenum(UI3DType);

// @ccclass('cc.UI3DBase')
// @help('i18n:cc.UI3DBase')
// @menu('XR/UI3DBase')
export class UI3DBase extends Component {
    private _type: UI3DType = UI3DType.BUTTON;
    private _collider: Collider | null = null;

    /**
     * @en
     * If Button is clicked, it will trigger event's handler.
     *
     * @zh
     * 按钮的点击事件列表。
     */
     @type([ComponentEventHandler])
     @serializable
     @displayOrder(1)
     public events: ComponentEventHandler[] = [];

    onLoad() {
        switch (this._type) {
            case UI3DType.BUTTON:
                this._collider = this.node.addComponent(BoxCollider);
                break;
            default:
                break;
        }
        if (this._collider) {
            this._collider.isTrigger = true;
            this._collider.center = new Vec3(0, 0, 0);

            this._collider.on(XrControlEventType.HOVER_ENTERED, this._hoverEnter, this);
            this._collider.on(XrControlEventType.HOVER_EXITED, this._hoverExit, this);
        }
    }

    onDestroy() {
        if (this._collider) {
            this._collider.off(XrControlEventType.HOVER_ENTERED, this._hoverEnter, this);
            this._collider.off(XrControlEventType.HOVER_EXITED, this._hoverExit, this);
        }
    }

    private _hoverEnter() {
        console.log("xr0206 UI3DBase ++++  _hoverEnter");
    }

    private _hoverExit() {
        console.log("xr0206 UI3DBase ++++  _hoverExit");
    }

    public Test() {
        ComponentEventHandler.emitEvents(this.events, this);
        console.log("xr0206 UI3DBase -----  this._collider.node : " + this._collider?.node);
    }
}