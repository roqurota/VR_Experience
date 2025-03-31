import { useGLTF } from "@react-three/drei"
import { DefaultXRInputSourceRayPointer } from "@react-three/xr";

export default function LeftHand() {
    const model = useGLTF('./lefthand.gltf');

    console.log(model)

    return <group>
        <group>
            <DefaultXRInputSourceRayPointer makeDefault/>
        </group>
        <primitive position-z={.1} rotation-x={Math.PI * .5} object={model.scene} />
    </group>
}
