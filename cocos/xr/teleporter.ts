import { ccclass, help, menu, displayOrder, type, serializable} from 'cc.decorator';
import { Component } from '../core/components';
import { LocomotionChecker } from './locomotion-checker';

@ccclass('cc.Teleporter')
@help('i18n:cc.Teleporter')
@menu('XR/Teleporter')
export class Teleporter extends Component {
    @serializable
    protected _checker: LocomotionChecker | null = null;
   
    @type(LocomotionChecker)
    @displayOrder(1)
    set checker (val) {
        if (val === this._checker) {
            return;
        }
        this._checker = val;
    }
    get checker () {
        return this._checker;
    }
}