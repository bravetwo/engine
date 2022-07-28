
import { KeyboardCallback } from 'pal/input';
import { EventTarget } from '../../core/event';
import { InputEventType } from '../../input/types/event-enum';
import { EventKeyboard } from '../../input/types/event/event-keyboard';

type XRKeyboardInputCallback = (res: string) => void;

export class XrKeyboardInputSource {
    private _eventTarget: EventTarget = new EventTarget();

    public on (eventType: InputEventType, callback: KeyboardCallback | XRKeyboardInputCallback, target?: any) {
        this._eventTarget.on(eventType, callback, target);
    }

    public off (eventType: InputEventType, callback: KeyboardCallback | XRKeyboardInputCallback, target?: any) {
        this._eventTarget.off(eventType, callback, target);
    }

    public emit(type: InputEventType, event?: EventKeyboard | string) {
        this._eventTarget.emit(type, event);
    }
}

export const xrKeyboardEventInput = new XrKeyboardInputSource();