import { ccclass, help, menu, displayOrder, type, serializable} from 'cc.decorator';
import { Component } from '../core/components';
import { TrackingOrigin } from './tracking-origin';

@ccclass('cc.LocomotionChecker')
@help('i18n:cc.LocomotionChecker')
@menu('XR/LocomotionChecker')
export class LocomotionChecker extends Component {
    @serializable
    protected _timeout = 0;
    @serializable
    protected _xrSession: TrackingOrigin | null = null;

    private _accupyId: string = "";
    private _time = 0;
   
    @displayOrder(1)
    set timeout (val) {
        if (val === this._timeout) {
            return;
        }
        this._timeout = val;
    }
    get timeout () {
        return this._timeout;
    }

    @type(TrackingOrigin)
    @displayOrder(2)
    set XRSession (val) {
        if (val === this._xrSession) {
            return;
        }
        this._xrSession = val;
    }
    get XRSession () {
        return this._xrSession;
    }
    
    public getSession (inId: string) {
        if (this._accupyId === "" || this._accupyId === inId) {
            // 如果未被占用，或被占用者使用，则可以占用，_timeout后释放
            this._accupyId = inId;
            this._time = 0;
            return this._xrSession;
        }
        return null;
    }

    update(dt: number) {
        this._time += dt;
        if (this._time >= this._timeout) {
            this._accupyId = "";
            this._time = 0;
        }
    }
}