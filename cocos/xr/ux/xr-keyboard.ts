import { ccclass, help, menu, displayOrder, serializable, tooltip, type } from 'cc.decorator';
import { Component, EventHandler as ComponentEventHandler, Prefab, instantiate } from "../../core";
import { Node } from '../../core/scene-graph/node';
import { InputEventType } from '../../input/types/event-enum';
import { EventKeyboard } from '../../input/types/event/event-keyboard';
import { KeyCode } from '../../input/types/key-code';
import { tween } from '../../tween/tween';
import { xrKeyboardInput } from './xr-keyboard-handle';

@ccclass('cc.XRKeyboard')
@help('i18n:cc.XRKeyboard')
@menu('XR/UX/XRKeyboard')
export class XRKeyboard extends Component {
    @serializable
    private _showCaret = false;
    @serializable
    private _disableUIInteractionWhenTyping = true;
    @type([ComponentEventHandler])
    @serializable
    @displayOrder(3)
    @tooltip('i18n:xr.xr_keyboard.onCommitText')
    public onCommitText: ComponentEventHandler[] = [];
    @type([ComponentEventHandler])
    @serializable
    @displayOrder(4)
    @tooltip('i18n:xr.xr_keyboard.onShowKeyboard')
    public onShowKeyboard: ComponentEventHandler[] = [];
    @type([ComponentEventHandler])
    @serializable
    @displayOrder(3)
    @tooltip('i18n:xr.xr_keyboard.onHideKeyboard')
    public onHideKeyboard: ComponentEventHandler[] = [];

    @type(Boolean)
    @displayOrder(1)
    @tooltip('i18n:xr.xr_keyboard.showCaret')
    set showCaret(val) {
        if (val === this._showCaret) {
            return;
        }
        this._showCaret = val;
    }
    get showCaret() {
        return this._showCaret;
    }

    @type(Boolean)
    @displayOrder(2)
    @tooltip('i18n:xr.xr_keyboard.disableUIInteractionWhenTyping')
    set disableUIInteractionWhenTyping(val) {
        if (val === this._disableUIInteractionWhenTyping) {
            return;
        }
        this._disableUIInteractionWhenTyping = val;
    }
    get disableUIInteractionWhenTyping() {
        return this._disableUIInteractionWhenTyping;
    }

    private _occupy = false;
    
    set occupy(val) {
        this._occupy = val;
    }

    public getXRKeyboardNode() {
        if (this._occupy) {
            if (this._disableUIInteractionWhenTyping) {
                return null;
            } else {
                const eventKeyboard = new EventKeyboard(KeyCode.ENTER, InputEventType.KEY_UP);
                xrKeyboardInput.emit(InputEventType.KEY_UP, eventKeyboard);
            }
        }
        return this.node;
    }

    public commitText() {
        ComponentEventHandler.emitEvents(this.onCommitText, this);
    }

    public showKeyboard() {
        ComponentEventHandler.emitEvents(this.onShowKeyboard, this);
    }

    public hideKeyboard() {
        ComponentEventHandler.emitEvents(this.onHideKeyboard, this);
    }
}