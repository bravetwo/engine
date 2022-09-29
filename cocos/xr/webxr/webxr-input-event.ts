/*
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { ccenum, EventTarget} from "../../core";

/**
 * @en The event type
 * @zh 事件类型
 */
export enum WebXRInputEventType {
    SELECT_START = "select-start",
    SELECT = "select",
    SELECT_END = "select-end",
}

interface InputEventMap {
    [WebXRInputEventType.SELECT_START]: (event: any) => void,
    [WebXRInputEventType.SELECT]: (event: any) => void,
    [WebXRInputEventType.SELECT_END]: (event: any) => void,
}

ccenum(WebXRInputEventType);

export class WebXRInputEvent {
    /**
     * @en The event
     * @zh 事件对象
     */
    private _eventTarget: EventTarget = new EventTarget();
   
    /**
     * @en
     * Register a callback of a specific input event type.
     * @zh
     * 注册特定的输入事件回调。
     *
     * @param eventType - The event type
     * @param callback - The event listener's callback
     * @param target - The event listener's target and callee
     */
    public on<K extends keyof InputEventMap>(eventType: K, callback: InputEventMap[K], target?: any) {
        this._eventTarget.on(eventType, callback, target);
        return callback;
    }

    /**
     * @en
     * Register a callback of a specific input event type once.
     * @zh
     * 注册单次的输入事件回调。
     *
     * @param eventType - The event type
     * @param callback - The event listener's callback
     * @param target - The event listener's target and callee
     */
    public once<K extends keyof InputEventMap>(eventType: K, callback: InputEventMap[K], target?: any) {
        this._eventTarget.once(eventType, callback, target);
        return callback;
    }

    /**
     * @en
     * Unregister a callback of a specific input event type.
     * @zh
     * 取消注册特定的输入事件回调。
     *
     * @param eventType - The event type
     * @param callback - The event listener's callback
     * @param target - The event listener's target and callee
     */
    public off<K extends keyof InputEventMap>(eventType: K, callback?: InputEventMap[K], target?: any) {
        this._eventTarget.off(eventType, callback, target);
    }

     /**
     * @en
     * emit a event type.
     * @zh
     * 发射事件。
     *
     * @param eventType - The event type
     * @param arg - The event arg
     */
    public dispatch<K extends keyof InputEventMap>(eventType: K,  arg?: any): boolean {
        this._eventTarget.emit(eventType, arg, this);
        return true;
    }
}

/**
 * @en
 * The singleton of the ar event class.
 *
 * @zh
 * ar动作事件单例
 */
export const webXRInputEvent = new WebXRInputEvent();
