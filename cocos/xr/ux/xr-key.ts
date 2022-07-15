import { ccclass, help, menu, displayOrder, serializable, tooltip, type } from 'cc.decorator';
import { Graphics, Label, SpriteFrame } from '../../2d';
import { Component, ccenum, Vec3 } from "../../core";
import { Button } from '../../ui/button';
import { XrUIPressEventType } from '../event/xr-event-handle';
import { KeyCode } from '../../input/types/key-code';
import { EventKeyboard } from '../../input/types/event/event-keyboard';
import { InputEventType } from '../../input/types/event-enum';
import { xrKeyboardInput } from './xr-keyboard-handle';
import { XrKeyboardInput } from './xr-keyboard-input';

ccenum(KeyCode);

@ccclass('cc.XrKey')
@help('i18n:cc.XrKey')
@menu('XR/UX/XrKey')
export class XrKey extends Component {
    @serializable
    private _key: KeyCode = KeyCode.NONE;
    @serializable
    private _spriteFrameOn: SpriteFrame | null = null;
    @serializable
    private _spriteFrameOff: SpriteFrame | null = null;
    @serializable
    private _capitalSpriteFrameOn: SpriteFrame | null = null;
    @serializable
    private _capitalSpriteFrameOff: SpriteFrame | null = null;

    @type(KeyCode)
    @displayOrder(1)
    @tooltip('i18n:xr.xr_key.key')
    set key(val) {
        if (val === this._key) {
            return;
        }
        this._key = val;
    }
    get key() {
        return this._key;
    }

    @type(SpriteFrame)
    @displayOrder(2)
    @tooltip('i18n:xr.xr_key.spriteFrameOn')
    set spriteFrameOn(val) {
        if (val === this._spriteFrameOn) {
            return;
        }
        this._spriteFrameOn = val;
    }
    get spriteFrameOn() {
        return this._spriteFrameOn;
    }

    @type(SpriteFrame)
    @displayOrder(3)
    @tooltip('i18n:xr.xr_key.spriteFrameOff')
    set spriteFrameOff(val) {
        if (val === this._spriteFrameOff) {
            return;
        }
        this._spriteFrameOff = val;
    }
    get spriteFrameOff() {
        return this._spriteFrameOff;
    }

    @type(SpriteFrame)
    @displayOrder(4)
    @tooltip('i18n:xr.xr_key.capitalSpriteFrameOn')
    set capitalSpriteFrameOn(val) {
        if (val === this._capitalSpriteFrameOn) {
            return;
        }
        this._capitalSpriteFrameOn = val;
    }
    get capitalSpriteFrameOn() {
        return this._capitalSpriteFrameOn;
    }

    @type(SpriteFrame)
    @displayOrder(5)
    @tooltip('i18n:xr.xr_key.capitalSpriteFrameOff')
    set capitalSpriteFrameOff(val) {
        if (val === this._capitalSpriteFrameOff) {
            return;
        }
        this._capitalSpriteFrameOff = val;
    }
    get capitalSpriteFrameOff() {
        return this._capitalSpriteFrameOff;
    }

    private _button: Button | null = null;
    private _capsLock = false;
    // only input use
    private _xrKeyboardInput: XrKeyboardInput | null = null;

    onLoad() {
        this._button = this.node.getComponent(Button);
        if (this._key === KeyCode.NONE) {
            if (!this._xrKeyboardInput) {
                this._xrKeyboardInput = this.node.addComponent(XrKeyboardInput);
            }
        }
    }

    onEnable() {
        this.node.on(XrUIPressEventType.XRUI_CLICK, this._xrUIClick, this);
        this.node.on(XrUIPressEventType.XRUI_UNCLICK, this._xrUIUnClick, this);
        xrKeyboardInput.on(InputEventType.XR_KEYBOARD_INIT, this._init, this);
        xrKeyboardInput.on(InputEventType.XR_CAPS_LOCK, this._xrCapsLock, this);
    }

    onDisable() {
        this.node.off(XrUIPressEventType.XRUI_CLICK, this._xrUIClick, this);
        this.node.off(XrUIPressEventType.XRUI_UNCLICK, this._xrUIUnClick, this);
        xrKeyboardInput.off(InputEventType.XR_KEYBOARD_INIT, this._init, this);
        xrKeyboardInput.off(InputEventType.XR_CAPS_LOCK, this._xrCapsLock, this);
    }

    protected _xrUIClick() {
        if (this._key !== KeyCode.NONE) {
            const eventKeyboard = new EventKeyboard(this._key, InputEventType.KEY_DOWN);
            xrKeyboardInput.emit(InputEventType.KEY_DOWN, eventKeyboard);
        }
    }

    protected _xrUIUnClick(point: Vec3) {
        if (this._key === KeyCode.NONE) {
            this._xrKeyboardInput?.moveCursor(point);
        } else {
            const eventKeyboard = new EventKeyboard(this._key, InputEventType.KEY_UP);
            xrKeyboardInput.emit(InputEventType.KEY_UP, eventKeyboard);
            if (this._key === KeyCode.CAPS_LOCK) {
                xrKeyboardInput.emit(InputEventType.XR_CAPS_LOCK, eventKeyboard);
            }
        }
    }

    protected _init() {
        this._capsLock = false;
        if (!this._button) {
            return;
        }
        if (this._key === KeyCode.CAPS_LOCK) {
            this._button.normalSprite = this._spriteFrameOff;
            this._button.pressedSprite = this._spriteFrameOn;
            this._button.hoverSprite = this._spriteFrameOn;
        } else if (this._key > 64 && this._key < 91) {
            this._button.normalSprite = this._spriteFrameOff;
            this._button.pressedSprite = this._spriteFrameOff;
            this._button.hoverSprite = this._spriteFrameOn;
        }
    }

    protected _xrCapsLock() {
        if (!this._button) {
            return;
        }

        if (!this._capsLock) {
            if (this._key === KeyCode.CAPS_LOCK) {
                this._button.normalSprite = this._spriteFrameOn;
                this._button.pressedSprite = this._spriteFrameOff;
                this._button.hoverSprite = this._spriteFrameOff;
            } else if (this._key > 64 && this._key < 91) {
                this._button.normalSprite = this._capitalSpriteFrameOff;
                this._button.pressedSprite = this._capitalSpriteFrameOff;
                this._button.hoverSprite = this._capitalSpriteFrameOn;
            }
        } else {
            if (this._key === KeyCode.CAPS_LOCK) {
                this._button.normalSprite = this._spriteFrameOff;
                this._button.pressedSprite = this._spriteFrameOn;
                this._button.hoverSprite = this._spriteFrameOn;
            } else if (this._key > 64 && this._key < 91) {
                this._button.normalSprite = this._spriteFrameOff;
                this._button.pressedSprite = this._spriteFrameOff;
                this._button.hoverSprite = this._spriteFrameOn;
            }
        }
        this._capsLock = !this._capsLock;
    }
}