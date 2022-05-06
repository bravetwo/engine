/****************************************************************************
 Copyright (c) 2021 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#include "core/Root.h"
#include "core/event/CallbacksInvoker.h"
#include "core/event/EventTypesToJS.h"
#include "profiler/Profiler.h"
#include "renderer/gfx-base/GFXDef.h"
#include "renderer/gfx-base/GFXDevice.h"
#include "renderer/gfx-base/GFXSwapchain.h"
#include "renderer/pipeline/PipelineSceneData.h"
#include "renderer/pipeline/custom/NativePipelineTypes.h"
#include "renderer/pipeline/custom/RenderInterfaceTypes.h"
#include "renderer/pipeline/deferred/DeferredPipeline.h"
#include "renderer/pipeline/forward/ForwardPipeline.h"
#include "scene/Camera.h"
#include "scene/DirectionalLight.h"
#include "scene/DrawBatch2D.h"
#include "scene/SpotLight.h"
#if USE_XR
#include "Xr.h"
#endif

namespace cc {

namespace {
Root *instance = nullptr;
}

Root *Root::getInstance() {
    return instance;
}

Root::Root(gfx::Device *device)
: _device(device) {
    instance = this;
    _eventProcessor = new CallbacksInvoker();
    // TODO(minggo):
    //    this._dataPoolMgr = legacyCC.internal.DataPoolManager && new legacyCC.internal.DataPoolManager(device) as DataPoolManager;

    _cameraList.reserve(6);
    _swapchains.reserve(2);
}

Root::~Root() {
    instance = nullptr;
    CC_SAFE_DELETE(_eventProcessor);
}

void Root::initialize(gfx::Swapchain *swapchain) {
    _swapchain = swapchain;
    _allCameraList.clear();

#if USE_XR
    // TODO Xr _mainWindow _curWindow _swapchain invalid
    auto swapchains = gfx::Device::getInstance()->getSwapchains();
    for (const auto &swapchain : swapchains) {
#endif
    gfx::RenderPassInfo renderPassInfo;

    gfx::ColorAttachment colorAttachment;
    colorAttachment.format = swapchain->getColorTexture()->getFormat();
    renderPassInfo.colorAttachments.emplace_back(colorAttachment);

    auto &depthStencilAttachment = renderPassInfo.depthStencilAttachment;
    depthStencilAttachment.format = swapchain->getDepthStencilTexture()->getFormat();
    depthStencilAttachment.depthStoreOp = gfx::StoreOp::DISCARD;
    depthStencilAttachment.stencilStoreOp = gfx::StoreOp::DISCARD;

    scene::IRenderWindowInfo info;
    info.title = ccstd::string{"rootMainWindow"};
    info.width = swapchain->getWidth();
    info.height = swapchain->getHeight();
    info.renderPassInfo = renderPassInfo;
    info.swapchain = swapchain;
    _mainWindow = createWindow(info);

    _curWindow = _mainWindow;
#if USE_XR
    }
#endif
    // TODO(minggo):
    // return Promise.resolve(builtinResMgr.initBuiltinRes(this._device));
}

void Root::destroy() {
    destroyScenes();

    if (_usesCustomPipeline) {
        _pipelineRuntime->destroy();
    }
    _pipelineRuntime.reset();

    CC_SAFE_DESTROY_NULL(_pipeline);
    // TODO(minggo):
    //    CC_SAFE_DESTROY(_batcher2D);

    // TODO(minggo):
    //    this.dataPoolManager.clear();
}

void Root::resize(uint32_t width, uint32_t height) {
    for (const auto &window : _windows) {
        if (window->getSwapchain()) {
            window->resize(width, height);
        }
    }
}

namespace {

class RenderPipelineBridge final : public render::PipelineRuntime {
public:
    explicit RenderPipelineBridge(pipeline::RenderPipeline *pipelineIn)
    : pipeline(pipelineIn) {}

    bool activate(gfx::Swapchain *swapchain) override {
        return pipeline->activate(swapchain);
    }
    bool destroy() noexcept override {
        return pipeline->destroy();
    }
    void render(const ccstd::vector<scene::Camera *> &cameras) override {
        pipeline->render(cameras);
    }
    const MacroRecord &getMacros() const override {
        return pipeline->getMacros();
    }
    pipeline::GlobalDSManager *getGlobalDSManager() const override {
        return pipeline->getGlobalDSManager();
    }
    gfx::DescriptorSetLayout *getDescriptorSetLayout() const override {
        return pipeline->getDescriptorSetLayout();
    }
    pipeline::PipelineSceneData *getPipelineSceneData() const override {
        return pipeline->getPipelineSceneData();
    }
    const ccstd::string &getConstantMacros() const override {
        return pipeline->getConstantMacros();
    }
    scene::Model *getProfiler() const override {
        return pipeline->getProfiler();
    }
    void setProfiler(scene::Model *profiler) override {
        pipeline->setProfiler(profiler);
    }
    float getShadingScale() const override {
        return pipeline->getShadingScale();
    }
    void setShadingScale(float scale) override {
        pipeline->setShadingScale(scale);
    }
    void onGlobalPipelineStateChanged() override {
        pipeline->onGlobalPipelineStateChanged();
    }
    void setValue(const ccstd::string &name, int32_t value) override {
        pipeline->setValue(name, value);
    }
    void setValue(const ccstd::string &name, bool value) override {
        pipeline->setValue(name, value);
    }
    bool isOcclusionQueryEnabled() const override {
        return pipeline->isOcclusionQueryEnabled();
    }
    pipeline::RenderPipeline *pipeline = nullptr;
};

} // namespace

bool Root::setRenderPipeline(pipeline::RenderPipeline *rppl /* = nullptr*/) {
    if (!_usesCustomPipeline) {
        if (rppl != nullptr && dynamic_cast<pipeline::DeferredPipeline *>(rppl) != nullptr) {
            _useDeferredPipeline = true;
        }

        bool isCreateDefaultPipeline{false};
        if (!rppl) {
            rppl = ccnew pipeline::ForwardPipeline();
            rppl->initialize({});
            isCreateDefaultPipeline = true;
        }

        _pipeline = rppl;
        _pipelineRuntime = std::make_unique<RenderPipelineBridge>(rppl);

        // now cluster just enabled in deferred pipeline
        if (!_useDeferredPipeline || !_device->hasFeature(gfx::Feature::COMPUTE_SHADER)) {
            // disable cluster
            _pipeline->setClusterEnabled(false);
        }
        _pipeline->setBloomEnabled(false);

        if (!_pipeline->activate(_mainWindow->getSwapchain())) {
            if (isCreateDefaultPipeline) {
                CC_SAFE_DESTROY_AND_DELETE(_pipeline);
            }

            _pipeline = nullptr;
            return false;
        }
    } else {
        _pipelineRuntime = std::make_unique<render::NativePipeline>();
        if (!_pipelineRuntime->activate(_mainWindow->getSwapchain())) {
            _pipelineRuntime->destroy();
            _pipelineRuntime.reset();
            return false;
        }
    }

    // TODO(minggo):
    //    auto *scene = Director::getInstance()->getScene();
    //    if (scene) {
    //        scene->getSceneGlobals()->activate();
    //    }

    onGlobalPipelineStateChanged();

    _eventProcessor->emit(EventTypesToJS::ROOT_BATCH2D_INIT, this);
    // TODO(minggo):
    //    if (!_batcher) {
    //        _batcher = ccnew Batcher2D(this);
    //        if (!this._batcher.initialize()) {
    //            this.destroy();
    //            return false;
    //        }
    //    }

    return true;
}

void Root::onGlobalPipelineStateChanged() {
    for (const auto &scene : _scenes) {
        scene->onGlobalPipelineStateChanged();
    }

    _pipelineRuntime->onGlobalPipelineStateChanged();
}

void Root::activeWindow(scene::RenderWindow *window) {
    _curWindow = window;
}

void Root::resetCumulativeTime() {
    _cumulativeTime = 0;
}

void Root::frameMove(float deltaTime, int32_t totalFrames) {
    if (!cc::gfx::Device::getInstance()->isRendererAvailable()) {
        return;
    }
    _frameTime = deltaTime;

    ++_frameCount;
    _cumulativeTime += deltaTime;
    _fpsTime += deltaTime;
    if (_fpsTime > 1.0F) {
        _fps = _frameCount;
        _frameCount = 0;
        _fpsTime = 0.0;
    }

#if USE_XR
    if (xr::XrEntrance::getInstance()->BeginRenderFrame()) {
        for (auto *camera : _allCameraList) {
            if (camera->isHMD()) {
                camera->getOriginMatrix();
            }
        }
        auto swapchains = gfx::Device::getInstance()->getSwapchains();
        for (int xrEye = 0; xrEye < 2; xrEye++) {
            xr::XrEntrance::getInstance()->renderLoopStart(xrEye);
#endif
    for (const auto &scene : _scenes) {
        scene->removeBatches();
    }

    _eventProcessor->emit(EventTypesToJS::ROOT_BATCH2D_UPDATE, this); // cjh added for sync logic in ts.

    // TODO(minggo):
    //    if (_batcher) {
    //        _batcher.update();
    //    }

    //
    _cameraList.clear();
#if !USE_XR
    for (const auto &window : _windows) {
        window->extractRenderCameras(_cameraList);
    }
#else
            _windows[xrEye]->extractRenderCameras(_cameraList, xrEye);
            xr::XrEntrance::getInstance()->ByBeforeRenderFrame(xrEye);
#endif

    if (_pipelineRuntime != nullptr && !_cameraList.empty()) {
        _swapchains.clear();
#if !USE_XR
        _swapchains.emplace_back(_swapchain);
#else
        _swapchains.emplace_back(swapchains[xrEye]);
#endif
        _device->acquire(_swapchains);
        // NOTE: c++ doesn't have a Director, so totalFrames need to be set from JS
        uint32_t stamp = totalFrames;

        _eventProcessor->emit(EventTypesToJS::ROOT_BATCH2D_UPLOAD_BUFFERS, this);
        //                if (_batcher != nullptr) {
        //                    _batcher->uploadBuffers();
        //                }

        for (const auto &scene : _scenes) {
            scene->update(stamp);
        }

        CC_PROFILER_UPDATE;

        _eventProcessor->emit(EventTypesToJS::DIRECTOR_BEFORE_COMMIT, this);

        std::stable_sort(_cameraList.begin(), _cameraList.end(), [](const auto *a, const auto *b) {
            return a->getPriority() < b->getPriority();
        });
        _pipelineRuntime->render(_cameraList);
        _device->present();
    }

    _eventProcessor->emit(EventTypesToJS::ROOT_BATCH2D_RESET, this);
    // cjh TODO:    if (this._batcher) this._batcher.reset();
#if USE_XR
            xr::XrEntrance::getInstance()->renderLoopEnd(xrEye);
            xr::XrEntrance::getInstance()->ByAfterRenderFrame(xrEye);
        }
        xr::XrEntrance::getInstance()->frameEnd();
        xr::XrEntrance::getInstance()->EndRenderFrame();
        for (auto *camera : _allCameraList) {
            if (camera->isHMD()) {
                camera->dependUpdateData();
            }
        }
    }
#endif
}

scene::RenderWindow *Root::createWindow(scene::IRenderWindowInfo &info) {
    IntrusivePtr<scene::RenderWindow> window = ccnew scene::RenderWindow();

    window->initialize(_device, info);
    _windows.emplace_back(window);
    return window;
}

void Root::destroyWindow(scene::RenderWindow *window) {
    auto it = std::find(_windows.begin(), _windows.end(), window);
    if (it != _windows.end()) {
        CC_SAFE_DESTROY(*it);
        _windows.erase(it);
    }
}

void Root::destroyWindows() {
    for (const auto &window : _windows) {
        CC_SAFE_DESTROY(window);
    }
    _windows.clear();
}

scene::RenderScene *Root::createScene(const scene::IRenderSceneInfo &info) {
    IntrusivePtr<scene::RenderScene> scene = ccnew scene::RenderScene();
    scene->initialize(info);
    _scenes.emplace_back(scene);
    return scene.get();
}

void Root::destroyScene(scene::RenderScene *scene) {
    auto it = std::find(_scenes.begin(), _scenes.end(), scene);
    if (it != _scenes.end()) {
        CC_SAFE_DESTROY(*it);
        _scenes.erase(it);
    }
}

void Root::destroyModel(scene::Model *model) { // NOLINT(readability-convert-member-functions-to-static)
    if (model == nullptr) {
        return;
    }

    if (model->getScene() != nullptr) {
        model->getScene()->removeModel(model);
    }
    model->destroy();
}

void Root::destroyLight(scene::Light *light) { // NOLINT(readability-convert-member-functions-to-static)
    if (light == nullptr) {
        return;
    }

    if (light->getScene() != nullptr) {
        if (light->getType() == scene::LightType::DIRECTIONAL) {
            light->getScene()->removeDirectionalLight(static_cast<scene::DirectionalLight *>(light));
        } else if (light->getType() == scene::LightType::SPHERE) {
            light->getScene()->removeSphereLight(static_cast<scene::SphereLight *>(light));
        } else if (light->getType() == scene::LightType::SPOT) {
            light->getScene()->removeSpotLight(static_cast<scene::SpotLight *>(light));
        }
    }
    light->destroy();
}

scene::Camera *Root::createCamera() {
    auto *camera = ccnew scene::Camera(_device);
    _allCameraList.emplace_back(camera);
    return camera;
}

void Root::destroyScenes() {
    for (const auto &scene : _scenes) {
        CC_SAFE_DESTROY(scene);
    }
    _scenes.clear();
}

} // namespace cc
