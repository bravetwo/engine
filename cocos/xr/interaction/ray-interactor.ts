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

import { ccclass, help, menu, type, displayOrder, serializable, tooltip } from 'cc.decorator';
import { ccenum } from '../../core/value-types/enum';
import { Node } from '../../core/scene-graph/node';
import { Color, Mat4, Quat, Vec3 } from '../../core/math';
import { Ray } from '../../core/geometry/ray';
import { PhysicsSystem } from '../../physics/framework/physics-system';
import { XrControlEventType } from '../event/xr-event-handle';
import { Collider } from '../../physics/framework/components/colliders/collider';
import { Line } from '../../particle/line';
import { InteractorEvents } from '../event/interactor-events';
import { XrInteractor, SelectActionTrigger_Type } from './xr-interactor';
import { IXrInteractable, XrInteractable } from './xr-interactable';
import { RaycastChecker } from '../ui/raycast-checker';
import { PhysicsRayResult } from '../../physics/framework';

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

/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.RayInteractor')
@help('i18n:cc.RayInteractor')
@menu('XR/Interaction/RayInteractor')
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
    protected _hitDetectionType: HitDirection_Type = HitDirection_Type.RAY_CAST;
    @serializable
    protected _hitClosestOnly: boolean = true;

    private _rayHitCollider: Collider | null = null;
    private _line: Line | null = null;
    private _linePositions: any = [];
    private _lineOriColor: Color | undefined = undefined;

    private _oriPoint: Vec3 = new Vec3;
    private _oriRotation: Quat = new Quat;

    protected _pressState: boolean = false;

    @type(Boolean)
    @displayOrder(1)
    @tooltip('i18n:xr.ray_interactor.interactionWithUINode')
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
    @tooltip('i18n:xr.ray_interactor.forceGrab')
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
    @tooltip('i18n:xr.ray_interactor.rayOriginTransform')
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
    @tooltip('i18n:xr.ray_interactor.lineType')
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
    @tooltip('i18n:xr.ray_interactor.maxRayDistance')
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
    @tooltip('i18n:xr.ray_interactor.reticle')
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
    @tooltip('i18n:xr.ray_interactor.raycastMask')
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
    @tooltip('i18n:xr.ray_interactor.raycastTiggerInteraction')
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
    @tooltip('i18n:xr.ray_interactor.hitDetectionType')
    set hitDetectionType(val) {
        if (val === this._hitDetectionType) {
            return;
        }
        this._hitDetectionType = val;
    }
    get hitDetectionType() {
        return this._hitDetectionType;
    }

    @displayOrder(11)
    @tooltip('i18n:xr.ray_interactor.hitClosestOnly')
    set hitClosestOnly(val) {
        if (val === this._hitClosestOnly) {
            return;
        }
        this._hitClosestOnly = val;
    }
    get hitClosestOnly() {
        return this._hitClosestOnly;
    }

    set selectState(val) {
        if (val === this._triggerState) {
            return;
        }
        this._triggerState = val;
    }
    get selectState() {
        return this._triggerState;
    }

    private _orginalScale: Vec3 = new Vec3;

    onLoad() {
        if (this.reticle) {
            this._orginalScale.set(this.reticle.worldScale);
        }

        this._oriPoint.set(this.node.worldPosition);
        this._oriRotation.set(this.node.worldRotation);
    }

    onEnable() {
        this._setAttachNode();
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

    protected _setAttachNode() {
        if (!this.forceGrab) {
            var attachNode = new Node;
            attachNode.parent = this.node;
            this._event.attachNode = attachNode;
        } else {
            if (this._attachTransform) {
                this._event.attachNode = this._attachTransform;
            } else {
                this._event.attachNode = this.node;
            }
        }
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
        pos.push(new Vec3(0, 0, -100));
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

    private _getRay() {
        const ray: Ray = new Ray();
        const dir = this._getRayDir();
        const start = this.convertToWorldSpace(new Vec3(this._linePositions[0].x, this._linePositions[0].y, this._linePositions[0].z));
        Ray.set(ray, start.x, start.y, start.z, dir.x, dir.y, dir.z);
        return ray;
    }

    protected _judgeHit() {
        if (!this._line || !this._line.node.active) {
            return false;
        }

        const ray = this._getRay();
        const hit = PhysicsSystem.instance.raycastClosest(ray, 0xffffffff, this.maxRayDistance, this.raycastTiggerInteraction === RaycastTrigger_Type.IGNORE);
        if (hit) {
            // Get collision box
            const closestResult = PhysicsSystem.instance.raycastClosestResult;
            // Check whether the collision box has an InteracTable
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

    protected _judgeUIHit() {
        if (!this._line || !this._line.node.active) {
            return false;
        }

        const ray = this._getRay();
        const hit = PhysicsSystem.instance.raycastClosest(ray, 0xffffffff, this.maxRayDistance, this.raycastTiggerInteraction === RaycastTrigger_Type.IGNORE);
        if (hit) {
            // Get collision box
            const closestResult = PhysicsSystem.instance.raycastClosestResult;
            // Check whether the collision box has an UI3DBase
            const ui3DBase = closestResult.collider?.getComponent(RaycastChecker);
            if (ui3DBase) {
                this._collider = closestResult.collider;
                // if (press) {
                //     ui3DBase.uiPress(closestResult.hitPoint);
                //     this._collider = closestResult.collider;
                // } else {
                //     ui3DBase.uiUnPress();
                // }
                return true;
            }
        }

        return false;
    }

    private _getRayDir() {
        let dir = new Vec3();
        if (this._line && this._linePositions.length === 2) {
            let vec3Like = new Vec3(this._linePositions[1].x - this._linePositions[0].x, this._linePositions[1].y - this._linePositions[0].y, this._linePositions[1].z - this._linePositions[0].z);
            Vec3.transformQuat(dir, vec3Like, this._line.node.getWorldRotation());
        }
        return dir;
    }

    private _handleHoverEnter(closestResult: PhysicsRayResult) {
        this._setLinehover(true);
        // Determine if there was a hit last time
        if (this._rayHitCollider) {
            if (this._rayHitCollider !== closestResult.collider) {
                // Inconsistent, and an object was hit last time, HOVER_EXITED is fired
                this._interactorEvents?.hoverExited(this._event);
                this._rayHitCollider.emit(XrControlEventType.HOVER_EXITED, this._event);
                // Replace hit object, triggering HOVER_ENTERED
                this._rayHitCollider = closestResult.collider;
                this._interactorEvents?.hoverEntered(this._event);
                this._rayHitCollider.emit(XrControlEventType.HOVER_ENTERED, this._event);
            }
        } else {
            // Replace hit object, triggering HOVER_ENTERED
            this._rayHitCollider = closestResult.collider;
            this._interactorEvents?.hoverEntered(this._event);
            this._rayHitCollider.emit(XrControlEventType.HOVER_ENTERED, this._event);
        }

        // Send stay, intermediate state, send position point
        this._rayHitCollider.emit(XrControlEventType.HOVER_STAY, this._event);
    }

    private _handleHoverExit() {
        this._setLinehover(false);
        // Set ray coordinates
        this._setLinePosition(false);
        // Determine if there was a hit last time
        if (this._rayHitCollider) {
            // HOVER_EXITED is triggered if an object is hit
            this._interactorEvents?.hoverExited(this._event);
            this._rayHitCollider.emit(XrControlEventType.HOVER_EXITED, this._event);
            this._rayHitCollider = null;
        }
    }

    private _interactionHit(closestResult: PhysicsRayResult, xrInteractable: IXrInteractable) {
        this._handleHoverEnter(closestResult);
        // Raised each time when SelectActionType is STATE
        if (this._selectActionTrigger === SelectActionTrigger_Type.State && this._stateState) {
            // Determines if the object has been triggered
            if (!this._judgeTrigger()) {
                this._beTriggerNode = xrInteractable;
                this._collider = closestResult.collider;
                this._event.hitPoint = closestResult.hitPoint;
                this._event.triggerId = this.uuid;
                this._triggerState = true;
                this._emitSelectEntered();
            }
        }
    }

    private _ui3dHit(closestResult: PhysicsRayResult, ui3DBase: RaycastChecker) {
        this._handleHoverEnter(closestResult);
    }

    update() {
        if (!this._line || !this._line.node.active) {
            return;
        }

        const ray = this._getRay();
        const hit = PhysicsSystem.instance.raycastClosest(ray, 0xffffffff, this.maxRayDistance, this.raycastTiggerInteraction === RaycastTrigger_Type.IGNORE);
        if (hit) {
            // Get the coordinates of the collision point
            const closestResult = PhysicsSystem.instance.raycastClosestResult;
            this._event.hitPoint.set(closestResult.hitPoint);
            // Set ray coordinates
            this._setLinePosition(true);
            const xrInteractable = closestResult.collider?.getComponent(IXrInteractable);
            if (xrInteractable) {
                this._interactionHit(closestResult, xrInteractable);
            } else {
                const ui3DBase = closestResult.collider?.getComponent(RaycastChecker);
                if (ui3DBase) {
                    this._ui3dHit(closestResult, ui3DBase);
                } else {
                    this._handleHoverExit();
                }
            }
        } else {
            this._handleHoverExit();
        }
    }

    private _setLinehover(isHover: boolean) {
        if (!this._line) {
            return;
        }

        // Ray color change
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

            this.reticle?.setWorldPosition(this._line.positions[1]);
        } else {
            if (this._line.positions !== this._linePositions) {
                this._line.worldSpace = false;
                this._line.positions = this._linePositions;
            }

            this.reticle?.setWorldPosition(this.convertToWorldSpace(this._line.positions[1]));
        }

        this.reticle?.setWorldScale(new Vec3(this._orginalScale).multiplyScalar(Vec3.distance(this._line.positions[0], this._line.positions[1])));
    }


    public activateStart() {
        this._rayHitCollider?.emit(XrControlEventType.ACTIVATED, this._event);
    }

    public activateEnd() {
        this._rayHitCollider?.emit(XrControlEventType.DEACTIVITED, this._event);
    }

    public uiPressEnter() {
        if(this._judgeUIHit()) {
            this._collider?.emit(XrControlEventType.UIPRESS_ENTERED, this._event);
            this._pressState = true;
        }
    }

    public uiPressExit() {
        if (this._pressState) {
            this._collider?.emit(XrControlEventType.UIPRESS_EXITED, this);
            this._collider = null;
            this._pressState = false;
        }
    }
}
