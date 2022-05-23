/*
 Copyright (c) 2022-2022 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module component/xr
 */

import { ccclass, help, menu, displayOrder, type, serializable, tooltip, visible, range, slide, displayName } from 'cc.decorator';
import { AudioClip } from '../../audio';
import { Component, EventHandler as ComponentEventHandler } from '../../core/components';
import { XrEventHandle } from './xr-event-handle';

@ccclass('cc.AudioEvents')
class AudioEvents {
    @serializable
    protected _onSelectEntered = false;
    @serializable
    protected _onSelectEnteredAudioClip: AudioClip | null = null;
    @serializable
    protected _onSelectExited = false;
    @serializable
    protected _onSelectExitedAudioClip: AudioClip | null = null;
    @serializable
    protected _onSelectCanceled = false;
    @serializable
    protected _onSelectCanceledAudioClip: AudioClip | null = null;
    @serializable
    protected _onHoverEntered = false;
    @serializable
    protected _onHoverEnteredAudioClip: AudioClip | null = null;
    @serializable
    protected _onHoverExited = false;
    @serializable
    protected _onHoverExitedAudioClip: AudioClip | null = null;
    @serializable
    protected _onHoverCanceled = false;
    @serializable
    protected _onHoverCanceledAudioClip: AudioClip | null = null;

    @type(Boolean)
    @displayOrder(1)
    @tooltip('i18n:xr.interactor_events.audio_events.onSelectEntered')
    set onSelectEntered (val) {
        if (val === this._onSelectEntered) {
            return;
        }
        this._onSelectEntered = val;
    }
    get onSelectEntered () {
        return this._onSelectEntered;
    }

    @type(AudioClip)
    @visible(function (this: AudioEvents) {
        return this._onSelectEntered;
    })
    @displayName("AudioClip")
    @displayOrder(2)
    @tooltip('i18n:xr.interactor_events.audio_events.onSelectEnteredAudioClip')
    set onSelectEnteredAudioClip(val) {
        if (val === this._onSelectEnteredAudioClip) {
            return;
        }
        this._onSelectEnteredAudioClip = val;
    }
    get onSelectEnteredAudioClip() {
        return this._onSelectEnteredAudioClip;
    }

    @type(Boolean)
    @displayOrder(3)
    @tooltip('i18n:xr.interactor_events.audio_events.onSelectExited')
    set onSelectExited (val) {
        if (val === this._onSelectExited) {
            return;
        }
        this._onSelectExited = val;
    }
    get onSelectExited () {
        return this._onSelectExited;
    }

    @type(AudioClip)
    @visible(function (this: AudioEvents) {
        return this._onSelectExited;
    })
    @displayName("AudioClip")
    @displayOrder(4)
    @tooltip('i18n:xr.interactor_events.audio_events.onSelectExitedAudioClip')
    set onSelectExitedAudioClip(val) {
        if (val === this._onSelectExitedAudioClip) {
            return;
        }
        this._onSelectExitedAudioClip = val;
    }
    get onSelectExitedAudioClip() {
        return this._onSelectExitedAudioClip;
    }

    @type(Boolean)
    @displayOrder(5)
    @tooltip('i18n:xr.interactor_events.audio_events.onSelectCanceled')
    set onSelectCanceled (val) {
        if (val === this._onSelectCanceled) {
            return;
        }
        this._onSelectCanceled = val;
    }
    get onSelectCanceled () {
        return this._onSelectCanceled;
    }

    @type(AudioClip)
    @visible(function (this: AudioEvents) {
        return this._onSelectCanceled;
    })
    @displayName("AudioClip")
    @displayOrder(6)
    @tooltip('i18n:xr.interactor_events.audio_events.onSelectCanceledAudioClip')
    set onSelectCanceledAudioClip(val) {
        if (val === this._onSelectCanceledAudioClip) {
            return;
        }
        this._onSelectCanceledAudioClip = val;
    }
    get onSelectCanceledAudioClip() {
        return this._onSelectCanceledAudioClip;
    }

    @type(Boolean)
    @displayOrder(7)
    @tooltip('i18n:xr.interactor_events.audio_events.onHoverEntered')
    set onHoverEntered (val) {
        if (val === this._onHoverEntered) {
            return;
        }
        this._onHoverEntered = val;
    }
    get onHoverEntered () {
        return this._onHoverEntered;
    }

    @type(AudioClip)
    @visible(function (this: AudioEvents) {
        return this._onHoverEntered;
    })
    @displayName("AudioClip")
    @displayOrder(8)
    @tooltip('i18n:xr.interactor_events.audio_events.onHoverEnteredAudioClip')
    set onHoverEnteredAudioClip(val) {
        if (val === this._onHoverEnteredAudioClip) {
            return;
        }
        this._onHoverEnteredAudioClip = val;
    }
    get onHoverEnteredAudioClip() {
        return this._onHoverEnteredAudioClip;
    }

    @type(Boolean)
    @displayOrder(9)
    @tooltip('i18n:xr.interactor_events.audio_events.onHoverExited')
    set onHoverExited (val) {
        if (val === this._onHoverExited) {
            return;
        }
        this._onHoverExited = val;
    }
    get onHoverExited () {
        return this._onHoverExited;
    }

    @type(AudioClip)
    @visible(function (this: AudioEvents) {
        return this._onHoverExited;
    })
    @displayName("AudioClip")
    @displayOrder(10)
    @tooltip('i18n:xr.interactor_events.audio_events.onHoverExitedAudioClip')
    set onHoverExitedAudioClip(val) {
        if (val === this._onHoverExitedAudioClip) {
            return;
        }
        this._onHoverExitedAudioClip = val;
    }
    get onHoverExitedAudioClip() {
        return this._onHoverExitedAudioClip;
    }

    @type(Boolean)
    @displayOrder(11)
    @tooltip('i18n:xr.interactor_events.audio_events.onHoverCanceled')
    set onHoverCanceled (val) {
        if (val === this._onHoverCanceled) {
            return;
        }
        this._onHoverCanceled = val;
    }
    get onHoverCanceled () {
        return this._onHoverCanceled;
    }

    @type(AudioClip)
    @visible(function (this: AudioEvents) {
        return this._onHoverCanceled;
    })
    @displayName("AudioClip")
    @displayOrder(12)
    @tooltip('i18n:xr.interactor_events.audio_events.onHoverCanceledAudioClip')
    set onHoverCanceledAudioClip(val) {
        if (val === this._onHoverCanceledAudioClip) {
            return;
        }
        this._onHoverCanceledAudioClip = val;
    }
    get onHoverCanceledAudioClip() {
        return this._onHoverCanceledAudioClip;
    }
}

@ccclass('cc.HapticEvents')
class HapticEvents {
    @serializable
    protected _onSelectEntered = false;
    @serializable
    protected _onSelectEnteredHaptic = 0;
    @serializable
    protected _onSelectEnteredDuration = 0;
    @serializable
    protected _onSelectExited = false;
    @serializable
    protected _onSelectExitedHaptic = 0;
    @serializable
    protected _onSelectExitedDuration = 0;
    @serializable
    protected _onSelectCanceled = false;
    @serializable
    protected _onSelectCanceledHaptic = 0;
    @serializable
    protected _onSelectCanceledDuration = 0;
    @serializable
    protected _onHoverEntered = false;
    @serializable
    protected _onHoverEnteredHaptic = 0;
    @serializable
    protected _onHoverEnteredDuration = 0;
    @serializable
    protected _onHoverExited = false;
    @serializable
    protected _onHoverExitedHaptic = 0;
    @serializable
    protected _onHoverExitedDuration = 0;
    @serializable
    protected _onHoverCanceled = false;
    @serializable
    protected _onHoverCanceledHaptic = 0;
    @serializable
    protected _onHoverCanceledDuration = 0;

    /**
    * @en 
    * The current HapticEvents of the bar sprite. The valid value is between 0-1.
    * @zh 
    * 当前进度值，该数值的区间是 0-1 之间。
    */
    @type(Boolean)
    @displayOrder(1)
    @tooltip('i18n:xr.interactor_events.haptic_events.onSelectEntered')
    set onSelectEntered (val) {
        if (val === this._onSelectEntered) {
            return;
        }
        this._onSelectEntered = val;
    }
    get onSelectEntered () {
        return this._onSelectEntered;
    }

    /**
    * @en The current HapticEvent of the bar sprite. The valid value is between 0-1.
    *
    * @zh 当前进度值，该数值的区间是 0-1 之间。
    */
    @visible(function (this: HapticEvents) {
        return this._onSelectEntered;
    })
    @range([0, 1, 0.1])
    @slide
    @displayName("Haptic Intensity")
    @displayOrder(2)
    @tooltip('i18n:xr.interactor_events.haptic_events.onSelectEnteredHaptic')
    set onSelectEnteredHaptic(val) {
        if (this._onSelectEnteredHaptic === val) {
            return;
        }

        this._onSelectEnteredHaptic = val;
    }
    get onSelectEnteredHaptic() {
        return this._onSelectEnteredHaptic;
    }

    @visible(function (this: HapticEvents) {
        return this._onSelectEntered;
    })
    @displayName("Duration")
    @displayOrder(3)
    @tooltip('i18n:xr.interactor_events.haptic_events.onSelectEnteredDuration')
    set onSelectEnteredDuration(val) {
        if (val === this._onSelectEnteredDuration) {
            return;
        }
        this._onSelectEnteredDuration = val;
    }
    get onSelectEnteredDuration() {
        return this._onSelectEnteredDuration;
    }

    @type(Boolean)
    @displayOrder(4)
    @tooltip('i18n:xr.interactor_events.haptic_events.onSelectExited')
    set onSelectExited (val) {
        if (val === this._onSelectExited) {
            return;
        }
        this._onSelectExited = val;
    }
    get onSelectExited () {
        return this._onSelectExited;
    }
    /**
    * @en The current HapticEvents of the bar sprite. The valid value is between 0-1.
    *
    * @zh 当前进度值，该数值的区间是 0-1 之间。
    */
     @visible(function (this: HapticEvents) {
        return this._onSelectExited;
    })
    @range([0, 1, 0.1])
    @slide
    @displayName("Haptic Intensity")
    @displayOrder(5)
    @tooltip('i18n:xr.interactor_events.haptic_events.onSelectExitedHaptic')
    set onSelectExitedHaptic(value) {
        if (this._onSelectExitedHaptic === value) {
            return;
        }

        this._onSelectExitedHaptic = value;
    }
    get onSelectExitedHaptic() {
        return this._onSelectExitedHaptic;
    }

    @visible(function (this: HapticEvents) {
        return this._onSelectExited;
    })
    @displayName("Duration")
    @displayOrder(6)
    @tooltip('i18n:xr.interactor_events.haptic_events.onSelectExitedDuration')
    set onSelectExitedDuration(val) {
        if (val === this._onSelectExitedDuration) {
            return;
        }
        this._onSelectExitedDuration = val;
    }
    get onSelectExitedDuration() {
        return this._onSelectExitedDuration;
    }

    @type(Boolean)
    @displayOrder(7)
    @tooltip('i18n:xr.interactor_events.haptic_events.onSelectCanceled')
    set onSelectCanceled (val) {
        if (val === this._onSelectCanceled) {
            return;
        }
        this._onSelectCanceled = val;
    }
    get onSelectCanceled () {
        return this._onSelectCanceled;
    }

    /**
    * @en The current HapticEvents of the bar sprite. The valid value is between 0-1.
    *
    * @zh 当前进度值，该数值的区间是 0-1 之间。
    */
    @visible(function (this: HapticEvents) {
        return this._onSelectCanceled;
    })
    @range([0, 1, 0.1])
    @slide
    @displayName("Haptic Intensity")
    @displayOrder(8)
    @tooltip('i18n:xr.interactor_events.haptic_events.onSelectCanceledHaptic')
    set onSelectCanceledHaptic(value) {
        if (this._onSelectCanceledHaptic === value) {
            return;
        }

        this._onSelectCanceledHaptic = value;
    }
    get onSelectCanceledHaptic() {
        return this._onSelectCanceledHaptic;
    }

    @visible(function (this: HapticEvents) {
        return this._onSelectCanceled;
    })
    @displayName("Duration")
    @displayOrder(9)
    @tooltip('i18n:xr.interactor_events.haptic_events.onSelectCanceledDuration')
    set onSelectCanceledDuration(val) {
        if (val === this._onSelectCanceledDuration) {
            return;
        }
        this._onSelectCanceledDuration = val;
    }
    get onSelectCanceledDuration() {
        return this._onSelectCanceledDuration;
    }

    @type(Boolean)
    @displayOrder(10)
    @tooltip('i18n:xr.interactor_events.haptic_events.onHoverEntered')
    set onHoverEntered (val) {
        if (val === this._onHoverEntered) {
            return;
        }
        this._onHoverEntered = val;
    }
    get onHoverEntered () {
        return this._onHoverEntered;
    }

    /**
    * @en 
    * The current HapticEvents of the bar sprite. The valid value is between 0-1.
    * @zh 
    * 当前进度值，该数值的区间是 0-1 之间。
    */
    @visible(function (this: HapticEvents) {
        return this._onHoverEntered;
    })
    @range([0, 1, 0.1])
    @slide
    @displayName("Haptic Intensity")
    @displayOrder(11)
    @tooltip('i18n:xr.interactor_events.haptic_events.onHoverEnteredHaptic')
    set onHoverEnteredHaptic(value) {
        if (this._onHoverEnteredHaptic === value) {
            return;
        }

        this._onHoverEnteredHaptic = value;
    }
    get onHoverEnteredHaptic() {
        return this._onHoverEnteredHaptic;
    }

    @visible(function (this: HapticEvents) {
        return this._onHoverEntered;
    })
    @displayName("Duration")
    @displayOrder(12)
    @tooltip('i18n:xr.interactor_events.haptic_events.onHoverEnteredDuration')
    set onHoverEnteredDuration(val) {
        if (val === this._onHoverEnteredDuration) {
            return;
        }
        this._onHoverEnteredDuration = val;
    }
    get onHoverEnteredDuration() {
        return this._onHoverEnteredDuration;
    }

    @type(Boolean)
    @displayOrder(13)
    @tooltip('i18n:xr.interactor_events.haptic_events.onHoverExited')
    set onHoverExited (val) {
        if (val === this._onHoverExited) {
            return;
        }
        this._onHoverExited = val;
    }
    get onHoverExited () {
        return this._onHoverExited;
    }

    /**
    * @en The current HapticEvents of the bar sprite. The valid value is between 0-1.
    *
    * @zh 当前进度值，该数值的区间是 0-1 之间。
    */
     @visible(function (this: HapticEvents) {
        return this._onHoverExited;
    })
    @range([0, 1, 0.1])
    @slide
    @displayName("Haptic Intensity")
    @displayOrder(14)
    @tooltip('i18n:xr.interactor_events.haptic_events.onHoverExitedHaptic')
    set onHoverExitedHaptic(value) {
        if (this._onHoverExitedHaptic === value) {
            return;
        }

        this._onHoverExitedHaptic = value;
    }
    get onHoverExitedHaptic() {
        return this._onHoverExitedHaptic;
    }

    @visible(function (this: HapticEvents) {
        return this._onHoverExited;
    })
    @displayName("Duration")
    @displayOrder(15)
    @tooltip('i18n:xr.interactor_events.haptic_events.onHoverExitedDuration')
    set onHoverExitedDuration(val) {
        if (val === this._onHoverExitedDuration) {
            return;
        }
        this._onHoverExitedDuration = val;
    }
    get onHoverExitedDuration() {
        return this._onHoverExitedDuration;
    }

    @type(Boolean)
    @displayOrder(16)
    @tooltip('i18n:xr.interactor_events.haptic_events.onHoverCanceled')
    set onHoverCanceled (val) {
        if (val === this._onHoverCanceled) {
            return;
        }
        this._onHoverCanceled = val;
    }
    get onHoverCanceled () {
        return this._onHoverCanceled;
    }

    /**
    * @en The current HapticEvents of the bar sprite. The valid value is between 0-1.
    *
    * @zh 当前进度值，该数值的区间是 0-1 之间。
    */
    @visible(function (this: HapticEvents) {
        return this._onHoverCanceled;
    })
    @range([0, 1, 0.1])
    @slide
    @displayName("Haptic Intensity")
    @displayOrder(17)
    @tooltip('i18n:xr.interactor_events.haptic_events.onHoverCanceledHaptic')
    set onHoverCanceledHaptic(value) {
        if (this._onHoverCanceledHaptic === value) {
            return;
        }

        this._onHoverCanceledHaptic = value;
    }
    get onHoverCanceledHaptic() {
        return this._onHoverCanceledHaptic;
    }

    @visible(function (this: HapticEvents) {
        return this._onHoverCanceled;
    })
    @displayName("Duration")
    @displayOrder(18)
    @tooltip('i18n:xr.interactor_events.haptic_events.onHoverCanceledDuration')
    set onHoverCanceledDuration(val) {
        if (val === this._onHoverCanceledDuration) {
            return;
        }
        this._onHoverCanceledDuration = val;
    }
    get onHoverCanceledDuration() {
        return this._onHoverCanceledDuration;
    }
}

@ccclass('cc.SubInteractorEvents')
class SubInteractorEvents {
    @type([ComponentEventHandler])
    @serializable
    @displayOrder(1)
    @tooltip('i18n:xr.interactor_events.sub_interactor_events.hoverEnterEvents')
    public hoverEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(2)
    @tooltip('i18n:xr.interactor_events.sub_interactor_events.hoverExitEvents')
    public hoverExitEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(3)
    @tooltip('i18n:xr.interactor_events.sub_interactor_events.selectEnterEvents')
    public selectEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(4)
    @tooltip('i18n:xr.interactor_events.sub_interactor_events.selectExitEvents')
    public selectExitEvents: ComponentEventHandler[] = [];

    public selectEntered(event: XrEventHandle) {
        ComponentEventHandler.emitEvents(this.selectEnterEvents, event);
    }

    public selectExited(event: XrEventHandle) {
        ComponentEventHandler.emitEvents(this.selectExitEvents, event);
    }

    public hoverEntered(event: XrEventHandle) {
        ComponentEventHandler.emitEvents(this.hoverEnterEvents, event);
    }

    public hoverExited(event: XrEventHandle) {
        ComponentEventHandler.emitEvents(this.hoverExitEvents, event);
    }

}

/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.InteractorEvents')
@help('i18n:cc.InteractorEvents')
@menu('XR/Event/InteractorEvents')
export class InteractorEvents extends Component {
    @type(AudioEvents)
    @serializable
    @displayOrder(1)
    @tooltip('i18n:xr.interactor_events.audioEvents')
    public audioEvents: AudioEvents = new AudioEvents;

    @type(HapticEvents)
    @serializable
    @displayOrder(2)
    @tooltip('i18n:xr.interactor_events.hapticEvents')
    public hapticEvents: HapticEvents = new HapticEvents;

    @type(SubInteractorEvents)
    @serializable
    @displayOrder(3)
    @tooltip('i18n:xr.interactor_events.interactorEvents')
    public interactorEvents: SubInteractorEvents = new SubInteractorEvents;

    public selectEntered(event: XrEventHandle) {
        this.interactorEvents.selectEntered(event);
        if (this.audioEvents.onSelectEntered) {
            this.audioEvents.onSelectEnteredAudioClip?.play();
        }
        // if (this.hapticEvents.onSelectEntered) {
            
        // }
    }

    public selectExited(event: XrEventHandle) {
        this.interactorEvents.selectExited(event);
        if (this.audioEvents.onSelectExited) {
            this.audioEvents.onSelectExitedAudioClip?.play();
        }
        // if (this.hapticEvents.onSelectExited) {
            
        // }
    }

    public hoverEntered(event: XrEventHandle) {
        this.interactorEvents.hoverEntered(event);
        if (this.audioEvents.onHoverEntered) {
            this.audioEvents.onHoverEnteredAudioClip?.play();
        }
        // if (this.hapticEvents.onHoverEntered) {
            
        // }
    }

    public hoverExited(event: XrEventHandle) {
        this.interactorEvents.hoverExited(event);
        if (this.audioEvents.onHoverExited) {
            this.audioEvents.onHoverExitedAudioClip?.play();
        }
        // if (this.hapticEvents.onHoverExited) {
            
        // }
    }
}