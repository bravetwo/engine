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
import { Camera, geometry, math, Quat, Vec2, Vec3 } from "../../core";

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
    plane_pose?: any;
}

// Negates a vector. All componenes except |w| are negated.
let neg = function(vector) {
    return {x : -vector.x, y : -vector.y, z : -vector.z, w : vector.w};
}
  
// Subtracts 2 vectors.
let sub = function(lhs, rhs) {
    if(!((lhs.w == 1 && rhs.w == 1) || (lhs.w == 1 && rhs.w == 0) || (lhs.w == 0 && rhs.w == 0)))
        console.error("only point - point, point - line or line - line subtraction is allowed");
    return {x : lhs.x - rhs.x, y : lhs.y - rhs.y, z : lhs.z - rhs.z, w : lhs.w - rhs.w};
}

// Subtracts 2 vectors.
let add = function(lhs, rhs) {
    if(!((lhs.w == 0 && rhs.w == 1) || (lhs.w == 1 && rhs.w == 0)))
        console.error("only line + point or point + line addition is allowed");
    return {x : lhs.x + rhs.x, y : lhs.y + rhs.y, z : lhs.z + rhs.z, w : lhs.w + rhs.w};
}

// Scales a vector by a scalar. All components except |w| are scaled.
let mul = function(vector, scalar) {
    return {x : vector.x * scalar, y : vector.y * scalar, z : vector.z * scalar, w : vector.w};
}

let normalize_perspective = function(point) {
    if(point.w == 0 || point.w == 1) return point;
  
    return {
      x : point.x / point.w,
      y : point.y / point.w,
      z : point.z / point.w,
      w : 1
    };
}
  
let dotProduct = function(lhs, rhs) {
    return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
}

let crossProduct = function(lhs, rhs) {
    return {
        x : lhs.y * rhs.z - lhs.z * rhs.y,
        y : lhs.z * rhs.x - lhs.x * rhs.z,
        z : lhs.x * rhs.y - lhs.y * rhs.x,
        w : 0
    }
}

let length = function(vector) {
    return Math.sqrt(dotProduct(vector, vector));
}

let normalize = function(vector) {
    const l = length(vector);
    return mul(vector, 1.0/l);
}
let crossProduct2d = function(lhs, rhs) {
    return lhs.x * rhs.z - lhs.z * rhs.x;
}

export class WebXRPlane {
    private _planesMaxCount: number = 0;
    private _enable: boolean = true;
    private _detectionMode: number = 0;

    private _addedPlanes: any[] = [];
    private _removedPlanes: any[] = [];
    private _updatedPlanes: any[] = [];
    
    private planeId = 1;
    private allPlanes = new Map();
    private _hitResult = null;

    public processPlanes(frame, immersiveRefSpace) {
        if (!this._enable || !frame) {
            return;
        }
        const detectedPlanes = frame.detectedPlanes || frame.worldInformation?.detectedPlanes;

        this._removedPlanes.length = 0;
        this._addedPlanes.length = 0;
        this._updatedPlanes.length = 0;

        if (detectedPlanes) {
            this.allPlanes.forEach((planeContext, plane) => {
                if (!detectedPlanes.has(plane)) {
                    // plane was removed
                    this.allPlanes.delete(plane);
                    console.debug("plane was removed, id=" + planeContext.id);
                    this._removedPlanes.push(planeContext);
                }
            });
            
            //XRPlane {planeSpace: XRSpace, polygon: Array(18), orientation: 'Horizontal', lastChangedTime: 16623.012}
            detectedPlanes.forEach(plane => {
                const planePose = frame.getPose(plane.planeSpace, immersiveRefSpace);
                if (planePose) {
                    if (this.allPlanes.has(plane)) {
                        // may have been updated:
                        const planeContext = this.allPlanes.get(plane);
                        if (planeContext.timestamp < plane.lastChangedTime) {
                            // updated!
                            planeContext.timestamp = plane.lastChangedTime;
                            planeContext.extent = this.calPolygonSize(plane.polygon);
                            planeContext.center = {
                                position: new Vec3(
                                    planePose.transform.position.x,
                                    planePose.transform.position.y,
                                    planePose.transform.position.z
                                ),
                                rotation: planePose.transform.orientation
                            };
                            planeContext.plane_pose = planePose;
    
                            this._updatedPlanes.push(planeContext);
                        }
                    } else {
                        // new plane
                        if (this._addedPlanes.length >= this._planesMaxCount) {
                            return;
                        }
                       
                        // 3 --Horizontal 4 --Vertical 7 --All
                        if (this._detectionMode === 3 && plane.orientation == 'Horizontal' || 
                            this._detectionMode === 4 && plane.orientation == 'Vertical' || 
                            this._detectionMode === 7) {
                            console.log("==>", plane, planePose);
                            const planeContext: ARPlane = {
                                id: this.planeId,
                                type: plane.orientation == 'Horizontal' ? 3 : 4,
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
                                plane_pose: planePose
                            };
                            this.allPlanes.set(plane, planeContext);
                            console.debug("New plane detected, id=" + this.planeId);
                            this.planeId++;
        
                            this._addedPlanes.push(planeContext);
                        };
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
        //console.log("size =", distX, distZ);
        return new Vec2(distX, distZ);
    }

    // |matrix| - Float32Array, |input| - point-like dict (must have x, y, z, w)
    private transform_point_by_matrix (matrix, input) {
        return {
        x : matrix[0] * input.x + matrix[4] * input.y + matrix[8] * input.z + matrix[12] * input.w,
        y : matrix[1] * input.x + matrix[5] * input.y + matrix[9] * input.z + matrix[13] * input.w,
        z : matrix[2] * input.x + matrix[6] * input.y + matrix[10] * input.z + matrix[14] * input.w,
        w : matrix[3] * input.x + matrix[7] * input.y + matrix[11] * input.z + matrix[15] * input.w,
        };
    }

    private calculateHitMatrix (ray_vector, plane_normal, point) {
        // projection of ray_vector onto a plane
        const ray_vector_projection = sub(ray_vector, mul(plane_normal, dotProduct(ray_vector, plane_normal)));
      
        // new coordinate system axes
        const y = plane_normal;
        const z = normalize(neg(ray_vector_projection));
        const x = normalize(crossProduct(y, z));
      
        let hitMatrix = new Float32Array(16);
      
        hitMatrix[0] = x.x;
        hitMatrix[1] = x.y;
        hitMatrix[2] = x.z;
        hitMatrix[3] = 0;
      
        hitMatrix[4] = y.x;
        hitMatrix[5] = y.y;
        hitMatrix[6] = y.z;
        hitMatrix[7] = 0;
      
        hitMatrix[8] = z.x;
        hitMatrix[9] = z.y;
        hitMatrix[10] = z.z;
        hitMatrix[11] = 0;
      
        hitMatrix[12] = point.x;
        hitMatrix[13] = point.y;
        hitMatrix[14] = point.z;
        hitMatrix[15] = 1;
      
        return hitMatrix;
    }

    private hitTest(ray) {
        let hit_test_results: any[] = [];
        this.allPlanes.forEach((planeContext, plane) => {
            let result = this.hitTestPlane(ray, plane, planeContext.plane_pose);
            if(result) {
                result["id"] = planeContext.id;
                // throw away results with no intersection with plane
                hit_test_results.push(result);
            }
        });
      
        // throw away all strange results (ray lies on plane)
        let hit_test_results_with_points = hit_test_results.filter(maybe_plane => typeof maybe_plane.point != "undefined");
      
        // sort results by distance
        hit_test_results_with_points.sort((l, r) => l.distance - r.distance);
      
        // throw away the ones that don't fall within polygon bounds (except the bottommost plane)
        // convert hittest results to something that the caller expects
      
        return hit_test_results_with_points;
    }

    private hitTestPlane(ray, plane, plane_pose) {
        if(!plane_pose) {
            return null;
        }
      
        const plane_normal = this.transform_point_by_matrix(plane_pose.transform.matrix, {x : 0, y : 1.0, z : 0, w : 0});
        const plane_center = normalize_perspective(this.transform_point_by_matrix(plane_pose.transform.matrix, {x : 0, y : 0, z : 0, w : 1.0}));
      
        const ray_origin = ray.origin;
        const ray_vector = ray.direction;

        const numerator = dotProduct(sub(plane_center, ray_origin), plane_normal);
        const denominator = dotProduct(ray_vector, plane_normal);
        console.log(numerator, denominator);
        if(denominator < 0.0001 && denominator > -0.0001) {
            // parallel planes
            if(numerator < 0.0001 && numerator > -0.0001) {
                // contained in the plane
                console.debug("Ray contained in the plane", plane);
                return { plane : plane };
            } else {
                // no hit
                console.debug("No hit", plane);
                return null;
            }
        } else {
            // single point of intersection
            const d =  numerator / denominator;
            if(d < 0) {
                // no hit - plane-line intersection exists but not for half-line
                console.debug("No hit", d, plane);
                return null;
            } else {
                // hit test point coordinates in frameOfReference
                const point = add(ray_origin, mul(ray_vector, d));  
            
                // hit test point coodinates relative to plane pose
                let point_on_plane = this.transform_point_by_matrix(plane_pose.transform.inverse.matrix, point); 
                
                console.assert(Math.abs(point_on_plane.y) < 0.0001, "Incorrect Y coordinate of mapped point");
            
                let hitMatrix = this.calculateHitMatrix(ray_vector, plane_normal, point);      
                return {
                    distance : d,
                    plane : plane,
                    ray : ray,
                    point : point,
                    point_on_plane : point_on_plane,
                    hitMatrix : hitMatrix,
                    pose_matrix : plane_pose.transform.matrix
                };
            }
        }
    }

    private simplifyPolygon(polygon) {
        let result: Vec3[] = [];
        let previous_point = polygon[polygon.length - 1];
        for(let i = 0; i < polygon.length; ++i) {
            const current_point = polygon[i];
        
            const segment = sub(current_point, previous_point);
            if(length(segment) < 0.001) {
                continue;
            }
        
            result.push(current_point);
            previous_point = current_point;
        }
      
        return result;
    }

    // Filters hit test results to keep only the planes for which the used ray falls
    // within their polygon. Optionally, we can keep the last horizontal plane that
    // was hit.
    private filterHitTestResults(hitTestResults, keep_last_plane = false, simplify_planes = false) {
        let result = hitTestResults.filter(hitTestResult => {
            let polygon = simplify_planes ? this.simplifyPolygon(hitTestResult.plane.polygon): hitTestResult.plane.polygon;

            const hit_test_point = hitTestResult.point_on_plane;
            // Check if the point is on the same side from all the segments:
            // - if yes, then it's in the polygon
            // - if no, then it's outside of the polygon
            // This works only for convex polygons.

            let side = 0; // unknown, 1 = right, 2 = left
            let previous_point = polygon[polygon.length - 1];
            for(let i = 0; i < polygon.length; ++i) {
                const current_point = polygon[i];

                const line_segment = sub(current_point, previous_point);
                const segment_direction = normalize(line_segment);

                const turn_segment = sub(hit_test_point, current_point);
                const turn_direction = normalize(turn_segment);

                const cosine_ray_segment = crossProduct2d(segment_direction, turn_direction);
                if(side == 0) {
                    if(cosine_ray_segment > 0) {
                        side = 1;
                    } else {
                        side = 2;
                    }
                } else {
                    if(cosine_ray_segment > 0 && side == 2) return false;
                    if(cosine_ray_segment < 0 && side == 1) return false;
                }

                previous_point = current_point;
            }

            return true;
        });

        if(keep_last_plane && hitTestResults.length > 0) {
            const last_horizontal_plane_result = hitTestResults.slice().reverse().find( element => { return element.plane.orientation == "horizontal";});

            if(last_horizontal_plane_result && result.findIndex(element => element === last_horizontal_plane_result) == -1) {
                result.push(last_horizontal_plane_result);
            }
        }

        return result;
    }

    // raycast
    tryWebXRHitTest(transform: XRRigidTransform): boolean {
        console.log("test hit ");
        const ray = new XRRay(transform);
        // Perform a JS-side hit test against mathematical (infinte) planes:
        const hitTestResults = this.hitTest(ray);
        console.log("test hit results ...", hitTestResults);
        // Filter results down to the ones that fall within plane's polygon:
        const hitTestFiltered = this.filterHitTestResults(hitTestResults);

        if (hitTestFiltered && hitTestFiltered.length > 0) {
            this._hitResult = hitTestFiltered[0];
            console.debug("hit result:", this._hitResult);
            return true;
        }
        return false;
    }

    getHitResult(): number[] {
        if (this._hitResult) {
            return [
                this._hitResult.hitMatrix[12],
                this._hitResult.hitMatrix[13],
                this._hitResult.hitMatrix[14],
                0,
                0,
                0,
                0
            ];
        }
        return [0,0,0,0,0,0,0];
    }

    getHitId(): number {
        if (this._hitResult) {
            return this._hitResult.id;
        }
        return 0;
    }

    enablePlane(enable: boolean) {
        this._enable = enable;
    };

    setPlaneDetectionMode(mode: number) {
        this._detectionMode = mode;
    };

    setPlaneMaxTrackingNumber(count: number) {
        this._planesMaxCount = count;
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