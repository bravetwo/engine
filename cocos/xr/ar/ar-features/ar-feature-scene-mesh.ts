/*
 Copyright (c) 2021-2022 Xiamen Yaji Software Co., Ltd.

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
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { ccclass, property} from '../../../core/data/class-decorator'
import { ARFeature, FeatureEvent, IFeatureData, ARFeatureData} from '../ar-feature-base';
import { PrimitiveMode } from '../../../gfx';
import { Material } from '../../../asset/assets/material';
import { Quat, Vec3, Vec4 } from '../../../core/math';
import { resources } from '../../../asset/asset-manager/bundle';
import { ARModuleX } from '../ar-module';
import { ARAnchor, FeatureType } from '../ar-define';

export interface ARMesh extends ARAnchor {
    vertices : number[];
    indices : number[];
    useMaterial : Material;
    //bound : Bound;
}

@ccclass('cc.WorldMeshConfig')
export class WorldMeshConfig extends ARFeatureData {
    @property
    useCollider: boolean = false;
    @property
    overlayMesh: Material | null = null;
}

@ccclass('cc.ARFeatureSceneMesh')
export class ARFeatureSceneMesh extends ARFeature {
    private static readonly MESH_INFO_SIZE = 8;
    private static readonly SUB_MAX_INDICES = 1024;

    public get featureId(): FeatureType {
        return FeatureType.SceneMesh;
    }
    private _sceneMaterial : Material | null = null;

    private _useCollider = false;

    private _addedMeshes : ARMesh[] = [];
    private _updatedMeshes : ARMesh[] = [];

    readonly onAddEvent = new FeatureEvent<ARMesh[]>();
    readonly onUpdateEvent = new FeatureEvent<ARMesh[]>();
    readonly onRemoveEvent = new FeatureEvent<number[]>();

    constructor (session : ARModuleX, config : IFeatureData);
    constructor (session : ARModuleX, config : IFeatureData, jsonObject? : any) {
        super(session, config, jsonObject);

        if(config) {
            let meshConfig = config as WorldMeshConfig;
            this._useCollider = meshConfig.useCollider;

            if(meshConfig.overlayMesh) {
                this._sceneMaterial = meshConfig.overlayMesh;
            }
        } else if (jsonObject) {
            var self = this;
            resources.load(jsonObject.sceneMaterialPath, Material, function (err, mat) {
                self._sceneMaterial = mat;
            });
        }
    }

    isReady() : boolean {
        return this._sceneMaterial != null;
    }

    init() {
        super.init();
        
    }

    protected onEnable(): void {
        this.session!.enableSceneMesh(this._enable);
    }

    protected onDisable(): void {
        this.session!.enableSceneMesh(this._enable);
    }

    update() {
        // check start
        if(!this._enable) return;
        this.processChanges();
    }

    public processChanges() {
        if(!this._sceneMaterial) {
            this._sceneMaterial = new Material();
            this._sceneMaterial.initialize({
                effectName: 'unlit',
                states: { primitive: PrimitiveMode.LINE_LIST }
            });
            this._sceneMaterial.setProperty('mainColor', new Vec4(0, 1, 1, 1));
        }
        
        let removedMeshes = this.session!.getRemovedSceneMesh();
        if(removedMeshes) {
            console.log(`removed meshes ::: ${removedMeshes}`);
            this.onRemoveEvent.trigger(removedMeshes);
        }

        let addedMeshInfos = this.session!.getAddedSceneMesh();
        if(addedMeshInfos.length > 0) {
            this._addedMeshes.length = 0;
            this.assembleInfos(addedMeshInfos, this._addedMeshes);
            if (this._addedMeshes.length > 0) {
                this.onAddEvent.trigger(this._addedMeshes);
            }
        }

        let updatedMeshInfos = this.session!.getUpdatedSceneMesh();
        if(updatedMeshInfos.length > 0) {
            this._updatedMeshes.length = 0;
            this.assembleInfos(updatedMeshInfos, this._updatedMeshes);
            if (this._updatedMeshes.length > 0) {
                this.onUpdateEvent.trigger(this._updatedMeshes);
            }
        }
    }

    private assembleInfos(src : number[], dst : ARMesh[]) {
        if(src) {
            let count = src.length / ARFeatureSceneMesh.MESH_INFO_SIZE;
            let offset = 0;
            for (let i = 0; i < count; i++) {
                offset = i * ARFeatureSceneMesh.MESH_INFO_SIZE;

                let meshRef = src[offset];

                const vertices = this.session!.getSceneMeshVertices(meshRef);
                const indices = this.session!.getSceneMeshTriangleIndices(meshRef);
                this.session!.endRequireSceneMesh();

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

                let mesh : ARMesh = {
                    id: meshRef,
                    pose : {
                        position : pos,
                        rotation : rot
                    },
                    vertices : vertices,
                    indices : indices,
                    useMaterial : this._sceneMaterial!
                };
                dst.push(mesh);
            }
        }
    }
}