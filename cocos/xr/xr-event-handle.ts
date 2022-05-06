import { Vec3 } from '../core/math';
import { EventTarget } from '../core/event';
import { EventHandle } from '../input/types/event/event-handle';
import { Node } from '../core/scene-graph/node';

/**
 * @en The input event type
 * @zh 输入事件类型
 */
 export enum XrControlEventType {
    SELECT_START = 'select-start',
    SELECT_END = 'select-end',

    ACTIVATE_START = 'activate-start',
    ACTIVATE_END = 'activate-end',

    UIPRESS_START = 'UI-press-start',
    UIPRESS_END = 'UI-press-end',

    SELECT_ENTERED = 'select-entered',
    SELECT_EXITED = 'select-exited',
    SELECT_CANCELED = 'select-canceled',

    ACTIVATED = 'OnActivited',
    DEACTIVITED = 'Deactivited',
    ACTIVATE_CANCELED = 'activate-canceled',

    UIPRESS_ENTERED = 'UI-press-entered',
    UIPRESS_EXITED = 'UI-press-exited',
    UIPRESS_CANCELED = 'UI-press-canceled',

    HOVER_ENTERED = 'hover-entered',
    HOVER_EXITED = 'hover-exited',
    HOVER_STAY = 'hover-stay',
    HOVER_CANCELED = 'hover-canceled',

    TURNER_ENTERED = 'turner-entered',
    TURNER_EXITED = 'turner-exited'
 }

/**
 * @en
 * The handle event.
 *
 * @zh
 * xr手柄事件。
 */
 export class XrEventHandle {
    /**
     * @en 
     * @zh 碰撞检测点
     */
    public hitPoint = new Vec3;

    /**
     * @en 
     * @zh controller模型
     */
     public model: Node | null = null;

    /**
     * @en 
     * @zh 手柄事件
     */
    public eventHandle: EventHandle | null = null;

    /**
     * @en 
     * @zh 触发者Id
     */
     public triggerId: string | undefined = "";

    /**
     * @en 
     * @zh 被附着者node
     */
     public attachNode: Node | null = null;

    /**
     * @en 
     * @zh 是否强制抓取
     */
    public forceGrab: boolean = true;
}

export enum XrRayEventType {
    RAY_HIT = 0,
    RAY_NOT_HIT = 1,
}

export type XrEventCallback = (res: XrEventHandle) => void;

export class XrHandleInputSource {
    private _eventTarget: EventTarget = new EventTarget();

    public on (eventType: XrControlEventType, callback: XrEventCallback, target?: any) {
        this._eventTarget.on(eventType, callback, target);
    }
}