import { ccclass, help, menu, displayOrder, type, serializable, tooltip, visible, range, slide, displayName } from 'cc.decorator';
import { Component, EventHandler as ComponentEventHandler } from '../core/components';
import { XrEventHandle } from './xr-event-handle';
import { AudioClip } from '../audio/audio-clip';

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
    @tooltip('i18n:HapticEvents.onSelectEntered')
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
    @tooltip('i18n:HapticEvents.onSelectEnteredHaptic')
    @displayOrder(2)
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
    @tooltip('i18n:HapticEvents.onSelectExitedHaptic')
    @displayOrder(5)
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
    @tooltip('i18n:HapticEvents.onSelectCanceledHaptic')
    @displayOrder(8)
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
    @tooltip('i18n:HapticEvents.onHoverEnteredHaptic')
    @displayOrder(11)
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
    @tooltip('i18n:HapticEvents.hapticIntensity')
    @displayOrder(14)
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
    @tooltip('i18n:HapticEvents.onHoverCanceledHaptic')
    @displayOrder(17)
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
    public hoverEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(2)
    public hoverExitEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(3)
    public selectEnterEvents: ComponentEventHandler[] = [];

    @type([ComponentEventHandler])
    @serializable
    @displayOrder(4)
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

@ccclass('cc.InteractorEvents')
@help('i18n:cc.InteractorEvents')
@menu('XR/InteractorEvents')
export class InteractorEvents extends Component {
    @type(AudioEvents)
    @serializable
    @displayOrder(1)
    public audioEvents: AudioEvents = new AudioEvents;

    @type(HapticEvents)
    @serializable
    @displayOrder(2)
    public hapticEvents: HapticEvents = new HapticEvents;

    @type(SubInteractorEvents)
    @serializable
    @displayOrder(3)
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