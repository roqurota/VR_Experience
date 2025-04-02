import { useGLTF } from "@react-three/drei"
import { DefaultXRInputSourceRayPointer } from "@react-three/xr";

export default function LeftHand() {
    const model = useGLTF('./lefthand.gltf');

    return <group>
        <group position-y={-.02}>
            <DefaultXRInputSourceRayPointer makeDefault/>
        </group>
        <primitive position-z={.1} rotation-x={Math.PI * .5} object={model.scene} />
    </group>
}
