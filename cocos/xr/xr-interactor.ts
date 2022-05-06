import { displayOrder, type, serializable } from 'cc.decorator';
import { ccenum } from '../core';
import { Component } from '../core/components';
import { Node } from '../core/scene-graph/node';
import { XrControlEventType, XrEventHandle } from './xr-event-handle';
import { InteractorEvents } from './interactor-events';
import { Collider } from '../physics/framework/components/colliders/collider';
import { IXrInteractable } from './xr-interactable';

export enum SelectActionTrigger_Type {
    State = 0,
    State_Change = 1,
    Toggle = 2,
    Sticky = 3
}

ccenum(SelectActionTrigger_Type)

export class XrInteractor extends Component {
    @serializable
    protected _attachTransform: Node | null = null;
    @serializable
    protected _selectActionTrigger: SelectActionTrigger_Type = SelectActionTrigger_Type.State_Change;

    protected _triggerState: boolean = false;
    protected _stateState: boolean = false;
    protected _interactorEvents: InteractorEvents | null = null;
    protected _event = new XrEventHandle;
    protected _collider: Collider | null = null;
    protected _accupyLine: boolean = false;

    // 被触发的物体Interactable
    protected _beTriggerNode: IXrInteractable | null = null;

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

    @type(SelectActionTrigger_Type)
    @displayOrder(12)
    set selectActionTrigger(val) {
        if (val === this._selectActionTrigger) {
            return;
        }
        this._selectActionTrigger = val;
    }
    get selectActionTrigger() {
        return this._selectActionTrigger;
    }

    protected _judgeHit() {
        return false;
    }

    protected _judgeTrigger() {
        // 判断是否已抓取到物体
        if (!this._beTriggerNode) {
            return false;
        }
        // 已抓取到物体，判断被抓取到的物体，其抓取者是否是自身
        if (this._beTriggerNode.triggerId === this.uuid) {
            return true;
        }
        return false;
    }

    protected _setTriggerTarget() {
        if (this._attachTransform) {
            this._event.attachNode = this._attachTransform;
        } else {
            this._event.attachNode = this.node;
        }
    }

    protected _emitSelectEntered() {
        if (this._event) {
            this._interactorEvents?.selectEntered(this._event);
        }
        this._collider?.emit(XrControlEventType.SELECT_ENTERED, this._event);
    }

    private _emitSelectEnd() {
        if (this._event) {
            this._interactorEvents?.selectExited(this._event);
        }
        this._collider?.emit(XrControlEventType.SELECT_EXITED, this._event);
        this._collider = null;
    }

    public selectStart(event: XrEventHandle) {
        this._event.model = event.model;
        this._event.eventHandle = event.eventHandle;

        switch (this._selectActionTrigger) {
            case SelectActionTrigger_Type.State:
                this._stateState = true;
                break;
            case SelectActionTrigger_Type.State_Change:
                if (this._judgeTrigger()) {
                    // 之前已有被触发物(此情况应该不存在)
                    console.log("cocosxr selectStart in error state");
                } else {
                    // 之前没有被触发物,进行碰撞检测
                    if (this._judgeHit()) {
                        // 碰撞到触发物，触发Entered，触发状态为true
                        this._triggerState = true;
                        this._emitSelectEntered();
                    }
                }
                break;
            case SelectActionTrigger_Type.Toggle:
                if (this._triggerState && this._judgeTrigger()) {
                    // 之前已有被触发物
                    this._emitSelectEnd();
                } else {
                    // 之前没有被触发物,进行碰撞检测
                    if (this._judgeHit()) {
                        // 碰撞到触发物，触发Entered，触发状态为true
                        this._triggerState = true;
                        this._emitSelectEntered();
                    }
                }
                break;
            case SelectActionTrigger_Type.Sticky:
                if (this._judgeTrigger()) {
                    // 之前已有被触发物, 触发状态为true
                    this._triggerState = true;
                } else {
                    // 之前没有被触发物,进行碰撞检测
                    if (this._judgeHit()) {
                        // 碰撞到触发物，触发Entered
                        this._emitSelectEntered();
                    }
                }
                break;
            default:
                break;
        }
    }

    public selectEnd(event: XrEventHandle) {
        this._event.model = event.model;
        this._event.eventHandle = event.eventHandle;
        switch (this._selectActionTrigger) {
            case SelectActionTrigger_Type.State:
                if (this._triggerState) {
                    this._emitSelectEnd();
                    this._triggerState = false;
                }
                this._stateState = false;
                break;
            case SelectActionTrigger_Type.State_Change:
                if (this._triggerState) {
                    this._emitSelectEnd();
                    this._triggerState = false;
                }
                break;
            case SelectActionTrigger_Type.Toggle:
                break;
            case SelectActionTrigger_Type.Sticky:
                if (this._triggerState) {
                    this._emitSelectEnd();
                    this._triggerState = false;
                }
                break;
            default:
                break;
        }
    }

    public activateStart() {
        this._collider?.emit(XrControlEventType.ACTIVATED, this._event);
    }

    public activateEnd() {
        this._collider?.emit(XrControlEventType.DEACTIVITED, this._event);
    }

    public uiPressStart() {
        this._collider?.emit(XrControlEventType.UIPRESS_ENTERED, this._event);
    }

    public uiPressEnd() {
        this._collider?.emit(XrControlEventType.UIPRESS_EXITED, this._event);
    }


}