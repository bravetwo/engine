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
    None,

    BrowsDownLeft,          //左眉向下
    BrowsDownRight,         //右眉向下
    BrowsUpCenter,          //眉间向上
    BrowsUpLeft,            //左眉向上
    BrowsUpRight,           //右眉向上

    CheekSquintLeft,        //左脸颊上抬
    CheekSquintRight,       //右脸颊上抬

    EyeBlinkLeft,           //左眼闭合
    EyeBlinkRight,          //右眼闭合
    EyeDownLeft,            //左上眼皮微下垂
    EyeDownRight,           //右上眼皮微下垂
    EyeInLeft,              //左眼内部眼皮向左扩
    EyeInRight,             //右眼内部眼皮向右扩
    EyeOpenLeft,            //左眼打开
    EyeOpenRight,           //右眼打开
    EyeOutLeft,             //左眼睑向左扩
    EyeOutRight,            //右眼睑向右扩
    EyeSquintLeft,          //左下眼睑上抬
    EyeSquintRight,         //右下眼睑上抬
    EyeUpLeft,              //左眼上眼皮微上抬
    EyeUpRight,             //右眼上眼皮微上抬

    JawLeft,                //下巴朝左
    JawRight,               //下巴朝右
    JawOpen,                //张嘴
  
    LipsFunnel,             //嘴唇呈O型
    LipsPucker,             //嘴唇紧闭
    LowerLipClose,          //下唇向上唇方向且向后移动
    LowerLipDownLeft,       //左下嘴唇向下
    LowerLipDownRight,      //右下嘴唇向下
    LowerLipRaise,          //下唇向上
    UpperLipClose,          //上唇向下唇方向且向后移动
    UpperLipRaise,          //上唇向上
    UpperLipUpLeft,         //左上唇向上
    UpperLipUpRight,        //右上唇向上

    MouthClose,             //嘴唇闭合状态下一起运动
    MouthDimpleLeft,        //左嘴角向后向左
    MouthDimpleRight,       //右嘴角向后向右
    MouthFrownLeft,         //左嘴角下拉
    MouthFrownRight,        //右嘴角下拉
    MouthLeft,              //双唇向左
    MouthRight,             //双唇向右
    MouthSmileLeft,         //左嘴角向上
    MouthSmileRight,        //右嘴角向上
    MouthStretchLeft,       //嘴部左侧向左
    MouthStretchRight,      //嘴部右侧向右
    MouthUpLeft,            //嘴部左侧向上
    MouthUpRight,           //嘴部右侧向上
  
    Puff,                   //两侧面颊鼓起(嘟嘴)
    SneerLeft,              //左鼻孔抬起
    SneerRight,             //右鼻孔抬起

    Max,
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
            console.log(`add face count ${this._addedFaces.length}`)
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