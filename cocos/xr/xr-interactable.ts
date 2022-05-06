import { ccclass, help, menu, displayOrder, type, serializable, tooltip, visible} from 'cc.decorator';
import { BoxColliderComponent, CapsuleColliderComponent, CylinderColliderComponent, MeshColliderComponent } from '../physics/framework/deprecated';
import { ccenum } from '../core';
import { Component, EventHandler as ComponentEventHandler } from '../core/components';
import { Node } from '../core/scene-graph/node';
import { Collider } from '../physics/framework/components/colliders/collider';
import { XrControlEventType, XrEventHandle } from './xr-event-handle';

export enum UseState {
    // 在使用中
    USE_ON = 1,
    // 未在使用中,且使用后会被占用
    USE_OFF = 2,
    // 未在使用中,且使用后不会被占用
    USE_ONLY_OFF = 3,
}

export class IXrInteractable extends Component {
    protected _colliderCom: any = null;

    protected _triggerId: string | undefined = "";

    set triggerId(val) {
        if (val === this._triggerId) {
            return;
        }
        this._triggerId = val;
    }
    get triggerId() {
        return this._triggerId;
    }
}

export class XrInteractable extends IXrInteractable {
    @serializable
    protected _rayReticle: Node | null = null;

    @type(Node)
    @displayOrder(5)
    set rayReticle (val) {
        if (val === this._rayReticle) {
            return;
        }
        this._rayReticle = val;
    }
    get rayReticle () {
        return this._rayReticle;
    }

    onLoad() {
        this._colliderCom = this.node.getComponent(Collider);
        
        if (!this._colliderCom) {
            console.error("this node does not have");
        }

        this._colliderCom.on(XrControlEventType.HOVER_ENTERED, this._setRayReticle, this);
        this._colliderCom.on(XrControlEventType.HOVER_EXITED, this._unsetRayReticle, this);
    }

    onDisable() {
        this._colliderCom.off(XrControlEventType.HOVER_ENTERED, this._setRayReticle, this);
        this._colliderCom.off(XrControlEventType.HOVER_EXITED, this._unsetRayReticle, this);
    }

    protected _setRayReticle(event: XrEventHandle) {
        
    }

    protected _unsetRayReticle(event: XrEventHandle) {
        if (this._rayReticle) {
            this._rayReticle.active = false;
        }
    }
}