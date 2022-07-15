
import { KeyboardCallback } from 'pal/input';
import { EventTarget } from '../../core/event';
import { InputEventType } from '../../input/types/event-enum';
import { EventKeyboard } from '../../input/types/event/event-keyboard';

type XRKeyboardInput = (res: string) => void;

export class XrKeyboardInputSource {
    private _eventTarget: EventTarget = new EventTarget();

    public on (eventType: InputEventType, callback: KeyboardCallback | XRKeyboardInput, target?: any) {
        this._eventTarget.on(eventType, callback, target);
    }

    public off (eventType: InputEventType, callback: KeyboardCallback | XRKeyboardInput, target?: any) {
        this._eventTarget.off(eventType, callback, target);
    }

    public emit(type: InputEventType, event?: EventKeyboard | string) {
        this._eventTarget.emit(type, event);
    }
}

export const xrKeyboardInput = new XrKeyboardInputSource();