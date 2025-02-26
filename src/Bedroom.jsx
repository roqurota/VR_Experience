import { Clone, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function Bedroom() {
    const bookcase = useGLTF('./bookcase.gltf');
    const bookcaseSmall = useGLTF('./bookcase_small.gltf');
    const chair = useGLTF('./chair.gltf');
    const crate = useGLTF('./crate.gltf');
    const toy = useGLTF('./dog_toy.gltf');

    return <>
        <mesh scale={3} rotation-x={-Math.PI * 0.5}>
            <planeGeometry />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightblue" />
        </mesh>

        <Clone scale={.8} position={[.6, 0, -1.2]} object={bookcase.scene} />
        <Clone scale={.8} position={[-.7, 0, -1.2]} object={bookcaseSmall.scene} />
        <Clone scale={.8} position={[.8, 0, -.3]} rotation-y={Math.PI * .5 - 90} object={chair.scene} />
        <Clone scale={.6} position={[-.3, .3, .5]} object={crate.scene} />
        <Clone scale={.3} position={[-.3, .6, .5]} rotation-y={-Math.PI * .5 - 90} object={toy.scene} />
    </>
}
