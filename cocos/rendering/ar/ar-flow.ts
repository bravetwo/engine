import { UBOGlobal } from '../define';
import { ForwardFlowPriority } from '../../../core/pipeline/enum';
import { RenderFlowTag } from '../pipeline-serialization';
import { IRenderFlowInfo, RenderFlow } from '../render-flow';
//import { RenderView } from '../render-view';
import { ARModuleStage } from './ar-stage';
//import { ForwardPipeline } from '../forward/forward-pipeline';
//import { sceneCulling } from '../forward/scene-culling';
import { Camera } from '../../renderer/scene';

export class ARModuleFlow extends RenderFlow {

    public static initInfo: IRenderFlowInfo = {
        name: 'ARModuleFlow',
        priority: ForwardFlowPriority.FORWARD + 1,
        tag: RenderFlowTag.UI,
        stages: [],
    };

    public initialize (info: IRenderFlowInfo): boolean {

        super.initialize(info);

        const arStage = new ARModuleStage();
        arStage.initialize(ARModuleStage.initInfo);
        this._stages.push(arStage);

        return true;
    }

    public destroy () {
        super.destroy();
    }

    public rebuild () {
    }

    public render (camera: Camera) {

        
        /*
        view.camera.update();
        const pipeline = this._pipeline as ForwardPipeline;
        sceneCulling(pipeline, view);

        pipeline.updateUBOs(view);
        const isHDR = pipeline.isHDR;
        pipeline.isHDR = false;
        pipeline.descriptorSet.getBuffer(UBOGlobal.BLOCK.binding).update(pipeline.globalUBO);
        */
        super.render(camera);

        /*
        pipeline.isHDR = isHDR;
        pipeline.descriptorSet.getBuffer(UBOGlobal.BLOCK.binding).update(pipeline.globalUBO);
        */
    }

}
 