import { EquirectangularReflectionMapping, EquirectangularRefractionMapping, CubeReflectionMapping, CubeRefractionMapping } from '../../constants.js';
import { PMREMGenerator } from '../../extras/PMREMGenerator.js';
import '../../core/BufferAttribute.js';
import '../../math/Vector3.js';
import '../../math/MathUtils.js';
import '../../math/Quaternion.js';
import '../../math/Vector2.js';
import '../../extras/DataUtils.js';
import '../../core/BufferGeometry.js';
import '../../math/Box3.js';
import '../../core/EventDispatcher.js';
import '../../math/Sphere.js';
import '../../core/Object3D.js';
import '../../math/Matrix4.js';
import '../../math/Euler.js';
import '../../core/Layers.js';
import '../../math/Matrix3.js';
import '../../utils.js';
import '../../objects/Mesh.js';
import '../../math/Ray.js';
import '../../math/Triangle.js';
import '../../materials/MeshBasicMaterial.js';
import '../../materials/Material.js';
import '../../math/Color.js';
import '../../math/ColorManagement.js';
import '../../cameras/OrthographicCamera.js';
import '../../cameras/Camera.js';
import '../../cameras/PerspectiveCamera.js';
import '../../materials/ShaderMaterial.js';
import '../shaders/UniformsUtils.js';
import '../shaders/ShaderChunk/default_vertex.glsl.js';
import '../shaders/ShaderChunk/default_fragment.glsl.js';
import '../WebGLRenderTarget.js';
import '../../core/RenderTarget.js';
import '../../textures/Texture.js';
import '../../textures/Source.js';
import '../../extras/ImageUtils.js';
import '../../math/Vector4.js';
import '../../geometries/BoxGeometry.js';

function WebGLCubeUVMaps(renderer) {
    let cubeUVmaps = new WeakMap();
    let pmremGenerator = null;
    function get(texture) {
        if (texture && texture.isTexture) {
            const mapping = texture.mapping;
            const isEquirectMap = mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping;
            const isCubeMap = mapping === CubeReflectionMapping || mapping === CubeRefractionMapping;
            // equirect/cube map to cubeUV conversion
            if (isEquirectMap || isCubeMap) {
                if (texture.isRenderTargetTexture && texture.needsPMREMUpdate === true) {
                    texture.needsPMREMUpdate = false;
                    let renderTarget = cubeUVmaps.get(texture);
                    if (pmremGenerator === null) pmremGenerator = new PMREMGenerator(renderer);
                    renderTarget = isEquirectMap ? pmremGenerator.fromEquirectangular(texture, renderTarget) : pmremGenerator.fromCubemap(texture, renderTarget);
                    cubeUVmaps.set(texture, renderTarget);
                    return renderTarget.texture;
                } else {
                    if (cubeUVmaps.has(texture)) {
                        return cubeUVmaps.get(texture).texture;
                    } else {
                        const image = texture.image;
                        if (isEquirectMap && image && image.height > 0 || isCubeMap && image && isCubeTextureComplete(image)) {
                            if (pmremGenerator === null) pmremGenerator = new PMREMGenerator(renderer);
                            const renderTarget = isEquirectMap ? pmremGenerator.fromEquirectangular(texture) : pmremGenerator.fromCubemap(texture);
                            cubeUVmaps.set(texture, renderTarget);
                            texture.addEventListener('dispose', onTextureDispose);
                            return renderTarget.texture;
                        } else {
                            // image not yet ready. try the conversion next frame
                            return null;
                        }
                    }
                }
            }
        }
        return texture;
    }
    function isCubeTextureComplete(image) {
        let count = 0;
        const length = 6;
        for(let i = 0; i < length; i++){
            if (image[i] !== undefined) count++;
        }
        return count === length;
    }
    function onTextureDispose(event) {
        const texture = event.target;
        texture.removeEventListener('dispose', onTextureDispose);
        const cubemapUV = cubeUVmaps.get(texture);
        if (cubemapUV !== undefined) {
            cubeUVmaps.delete(texture);
            cubemapUV.dispose();
        }
    }
    function dispose() {
        cubeUVmaps = new WeakMap();
        if (pmremGenerator !== null) {
            pmremGenerator.dispose();
            pmremGenerator = null;
        }
    }
    return {
        get: get,
        dispose: dispose
    };
}

export { WebGLCubeUVMaps };