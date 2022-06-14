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

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { Prefab, instantiate, Vec3, resources, Material, builtinResMgr, director, Vec4, Quat } from '../../core';
import { ccclass, menu, property, disallowMultiple, type } from '../../core/data/class-decorator'
import { ARFeature, FeatureType, IFeatureData } from '../ar-feature-base';
import { ARSession } from '../ar-session-component';
import { Node } from '../../core/scene-graph'
import { createMesh, MeshUtils } from '../../3d/misc/';
import load from 'cocos/core/asset-manager/load';
import { array } from 'cocos/core/utils/js';
import { ARModuleHelper } from '../ar-module-helper';
import { Mesh, MeshRenderer, ModelComponent, utils } from '../../3d';
import { Model } from '../../core/renderer/scene';
import { MorphModel } from '../../3d/models/morph-model';
import { primitives } from '../../../exports/primitive';
import { PrimitiveMode } from '../../core/gfx';
import { NULL } from '@cocos/physx';

@ccclass('cc.ARFeatureSceneMesh')
export class ARFeatureSceneMesh extends ARFeature {
    private static readonly MESH_INFO_SIZE = 8;
    private static readonly MAX_INDICES = 1024;

    public get featureId(): FeatureType {
        return FeatureType.SceneMesh;
    }

    private _sceneMaterial : Material | null = null;
    private count : number = 0;
    private _meshesNodeMap = new Map<number, Node>();

    // close all and destroy all while set false
    //private _enable : boolean = true;

    private _meshesParent : Node | null = null;
    
    //constructor(jsonObject : any, session : ARSession) {
        //super(jsonObject, session);
    constructor (session : ARSession, config : IFeatureData);
    constructor (session : ARSession, config : IFeatureData, jsonObject? : any) {
        super(session, config, jsonObject);

        //this._enable = jsonObject.enable;

        this._meshesParent = new Node("_MESHES_");
        this._session.node.addChild(this._meshesParent);

        var self = this;
        resources.load(jsonObject.sceneMaterialPath, Material, function (err, mat) {
            self._sceneMaterial = mat;
        });
    }

    isReady() : boolean {
        
        return this._sceneMaterial != null;
    }

    init() {
        super.init();
        
    }

    protected onEnable(): void {
        //super.start();
        if(!this._meshesParent) {
            this._meshesParent = new Node("_MESHES_");
            this._session.node.addChild(this._meshesParent);
        }
        this._meshesParent.active = true;
        
        /*/
        const testNode = new Node("test");
        const renderer = testNode.addComponent(MeshRenderer);
        renderer.mesh = utils.createMesh(primitives.box());
        testNode.worldScale = new Vec3(0.01, 0.01, 0.01);
        this._session.node.addChild(testNode);//*/

        const armodule = ARModuleHelper.getInstance();
        armodule.enableSceneMesh(this._enable);
    }

    protected onDisable(): void {
        //this._enable = false;
        const armodule = ARModuleHelper.getInstance();
        armodule.enableSceneMesh(this._enable);
    }

    update() {
        // check start
        if(!this._enable || !this.isReady()) return;
        this.processChanges();
    }

    show() {
        if(this._meshesParent)
            this._meshesParent!.active = true;
    }

    hide() {
        if(this._meshesParent)
            this._meshesParent!.active = false;
    }

    destroy() {
        this._meshesParent?.destroy();
    }

    public processChanges() {
        //if(this.count > 2) return;
        const armodule = ARModuleHelper.getInstance();
        if(!this._sceneMaterial) {
            this._sceneMaterial = new Material();
            this._sceneMaterial.initialize({
                effectName: 'unlit',
                states: { primitive: PrimitiveMode.LINE_LIST }
            });
            this._sceneMaterial.setProperty('mainColor', new Vec4(0, 1, 1, 1));
        }

        let meshes: number[];
        meshes = armodule.getRemovedSceneMesh();
        meshes.forEach(meshRef => {
            if(this._meshesNodeMap.has(meshRef)) {
                let node = this._meshesNodeMap.get(meshRef)!;
                this._meshesNodeMap.delete(meshRef);
                node.destroy();
                console.log(`destroy mesh: ${meshRef}`);
            }
        });

        let addedMeshes : number[];
        let updatetdMeshes : number[];
        addedMeshes = armodule.getAddedSceneMesh();
        updatetdMeshes = armodule.getUpdatedSceneMesh();
        if(addedMeshes) this.processMeshInfo(addedMeshes);
        if(updatetdMeshes) this.processMeshInfo(updatetdMeshes);

        /*
        meshes = armodule.requireSceneMesh();
        meshes.forEach(meshRef => {
            //if(this.count > 2) return;

            let vertices: number[];
            let indices: number[];
            vertices = armodule.getSceneMeshVertices(meshRef);
            indices = armodule.getSceneMeshTriangleIndices(meshRef);

            let mesh : Mesh;
            mesh = createMesh({
                positions: vertices,
                indices: indices,
            });

            if (meshRef >= 0) {
                let sceneMeshNode : Node | undefined;
                let renderer : MeshRenderer | null;
                
                sceneMeshNode = this.meshesNodeMap.get(meshRef);
                if(!sceneMeshNode) {
                    sceneMeshNode = new Node("scene-mesh");
                    this.session.node.addChild(sceneMeshNode);
                    //this._meshesParent!.addChild(sceneMeshNode);
                    this.meshesNodeMap.set(meshRef, sceneMeshNode);
                    console.log(`add mesh: ${meshRef}`);
                } else {
                    console.log(`update mesh: ${meshRef}`);
                }
                renderer = sceneMeshNode.getComponent(MeshRenderer);
                if(!renderer)
                    renderer = sceneMeshNode.addComponent(MeshRenderer);

                
                
                console.log(`vertices length: ${vertices.length}`);
                console.log(`indices length: ${indices.length}`);
                const meshGeo = mesh.renderingSubMeshes[0].geometricInfo;
                const geo = {
                    positions: meshGeo.positions.slice(),
                    indices: meshGeo.indices!.slice()
                };
                renderer.mesh = createMesh(primitives.wireframed(geo as any));
                renderer.material = mat;

                const pose = armodule.getAnchorPose(meshRef);
                const pos = new Vec3(pose[0], pose[1], pose[2]);
                const rot = new Quat(pose[3], pose[4], pose[5], pose[6]);
                sceneMeshNode.setWorldPosition(pos);
                sceneMeshNode.setWorldRotation(rot);
                console.log(`mesh pos: ${sceneMeshNode.worldPosition}`);
                let eulerAngle = new Vec3();
                console.log(`mesh rot: ${sceneMeshNode.worldRotation.getEulerAngles(eulerAngle)}`);
            }
            
            ++this.count;
        });
        //*/

        armodule.endRequireSceneMesh();
    }

    public updateContents() {
        // update all existed mesh anchor
        
    }

    private processMeshInfo(meshInfo : number[]) {
        const armodule = ARModuleHelper.getInstance();
        /*
        const mat = new Material();
        mat.initialize({
            effectName: 'unlit',
            states: { primitive: PrimitiveMode.LINE_LIST }
        });
        mat.setProperty('mainColor', new Vec4(0, 1, 1, 1));
        */

        let count = meshInfo.length / ARFeatureSceneMesh.MESH_INFO_SIZE;
        let offset = 0;
        for (let i = 0; i < count; i++) {
            offset = i * ARFeatureSceneMesh.MESH_INFO_SIZE;
            
            let meshRef = meshInfo[offset];
            let pos = new Vec3(
                meshInfo[offset + 1],
                meshInfo[offset + 2],
                meshInfo[offset + 3]
            );
            let rot = new Quat(
                meshInfo[offset + 4],
                meshInfo[offset + 5],
                meshInfo[offset + 6],
                meshInfo[offset + 7]
            );

            // create or update node
            let sceneMeshNode : Node | undefined;
            let renderer : MeshRenderer | null;
            let vertices: Float32Array;
            let indices: Uint32Array;
            sceneMeshNode = this._meshesNodeMap.get(meshRef);
            vertices = armodule.getSceneMeshVertices(meshRef);
            indices = armodule.getSceneMeshTriangleIndices(meshRef);

            if(vertices.length <= 0) continue;
            if(indices.length <= 0) continue;
            //
            console.log(`vertices length: ${vertices.length}`);
            vertices.forEach(vert => {
                console.log(`${vert}`);
            });
            console.log(`indices length: ${indices.length}`);
            indices.forEach(indi => {
                console.log(`${indi}`);
            });//*/


            if(!sceneMeshNode) {
                sceneMeshNode = new Node("scene-mesh");
                this.session.node.addChild(sceneMeshNode);
                //this._meshesParent!.addChild(sceneMeshNode);
                this._meshesNodeMap.set(meshRef, sceneMeshNode);
                console.log(`add mesh: ${meshRef}`);
                renderer = sceneMeshNode.addComponent(MeshRenderer);
                renderer.mesh = new Mesh();
                renderer.material = this._sceneMaterial;

            } else {
                console.log(`update mesh: ${meshRef}`);
                renderer = sceneMeshNode.getComponent(MeshRenderer);

            }
            sceneMeshNode.setWorldPosition(pos);
            sceneMeshNode.setWorldRotation(rot);

            /*
            renderer = sceneMeshNode.getComponent(MeshRenderer);
            if(!renderer)
                renderer = sceneMeshNode.addComponent(MeshRenderer);
            */
            
            let subMeshCount = Math.ceil(indices.length / ARFeatureSceneMesh.MAX_INDICES);
            for(let j = 0; j < subMeshCount; ++j) {
                MeshUtils.createDynamicMesh(j, {
                    positions: vertices,
                    indices32: indices,
                }, renderer!.mesh!, { 
                    maxSubMeshes: subMeshCount,
                    maxSubMeshVertices : vertices.length,
                    maxSubMeshIndices : indices.length
                });
            }

            /*
            let mesh : Mesh = new Mesh();
            MeshUtils.createDynamicMesh(0, {
                positions: vertices,
                indices32: indices,
            }, mesh);
            console.log(`vertices length: ${vertices.length}`);
            console.log(`indices length: ${indices.length}`);
            const meshGeo = mesh.renderingSubMeshes[0].geometricInfo;
            const geo = {
                positions: meshGeo.positions.slice(),
                indices: meshGeo.indices!.slice()
            };
            renderer.mesh = createMesh(primitives.wireframed(geo as any));
            renderer.material = this._sceneMaterial;
            */
        }
    }
}