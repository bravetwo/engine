import { ccclass, help, menu, displayOrder, serializable, tooltip, type } from 'cc.decorator';
import { Component } from "../../core";
import { Node } from '../../core/scene-graph/node';
import { XRKeyboard } from './xr-keyboard';
import { XrKeyboardInput } from './xr-keyboard-input';

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

    private _keyboardNode: Node | null = null;
    private _xrKeyboardInput: XrKeyboardInput | null = null;
    private _maxContextLength = 0;

    public setMaxContextLength(len) {
        this._maxContextLength = len;
    }

    public show() {
        if (this._xrKeyboard && this._suspendTransform) {
            if (this._keyboardNode) {
                return false;
            } else {
                this._keyboardNode = this._xrKeyboard.getXRKeyboardNode();
                if (this._keyboardNode) {
                    this._suspendTransform.addChild(this._keyboardNode);
                    this._xrKeyboard.occupy = true;
                    this._xrKeyboard.node.active = true;

                    const inputNode = this._xrKeyboard.node.getChildByName("Input");
                    if (inputNode) {
                        this._xrKeyboardInput = inputNode.getComponent(XrKeyboardInput);
                        if (this._xrKeyboardInput) {
                            this._xrKeyboardInput.maxContextLength = this._maxContextLength;
                        }
                    }
                    this._xrKeyboard.showKeyboard();
                    return true;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    public hide() {
        if (this._xrKeyboard) {
            this._xrKeyboard.occupy = false;
            this._xrKeyboard.node.active = false;
            this._xrKeyboard.commitText();
            this._xrKeyboard.hideKeyboard();
            this._keyboardNode = null;
        }
    }
}