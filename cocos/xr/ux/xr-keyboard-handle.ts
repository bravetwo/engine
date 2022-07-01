
import { KeyboardCallback } from 'pal/input';
import { EventTarget } from '../../core/event';
import { InputEventType } from '../../input/types/event-enum';
import { EventKeyboard } from '../../input/types/event/event-keyboard';

export class XrKeyboardInputSource {
    private _eventTarget: EventTarget = new EventTarget();

    public on (eventType: InputEventType, callback: KeyboardCallback, target?: any) {
        this._eventTarget.on(eventType, callback, target);
    }

    public off (eventType: InputEventType, callback: KeyboardCallback, target?: any) {
        this._eventTarget.off(eventType, callback, target);
    }

    public emit(type: InputEventType, event: EventKeyboard) {
        this._eventTarget.emit(type, event);
    }
}

export const xrKeyboardInput = new XrKeyboardInputSource();