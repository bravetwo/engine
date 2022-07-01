/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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

import { legacyCC } from '../../core/global-exports';
import { NodeEventType } from '../../core/scene-graph/node-event';

/**
 * @en The event type supported by SystemEvent and Node events
 * @zh SystemEvent 支持的事件类型以及节点事件类型
 *
 * @deprecated since v3.3, please use SystemEvent.EventType instead
 */
export enum SystemEventType {
    /**
     * @en
     * The event type for touch start event
     *
     * @zh
     * 手指开始触摸事件。
     */
    TOUCH_START = 'touch-start',

    /**
     * @en
     * The event type for touch move event
     *
     * @zh
     * 当手指在屏幕上移动时。
     */
    TOUCH_MOVE = 'touch-move',

    /**
     * @en
     * The event type for touch end event
     *
     * @zh
     * 手指结束触摸事件。
     */
    TOUCH_END = 'touch-end',

    /**
     * @en
     * The event type for touch end event
     *
     * @zh
     * 当手指在目标节点区域外离开屏幕时。
     */
    TOUCH_CANCEL = 'touch-cancel',

    /**
     * @en
     * The event type for mouse down events
     *
     * @zh
     * 当鼠标按下时触发一次。
     */
    MOUSE_DOWN = 'mouse-down',

    /**
     * @en
     * The event type for mouse move events
     *
     * @zh
     * 当鼠标在目标节点在目标节点区域中移动时，不论是否按下。
     */
    MOUSE_MOVE = 'mouse-move',

    /**
     * @en
     * The event type for mouse up events
     *
     * @zh
     * 当鼠标从按下状态松开时触发一次。
     */
    MOUSE_UP = 'mouse-up',

    /**
     * @en
     * The event type for mouse wheel events
     *
     * @zh 当滚动鼠标滚轮或操作其它类似输入设备时会触发滚轮事件。
     */
    MOUSE_WHEEL = 'mouse-wheel',

    /**
     * @en
     * The event type for mouse leave target events
     *
     * @zh
     * 当鼠标移入目标节点区域时，不论是否按下.
     *
     * @deprecated since v3.3, please use Node.EventType.MOUSE_ENTER instead.
     */
    MOUSE_ENTER = 'mouse-enter',

    /**
     * @en
     * The event type for mouse leave target events
     *
     * @zh
     * 当鼠标移出目标节点区域时，不论是否按下。
     *
     * @deprecated since v3.3, please use Node.EventType.MOUSE_LEAVE instead.
     */
    MOUSE_LEAVE = 'mouse-leave',

    /**
     * @en The event type for the key down event, the event will be continuously dispatched in the key pressed state
     * @zh 当按下按键时触发的事件, 该事件在按下状态会持续派发
     */
    KEY_DOWN = 'keydown',

    /**
     * @en The event type for the key up event
     * @zh 当松开按键时触发的事件
     */
    KEY_UP = 'keyup',

    /**
     * @en
     * The event type for the devicemotion event
     *
     * @zh
     * 重力感应
     */
    DEVICEMOTION = 'devicemotion',

    /**
     * @en
     * The event type for position, rotation, scale changed.Use the type parameter as [[Node.TransformBit]] to check which part is changed
     *
     * @zh
     * 节点改变位置、旋转或缩放事件。如果具体需要判断是哪一个事件，可通过判断回调的第一个参数类型是 [[Node.TransformBit]] 中的哪一个来获取
     * @example
     * ```
     * this.node.on(Node.EventType.TRANSFORM_CHANGED, (type)=>{
     *  if (type & Node.TransformBit.POSITION) {
     *       //...
     *   }
     * }, this);
     * ```
     *
     * @deprecated since v3.3, please use Node.EventType.TRANSFORM_CHANGED instead
     */
    TRANSFORM_CHANGED = 'transform-changed',

    /**
     * @en The event type for notifying the host scene has been changed for a persist node.
     * @zh 当场景常驻节点的场景发生改变时触发的事件，一般在切换场景过程中触发。
     *
     * @deprecated since v3.3, please use Node.EventType.SCENE_CHANGED_FOR_PERSISTS instead
     */
    SCENE_CHANGED_FOR_PERSISTS = 'scene-changed-for-persists',

    /**
     * @en
     * The event type for size change events.
     * Performance note, this event will be triggered every time corresponding properties being changed,
     * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
     *
     * @zh
     * 当节点尺寸改变时触发的事件。
     * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
     *
     * @deprecated since v3.3, please use Node.EventType.SIZE_CHANGED instead
     */
    SIZE_CHANGED = 'size-changed',

    /**
     * @en
     * The event type for anchor point change events.
     * Performance note, this event will be triggered every time corresponding properties being changed,
     * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
     *
     * @zh
     * 当节点的 UITransform 锚点改变时触发的事件。
     * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
     *
     * @deprecated since v3.3, please use Node.EventType.ANCHOR_CHANGED instead
     */
    ANCHOR_CHANGED = 'anchor-changed',

    /**
     * @en
     * The event type for color change events.
     * Performance note, this event will be triggered every time corresponding properties being changed,
     * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
     *
     * @zh
     * 当节点的 UI 渲染组件颜色属性改变时触发的事件。
     * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
     *
     * @deprecated since v3.3, please use Node.EventType.COLOR_CHANGED instead
     */
    COLOR_CHANGED = 'color-changed',

    /**
     * @en
     * The event type for adding a new child node to the target node.
     *
     * @zh
     * 给目标节点添加子节点时触发的事件。
     *
     * @deprecated since v3.3, please use Node.EventType.CHILD_ADDED instead
     */
    CHILD_ADDED = 'child-added',

    /**
     * @en
     * The event type for removing a child node from the target node.
     *
     * @zh
     * 给目标节点移除子节点时触发的事件。
     *
     * @deprecated since v3.3, please use Node.EventType.CHILD_REMOVED instead
     */
    CHILD_REMOVED = 'child-removed',

    /**
     * @en The event type for changing the parent of the target node
     * @zh 目标节点的父节点改变时触发的事件。
     *
     * @deprecated since v3.3, please use Node.EventType.PARENT_CHANGED instead
     */
    PARENT_CHANGED = 'parent-changed',

    /**
     * @en The event type for destroying the target node
     * @zh 目标节点被销毁时触发的事件。
     *
     * @deprecated since v3.3, please use Node.EventType.NODE_DESTROYED instead
     */
    NODE_DESTROYED = 'node-destroyed',

    /**
     * @en The event type for node layer change events.
     * @zh 节点 layer 改变时触发的事件。
     *
     * @deprecated since v3.3, please use Node.EventType.LAYER_CHANGED instead
     */
    LAYER_CHANGED = 'layer-changed',

    /**
     * @en The event type for node's sibling order changed.
     * @zh 当节点在兄弟节点中的顺序发生变化时触发的事件。
     *
     * @deprecated since v3.3, please use Node.EventType.SIBLING_ORDER_CHANGED instead
     */
    SIBLING_ORDER_CHANGED = 'sibling-order-changed',
}

/**
 * @en The input event type
 * @zh 输入事件类型
 */
export enum InputEventType {
    /**
     * @en
     * The event type for touch start event
     *
     * @zh
     * 手指开始触摸事件。
     */
    TOUCH_START = 'touch-start',

    /**
     * @en
     * The event type for touch move event
     *
     * @zh
     * 当手指在屏幕上移动时。
     */
    TOUCH_MOVE = 'touch-move',

    /**
     * @en
     * The event type for touch end event
     *
     * @zh
     * 手指结束触摸事件。
     */
    TOUCH_END = 'touch-end',

    /**
     * @en
     * The event type for touch end event
     *
     * @zh
     * 当手指在目标节点区域外离开屏幕时。
     */
    TOUCH_CANCEL = 'touch-cancel',

    /**
     * @en
     * The event type for mouse down events
     *
     * @zh
     * 当鼠标按下时触发一次。
     */
    MOUSE_DOWN = 'mouse-down',

    /**
     * @en
     * The event type for mouse move events
     *
     * @zh
     * 当鼠标在目标节点在目标节点区域中移动时，不论是否按下。
     */
    MOUSE_MOVE = 'mouse-move',

    /**
     * @en
     * The event type for mouse up events
     *
     * @zh
     * 当鼠标从按下状态松开时触发一次。
     */
    MOUSE_UP = 'mouse-up',

    /**
     * @en
     * The event type for mouse wheel events
     *
     * @zh 手指开始触摸事件
     */
    MOUSE_WHEEL = 'mouse-wheel',

    /**
     * @en The event type for the key down event
     * @zh 当按下按键时触发的事件
     */
    KEY_DOWN = 'keydown',

    /**
     * @en The event type for the key pressing event, the event will be continuously dispatched in the key pressed state
     * @zh 当按着按键时触发的事件, 该事件在按下状态会持续派发
     */
    KEY_PRESSING = 'key-pressing',

    /**
     * @en The event type for the key up event
     * @zh 当松开按键时触发的事件
     */
    KEY_UP = 'keyup',

    /**
     * @en
     * The event type for the devicemotion event
     *
     * @zh
     * 重力感应
     */
    DEVICEMOTION = 'devicemotion',

    /**
     * @en The event type for gamepad input
     * @zh 手柄输入事件
     */
    GAMEPAD_INPUT = 'gamepad-input',
    /**
     * @en The event type for gamepad device change, including gamepad connecting and disconnecting
     * @zh 手柄设备改变时触发的事件，包括手柄连接，手柄断开连接
     */
    GAMEPAD_CHANGE = 'gamepad-change',

    /**
     * @en
     * The event type for the left view pose active event
     *
     * @zh
     * 左视角姿态激活事件
     */
    VIEW_POSE_ACTIVE_LEFT = 'view-pose-active-left',

    /**
     * @en
     * The event type for the left hand pose active event
     *
     * @zh
     * 左手柄姿态激活事件
     */
    HAND_POSE_ACTIVE_LEFT = 'hand-pose-active-left',

    /**
     * @en
     * The event type for the left aim pose active event
     *
     * @zh
     * 左射线姿态激活事件
     */
    AIM_POSE_ACTIVE_LEFT = 'aim-pose-active-left',

    /**
     * @en
     * The event type for the left trigger start event
     *
     * @zh
     * 左扳机握住事件
     */
    TRIGGER_START_LEFT = 'trigger-start-left',

    /**
     * @en
     * The event type for the left trigger end event
     *
     * @zh
     * 左扳机松开事件
     */
    TRIGGER_END_LEFT = 'trigger-end-left',

    /**
     * @en
     * The event type for the left trigger down event
     *
     * @zh
     * 左扳机按下事件
     */
    TRIGGER_DOWN_LEFT = 'trigger-down-left',

    /**
     * @en
     * The event type for the left trigger up event
     *
     * @zh
     * 左扳机松开事件
     */
    TRIGGER_UP_LEFT = 'trigger-up-left',

    /**
     * @en
     * The event type for the left thumbstick move event
     *
     * @zh
     * 左摇杆移动事件
     */
    THUMBSTICK_MOVE_LEFT = 'thumbstick-move-left',

    /**
     * @en
     * The event type for the left thumbstick move end event
     *
     * @zh
     * 左摇杆移动结束事件
     */
    THUMBSTICK_MOVE_END_LEFT = 'thumbstick-move-end-left',

    /**
     * @en
     * The event type for the left thumbstick down event
     *
     * @zh
     * 左摇杆按下事件
     */
    THUMBSTICK_DOWN_LEFT = 'thumbstick-down-left',

    /**
     * @en
     * The event type for the left thumbstick up event
     *
     * @zh
     * 左摇杆抬起事件
     */
    THUMBSTICK_UP_LEFT = 'thumbstick-up-left',

    /**
     * @en
     * The event type for the left grip start event
     *
     * @zh
     * 左侧按键握住事件
     */
    GRIP_START_LEFT = 'grip-start-left',

    /**
     * @en
     * The event type for the left grip end event
     *
     * @zh
     * 左侧按键松开事件
     */
    GRIP_END_LEFT = 'grip-end-left',

    /**
     * @en
     * The event type for the button x down event
     *
     * @zh
     * X按钮按下事件
     */
    BUTTON_X_DOWN = 'button-x-down',

    /**
     * @en
     * The event type for the button x up event
     *
     * @zh
     * X按钮抬起事件
     */
    BUTTON_X_UP = 'button-x-up',

    /**
     * @en
     * The event type for the button y down event
     *
     * @zh
     * Y按钮按下事件
     */
    BUTTON_Y_DOWN = 'button-y-down',

    /**
     * @en
     * The event type for the button y up event
     *
     * @zh
     * Y按钮抬起事件
     */
    BUTTON_Y_UP = 'button-y-up',

    /**
     * @en
     * The event type for the menu down event
     *
     * @zh
     * 菜单键按下事件
     */
    MENU_DOWN = 'menu-down',

    /**
     * @en
     * The event type for the menu up event
     *
     * @zh
     * 菜单键抬起事件
     */
    MENU_UP = 'menu-up',

    /**
     * @en
     * The event type for the right view pose active event
     *
     * @zh
     * 右视角姿态激活事件
     */
    VIEW_POSE_ACTIVE_RIGHT = 'view-pose-active-right',

    /**
     * @en
     * The event type for the right hand pose active event
     *
     * @zh
     * 右手柄姿态激活事件
     */
    HAND_POSE_ACTIVE_RIGHT = 'hand-pose-active-right',

    /**
     * @en
     * The event type for the right aim pose active event
     *
     * @zh
     * 右射线姿态激活事件
     */
    AIM_POSE_ACTIVE_RIGHT = 'aim-pose-active-right',

    /**
     * @en
     * The event type for the right trigger start event
     *
     * @zh
     * 右扳机握住事件
     */
    TRIGGER_START_RIGHT = 'trigger-start-right',

    /**
     * @en
     * The event type for the right trigger end event
     *
     * @zh
     * 右扳机松开事件
     */
    TRIGGER_END_RIGHT = 'trigger-end-right',

    /**
     * @en
     * The event type for the right trigger down event
     *
     * @zh
     * 右扳机按下事件
     */
    TRIGGER_DOWN_RIGHT = 'trigger-down-right',

    /**
     * @en
     * The event type for the right trigger up event
     *
     * @zh
     * 右扳机松开事件
     */
    TRIGGER_UP_RIGHT = 'trigger-up-right',

    /**
     * @en
     * The event type for the right thumbstick move event
     *
     * @zh
     * 右摇杆移动事件
     */
    THUMBSTICK_MOVE_RIGHT = 'thumbstick-move-right',

    /**
     * @en
     * The event type for the right thumbstick move end event
     *
     * @zh
     * 右摇杆移动结束事件
     */
    THUMBSTICK_MOVE_END_RIGHT = 'thumbstick-move-end-right',

    /**
     * @en
     * The event type for the right thumbstick down event
     *
     * @zh
     * 右摇杆按下事件
     */
    THUMBSTICK_DOWN_RIGHT = 'thumbstick-down-right',

    /**
     * @en
     * The event type for the right thumbstick up event
     *
     * @zh
     * 右摇杆抬起事件
     */
    THUMBSTICK_UP_RIGHT = 'thumbstick-up-right',

    /**
     * @en
     * The event type for the right grip start event
     *
     * @zh
     * 右侧按键握住事件
     */
    GRIP_START_RIGHT = 'grip-start-right',

    /**
     * @en
     * The event type for the right grip end event
     *
     * @zh
     * 右侧按键松开事件
     */
    GRIP_END_RIGHT = 'grip-end-right',

    /**
     * @en
     * The event type for the button a down event
     *
     * @zh
     * A按钮按下事件
     */
    BUTTON_A_DOWN = 'button-a-down',

    /**
     * @en
     * The event type for the button a up event
     *
     * @zh
     * A按钮抬起事件
     */
    BUTTON_A_UP = 'button-a-up',

    /**
     * @en
     * The event type for the button b down event
     *
     * @zh
     * B按钮按下事件
     */
    BUTTON_B_DOWN = 'button-b-down',

    /**
     * @en
     * The event type for the button b up event
     *
     * @zh
     * B按钮抬起事件
     */
    BUTTON_B_UP = 'button-b-up',

    /**
     * @en
     * The event type for the home down event
     *
     * @zh
     * HOME按下事件
     */
    HOME_DOWN = 'home-down',

    /**
     * @en
     * The event type for the home up event
     *
     * @zh
     * HOME抬起事件
     */
     HOME_UP = 'home-up',

    /**
     * @en
     * The event type for the back down event
     *
     * @zh
     * 返回键按下事件
     */
    BACK_DOWN = 'back-down',

    /**
     * @en
     * The event type for the back up event
     *
     * @zh
     * 返回键抬起事件
     */
    BACK_UP = 'back-up',

    /**
     * @en
     * The event type for the start down event
     *
     * @zh
     * 开始键按下事件
     */
    START_DOWN = 'start-down',

    /**
     * @en
     * The event type for the start up event
     *
     * @zh
     * 开始键抬起事件
     */
    START_UP = 'start-up',

    /**
     * @en
     * The event type for the dpad top down event
     *
     * @zh
     * 上键按下事件
     */
    DPAD_TOP_DOWN = 'dpad-top-down',

    /**
     * @en
     * The event type for the dpad top up event
     *
     * @zh
     * 上键抬起事件
     */
    DPAD_TOP_UP = 'dpad-top-up',

    /**
     * @en
     * The event type for the dpad bottom down event
     *
     * @zh
     * 下键按下事件
     */
    DPAD_BOTTOM_DOWN = 'dpad-bottom-down',

    /**
     * @en
     * The event type for the dpad bottom up event
     *
     * @zh
     * 下键抬起事件
     */
    DPAD_BOTTOM_UP = 'dpad-bottom-up',

    /**
     * @en
     * The event type for the dpad left down event
     *
     * @zh
     * 左键按下事件
     */
    DPAD_LEFT_DOWN = 'dpad-left-down',

    /**
     * @en
     * The event type for the dpad left up event
     *
     * @zh
     * 左键抬起事件
     */
    DPAD_LEFT_UP = 'dpad-left-up',

    /**
     * @en
     * The event type for the dpad right down event
     *
     * @zh
     * 右键按下事件
     */
    DPAD_RIGHT_DOWN = 'dpad-right-down',

    /**
     * @en
     * The event type for the dpad right up event
     *
     * @zh
     * 右键抬起事件
     */
    DPAD_RIGHT_UP = 'dpad-right-up',

    /**
     * @en
     * The event type for XR keyboard case switching event
     *
     * @zh
     * XR键盘大小写切换事件
     */
     XR_CAPS_LOCK = 'xr-caps-lock',
}

export type SystemEventTypeUnion = SystemEventType | NodeEventType | InputEventType | string;

legacyCC.SystemEventType = SystemEventType;
