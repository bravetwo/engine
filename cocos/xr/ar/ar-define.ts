import { ccenum, math, Vec2 } from "../../core";
//webxr interface begin
// tslint:disable-next-line no-empty-interface
interface XRSpace extends EventTarget {}

interface XRAnchor {
    anchorSpace: XRSpace;
    delete(): void;
}

interface XRPlane {
    orientation: "Horizontal" | "Vertical";
    planeSpace: XRSpace;
    polygon: Array<DOMPointReadOnly>;
    lastChangedTime: number;
}

declare class XRRigidTransform {
    constructor(position?: DOMPointInit, direction?: DOMPointInit);
    position: DOMPointReadOnly;
    orientation: DOMPointReadOnly;
    matrix: Float32Array;
    inverse: XRRigidTransform;
}

declare class XRRay {
    constructor(transformOrOrigin: XRRigidTransform | DOMPointInit, direction?: DOMPointInit);
    origin: DOMPointReadOnly;
    direction: DOMPointReadOnly;
    matrix: Float32Array;
}
//end

export interface ARPose {
    position : math.Vec3;
    rotation : math.Quat;
}

export interface ARAnchor {
    id: number;
    pose: ARPose;
    trackingState?: number;
}

export enum ARPlaneDetectionMode {
    Horizontal_Upward = 1 << 0,
    Horizontal_Downward = 1 << 1, 
    Vertical = 1 << 2,
    Horizontal = Horizontal_Upward | Horizontal_Downward,
    All = Horizontal | Vertical
}
ccenum(ARPlaneDetectionMode)

export interface ARPlane extends ARAnchor {
    type : ARPlaneDetectionMode;
    extent : Vec2;
}