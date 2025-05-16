import { Float, useGLTF } from "@react-three/drei"
import { DefaultXRInputSourceRayPointer } from "@react-three/xr";
import { useEffect, useRef } from "react";

export default function LeftHand() {
    const model = useGLTF('./lefthand.gltf');
    const dog = useGLTF('./dog_toy.gltf');
    const sound = useRef(null);

    useEffect(() => {
        sound.current = new Audio('./bark.wav');
        sound.current.preload = 'auto';
        sound.current.volume = '0.3';

        return () => {
            sound.current.pause();
            sound.current = null;
        }
    }, []);

    return <group>
        {/* <mesh scale={.1} position={[-.1, .1, -.1]}>
            <boxGeometry/>
            <meshStandardMaterial color={'yellow'}/>
        </mesh> */}
        <Float speed={5} floatingRange={[.1]}>
            <primitive onClick={() => {
                if (sound.current)
                    sound.current.play();
            }} scale={.1} position={[-.1, 0, -.1]} rotation-y={Math.PI * .3} object={dog.scene} />
        </Float>
        <group position-y={-.02}>
            <DefaultXRInputSourceRayPointer makeDefault/>
        </group>
        <primitive position-z={.1} rotation-x={Math.PI * .5} object={model.scene} />
    </group>
}
