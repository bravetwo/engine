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
        
    }

    public on (eventType: InputEventType, callback: HandleCallback, target?: any) {
        this._eventTarget.on(eventType, callback, target);
    }
}
