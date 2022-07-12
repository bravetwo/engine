import { ccclass, help, menu, displayOrder, serializable, tooltip, type } from 'cc.decorator';
import { Label, Overflow } from '../../2d';
import { Graphics } from '../../2d/components/graphics';
import { Component, Vec3 } from "../../core";
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

    private _fontSize = 0;
    private _startX = 0;
    private _string = '';
    private _labelLength = 0;
    private _time = 0;
    private _cursor: Graphics | null = null;
    private _cursorNode = new Node;
    private _labelNode = new Node;
    private _label: Label | null = null;
    private _stringWidths: number[] = [];
    private _keyboardNode: Node | null = null;

    set fontSize(val) {
        if (val === this._fontSize) {
            return;
        }
        this._fontSize = val;
    }
    get fontSize() {
        return this._fontSize;
    }

    set spacingX(val) {
        if (val === this._startX) {
            return;
        }
        this._startX = val;
    }
    get spacingX() {
        return this._startX;
    }

    set string(val) {
        if (val === this._string) {
            return;
        }
        this._string = val;
    }
    get string() {
        return this._string;
    }

    set labelLength(val) {
        if (val === this._labelLength) {
            return;
        }
        this._labelLength = val;
    }
    get labelLength() {
        return this._labelLength;
    }

    set label(val) {
        if (this._label && val) {
            this._label.customMaterial = val.customMaterial;
            this._label.color = val.color;
            this._label.string = val.string;
            this._label.horizontalAlign = val.horizontalAlign;
            this._label.verticalAlign = val.verticalAlign;
            this._label.fontSize = val.fontSize;
            this._label.lineHeight = val.lineHeight;
            this._label.overflow = Overflow.NONE;
            this._label.enableWrapText = val.enableWrapText;
            this._label.useSystemFont = val.useSystemFont;
            this._label.cacheMode = val.cacheMode;
            this._label.isBold = val.isBold;
            this._label.isItalic = val.isItalic;
            this._label.isUnderline = val.isUnderline;
        }
    }
    get label() {
        return this._label;
    }

    onload() {

    }

    onEnable() {
        if (this._xrKeyboard) {
            this._xrKeyboard.node.active = false;
        }

        this.node.addChild(this._cursorNode);
        this._cursor = this._cursorNode.addComponent(Graphics);
        if (this._cursor) {
            this._cursor.lineWidth = 2;
            this._cursor.color.fromHEX('#ffffff');
            this._cursor.fillColor.fromHEX('#ffffff');
            this._cursor.strokeColor.fromHEX('#ffffff');
        }

        this.node.addChild(this._labelNode);
        this._label = this._labelNode.addComponent(Label);
        this._label.enabled = false;
    }

    private _moveCursor(point: Vec3) {
        if (this._stringWidths.length <= 0) {
            return;
        }
        let pos = new Vec3;
        this.node.inverseTransformPoint(pos, point);
        let start = -this._labelLength / 2 + this._startX;
        let width = 0;
        for (var i = 0; i < this._stringWidths.length; i++) {
            if (start + this._stringWidths[i] > pos.x) {
                break;
            }
            width = this._stringWidths[i];
        }
        this._cursorNode.setPosition(start + width, 0, 0);
        this._time = 0;
        if (this._cursor) {
            this._cursor.node.active = true;
        }
    }

    public show(point: Vec3) {
        if (this._xrKeyboard && this._suspendTransform) {
            if (this._keyboardNode) {
                this._moveCursor(point);
                return false;
            } else {
                this._keyboardNode = this._xrKeyboard.getXRKeyboardNode();
                if (this._keyboardNode) {
                    this._suspendTransform.addChild(this._keyboardNode);
                    this._xrKeyboard.occupy = true;
                    this._xrKeyboard.node.active = true;
                    this._xrKeyboard.showKeyboard();
                    return true;
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

    public updateStringWidth(str: string, del: boolean) {
        if (!this._label) {
            return;
        }

        if (del) {
            this._stringWidths.pop();
        } else {
            this._label.string = str;
            this._label.updateRenderData(true);
            if (this._label.node._uiProps.uiTransformComp) {
                this._stringWidths.push(this._label.node._uiProps.uiTransformComp.width);
            }
        }


        let stringWidth = 0;
        if (this._stringWidths.length > 0) {
            stringWidth = this._stringWidths[this._stringWidths.length - 1];
        }
        this._cursorNode.setPosition(-this._labelLength / 2 + this._startX + stringWidth, 0, 0);
        if (this._cursor) {
            this._cursor.node.active = true;
        }
        this._time = 0;
    }

    start() {
        if (!this._cursor) {
            return;
        }
        this._cursorNode.setPosition(-this._labelLength / 2, 0, 0);
        this._cursor.moveTo(0, - this._fontSize / 2);
        this._cursor.lineTo(0, this._fontSize / 2);
        this._cursor.stroke();
        this._cursor.fill();
    }

    update(dt) {
        this._time += dt;
        if (!this._cursor) {
            return;
        }

        if (this._label) {
            if (this._time > 0.5) {
                this._cursor.node.active = !this._cursor.node.active;
                this._time = 0;
            }
        }
    }
}