/**
 * @packageDocumentation
 * @module xr
 */

// import { ccclass, help, menu, type} from '../core/data/decorators';
import { ccclass, help, menu, type, displayOrder, serializable } from 'cc.decorator';
import { ccenum } from '../core/value-types/enum';
import { Node } from '../core/scene-graph/node';
import { Color, Mat4, Vec3 } from '../core/math';
import { Ray } from '../core/geometry/ray';
import { PhysicsSystem } from '../physics/framework/physics-system';
import { XrControlEventType, XrEventHandle } from './xr-event-handle';
import { Collider } from '../physics/framework/components/colliders/collider';
import { Line } from '../particle/line';
import { InteractorEvents } from './interactor-events';
import { XrInteractor, SelectActionTrigger_Type } from './xr-interactor';
import { IXrInteractable, XrInteractable } from './xr-interactable';

enum Line_Type {
    Straight_Line = 0,
    Projectile_Line = 1,
    Bezier_Line = 2
}

enum Layer_Type {
    EVERYTHING = 0,
    NOTHING = 1,
    IGNORE_RAYCAST = 2,
    GIZMOS = 3,
    EDITOR = 4,
    UI_3D = 5,
    SCENE_GIZMO = 6,
    UI_2D = 7,
    PROFILER = 8,
    DEFAULT = 9
}

enum RaycastTrigger_Type {
    COLLIDE = 0,
    IGNORE = 1,
    USE_GLOBAL = 2
}

enum HitDirection_Type {
    RAY_CAST = 0,
    SPHERE_CAST = 1,
}

ccenum(Line_Type);
ccenum(Layer_Type);
ccenum(RaycastTrigger_Type);
ccenum(HitDirection_Type);
ccenum(SelectActionTrigger_Type);

@ccclass('cc.RayInteractor')
@help('i18n:cc.RayInteractor')
@menu('XR/RayInteractor')
export class RayInteractor extends XrInteractor {
    @serializable
    protected _interactionWithUINode: boolean = true;
    @serializable
    protected _forceGrab: boolean = true;
    @serializable
    protected _rayOriginTransform: Node | null = null;
    @serializable
    protected _lineType: Line_Type = Line_Type.Straight_Line;
    @serializable
    protected _maxRayDistance = 30;
    @serializable
    protected _reticle: Node | null = null;
    @serializable
    protected _raycastMask: Layer_Type = Layer_Type.EVERYTHING;
    @serializable
    protected _raycastTriggerInteraction: RaycastTrigger_Type = RaycastTrigger_Type.IGNORE;
    @serializable
    protected _hitDirectionType: HitDirection_Type = HitDirection_Type.RAY_CAST;
    @serializable
    protected _hitClosestOnly: boolean = true;
    // @serializable
    // protected _keepSelectedTargetValid = true;
    // @serializable
    // protected _hideControllerOnSelect = false;
    // @serializable
    // protected _startingSelectedInteractable: Node | null = null;

    private _rayHitCollider: Collider | null = null;
    private _line: Line | null = null;
    private _linePositions: any = [];
    private _lineOriColor: Color | undefined = undefined;

    @type(Boolean)
    @displayOrder(1)
    set interactionWithUINode(val) {
        if (val === this._interactionWithUINode) {
            return;
        }
        this._interactionWithUINode = val;
    }
    get interactionWithUINode() {
        return this._interactionWithUINode;
    }

    @type(Boolean)
    @displayOrder(2)
    set forceGrab(val) {
        if (val === this._forceGrab) {
            return;
        }
        this._forceGrab = val;
    }
    get forceGrab() {
        return this._forceGrab;
    }

    @type(Node)
    @displayOrder(4)
    set rayOriginTransform(val) {
        if (val === this._rayOriginTransform) {
            return;
        }
        this._rayOriginTransform = val;
    }
    get rayOriginTransform() {
        return this._rayOriginTransform;
    }

    @type(Line_Type)
    @displayOrder(5)
    set lineType(val) {
        if (val === this._lineType) {
            return;
        }
        this._lineType = val;
    }
    get lineType() {
        return this._lineType;
    }

    @displayOrder(6)
    set maxRayDistance(val) {
        if (val === this._maxRayDistance) {
            return;
        }
        this._maxRayDistance = val;
    }
    get maxRayDistance() {
        return this._maxRayDistance;
    }

    @type(Node)
    @displayOrder(7)
    set reticle(val) {
        if (val === this._reticle) {
            return;
        }
        this._reticle = val;
    }
    get reticle() {
        return this._reticle;
    }

    @type(Layer_Type)
    @displayOrder(8)
    set raycastMask(val) {
        if (val === this._raycastMask) {
            return;
        }
        this._raycastMask = val;
    }
    get raycastMask() {
        return this._raycastMask;
    }

    @type(RaycastTrigger_Type)
    @displayOrder(9)
    set raycastTiggerInteraction(val) {
        if (val === this._raycastTriggerInteraction) {
            return;
        }
        this._raycastTriggerInteraction = val;
    }
    get raycastTiggerInteraction() {
        return this._raycastTriggerInteraction;
    }

    @type(HitDirection_Type)
    @displayOrder(10)
    set hitDectionType(val) {
        if (val === this._hitDirectionType) {
            return;
        }
        this._hitDirectionType = val;
    }
    get hitDectionType() {
        return this._hitDirectionType;
    }

    @displayOrder(11)
    set hitClosestOnly(val) {
        if (val === this._hitClosestOnly) {
            return;
        }
        this._hitClosestOnly = val;
    }
    get hitClosestOnly() {
        return this._hitClosestOnly;
    }

    // @type(Boolean)
    // @displayOrder(13)
    // set keepSelectedTargetValid(val) {
    //     if (val === this._keepSelectedTargetValid) {
    //         return;
    //     }
    //     this._keepSelectedTargetValid = val;
    // }
    // get keepSelectedTargetValid() {
    //     return this._keepSelectedTargetValid;
    // }

    // @type(Boolean)
    // @displayOrder(14)
    // set hideControllerOnSelect(val) {
    //     if (val === this._hideControllerOnSelect) {
    //         return;
    //     }
    //     this._hideControllerOnSelect = val;
    // }
    // get hideControllerOnSelect() {
    //     return this._hideControllerOnSelect;
    // }

    // @type(Node)
    // @displayOrder(15)
    // set startingSelectedInteractable(val) {
    //     if (val === this._startingSelectedInteractable) {
    //         return;
    //     }
    //     this._startingSelectedInteractable = val;
    // }
    // get startingSelectedInteractable() {
    //     return this._startingSelectedInteractable;
    // }

    set selectState(val) {
        if (val === this._triggerState) {
            return;
        }
        this._triggerState = val;
    }
    get selectState() {
        return this._triggerState;
    }

    onEnable() {
        this._setTriggerTarget();
        this._line = this.getComponent(Line);
        if (this._rayOriginTransform && this._line) {
            var line = this._rayOriginTransform.addComponent(Line);
            this._copyLine(line, this._line);
            this._line.destroy();
            this._line = line;
        }
        this._lineOriColor = this._line?.color.color;
        this._linePositions = this._line?.positions;
        this._interactorEvents = this.getComponent(InteractorEvents);
        this._event.forceGrab = this._forceGrab;
    }

    onDisable() {
    }

    private _copyLine(outLine: Line, inLine: Line) {
        outLine.texture = inLine.texture;
        outLine.worldSpace = inLine.worldSpace;
        outLine.width = inLine.width;
        outLine.tile = inLine.tile;
        outLine.offset = inLine.offset;
        outLine.color = inLine.color;

        var pos: any = [];
        pos.push(Vec3.ZERO);
        pos.push(new Vec3(0, 0, -400));
        outLine.positions = pos;
    }

    public convertToWorldSpace(nodePoint: Vec3, out?: Vec3) {
        const _worldMatrix = new Mat4();
        this.node.getWorldMatrix(_worldMatrix);
        if (!out) {
            out = new Vec3();
        }

        return Vec3.transformMat4(out, nodePoint, _worldMatrix);
    }

    protected _judgeHit() {
        // 射线不存在，返回
        if (!this._line || !this._line.node.active) {
            return false;
        }

        // 获取射线Ray
        const ray: Ray = new Ray();
        const dir = this._getRayDir();
        const start = this.convertToWorldSpace(new Vec3(this._linePositions[0].x, this._linePositions[0].y, this._linePositions[0].z));
        Ray.set(ray, start.x, start.y, start.z, dir.x, dir.y, dir.z);
        // 射线碰撞
        const hit = PhysicsSystem.instance.raycastClosest(ray, 0xffffffff, this.maxRayDistance, this.raycastTiggerInteraction === RaycastTrigger_Type.IGNORE);
        if (hit) {
            // 获取碰撞盒
            const closestResult = PhysicsSystem.instance.raycastClosestResult;
            // 判断碰撞盒是否存在interactable
            const xrInteractable = closestResult.collider?.getComponent(XrInteractable);
            if (xrInteractable) {
                this._beTriggerNode = xrInteractable;
                this._collider = closestResult.collider;
                this._event.hitPoint = closestResult.hitPoint;
                this._event.triggerId = this.uuid;
                return true;
            }
        }

        return false;
    }

    update(deltaTime: number) {
        if (!this._line || !this._line.node.active) {
            return;
        }
        // 获取射线Ray
        const ray: Ray = new Ray();
        const dir = this._getRayDir();
        const start = this.convertToWorldSpace(new Vec3(this._linePositions[0].x, this._linePositions[0].y, this._linePositions[0].z));
        Ray.set(ray, start.x, start.y, start.z, dir.x, dir.y, dir.z);
        // 射线碰撞
        const hit = PhysicsSystem.instance.raycastClosest(ray, 0xffffffff, this.maxRayDistance, this.raycastTiggerInteraction === RaycastTrigger_Type.IGNORE);
        if (hit) {
            // 获取碰撞点坐标
            const closestResult = PhysicsSystem.instance.raycastClosestResult;
            this._event.hitPoint.set(closestResult.hitPoint);
            // 设置射线坐标
            this._setLinePosition(true);
            // 判断碰撞盒是否存在IXrInteractable
            const xrInteractable = closestResult.collider?.getComponent(IXrInteractable);
            if (xrInteractable) {
                this._setLinehover(true);
                // 判断上一次是否有击中物
                if (this._rayHitCollider) {
                    if (this._rayHitCollider !== closestResult.collider) {
                        // 不一致，且上一次有击中物体，则触发HOVER_EXITED
                        this._interactorEvents?.hoverExited(this._event);
                        this._rayHitCollider.emit(XrControlEventType.HOVER_EXITED, this._event);
                        // 替换击中物，触发HOVER_ENTERED
                        this._rayHitCollider = closestResult.collider;
                        this._interactorEvents?.hoverEntered(this._event);
                        this._rayHitCollider.emit(XrControlEventType.HOVER_ENTERED, this._event);
                    }
                } else {
                    // 替换击中物，触发HOVER_ENTERED
                    this._rayHitCollider = closestResult.collider;
                    this._interactorEvents?.hoverEntered(this._event);
                    this._rayHitCollider.emit(XrControlEventType.HOVER_ENTERED, this._event);
                }

                // SelectActionType为STATE时，每次都触发
                if (this._selectActionTrigger === SelectActionTrigger_Type.State && this._stateState) {
                    // 判断是否已经触发物体
                    if (!this._judgeTrigger()) {
                        this._beTriggerNode = xrInteractable;
                        this._collider = closestResult.collider;
                        this._event.hitPoint = closestResult.hitPoint;
                        this._event.triggerId = this.uuid;
                        this._triggerState = true;
                        this._emitSelectEntered();
                    }
                }
                // 发送stay，中间状态,传送位置点
                this._rayHitCollider.emit(XrControlEventType.HOVER_STAY, this._event);
            } else {
                this._setLinehover(false);
                // 判断上一次是否有击中物
                if (this._rayHitCollider) {
                     // 有击中物体，则触发HOVER_EXITED
                     this._interactorEvents?.hoverExited(this._event);
                     this._rayHitCollider.emit(XrControlEventType.HOVER_EXITED, this._event);
                }

                this._rayHitCollider = null;
            }
        } else {
            this._setLinehover(false);
            // 设置射线坐标
            this._setLinePosition(false);
            if (this._rayHitCollider) {
                this._rayHitCollider.emit(XrControlEventType.HOVER_EXITED, this);
                // 射线悬停结束事件
                this._interactorEvents?.hoverExited(this._event);
                this._rayHitCollider = null;
            }
        }
    }

    private _getRayDir() {
        let dir = new Vec3();
        if (this._line && this._linePositions.length === 2) {
            let vec3Like = new Vec3(this._linePositions[1].x - this._linePositions[0].x, this._linePositions[1].y - this._linePositions[0].y, this._linePositions[1].z - this._linePositions[0].z);
            Vec3.transformQuat(dir, vec3Like, this._line.node.getWorldRotation());
        }
        return dir;
    }

    private _setLinehover(isHover: boolean) {
        if (!this._line) {
            return;
        }

        // 射线颜色变化
        if (isHover) {
            this._line.color.color = Color.GREEN.clone();
        } else {
            if (this._lineOriColor) {
                this._line.color.color = this._lineOriColor;
            }
        }
    }

    private _setLinePosition(isWorld: boolean) {
        if (!this._line) {
            return;
        }
        if (isWorld) {
            var pos: any = [];
            pos.push(this.convertToWorldSpace(new Vec3(this._linePositions[0].x, this._linePositions[0].y, this._linePositions[0].z)));
            pos.push(this._event.hitPoint);
            this._line.worldSpace = true;
            this._line.positions = pos;
        } else {
            if (this._line.positions !== this._linePositions) {
                this._line.worldSpace = false;
                this._line.positions = this._linePositions;
            }
        }
    }


    public activateStart() {
        this._rayHitCollider?.emit(XrControlEventType.ACTIVATED, this._event);
    }

    public activateEnd() {
      
        this._rayHitCollider?.emit(XrControlEventType.DEACTIVITED, this._event);
    }

    public uiPressStart() {
        this._rayHitCollider?.emit(XrControlEventType.UIPRESS_ENTERED, this._event);
    }

    public uiPressEnd() {
        this._rayHitCollider?.emit(XrControlEventType.UIPRESS_EXITED, this._event);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
