import { ccclass, help, menu, displayOrder, serializable, tooltip, type, executeInEditMode } from 'cc.decorator';
import { CameraComponent, Component } from "../../core";

@ccclass('cc.CameraFollowing')
@help('i18n:cc.CameraFollowing')
@menu('XR/UX/CameraFollowing')
export class CameraFollowing extends Component {
    @serializable
    private _camera: CameraComponent | null = null;

    @type(CameraComponent)
    @displayOrder(1)
    @tooltip('i18n:xr.camera_following.camera')
    set camera(val) {
        if (val === this._camera) {
            return;
        }
        this._camera = val;
    }
    get camera() {
        return this._camera;
    }

    update() {
        if (this._camera) {
            this.node.setWorldPosition(this._camera.node.worldPosition);
            this.node.setWorldRotation(this._camera.node.worldRotation);
        }
    }
}