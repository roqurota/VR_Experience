import { Clone, useGLTF } from "@react-three/drei"

export default function Chair() {

    const model = useGLTF('./chair.gltf');

    return <Clone object={model.scene} />
}

