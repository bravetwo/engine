import { HandleCallback } from 'pal/input';
import { EventTarget } from '../../../cocos/core/event';
import { EventHandle } from '../../../cocos/input/types';
import { Vec3, Quat } from '../../../cocos/core/math';
import { InputEventType } from '../../../cocos/input/types/event-enum';

export class HandleInputSource {
    private _eventTarget: EventTarget = new EventTarget();

    constructor () {
        this._registerEvent();
    }

    private _registerEvent () {
        jsb.onViewPoseActiveLeft = this._createCallbackPoseEvent(InputEventType.VIEW_POSE_ACTIVE_LEFT);
        jsb.onHandPoseActiveLeft = this._createCallbackPoseEvent(InputEventType.HAND_POSE_ACTIVE_LEFT);
        jsb.onAimPoseActiveLeft = this._createCallbackPoseEvent(InputEventType.AIM_POSE_ACTIVE_LEFT);
        jsb.onTriggerStartLeft = this._createCallbackStartEvent(InputEventType.TRIGGER_START_LEFT);
        jsb.onTriggerEndLeft = this._createCallback(InputEventType.TRIGGER_END_LEFT);
        jsb.onTriggerDownLeft = this._createCallback(InputEventType.TRIGGER_DOWN_LEFT);
        jsb.onTriggerUpLeft = this._createCallback(InputEventType.TRIGGER_UP_LEFT);
        jsb.onThumbstickMoveLeft = this._createCallbackMoveEvent(InputEventType.THUMBSTICK_MOVE_LEFT);
        jsb.onThumbstickMoveEndLeft = this._createCallback(InputEventType.THUMBSTICK_MOVE_END_LEFT);
        jsb.onThumbstickDownLeft = this._createCallback(InputEventType.THUMBSTICK_DOWN_LEFT);
        jsb.onThumbstickUpLeft = this._createCallback(InputEventType.THUMBSTICK_UP_LEFT);
        jsb.onGripStartLeft = this._createCallbackStartEvent(InputEventType.GRIP_START_LEFT);
        jsb.onGripEndLeft = this._createCallback(InputEventType.GRIP_END_LEFT);
        jsb.onButtonXDown = this._createCallback(InputEventType.BUTTON_X_DOWN);
        jsb.onButtonXUp = this._createCallback(InputEventType.BUTTON_X_UP);
        jsb.onButtonYDown = this._createCallback(InputEventType.BUTTON_Y_DOWN);
        jsb.onButtonYUp = this._createCallback(InputEventType.BUTTON_Y_UP);
        jsb.onMenuDown = this._createCallback(InputEventType.MENU_DOWN);
        jsb.onMenuUp = this._createCallback(InputEventType.MENU_UP);
        jsb.onViewPoseActiveRight = this._createCallbackPoseEvent(InputEventType.VIEW_POSE_ACTIVE_RIGHT);
        jsb.onHandPoseActiveRight = this._createCallbackPoseEvent(InputEventType.HAND_POSE_ACTIVE_RIGHT);
        jsb.onAimPoseActiveRight = this._createCallbackPoseEvent(InputEventType.AIM_POSE_ACTIVE_RIGHT);
        jsb.onTriggerStartRight = this._createCallbackStartEvent(InputEventType.TRIGGER_START_RIGHT);
        jsb.onTriggerEndRight = this._createCallback(InputEventType.TRIGGER_END_RIGHT);
        jsb.onTriggerDownRight = this._createCallback(InputEventType.TRIGGER_DOWN_RIGHT);
        jsb.onTriggerUpRight = this._createCallback(InputEventType.TRIGGER_UP_RIGHT);
        jsb.onThumbstickMoveRight = this._createCallbackMoveEvent(InputEventType.THUMBSTICK_MOVE_RIGHT);
        jsb.onThumbstickMoveEndRight = this._createCallback(InputEventType.THUMBSTICK_MOVE_END_RIGHT);
        jsb.onThumbstickDownRight = this._createCallback(InputEventType.THUMBSTICK_DOWN_RIGHT);
        jsb.onThumbstickUpRight = this._createCallback(InputEventType.THUMBSTICK_UP_RIGHT);
        jsb.onGripStartRight = this._createCallbackStartEvent(InputEventType.GRIP_START_RIGHT);
        jsb.onGripEndRight = this._createCallback(InputEventType.GRIP_END_RIGHT);
        jsb.onButtonADown = this._createCallback(InputEventType.BUTTON_A_DOWN);
        jsb.onButtonAUp = this._createCallback(InputEventType.BUTTON_A_UP);
        jsb.onButtonBDown = this._createCallback(InputEventType.BUTTON_B_DOWN);
        jsb.onButtonBUp = this._createCallback(InputEventType.BUTTON_B_UP);
        jsb.onHomeDown = this._createCallback(InputEventType.HOME_DOWN);
        jsb.onHomeUp = this._createCallback(InputEventType.HOME_UP);
        jsb.onBackDown = this._createCallback(InputEventType.BACK_DOWN);
        jsb.onBackUp = this._createCallback(InputEventType.BACK_UP);
        jsb.onStartDown = this._createCallback(InputEventType.START_DOWN);
        jsb.onStartUp = this._createCallback(InputEventType.START_UP);
        jsb.onDpadTopDown = this._createCallback(InputEventType.DPAD_TOP_DOWN);
        jsb.onDpadTopUp = this._createCallback(InputEventType.DPAD_TOP_UP);
        jsb.onDpadBottomDown = this._createCallback(InputEventType.DPAD_BOTTOM_DOWN);
        jsb.onDpadBottomUp = this._createCallback(InputEventType.DPAD_BOTTOM_UP);
        jsb.onDpadLeftDown = this._createCallback(InputEventType.DPAD_LEFT_DOWN);
        jsb.onDpadLeftUp = this._createCallback(InputEventType.DPAD_LEFT_UP);
        jsb.onDpadRightDown = this._createCallback(InputEventType.DPAD_RIGHT_DOWN);
        jsb.onDpadRightUp = this._createCallback(InputEventType.DPAD_RIGHT_UP);
    }

    private _createCallbackPoseEvent (eventType: InputEventType) {
        return (handleEvent : jsb.HandleEvent) => {
            const eventHandle = new EventHandle(eventType, false, new Vec3(handleEvent.x, handleEvent.y, handleEvent.z), 0, new Quat(handleEvent.quaternionX, handleEvent.quaternionY, handleEvent.quaternionZ, handleEvent.quaternionW));
            this._eventTarget.emit(eventType, eventHandle);
        };
    }

    private _createCallback (eventType: InputEventType) {
        return () => {
            const eventHandle = new EventHandle(eventType, false);
            this._eventTarget.emit(eventType, eventHandle);
        };
    }

    private _createCallbackMoveEvent (eventType: InputEventType) {
        return (handleEvent : jsb.HandleEvent) => {
            const eventHandle = new EventHandle(eventType, false, new Vec3(handleEvent.x, handleEvent.y, 0));
            this._eventTarget.emit(eventType, eventHandle);
        };
    }

    private _createCallbackStartEvent (eventType: InputEventType) {
        return (handleEvent : jsb.HandleEvent) => {
            const eventHandle = new EventHandle(eventType, false, new Vec3(0, 0, 0), handleEvent.value);
            this._eventTarget.emit(eventType, eventHandle);
        };
    }

    public on (eventType: InputEventType, callback: HandleCallback, target?: any) {
        this._eventTarget.on(eventType, callback, target);
    }
}
