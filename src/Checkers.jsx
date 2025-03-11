import { Physics, RigidBody } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three';
import { XROrigin, useXR } from "@react-three/xr";
import Checker from "./Checker";


export default function Checkers() {
    const camera = useRef();
    const directionalLight = useRef();

    const model = {
        checkers: [
            {
                position: new THREE.Vector3(4, .5, 4),
                color: 'black'
            },
            {
                position: new THREE.Vector3(4, .5, 1.7),
                color: 'black'
            },
            {
                position: new THREE.Vector3(4, .5, -.6),
                color: 'black'
            },
            {
                position: new THREE.Vector3(4, .5, -3),
                color: 'black'
            },
            {
                position: new THREE.Vector3(2.5, .5, 2.8),
                color: 'black'
            },
            {
                position: new THREE.Vector3(2.5, .5, .4),
                color: 'black'
            },
            {
                position: new THREE.Vector3(2.5, .5, -1.9),
                color: 'black'
            },
            {
                position: new THREE.Vector3(2.5, .5, -4),
                color: 'black'
            },
            {
                position: new THREE.Vector3(1, .5, 4),
                color: 'black'
            },
            {
                position: new THREE.Vector3(1, .5, 1.7),
                color: 'black'
            },
            {
                position: new THREE.Vector3(1, .5, -.6),
                color: 'black'
            },
            {
                position: new THREE.Vector3(1, .5, -3),
                color: 'black'
            },
        ]
    }

    return <>
        {/* <OrbitControls ref={camera} makeDefault /> */}

        <directionalLight castShadow ref={directionalLight} position={[2, 3, 3]} intensity={ 2 } />
        <ambientLight intensity={1.5} />

        <XROrigin position={[6, 2, 4]}/>

        

        <Physics debug>
            <RigidBody type="fixed">
                <mesh receiveShadow>
                    <boxGeometry args={[10, .5, 10]} />
                    <meshStandardMaterial color="lightblue" />
                </mesh>
            </RigidBody>

            {
                model.checkers.map((el, index) => {
                    return <Checker properties={el} key={index} />
                })
            }
        </Physics>
    </>
}
