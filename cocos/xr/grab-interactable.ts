
import { ccclass, help, menu, displayOrder, type, serializable, tooltip, visible } from 'cc.decorator';
import { ccenum, Mat4, Vec3 } from '../core';
import { Node } from '../core/scene-graph/node';
import { Collider, ERigidBodyType, RigidBody } from '../physics/framework';
import { XrControlEventType, XrEventHandle } from './xr-event-handle';
import { XrInteractable } from './xr-interactable';

enum GrabTrigger_Type {
    OnSelectEntered = 0,
    OnActivited = 1
}

enum SelectMode_Type {
    Single = 0,
    Multiple = 1
}

enum Movement_Type {
    Instantaneous = 0,
    Kinematic = 1,
    Velocity = 2
}

ccenum(GrabTrigger_Type);
ccenum(SelectMode_Type);
ccenum(Movement_Type);

@ccclass('cc.GrabInteractable')
@help('i18n:cc.GrabInteractable')
@menu('XR/GrabInteractable')
export class GrabInteractable extends XrInteractable {
    @serializable
    protected _attachTransform: Node | null = null;
    @serializable
    protected _attachEaseInTime = 0.15;
    @type([Collider])
    @serializable
    @displayOrder(3)
    public _colliders: Collider[] = [];
    @serializable
    protected _grabTrigger: GrabTrigger_Type = GrabTrigger_Type.OnSelectEntered;
    @serializable
    protected _hideController = false;
    @serializable
    protected _selectMode: SelectMode_Type = SelectMode_Type.Single
    @serializable
    protected _movementType: Movement_Type = Movement_Type.Instantaneous;
    @serializable
    protected _throwOnDetach = true;
    @serializable
    protected _throwSmoothingDuration = 0.25;
    @serializable
    protected _throwSmoothingCurve = 0;
    @serializable
    protected _throwVelocityScale = 1.5;
    @serializable
    protected _throwAngularVelocityScale = 1;

    private _model: Node | null = null;

    @type(Node)
    @displayOrder(1)
    set attachTransform(val) {
        if (val === this._attachTransform) {
            return;
        }
        this._attachTransform = val;
    }
    get attachTransform() {
        return this._attachTransform;
    }

    @displayOrder(2)
    set attachEaseInTime(val) {
        if (val === this._attachEaseInTime) {
            return;
        }
        this._attachEaseInTime = val;
    }
    get attachEaseInTime() {
        return this._attachEaseInTime;
    }

    @type(GrabTrigger_Type)
    @displayOrder(4)
    set grabTrigger(val) {
        if (val === this._grabTrigger) {
            return;
        }
        this._grabTrigger = val;
    }
    get grabTrigger() {
        return this._grabTrigger;
    }

    @type(Boolean)
    @displayOrder(7)
    set hideController(val) {
        if (val === this._hideController) {
            return;
        }
        this._hideController = val;
    }
    get hideController() {
        return this._hideController;
    }

    @type(SelectMode_Type)
    @displayOrder(8)
    set selectMode(val) {
        if (val === this._selectMode) {
            return;
        }
        this._selectMode = val;
    }
    get selectMode() {
        return this._selectMode;
    }

    @type(Movement_Type)
    @displayOrder(9)
    set movementType(val) {
        if (val === this._movementType) {
            return;
        }
        this._movementType = val;
    }
    get movementType() {
        return this._movementType;
    }

    @type(Boolean)
    @displayOrder(10)
    set throwOnDetach(val) {
        if (val === this._throwOnDetach) {
            return;
        }
        this._throwOnDetach = val;
    }
    get throwOnDetach() {
        return this._throwOnDetach;
    }

    @displayOrder(11)
    @visible(function (this: GrabInteractable) {
        return this._throwOnDetach;
    })
    set throwSmoothingDuration(val) {
        if (val === this._throwSmoothingDuration) {
            return;
        }
        this._throwSmoothingDuration = val;
    }
    get throwSmoothingDuration() {
        return this._throwSmoothingDuration;
    }

    @displayOrder(12)
    @visible(function (this: GrabInteractable) {
        return this._throwOnDetach;
    })
    set throwSmoothingCurve(val) {
        if (val === this._throwSmoothingCurve) {
            return;
        }
        this._throwSmoothingCurve = val;
    }
    get throwSmoothingCurve() {
        return this._throwSmoothingCurve;
    }

    @displayOrder(13)
    @visible(function (this: GrabInteractable) {
        return this._throwOnDetach;
    })
    set throwVelocityScale(val) {
        if (val === this._throwVelocityScale) {
            return;
        }
        this._throwVelocityScale = val;
    }
    get throwVelocityScale() {
        return this._throwVelocityScale;
    }

    @displayOrder(14)
    @visible(function (this: GrabInteractable) {
        return this._throwOnDetach;
    })
    set throwAngularVelocityScale(val) {
        if (val === this._throwAngularVelocityScale) {
            return;
        }
        this._throwAngularVelocityScale = val;
    }
    get throwAngularVelocityScale() {
        return this._throwAngularVelocityScale;
    }

    public onEnable() {
        if (!this._colliderCom) {
            return;
        }
        if (this._grabTrigger === GrabTrigger_Type.OnSelectEntered) {
            this._colliderCom.on(XrControlEventType.SELECT_ENTERED, this._grabEntered, this);
            this._colliderCom.on(XrControlEventType.SELECT_EXITED, this._grabEnd, this);
        } else if (this._grabTrigger === GrabTrigger_Type.OnActivited) {
            this._colliderCom.on(XrControlEventType.ACTIVATED, this._grabEntered, this);
            this._colliderCom.on(XrControlEventType.DEACTIVITED, this._grabEnd, this);
        }
    }

    public onDisable() {
        if (!this._colliderCom) {
            return;
        }
        if (this._grabTrigger === GrabTrigger_Type.OnSelectEntered) {
            this._colliderCom.off(XrControlEventType.SELECT_ENTERED, this._grabEntered, this);
            this._colliderCom.off(XrControlEventType.SELECT_EXITED, this._grabEnd, this);
        } else if (this._grabTrigger === GrabTrigger_Type.OnActivited) {
            this._colliderCom.off(XrControlEventType.ACTIVATED, this._grabEntered, this);
            this._colliderCom.off(XrControlEventType.DEACTIVITED, this._grabEnd, this);
        }
    }

    protected _setRayReticle(event: XrEventHandle) {
        if (this._rayReticle) {
            if (this._rayReticle && event.attachNode) {
                this._rayReticle.setWorldPosition(event.attachNode.getWorldPosition());
                this._rayReticle.active = true;
            }
        }
    }

    private convertToNodeSpace(nodePoint: Vec3, out?: Vec3) {
        const _worldMatrix = new Mat4();
        this.node.getWorldMatrix(_worldMatrix);
        Mat4.invert(_worldMatrix, _worldMatrix);
        if (!out) {
            out = new Vec3();
        }

        return Vec3.transformMat4(out, nodePoint, _worldMatrix);
    }

    private _attachToModel(event?: XrEventHandle) {
        const rigidBody = this.node.getComponent(RigidBody);
        if (rigidBody) {
            rigidBody.useGravity = false;
            rigidBody.type = ERigidBodyType.KINEMATIC;
        }

        if (this._rayReticle) {
            this._rayReticle.active = false;
        }

        if (event) {
            if (event.forceGrab) {
                this.node.parent = event.attachNode;
                if (this._attachTransform) {
                    var out = new Vec3();
                    // this.node._uiProps.uiTransformComp?.convertToNodeSpaceAR(out, this._attachTransform.getWorldPosition());
                    this.convertToNodeSpace(this._attachTransform.getWorldPosition(), out);
                    // this.node.inverseTransformPoint(out, this._attachTransform.getWorldPosition());
                    
                    this.node.setPosition(out.negative().multiply(this.node.getScale()));
                } else {
                    this.node.setPosition(new Vec3(0, 0, 0));
                }
            } else {
                const out = this.node.getWorldPosition();
                this.node.parent = event.attachNode;
                this.node.setWorldPosition(out);    
            }
            if (this._hideController && this._model) {
                this._model.active = true;
            }
            if (this._hideController && event.model) {
                this._model = event.model;
                this._model.active = false;
            }
        }
    }

    private _grabEntered(event?: XrEventHandle) {
        if (!event || !this._colliderCom) {
            return;
        }
        
        this._triggerId = event.triggerId;

        this._attachToModel(event)
    }

    private _grabEnd(event?: XrEventHandle) {
        if (this._triggerId !== event?.triggerId) {
            return;
        }

        const worldPosition = this.node.getWorldPosition();
        const sence = this.node.scene;
        this.node.removeFromParent();
        this.node.setWorldPosition(worldPosition);
        sence.addChild(this.node);
        this._triggerId = "";
        const rigidBody = this.node.getComponent(RigidBody);
        if (rigidBody) {
            rigidBody.useGravity = true;
            rigidBody.type = ERigidBodyType.DYNAMIC;
            if (this._hideController && this._model) {
                this._model.active = true;
            }
        }
    }
}

