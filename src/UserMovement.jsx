import { useRef } from "react"
import * as THREE from 'three'
import { XROrigin, useXRControllerLocomotion } from "@react-three/xr";

export default function UserMovement() {
    const originRef = useRef(THREE.Group);
    useXRControllerLocomotion(originRef, {}, { type: 'smooth' });
    return <XROrigin ref={originRef} />
}