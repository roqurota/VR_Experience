import { Float, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CylinderCollider, RigidBody, quat, vec3, euler } from "@react-three/rapier";
import { useXR, useXRInputSourceState } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import { Handle } from "@react-three/handle";
import { useCheckerStore } from "./Store";

import * as THREE from 'three';

export default function Checker({ properties }) {
    const texture = useTexture({
        map: 'tile_color.jpg',
        normalMap: 'tile_norm.jpg',
        roughnessMap: 'tile_rough.jpg'
    })

    const { selectedChecker, selectChecker } = useCheckerStore();

    const groupRef = useRef(null);
    const sound = useRef(null);

    const propertiesColor = properties.type === 'white' ? 'white' : 'brown';
    const [color, setColor] = useState(propertiesColor);
    const [selected, setSelection] = useState(false);

    useEffect(() => {
        if (isCheckerSelected())
            selectCheckerUI();
        else
            deselectCheckerUI();
    }, [selectedChecker]);

    useEffect(() => {
        sound.current = new Audio('./sound_take_checker.wav');
        sound.current.preload = 'auto';
        sound.current.volume = '0.3';

        return () => {
            sound.current.pause();
            sound.current = null;
        }
    }, []);

    useFrame(() => {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, selected ? .4 : 0, 0.1)
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, properties.x, 0.1)
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, properties.z, 0.1)
    })

    const onPointerEnter = () => {
        if (!selected)
            setColor('orange');
    }

    const onPointerLeave = () => {
        if (!selected)
            setColor(propertiesColor);
    }

    const isCheckerSelected = () => {
        return useCheckerStore.getState().selectedChecker.row === properties.row && useCheckerStore.getState().selectedChecker.col === properties.col;
    }

    
    const onClick = () => {
        if (isCheckerSelected()) {
            selectChecker({
                row: -1,
                col: -1,
                type: 'white'
            })
        } else {
            selectChecker({
                row: properties.row,
                col: properties.col,
                type: properties.type
            })
        }
    }

    const selectCheckerUI = () => {
        setSelection(true);

        if (sound.current)
            sound.current.play();

        setColor('cyan');
    }

    const deselectCheckerUI = () => {
        setSelection(false);

        setColor(propertiesColor);
    }
    return <>
        {/* <Handle ref={handleRef}> */}
            {/* <RigidBody ref={rigidBodyRef} colliders={'hull'} gravityScale={4}> */}
            <group 
                ref={groupRef}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onClick={onClick}
            >
                <mesh 
                    position-y={1} >
                    <cylinderGeometry args={[properties.size / 2, properties.size / 2, .3]} />
                    <meshStandardMaterial {...texture} color={color} />
                </mesh>
                <mesh 
                    position-y={1.1}>
                    <cylinderGeometry args={[properties.size / 2.2, properties.size / 2.2, .3]} />
                    <meshStandardMaterial {...texture} color={color} />
                </mesh>
            </group>
            {/* </RigidBody> */}
        {/* </ Handle > */}
    </>
}
