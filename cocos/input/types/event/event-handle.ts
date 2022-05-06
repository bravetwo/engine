/*
 Copyright (c) 2022-2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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

import { Event } from './event';
import { Vec3, Quat } from '../../../core/math';
import { SystemEventTypeUnion } from '../event-enum';


/**
 * @en
 * The handle event.
 *
 * @zh
 * 手柄事件。
 */
export class EventHandle extends Event {
    /**
     * @en The X Vector of the current state
     * @zh 当前状态的X轴向量
     */
    public x = 0;

    /**
     * @en The Y Vector of the current state
     * @zh 当前状态的Y轴向量
     */
    public y = 0;

    /**
     * @en The Z Vector of the current state
     * @zh 当前状态的Z轴向量
     */
    public z = 0;

    /**
     * @en The Value of the current state
     * @zh 当前状态的值
     */
    public value = 0;

    /**
     * @en The X value of the quaternion at current postion 
     * @zh 当前位置四元数的X值
     */
    public quaternionX = 0;

    /**
     * @en The Y value of the quaternion at current postion
     * @zh 当前位置四元数的Y值
     */
    public quaternionY = 0;

    /**
     * @en The Z value of the quaternion at current postion
     * @zh 当前位置四元数的Z值
     */
    public quaternionZ = 0;

    /**
     * @en The W value of the quaternion at current postion
     * @zh 当前位置四元数的W值
     */
    public quaternionW = 1;

    /**
     * @param eventType - The type of the event
     * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
     * @param currentStateVec3 - The Vector of the current state
     * @param currentState - The Value of the current state
     * @param quaternion - The Quaternion of the current state
     */
    constructor (eventType: SystemEventTypeUnion, bubbles: boolean, currentStateVec3?: Vec3, currentState?: number, quaternion?: Quat) {
        super(eventType, bubbles);
        if (currentStateVec3) {
            this.x = currentStateVec3.x;
            this.y = currentStateVec3.y;
            this.z = currentStateVec3.z;
        }
        if (currentState) {
            this.value = currentState;
        }
        if (quaternion) {
            this.quaternionX = quaternion.x;
            this.quaternionY = quaternion.y;
            this.quaternionZ = quaternion.z;
            this.quaternionW = quaternion.w;
        }
    }
}

// @ts-expect-error TODO
Event.EventHandle = EventHandle;
