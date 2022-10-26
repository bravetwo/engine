/*
 Copyright (c) 2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE ANDconst NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { IWebXRAnchor} from "../ar/ar-define";

interface IWebXRFutureAnchor {
    /**
     * The native anchor
     */
    nativeAnchor?: XRAnchor;
    /**
     * Was this request submitted to the xr frame?
     */
    submitted: boolean;
    /**
     * Was this promise resolved already?
     */
    resolved: boolean;
    /**
     * A resolve function
     */
    resolve: (xrAnchor: IWebXRAnchor) => void;
    /**
     * A reject function
     */
    reject: (msg?: string) => void;
    /**
     * The XR Transformation of the future anchor
     */
    xrTransformation: XRRigidTransform;

    targetRaySpace: any
}

export class WebXRAnchor {
    private _enable: boolean = true;
    private _addedAnchors: any[] = [];
    private _removedAnchors: any[] = [];
    private _updatedAnchors: any[] = [];
    
    private anchorId = 1;
    private allAnchors = new Map();
    private _futureAnchors: IWebXRFutureAnchor[] = [];
    private _immersiveRefSpace = null;
    public processAnchors(frame, immersiveRefSpace) {
        this._immersiveRefSpace = immersiveRefSpace;
        if (!this._enable || !frame) {
            return;
        }

        const trackedAnchors = frame.trackedAnchors;
        this._removedAnchors.length = 0;
        this._addedAnchors.length = 0;
        this._updatedAnchors.length = 0;

        if (trackedAnchors) {
            this.allAnchors.forEach((anchorContext, anchor) => {
                if (!trackedAnchors.has(anchor)) {
                    // anchor was removed
                    this.allAnchors.delete(anchor);
                    console.debug("Anchor no longer tracked, id=" + anchorContext.id);
                    this._removedAnchors.push(anchorContext);
                }
            });
            
            trackedAnchors.forEach(anchor => {
                const anchorPose = frame.getPose(anchor.anchorSpace, immersiveRefSpace);
                //console.log("==>", anchor, anchorPose);
                if (anchorPose) {
                    if (this.allAnchors.has(anchor)) {
                        // may have been updated:
                        const anchorContext = this.allAnchors.get(anchor);
                        anchorContext.pose = anchorPose.transform,
                        this._updatedAnchors.push(anchorContext);
                    } else {
                        // new anchor created:
                        const anchorContext: IWebXRAnchor  = {
                            id: this.anchorId,
                            pose: anchorPose.transform,
                            remove: () => anchor.delete(),
                        }
                        this.allAnchors.set(anchor, anchorContext);
                        console.debug("New anchor created, id=" + this.anchorId);
                        this.anchorId ++;

                        // search for the future anchor promise that matches this
                        const results = this._futureAnchors.filter((futureAnchor) => futureAnchor.nativeAnchor === anchor);
                        const result = results[0];
                        if (result) {
                            result.resolve(anchorContext);
                            result.resolved = true;
                        }
                    }
                }
            });
        }

        // process future anchors
        this._futureAnchors.forEach((futureAnchor) => {
            if (!futureAnchor.resolved && !futureAnchor.submitted) {
                this._createAnchorAtTransformation(futureAnchor.xrTransformation, frame, futureAnchor.targetRaySpace).then(
                    (nativeAnchor) => {
                        futureAnchor.nativeAnchor = nativeAnchor;
                    },
                    (error) => {
                        futureAnchor.resolved = true;
                        futureAnchor.reject(error);
                    }
                );
                futureAnchor.submitted = true;
            }
        });
    }

    private async _createAnchorAtTransformation(xrTransformation: XRRigidTransform, frame, targetRaySpace) {
        if (frame.createAnchor) {
            try {
                // let anchorPose = new XRRigidTransform(
                //     {x: 0, y: 0, z: -1},
                //     {x: 0, y: 0, z: 0, w: 1});
                return frame.createAnchor(xrTransformation, this._immersiveRefSpace);
                // console.log(anchorPose);
                // return frame.createAnchor(anchorPose, targetRaySpace);
            } catch (error) {
                throw new Error(`${error}`);
            }
        } else {
            throw new Error("Anchors are not enabled in your browser");
        }
    }

    tryHitTest(xrTransformation: XRRigidTransform, targetRaySpace): Promise<IWebXRAnchor>  {
        console.log("hit test", xrTransformation);
        return new Promise<IWebXRAnchor>((resolve, reject) => {
            this._futureAnchors.push({
                nativeAnchor: null,
                resolved: false,
                submitted: false,
                xrTransformation,
                targetRaySpace,
                resolve,
                reject,
            });
        });
    }

    enableAnchor(enable: boolean) {
        this._enable = enable;
    };

    getAddedAnchorsInfo() {
        return this._addedAnchors;
    };
    getUpdatedAnchorInfo() {
        return this._updatedAnchors;
    };
    getRemovedAnchorsInfo() {
        return this._removedAnchors;
    };
};