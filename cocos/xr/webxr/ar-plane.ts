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
import { math, Quat, Vec2, Vec3 } from "../../core";
import { abs } from "../../core/math/bits";

interface ARPose {
    position : math.Vec3;
    rotation : math.Quat;
}
interface ARPlane {
    id : number;
    pose? : ARPose;
    type : number;
    extent : Vec2;
    center : ARPose;
    timestamp?: number;
}

export class WebXRPlane {
    private _planesMaxSize = 0;
    private _addedPlanes: any[] = [];
    private _removedPlanes: any[] = [];
    private _updatedPlanes: any[] = [];
    
    private planeId = 1;
    private allPlanes = new Map();

    constructor() {

    };
    
    public processPlanes(timestamp, frame, immersiveRefSpace) {
        let session = frame.session;
        //console.log(frame.detectedPlanes);
        this._removedPlanes.length = 0;
        this._addedPlanes.length = 0;
        this._updatedPlanes.length = 0;

        if (frame.detectedPlanes) {
            this.allPlanes.forEach((planeContext, plane) => {
              if (!frame.detectedPlanes.has(plane)) {
                // plane was removed
                this.allPlanes.delete(plane);
                console.debug("plane was removed, id=" + planeContext.id);
                this._removedPlanes.push(planeContext);
              }
            });
            
            //XRPlane {planeSpace: XRSpace, polygon: Array(18), orientation: 'Horizontal', lastChangedTime: 16623.012}
            frame.detectedPlanes.forEach(plane => {
                const planePose = frame.getPose(plane.planeSpace, immersiveRefSpace);
                if (planePose) {
                    if (this.allPlanes.has(plane)) {
                        // may have been updated:
                        const planeContext = this.allPlanes.get(plane);
    
                        if (planeContext.timestamp < plane.lastChangedTime) {
                            // updated!
                            planeContext.timestamp = plane.lastChangedTime;
                        }
                        this._updatedPlanes.push(planeContext)
                    } else {
                        // new plane
                        console.log("==>", plane, planePose);
                        const planeContext: ARPlane = {
                            id: this.planeId,
                            type: 1,
                            extent: this.calPolygonSize(plane.polygon),
                            center: {
                                position: new Vec3(
                                    planePose.transform.position.x,
                                    planePose.transform.position.y,
                                    planePose.transform.position.z
                                ),
                                rotation: planePose.transform.orientation
                            },
                            timestamp: plane.lastChangedTime,
                        };
                        this.allPlanes.set(plane, planeContext);
                        console.debug("New plane detected, id=" + this.planeId);
                        this.planeId++;
    
                        this._addedPlanes.push(planeContext)
                    } 
                }
            });
        }
    }

    private calPolygonSize(polygon) {
        let x: number[] = [];
        let z: number[] = [];
        for(let i = 0; i < polygon.length; ++i) {
          const cur: Vec3 = polygon[i];
          x.push(cur.x);  
          z.push(cur.z);
        }
        x.sort((a, b)=>{return a - b});
        z.sort((a, b)=>{return a - b});

        let distX = x[0] > x[x.length -1] ? x[0] - x[x.length -1] : x[x.length -1] - x[0];
        let distZ = z[0] > z[z.length -1] ? z[0] - z[z.length -1] : z[z.length -1] - z[0];
        console.log("size =", distX, distZ);
        return new Vec2(distX, distZ);
    }

    // raycast & anchor
    tryHitAttachAnchor(trackableId) {};
    getAnchorPose(anchorId) {};
    tryHitTest(xPx, yPx) {};
    getHitResult() {};
    getHitId() {};

    // plane detection
    enablePlane(enable) {

    };

    setPlaneDetectionMode(mode) {

    };

    setPlaneMaxTrackingNumber(count) {

    };

    getAddedPlanesInfo() {
        return this._addedPlanes;
    };

    getUpdatedPlanesInfo() {
        return this._updatedPlanes;
    };

    getRemovedPlanesInfo() {
        return this._removedPlanes;
    };
};