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

import { ccclass, help, menu, type, visible, displayOrder, serializable, tooltip } from 'cc.decorator';
import { ccenum } from '../../core/value-types/enum';
import { Component } from '../../core/components/component';
import { Vec2 } from '../../core/math';
import { CameraComponent } from '../../core/components';
import { TargetEye, TargetEye_Type } from './target-eye';

enum StereoRendering_Type {
    SINGLE_PASS = 0,
    MUTLI_PASS = 1,
    OFF = 2
}

enum FoveationRendering_Type {
    None = 0,
    Low = 1,
    Med = 2,
    High = 3,
    Ext = 4
}

enum IPDOffset_Type {
    Auto = 0,
    Device = 1,
    Manual = 2
}

enum AspectRatio_Type {
    Auto = 0,
    Manual = 1
}

enum Camera_Type {
    BOTH = 0,
    LEFT = 1,
    RIGHT = 2
}

ccenum(StereoRendering_Type);
ccenum(FoveationRendering_Type);
ccenum(IPDOffset_Type);
ccenum(AspectRatio_Type);

/**
 * @en
 *                      <br>
 * @zh
 *                      <br>
 */
@ccclass('cc.HMDCtrl')
@help('i18n:cc.HMDCtrl')
@menu('XR/Device/HMDCtrl')
export class HMDCtrl extends Component {
    @serializable
    protected _stereoRendering: StereoRendering_Type = StereoRendering_Type.SINGLE_PASS;
    @serializable
    protected _perEyeCamera = false;
    @serializable
    protected _sync = false;
    @serializable
    protected _foveationRendering: FoveationRendering_Type = FoveationRendering_Type.None;
    @serializable
    protected _IPDOffset: IPDOffset_Type = IPDOffset_Type.Auto;
    @serializable
    protected _offsetValue = 0.064;
    @serializable
    protected _aspectRatio: AspectRatio_Type = AspectRatio_Type.Auto;
    @serializable
    protected _ratio: Vec2 = new Vec2(1, 1);

    private _mainCamera: CameraComponent | null = null;
    private _leftCamera: CameraComponent | null = null;
    private _rightCamera: CameraComponent | null = null;

    @type(StereoRendering_Type)
    @displayOrder(1)
    @tooltip('i18n:xr.hmd_ctrl.stereoRendering')
    set stereoRendering(val) {
        if (val === this._stereoRendering) {
            return;
        }
        this._stereoRendering = val;
    }
    get stereoRendering() {
        return this._stereoRendering;
    }

    @type(Boolean)
    @displayOrder(2)
    @tooltip('i18n:xr.hmd_ctrl.perEyeCamera')
    set perEyeCamera(val) {
        if (val === this._perEyeCamera) {
            return;
        }
        this._perEyeCamera = val;
        this._getCameras();
        this._copyCameras(Camera_Type.BOTH);

        if (this._perEyeCamera) {
            if (this._mainCamera) {
                this._mainCamera.enabled = false;
            }
            if (this._leftCamera) {
                this._leftCamera.node.active = true;
            }
            if (this._rightCamera) {
                this._rightCamera.node.active = true;
            }
        } else {
            if (this._mainCamera) {
                this._mainCamera.enabled = true;
            }
            if (this._leftCamera) {
                this._leftCamera.node.active = false;
            }
            if (this._rightCamera) {
                this._rightCamera.node.active = false;
            }
        }
    }
    get perEyeCamera() {
        return this._perEyeCamera;
    }

    @type(Boolean)
    @displayOrder(3)
    @tooltip('i18n:xr.hmd_ctrl.syncWithMainCamera')
    @visible(function (this: HMDCtrl) {
        return this._perEyeCamera;
    })
    set sync_with_Main_Camera(val) {
        if (val === this._sync) {
            return;
        }
        this._sync = val;
        this._copyCameras(Camera_Type.BOTH);
    }
    get sync_with_Main_Camera() {
        return this._sync;
    }

    @type(FoveationRendering_Type)
    @displayOrder(4)
    @tooltip('i18n:xr.hmd_ctrl.foveationRendering')
    set foveationRendering(val) {
        if (val === this._foveationRendering) {
            return;
        }
        this._foveationRendering = val;
    }
    get foveationRendering() {
        return this._foveationRendering;
    }

    @type(IPDOffset_Type)
    @displayOrder(5)
    @tooltip('i18n:xr.hmd_ctrl.IPDOffset')
    set IPDOffset(val) {
        if (val === this._IPDOffset) {
            return;
        }
        // If it was Manual, change left and right back
        this._setIpdOffset(0);
        this._IPDOffset = val;
        // If it's Manual now
        this._setIpdOffset(this._offsetValue / 2);
    }
    get IPDOffset() {
        return this._IPDOffset;
    }

    @visible(function (this: HMDCtrl) {
        return this._IPDOffset === IPDOffset_Type.Manual;
    })
    @displayOrder(6)
    @tooltip('i18n:xr.hmd_ctrl.offsetValue')
    set offsetValue(val) {
        if (val === this._offsetValue) {
            return;
        }
        this._offsetValue = val;

        this._setIpdOffset(this._offsetValue / 2);
    }
    get offsetValue() {
        return this._offsetValue;
    }

    @type(AspectRatio_Type)
    @displayOrder(7)
    @tooltip('i18n:xr.hmd_ctrl.aspectRatio')
    set aspectRatio(val) {
        if (val === this._aspectRatio) {
            return;
        }
        this._aspectRatio = val;
    }
    get aspectRatio() {
        return this._aspectRatio;
    }

    @type(Vec2)
    @visible(function (this: HMDCtrl) {
        return this._aspectRatio === AspectRatio_Type.Manual;
    })
    @displayOrder(8)
    @tooltip('i18n:xr.hmd_ctrl.ratio')
    set ratio(val) {
        if (val === this._ratio) {
            return;
        }
        this._ratio = val;
    }
    get ratio() {
        return this._ratio;
    }

    private _copyCameras(type: Camera_Type) {
        if (!this.perEyeCamera) {
            return;
        }

        this._getCameras();
        if (this._mainCamera && this._sync) {
            switch (type) {
                case Camera_Type.BOTH:
                    if (this._leftCamera) {
                        this._setCamera(this._leftCamera, this._mainCamera);
                    }
                    if (this._rightCamera) {
                        this._setCamera(this._rightCamera, this._mainCamera);
                    }
                    break;
                case Camera_Type.LEFT:
                    if (this._leftCamera) {
                        this._setCamera(this._leftCamera, this._mainCamera);
                    }
                    break;
                case Camera_Type.RIGHT:
                    if (this._rightCamera) {
                        this._setCamera(this._rightCamera, this._mainCamera);
                    }
                    break;
                default:
                    break;
            }

        }
    }

    private _setCamera(camera: CameraComponent | null, mainCamera: CameraComponent | null) {
        if (!(camera && mainCamera)) {
            return;
        }
        camera.priority = mainCamera.priority;
        camera.visibility = mainCamera.visibility;
        camera.clearFlags = mainCamera.clearFlags;
        camera.clearColor = mainCamera.clearColor;
        camera.clearDepth = mainCamera.clearDepth;
        camera.clearStencil = mainCamera.clearStencil;
        camera.projection = mainCamera.projection;
        camera.fovAxis = mainCamera.fovAxis
        camera.fov = mainCamera.fov;
        camera.orthoHeight = mainCamera.orthoHeight;
        camera.near = mainCamera.near;
        camera.far = mainCamera.far;
        camera.aperture = mainCamera.aperture;
        camera.shutter = mainCamera.shutter;
        camera.iso = mainCamera.iso;
        camera.rect = mainCamera.rect;
        camera.targetTexture = mainCamera.targetTexture;
    }

    private _setIpdOffset(value) {
        if (this._IPDOffset !== IPDOffset_Type.Manual) {
            return;
        }

        this._getCameras();
        if (this._mainCamera) {
            if (this._leftCamera) {
                this._leftCamera.node.setPosition(-value, this._leftCamera.node.getPosition().y, this._leftCamera.node.getPosition().z);
            }
            if (this._rightCamera) {
                this._rightCamera.node.setPosition(value, this._rightCamera.node.getPosition().y, this._rightCamera.node.getPosition().z);
            }
        }
    }

    private _getCameras() {
        var targets = this.getComponentsInChildren(TargetEye);
        for (let i = 0; i < targets.length; ++i) {
            switch (targets[i].targetEye) {
                case TargetEye_Type.BOTH:
                    this._mainCamera = targets[i].getComponent(CameraComponent);
                    break;
                case TargetEye_Type.LEFT:
                    this._leftCamera = targets[i].getComponent(CameraComponent);
                    break;
                case TargetEye_Type.RIGHT:
                    this._rightCamera = targets[i].getComponent(CameraComponent);
                    break;
                default:
                    break;
            }
        }
    }

}
