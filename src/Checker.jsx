import { Float, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CylinderCollider, RigidBody, quat, vec3, euler } from "@react-three/rapier";
import { useXR, useXRInputSourceState } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import { Handle } from "@react-three/handle";

import * as THREE from 'three';

export default function Checker({ properties }) {
    const texture = useTexture({
        map: 'tile_color.jpg',
        normalMap: 'tile_norm.jpg',
        roughnessMap: 'tile_rough.jpg'
    })

    const meshRef = useRef(null)

    const [isHover, setHover] = useState(false);
    const rigidBodyRef = useRef(null);
    const handleRef = useRef(null);


    useFrame(() => {
        // const handlePosition = handleRef.current.target.current.position;
        // rigidBodyRef.current.translation(handlePosition)
        // console.log(rigidBodyRef.current)
    })

    return <>
        <Handle ref={handleRef}>
            <RigidBody ref={rigidBodyRef} colliders={'hull'} gravityScale={4}>
                <mesh 
                    ref={meshRef} 
                    position={[properties.x, 1, properties.z]}>
                    <cylinderGeometry args={[properties.size / 2, properties.size / 2, .3]} />
                    <meshStandardMaterial {...texture} color={properties.color} />
                </mesh>
                <mesh 
                    position={[properties.x, 1.05, properties.z]}>
                    <cylinderGeometry args={[properties.size / 2.2, properties.size / 2.2, .3]} />
                    <meshStandardMaterial {...texture} color={properties.color} />
                </mesh>
                {
                    isHover ? 
                        <mesh position={[properties.x, 2, properties.z]}>
                            <sphereGeometry args={[.1, 15, 15]}/>
                            <meshStandardMaterial />
                        </mesh> : null
                }
            </RigidBody>
        </ Handle >
    </>
}
