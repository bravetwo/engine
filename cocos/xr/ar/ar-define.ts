import { math } from "../../core";
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

export interface ARTrackable {
    id : number;
    pose? : ARPose;
}

export interface IWebXRAnchor extends ARTrackable {
    /**
     *Remove this anchor from the scene
    */
    remove(): void;
}
