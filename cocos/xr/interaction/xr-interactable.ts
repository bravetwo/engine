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

import { displayOrder, type, serializable} from 'cc.decorator';
import { Component, EventHandler as ComponentEventHandler } from '../../core/components';
import { Node } from '../../core/scene-graph/node';
import { Collider } from '../../physics/framework/components/colliders/collider';
import { XrControlEventType, XrEventHandle } from '../event/xr-event-handle';

export class IXrInteractable extends Component {
    protected _colliderCom: any = null;

    protected _triggerId: string | undefined = "";

    set triggerId(val) {
        if (val === this._triggerId) {
            return;
        }
        this._triggerId = val;
    }
    get triggerId() {
        return this._triggerId;
    }
}

export class XrInteractable extends IXrInteractable {
    @serializable
    protected _rayReticle: Node | null = null;

    @type(Node)
    @displayOrder(5)
    set rayReticle (val) {
        if (val === this._rayReticle) {
            return;
        }
        this._rayReticle = val;
    }
    get rayReticle () {
        return this._rayReticle;
    }

    onLoad() {
        this._colliderCom = this.node.getComponent(Collider);
        
        if (!this._colliderCom) {
            console.error("this node does not have");
        }

        this._colliderCom.on(XrControlEventType.HOVER_ENTERED, this._setRayReticle, this);
        this._colliderCom.on(XrControlEventType.HOVER_EXITED, this._unsetRayReticle, this);
    }

    onDisable() {
        this._colliderCom.off(XrControlEventType.HOVER_ENTERED, this._setRayReticle, this);
        this._colliderCom.off(XrControlEventType.HOVER_EXITED, this._unsetRayReticle, this);
    }

    protected _setRayReticle(event: XrEventHandle) {
        
    }

    protected _unsetRayReticle(event: XrEventHandle) {
        if (this._rayReticle) {
            this._rayReticle.active = false;
        }
    }
}