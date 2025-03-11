import { useFrame } from "@react-three/fiber";
import { CylinderCollider, RigidBody, quat, vec3, euler } from "@react-three/rapier";
import { useRayPointer } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export default function Checker({ properties }) {
    const size = 0.7;

    const [isDragging, setDraggingState] = useState(false);
    const meshRef = useRef(null)
    const pointerOffset = useRef(null);

    const onPointerDown = (event) => {
        if (isDragging)
            return

        pointerOffset.current = meshRef.current.position.sub(event.point);

        setDraggingState(true)
        meshRef.current.position.copy(event.point)
    }

    const onPointerMove = (event) => {
        if (!isDragging)
            return
   
        meshRef.current.position.copy(new THREE.Vector3(event.point.x, properties.position.y, event.point.z))
    }

    const onPointerUp = () => {
        setDraggingState(false)
    }

    // useFrame(() => {
    //     if (rigidBody.current && isDragging) {
    //         const position = vec3(rigidBody.current.translation());
    //         const quaternion = quat(rigidBody.current.rotation());
    //         const eulerRot = euler().setFromQuaternion(
    //             quat(rigidBody.current.rotation())
    //         );

    //         // console.log(pointerPosition.current)

    //         rigidBody.current.setTranslation(vec3(pointerPosition.current.x, 2, pointerPosition.current.z));
    //         // rigidBody.current.setRotation(quaternion, true);
    //         // rigidBody.current.setAngvel({ x: 0, y: 2, z: 0 }, true);
    //     }
    // }, [])

    return <mesh ref={meshRef} position={properties.position}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        >
        <cylinderGeometry args={[size, size, .3]} />
        <meshStandardMaterial color={properties.color} />
    </mesh>
    
    // <>
        {/* <RigidBody ref={rigidBody} colliders={false} position={properties.position}>
            <mesh 
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerMove={onPointerMove}
                >
                <cylinderGeometry args={[size, size, .3]} />
                <meshStandardMaterial color={properties.color} />
            </mesh>
            <CylinderCollider args={[.15, size]} />
        </RigidBody> */}
    // </>
    
    
}
