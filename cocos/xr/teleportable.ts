import { ccclass, help, menu, displayOrder, type, serializable, tooltip, visible} from 'cc.decorator';
import { ccenum} from '../core';
import { EventHandler as ComponentEventHandler } from '../core/components';
import { Node } from '../core/scene-graph/node';
import { Collider } from '../physics/framework/components/colliders/collider';
import { XrControlEventType, XrEventHandle } from './xr-event-handle';
import { XrInteractable } from './xr-interactable';
import { Teleporter } from './teleporter';

enum Teleportable_Type {
    Area = 0,
    Anchor = 1
}

enum TeleportTrigger_Type {
    OnSelectExited = 0,
    OnSelectEntered = 1,
    OnActivited = 2,
    OnDeactivited = 3
}

ccenum(Teleportable_Type);
ccenum(TeleportTrigger_Type);

@ccclass('cc.Teleportable')
@help('i18n:cc.Teleportable')
@menu('XR/Teleportable')
export class Teleportable extends XrInteractable {
    @serializable
    protected _teleportableType: Teleportable_Type = Teleportable_Type.Area;
    @serializable
    protected _teleportAnchorNode: Node | null = null;
    @type([Collider])
    @serializable
    @displayOrder(3)
    public _colliders: Collider[] = [];
    @serializable
    protected _teleportTrigger: TeleportTrigger_Type = TeleportTrigger_Type.OnSelectExited;
    @serializable
    protected _teleporter: Teleporter | null = null;
    @type([ComponentEventHandler])
    @serializable
    @displayOrder(7)
    public teleportingEvent: ComponentEventHandler[] = [];
    
    @type(Teleportable_Type)
    @displayOrder(1)
    set teleportableType (val) {
        if (val === this._teleportableType) {
            return;
        }
        this._teleportableType = val;
    }
    get teleportableType () {
        return this._teleportableType;
    }

    @type(Node)
    @visible(function (this: Teleportable) {
        return this._teleportableType === Teleportable_Type.Anchor;
    })
    @displayOrder(2)
    set teleportAnchorNode (val) {
        if (val === this._teleportAnchorNode) {
            return;
        }
        this._teleportAnchorNode = val;
    }
    get teleportAnchorNode () {
        return this._teleportAnchorNode;
    }

    @type(TeleportTrigger_Type)
    @displayOrder(5)
    set teleportTrigger (val) {
        if (val === this._teleportTrigger) {
            return;
        }
        this._teleportTrigger = val;
    }
    get teleportTrigger () {
        return this._teleportTrigger;
    }

    @type(Teleporter)
    @displayOrder(6)
    set teleporter (val) {
        if (val === this._teleporter) {
            return;
        }
        this._teleporter = val;
    }
    get teleporter () {
        return this._teleporter;
    }

    public onEnable() {
        if (!this._colliderCom) {
            return;
        }
        switch (this._teleportTrigger) {
            case TeleportTrigger_Type.OnSelectExited:
            case TeleportTrigger_Type.OnSelectEntered:
                this._colliderCom.on(XrControlEventType.SELECT_ENTERED, this._selectEntered, this);
                this._colliderCom.on(XrControlEventType.SELECT_EXITED, this._selectExited, this);
                break;
            case TeleportTrigger_Type.OnActivited:
            case TeleportTrigger_Type.OnDeactivited:
                this._colliderCom.on(XrControlEventType.ACTIVATED, this._teleportAction, this);
                this._colliderCom.on(XrControlEventType.ACTIVATE_END, this._teleportAction, this);
                break;
            default:
                break;
        }
        
        if (this.teleportableType === Teleportable_Type.Area) {
            this._colliderCom.on(XrControlEventType.HOVER_STAY, this._setRayReticle, this);
        }
    }

    public onDisable() {
        if (!this._colliderCom) {
            return;
        }
        switch (this._teleportTrigger) {
            case TeleportTrigger_Type.OnSelectExited:
            case TeleportTrigger_Type.OnSelectEntered:
                this._colliderCom.off(XrControlEventType.SELECT_ENTERED, this._selectEntered, this);
                this._colliderCom.off(XrControlEventType.SELECT_EXITED, this._selectExited, this);
                break;
            case TeleportTrigger_Type.OnActivited:
            case TeleportTrigger_Type.OnDeactivited:
                this._colliderCom.off(XrControlEventType.ACTIVATED, this._teleportAction, this);
                this._colliderCom.off(XrControlEventType.ACTIVATE_END, this._teleportAction, this);
                break;
            default:
                break;
        }
        
        if (this.teleportableType === Teleportable_Type.Area) {
            this._colliderCom.off(XrControlEventType.HOVER_STAY, this._setRayReticle, this);
        }
    }

    protected _selectEntered(event: XrEventHandle) {
        this._triggerId = event.triggerId;
        if (this._teleportTrigger === TeleportTrigger_Type.OnSelectEntered) {
            this._teleportAction(event);
        }
    }

    protected _selectExited(event: XrEventHandle) {
        this._triggerId = "";
        if (this._teleportTrigger === TeleportTrigger_Type.OnSelectExited) {
            this._teleportAction(event);
        }
    }

    protected _activited(event: XrEventHandle) {
        this._triggerId = event.triggerId;
        if (this._teleportTrigger === TeleportTrigger_Type.OnActivited) {
            this._teleportAction(event);
        }
    }

    protected _deactivited(event: XrEventHandle) {
        this._triggerId = "";
        if (this._teleportTrigger === TeleportTrigger_Type.OnDeactivited) {
            this._teleportAction(event);
        }
    }

    protected _setRayReticle(event: XrEventHandle) {
        if (!this._rayReticle) {
            return;
        }
        
        if (this._teleportableType === Teleportable_Type.Anchor) {
                if (this._teleportAnchorNode) {
                    this._rayReticle.setWorldPosition(this._teleportAnchorNode.getWorldPosition());
                } else if (event.attachNode) {
                    this._rayReticle.setWorldPosition(this.node.getWorldPosition());
                }
        } else {
            if (event.hitPoint) {
                this._rayReticle.setWorldPosition(event.hitPoint);
            }
        }       
        this._rayReticle.active = true;
    }

    private _teleportToModel(event: XrEventHandle) {
        if (this._rayReticle) {
            this._rayReticle.active = false;
        }

        if (this._teleportableType === Teleportable_Type.Anchor) {
            if (this._teleporter?.checker?.XRSession) {
                if (this._teleportAnchorNode) {
                    this._teleporter.checker.XRSession.node.setWorldPosition(this._teleportAnchorNode.getWorldPosition());
                } else if (event.attachNode) {
                    this._teleporter.checker.XRSession.node.setWorldPosition(this.node.getWorldPosition());
                }
            }
        } else {
            if (this._teleporter?.checker?.XRSession && event.hitPoint) {
                this._teleporter.checker.XRSession.node.setWorldPosition(event.hitPoint);
            }
        }        
    }

    protected _teleportAction(event: XrEventHandle) {
        if (!event || !this._colliderCom) {
            return;
        }

        this._teleportToModel(event);
    }
}