import { useGLTF } from "@react-three/drei"
import { DefaultXRHandTouchPointer, DefaultXRInputSourceRayPointer } from "@react-three/xr";

export default function RightHand() {
    const model = useGLTF('./righthand.gltf');

    return <group>
        <group position-y={-.02}>
            <DefaultXRInputSourceRayPointer makeDefault/>
        </group>
        <primitive position-z={.1} rotation-x={Math.PI * .5} object={model.scene} />
    </group>
}
