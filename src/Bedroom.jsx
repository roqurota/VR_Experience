import { Clone, Cloud, Clouds, useGLTF, Sky, Stars } from '@react-three/drei'
import { useRef } from 'react';
import * as THREE from 'three'

export default function Bedroom() {
    const bookcase = useGLTF('./bookcase.gltf');
    const bookcaseSmall = useGLTF('./bookcase_small.gltf');
    const chair = useGLTF('./chair.gltf');
    const crate = useGLTF('./crate.gltf');
    const toy = useGLTF('./dog_toy.gltf');

    const frame = useRef(null);

    function onPointerEnter(event) {
        const item = event.eventObject;

        if (!item)
            return;

        frame.current.position.copy(item.position);
        frame.current.scale.copy(item.scale);
        frame.current.rotation.clone(item.rotation);
    }

    function onPointerLeave(event) {
        frame.current.position.copy(new THREE.Vector3(0, -1, 0));
        frame.current.scale.copy(new THREE.Vector3(1, 1, 1));
    }

    function onClick(event) {
        const item = event.eventObject;

        if (!item)
            return;
    }

    return <>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

        <Clouds position={[0, 4, 0]} material={THREE.MeshBasicMaterial}>
            <Cloud seed={1} segments={40} bounds={[3, 1, 3]} volume={1} speed={.5} color="lightblue"/>
        </Clouds>

        <mesh scale={10} rotation-x={-Math.PI * 0.5}>
            <planeGeometry />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightblue" />
        </mesh>

        <mesh ref={frame} position={[0, -1, 0]}>
            <boxGeometry />
            <meshStandardMaterial color={'red'} wireframe={true}/>
        </mesh>

        <Clone scale={.8} position={[.6, 0, -1.2]} object={bookcase.scene} />
        <Clone scale={.8} position={[-.7, 0, -1.2]} object={bookcaseSmall.scene} />

        <Clone scale={.8} position={[.8, 0, -.3]} rotation-y={Math.PI * .5 - 90} object={chair.scene}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick} 
        />

        <mesh>
            <Clone scale={.6} position={[-.3, .3, .5]} object={crate.scene} 
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onClick={onClick}
            />
        </mesh>

        <Clone scale={.3} position={[-.3, .6, .5]} rotation-y={-Math.PI * .5 - 90} object={toy.scene} 
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick}
        />
    </>
}
