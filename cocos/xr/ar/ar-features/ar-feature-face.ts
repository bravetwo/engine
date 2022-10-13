/*
 Copyright (c) 2021 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS,WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { ccclass, property} from '../../../core/data/class-decorator'
import { ARFeature, ARTrackable, FeatureEvent, FeatureType, IFeatureData, ARFeatureData} from '../ar-feature-base';
import { ccenum } from '../../../core/value-types/enum';
import { Quat, Vec3 } from '../../../core/math';
import { ARModuleX } from '../ar-module';
import { callFunc } from '../../../tween/actions/action-instant';

export enum ARFaceBlendShapeType {
    Eye_Blink_Left,         //(0)左眼闭合。
    Eye_Look_Down_Left,     //(1)左上眼皮微下垂。
    Eye_Look_In_Left,       //(2)左眼内部眼皮向左扩。
    Eye_Look_Out_Left,      //(3)左眼睑向左扩。
    Eye_Look_Up_Left,       //(4)左眼上眼皮微上抬。
    Eye_Squint_Left,        //(5)左下眼睑上抬。
    Eye_Wide_Left,          //(6)左眼瞪大眼。
    Eye_Blink_Right,        //(7)闭右眼。
    Eye_Look_Down_Right,    //(8)右上眼皮微下垂。
    Eye_Look_In_Right,      //(9)右眼内部眼皮向右扩。
    Eye_Look_Out_Right,     //(10)右眼睑向右扩。
    Eye_Look_Up_Right,      //(11)右眼上眼皮微上抬。
    Eye_Squint_Right,       //(12)右下眼睑上抬。
    Eye_Wide_Right,         //(13)右眼瞪大眼。

    Jaw_Forward,            //(14)下巴朝前。
    Jaw_Left,               //(15)下巴朝左。
    Jaw_Right,              //(16)下巴朝右。
    Jaw_Open,               //(17)张嘴。

    Mouth_Funnel,           //18)O型嘴。
    Mouth_Pucker,           //19)噘嘴。
    Mouth_Left,             //20)嘴巴向左。
    Mouth_Right,            //21)嘴巴向右。
    Mouth_Smile_Left,       //22)左嘴角向左歪。
    Mouth_Smile_Right,      //23)右嘴角向右歪。
    Mouth_Frown_Left,       //24)左嘴角下拉。
    Mouth_Frown_Right,      //25)右嘴角下拉。
    Mouth_Dimple_Left,      //26)左酒窝上抬。
    Mouth_Dimple_Right,     //27)右酒窝上抬。
    Mouth_Stretch_Left,     //28)嘴角向左拉。
    Mouth_Stretch_Right,    //29)嘴角向右拉。
    Mouth_Roll_Lower,       //30)下嘴唇向内抿嘴。
    Mouth_Roll_Upper,       //31)抿上嘴唇。
    Mouth_Shrug_Lower,      //32)撅下嘴唇。
    Mouth_Shrug_Upper,      //33)撅上嘴唇。
    Mouth_Upper_Up,         //34)嘴唇上翻。
    Mouth_Lower_Down,       //35)下嘴唇朝下。
    Mouth_Lower_Out,        //36)下嘴唇朝外。

    Brow_Down_Left,         //37)左侧眉毛朝下。
    Brow_Down_Right,        //38)右侧眉毛朝下。
    Brow_Inner_Up,          //39)双侧眉毛抬眉。
    Brow_Outer_Up_Left,     //40)左眉外侧向上抬。
    Brow_Outer_Up_Right,    //41)右眉外侧向上抬。

    Cheek_Puff,             //42)鼓腮。
    Cheek_Squint_Left,      //43)左脸颊上抬。
    Cheek_Squint_Right,     //44)右脸颊上抬。
    Frown_Nose_Mouth_Up,    //45)鼻子上抬。

    Tongue_In,              //46)舌头在嘴里上下位置。
    Tongue_Out_Slight,      //47)舌头直伸。
    Tongue_Left,            //48)舌头朝左。
    Tongue_Right,           //49)舌头朝右。
    Tongue_Up,              //50)舌头朝上。
    Tongue_Down,            //51)舌头朝下。
    Tongue_Left_Up,         //52)舌头朝左上。
    Tongue_Left_Down,       //53)舌头朝左下。
    Tongue_Right_Up,        //54)舌头朝右上。
    Tongue_Right_Down,      //55)舌头朝右下。

    Left_Eyeball_Left,      //56)左眼球向左。
    Left_Eyeball_Right,     //57)左眼球向右。
    Left_Eyeball_Up,        //58)左眼球向上。
    Left_Eyeball_Down,      //59)左眼球向下。
    Right_Eyeball_Left,     //60)右眼球向左。
    Right_Eyeball_Right,    //61)右眼球向右。
    Right_Eyeball_Up,       //62)右眼球向上。
    Right_Eyeball_Down      //63)右眼球向下。
}
ccenum(ARFaceBlendShapeType)

export interface ARFaceBlendShape {
    type : ARFaceBlendShapeType;
    value : number;
}

export interface ARFace extends ARTrackable {
    //vertices : number[];
    //indices : number[];
    blendShapes : ARFaceBlendShape[];
}

@ccclass('cc.FaceTrackingConfig')
export class FaceTrackingConfig extends ARFeatureData {
    @property
    trackingMode : number = 0;
    @property
    maxFaceNumber : number = 5;
    @property
    trackingNodeList : any[] = [];
}

@ccclass('cc.ARFeatureFaceTracking')
export class ARFeatureFaceTracking extends ARFeature {
    private static readonly FACE_INFO_SIZE = 8;

    public get featureId(): FeatureType {
        return FeatureType.FaceTracking;
    }

    private _addedFaces : ARFace[] = [];
    private _updatedFaces : ARFace[] = [];
    private _removedFaces : ARFace[] = [];

    readonly onAddEvent = new FeatureEvent<ARFace[]>();
    readonly onUpdateEvent = new FeatureEvent<ARFace[]>();
    readonly onRemoveEvent = new FeatureEvent<ARFace[]>();

    public config : FaceTrackingConfig | null = null; 
    constructor (session : ARModuleX, config : IFeatureData);
    constructor (session : ARModuleX, config : IFeatureData, jsonObject? : any) {
        super(session, config, jsonObject);
        this.config = config as FaceTrackingConfig;
    }

    isReady() : boolean {
        return true;
    }

    init() {
        super.init();
        
    }

    protected onEnable(): void {
        this.session!.enableFaceTracking(this._enable);
    }

    protected onDisable(): void {
        this.session!.enableFaceTracking(this._enable);
    }

    update() {
        // check start
        if(!this._enable) return;
        this.processChanges();
    }

    public processChanges() {
        let removedfacesInfo = this.session!.getRemovedFacesInfo();
        if(removedfacesInfo && removedfacesInfo.length > 0) {
            this._removedFaces.length = 0;
            this.assembleInfos(removedfacesInfo, this._removedFaces);
            this.onRemoveEvent.trigger(this._removedFaces);
        }

        let addedFacesInfo = this.session!.getAddedFacesInfo();
        if(addedFacesInfo && addedFacesInfo.length > 0) {
            this._addedFaces.length = 0;
            this.assembleInfos(addedFacesInfo, this._addedFaces);
            this.onAddEvent.trigger(this._addedFaces);
        }

        let updatetdFacesInfo = this.session!.getUpdatedFacesInfo();
        if(updatetdFacesInfo && updatetdFacesInfo.length > 0) {
            this._updatedFaces.length = 0;
            this.assembleInfos(updatetdFacesInfo, this._updatedFaces);
            this.onUpdateEvent.trigger(this._updatedFaces);
        }
    }

    private assembleInfos(src : number[], dst : ARFace[]) {
        if(src) {

            let count = src.length / ARFeatureFaceTracking.FACE_INFO_SIZE;
            let offset = 0;
            for (let i = 0; i < count; i++) {
                offset = i * ARFeatureFaceTracking.FACE_INFO_SIZE;

                let ref = src[offset];

                const pos = new Vec3(
                    src[offset + 1],
                    src[offset + 2],
                    src[offset + 3]
                );
                const rot = new Quat(
                    src[offset + 4],
                    src[offset + 5],
                    src[offset + 6],
                    src[offset + 7]
                );

                const blendShapesInfo : number[] = this.session!.getFaceBlendShapesOf(ref);
                let blendShapes : ARFaceBlendShape[] = [];
                
                const shapesCount = blendShapesInfo.length / 2;
                for (let j = 0; j < shapesCount; j++) {
                    let shape : ARFaceBlendShape = {
                        type : blendShapesInfo[j * 2],
                        value : blendShapesInfo[j * 2 + 1]
                    };
                    blendShapes.push(shape);
                }

                let face : ARFace = {
                    id : ref,
                    pose : {
                        position : pos,
                        rotation : rot
                    },
                    blendShapes : blendShapes
                };
                dst.push(face);
            }
        }
    }
}