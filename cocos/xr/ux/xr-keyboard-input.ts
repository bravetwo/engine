import { Component } from "../../core/components";
import { Graphics, Label } from "../../2d";
import { Node } from '../../core/scene-graph/node';
import { xrKeyboardInput } from "./xr-keyboard-handle";
import { InputEventType } from "../../input/types/event-enum";
import { EventKeyboard } from "../../input/types/event/event-keyboard";
import { KeyCode } from "../../input/types/key-code";
import { Vec3 } from "../../core";

enum StringChangeType {
    INIT = 0,
    DELETE = 1,
    ADD = 2
}

export class XrKeyboardInput extends Component {
    private _string = "";
    private _label: Label | null = null;
    private _cursor: Graphics | null = null;
    private _cursorNode: Node = new Node;
    private _stringWidths: number[] = [];
    private _capsLock = false;
    private _maxContextLength = 0;
    private _pos = -1;
    // private _time = 0;

    set maxContextLength(val) {
        this._maxContextLength = val;
    }
    get maxContextLength() {
        return this._maxContextLength;
    }

    onEnable() {
        this._label = this.node.getComponentInChildren(Label);
        if (this._label) {
            this._label.node.addChild(this._cursorNode);
            this._cursor = this._cursorNode.addComponent(Graphics);
            this._cursor.lineWidth = 8;
            this._cursor.color.fromHEX('#ffffff');
            this._cursor.fillColor.fromHEX('#ffffff');
            this._cursor.strokeColor.fromHEX('#ffffff');
            if (this._label.node._uiProps.uiTransformComp) {
                this._cursorNode.setPosition(0, -this._label.node._uiProps.uiTransformComp.height / 2, 0);
            }
            this._cursor.moveTo(0, - this._label.fontSize / 2);
            this._cursor.lineTo(0, this._label.fontSize / 2);
            this._cursor.stroke();
            this._cursor.fill();

            this.updateStringWidth(this._label.string, StringChangeType.INIT);
        }

        xrKeyboardInput.on(InputEventType.KEY_UP, this._keyUp, this);
        xrKeyboardInput.on(InputEventType.XR_CAPS_LOCK, this._xrCapsLock, this);
        xrKeyboardInput.on(InputEventType.XR_KEYBOARD_INIT, this._init, this);
    }

    onDisable() {
        xrKeyboardInput.off(InputEventType.KEY_UP, this._keyUp, this);
        xrKeyboardInput.off(InputEventType.XR_CAPS_LOCK, this._xrCapsLock, this);
        xrKeyboardInput.off(InputEventType.XR_KEYBOARD_INIT, this._init, this);
    }

    protected _init() {
        this._capsLock = false;
    }

    protected _xrCapsLock() {
        this._capsLock = !this._capsLock;
    }

    public moveCursor(point: Vec3) {
        if (this._stringWidths.length <= 0) {
            return;
        }
        let pos = new Vec3;
        this._label?.node.inverseTransformPoint(pos, point);
        for (var i = 0; i < this._stringWidths.length; i++) {
            if (this._stringWidths[i] > pos.x) {
                break;
            }
        }
        this._pos = i - 1;
        const posX = (this._pos === -1) ? 0 : this._stringWidths[this._pos];
        this._cursorNode.setPosition(posX, this._cursorNode.position.y, this._cursorNode.position.z);
    }

    protected _keyUp(event: EventKeyboard) {
        if (event.keyCode === KeyCode.ENTER) {
            xrKeyboardInput.emit(InputEventType.XR_KEYBOARD_INPUT, this._string);
        } else if (event.keyCode === KeyCode.BACKSPACE) {
            if (this._pos >= 0) {
                this._string = this._string.substring(0, this._pos) + this._string.substring(this._pos + 1, this._string.length);
                this._pos--;
                this.updateStringWidth(this._string, StringChangeType.DELETE);
            }
        } else if (event.keyCode === KeyCode.CAPS_LOCK) {

        } else {
            if (this._string.length < this._maxContextLength) {
                let code;
                if (!this._capsLock && event.keyCode > 64 && event.keyCode < 91) {
                    code = String.fromCharCode(event.keyCode + 32);
                } else {
                    code = String.fromCharCode(event.keyCode);
                }
                this._string = this._string.substring(0, this._pos + 1) + code + this._string.substring(this._pos + 1, this._string.length);
                this._pos++;
                this.updateStringWidth(this._string, StringChangeType.ADD);
            }
        }
    }

    public updateStringWidth(str: string, type: StringChangeType) {
        if (!this._label) {
            return;
        }
        this._label.string = str;

        if (type === StringChangeType.DELETE) {
            this._stringDeleteWidth();
        } else {
            this._label.updateRenderData(true);
            if (type === StringChangeType.ADD) {
                this._stringAddWidth();
            } else {
                this._stringInitWidth();
            }
        }

        let stringWidth = (this._pos === -1) ? 0 : this._stringWidths[this._pos];

        this._cursorNode.setPosition(stringWidth, this._cursorNode.position.y, this._cursorNode.position.z);
    }

    private _stringDeleteWidth() {
        let d = 0;
        if (this._pos === -1) {
            d = this._stringWidths[this._pos + 1];
        } else {
            d = this._stringWidths[this._pos + 1] - this._stringWidths[this._pos];
        }
        for (let i = this._pos + 1; i < this._stringWidths.length - 1; ++i) {
            this._stringWidths[i] = this._stringWidths[i + 1] - d;
        }
        this._stringWidths.pop();
    }

    private _stringAddWidth() {
        if (!this._label?.node._uiProps.uiTransformComp) {
            return;
        }
        if (this._stringWidths.length > 0) {
            const d = this._label.node._uiProps.uiTransformComp.width - this._stringWidths[this._stringWidths.length - 1];
            for (let i = this._stringWidths.length - 1; i > this._pos - 1; --i) {
                if (i === 0) {
                    this._stringWidths[i] = d;
                } else {
                    this._stringWidths[i] = this._stringWidths[i - 1] + d;
                }
            }
        }
        this._stringWidths.push(this._label.node._uiProps.uiTransformComp.width);
    }

    private _stringInitWidth() {
        this._pos = this._stringWidths.length - 1;
    }

    // update(dt) {
    //     this._time += dt;
    //     if (this._time > 0.5) {
    //         this._cursorNode.active = !this._cursorNode.active;
    //         this._time = 0;
    //     }
    // }
}