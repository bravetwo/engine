import { ccclass, help, menu, displayOrder, serializable, tooltip, type } from 'cc.decorator';
import { Component } from "../../core";
import { Node } from '../../core/scene-graph/node';
import { XRKeyboard } from './xr-keyboard';

@ccclass('cc.XRKeyboardInputField')
@help('i18n:cc.XRKeyboardInputField')
@menu('XR/UX/XRKeyboardInputField')
export class XRKeyboardInputField extends Component {
    @serializable
    private _suspendTransform: Node | null = null;
    @serializable
    private _xrKeyboard: XRKeyboard | null = null;

    @type(Node)
    @displayOrder(1)
    @tooltip('i18n:xr.xr_keyboard_input_field.suspendTransform')
    set suspendTransform(val) {
        if (val === this._suspendTransform) {
            return;
        }
        this._suspendTransform = val;
    }
    get suspendTransform() {
        return this._suspendTransform;
    }

    @type(XRKeyboard)
    @displayOrder(2)
    @tooltip('i18n:xr.xr_keyboard_input_field.xRKeyboard')
    set xRKeyboard(val) {
        if (val === this._xrKeyboard) {
            return;
        }
        this._xrKeyboard = val;
    }
    get xRKeyboard() {
        return this._xrKeyboard;
    }

    onEnable() {
        if (this._xrKeyboard) {
            this._xrKeyboard.node.active = false;
        }
    }

    public show() {
        if (this._xrKeyboard && this._suspendTransform) {
            const node = this._xrKeyboard.getXRKeyboardNode();
            if (node) {
                this._suspendTransform.addChild(node);
                this._xrKeyboard.occupy = true;
                this._xrKeyboard.node.active = true;
                this._xrKeyboard.showKeyboard();
                return true;
            }
        }

        return false;
    }

    public hide() {
        if (this._xrKeyboard) {
            this._xrKeyboard.occupy = false;
            this._xrKeyboard.node.active = false;
            this._xrKeyboard.hideKeyboard();
        }
    }
}