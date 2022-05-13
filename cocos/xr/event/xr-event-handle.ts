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

import { Vec3 } from '../../core/math';
import { EventHandle } from '../../input/types/event/event-handle';
import { Node } from '../../core/scene-graph/node';

/**
 * @en The input event type
 * @zh 输入事件类型
 */
 export enum XrControlEventType {
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