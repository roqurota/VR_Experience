import { useRef } from "react"
import * as THREE from 'three'
import { XROrigin, useXRControllerLocomotion } from "@react-three/xr";

export default function UserMovement({ position }) {
    const originRef = useRef(new THREE.Group);
    useXRControllerLocomotion(originRef, { speed: 5}, { type: 'snap' });
    return <group position={position} ref={originRef}>
        <mesh>
            <boxGeometry args={[.2, 1, 1]} />
            <meshStandardMaterial color={'yellow'} />
        </mesh>
        <XROrigin />
    </group>

}