import { useRef, useState } from "react"
import { useXR, XROrigin, useXRInputSourceState} from "@react-three/xr";
import { OrbitControls, useHelper, useGLTF, Environment, Stars, Sky, Clouds, Cloud, Circle, Plane } from "@react-three/drei"
import Bedroom from "./Bedroom";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import UserMovement from "./UserMovement";
import { Fullscreen, Container } from "@react-three/uikit";
import { Physics, RigidBody } from "@react-three/rapier";
import Player from "./Player";
import Screen from "./Screen";


export default function Experience(){
    const directionalLight = useRef();
    const player = useRef();
    const [XRPosition, setXRPosition] = useState([0, -.5, 1]);
    const camera = useRef();

    const controller = useXRInputSourceState('controller', 'right');

    const rooms = [
        {
            name: 'Bedroom',
            coordinates: {
                room: new THREE.Vector3(0, 0, 0),
                user: new THREE.Vector3(0, -.5, 1)
            },
            rotation: new THREE.Vector3(0, 0, 0),
            npc: {
                url: './animation/korrigan.gltf',
                animation: 'course_chapeau',
                isMoving: true,
                position: new THREE.Vector3(.7, 0, -.1)
            }
        },
        {
            name: 'Guestroom',
            coordinates: {
                room: new THREE.Vector3(3, 0, 5),
                user: new THREE.Vector3(0, -.5, 1)
            },
            rotation: new THREE.Vector3(0, 2 * Math.PI - 2, 0),
            npc: {
                url: './animation/korrigan_young.gltf',
                animation: 'course_jeune',
                isMoving: true,
                position: new THREE.Vector3(.7, 0, -.1)
            }
        },
        {
            name: 'Bathroom',
            coordinates: {
                room: new THREE.Vector3(-3, 0, 5),
                user: new THREE.Vector3(0, -.5, 1)
            },
            rotation: new THREE.Vector3(0, 2 * Math.PI + 2, 0),
            npc: {
                url: './animation/korrigan_chill.gltf',
                animation: 'pose_femme',
                isMoving: false,
                position: new THREE.Vector3(0, 0, )
            }
        }
    ]

    // useFrame(delta => {
    //     // if (controller == null)
    //     //     return;
        
    //     // const buttonA = controller.gamepad['a-button'];

    //     // if (buttonA === null)
    //     //     return;

    //     // console.log(buttonA.state)

    //     // if (buttonA.state === 'pressed') {
    //     //     // console.log(buttonA.state)
    //     // }
            


    //     // if (thumstickState == null)
    //     //     return;

    //     // const xAxis = thumstickState.xAxis;
    //     // const yAxis = thumstickState.yAxis;
    //     // const state = thumstickState.state;

    //     // if (state !== 'touched')
    //     //     return;

    //     // if (yAxis === 1) {
    //     //     // forward

    //     //     player.current.position.z += 0.02
    //     // } else if (yAxis === -1) {
    //     //     // backward
    //     //     player.current.position.z -= 0.02
    //     // } else if (xAxis === 1) {
    //     //     // left
    //     //     player.current.position.x += 0.02
    //     // } else if (xAxis === -1) {
    //     //     // right
    //     //     player.current.position.x -= 0.02
    //     // }

    //     // setXRPosition(new Vector3(player.current.position.x, player.current.position.y, player.current.position.z));
    // })

    return <>
        <OrbitControls ref={camera} makeDefault />

        <directionalLight castShadow ref={directionalLight} position={[2, 3, 3]} intensity={ 2 } />
        <ambientLight intensity={.5} />

        <Physics>

            <Player />

            <Screen />

            <RigidBody>
                <mesh castShadow position={[0, 3, 2]}>
                    <boxGeometry />
                    <meshStandardMaterial color='yellow' />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed">
                <mesh receiveShadow>
                    <boxGeometry args={[10, .5, 10]} />
                    <meshStandardMaterial color="lightblue" />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed">
                <group>
                    <mesh position={[0, .5, -5]}>
                        <boxGeometry args={[10.5, .5, .5]} />
                        <meshStandardMaterial color={'blue'} />
                    </mesh>
                    <mesh position={[0, .5, 5]}>
                        <boxGeometry args={[10.5, .5, .5]} />
                        <meshStandardMaterial color={'blue'} />
                    </mesh>
                    <mesh position={[5, .5, 0]}>
                        <boxGeometry args={[.5, .5, 10]} />
                        <meshStandardMaterial color={'blue'} />
                    </mesh>
                    <mesh position={[-5, .5, 0]}>
                        <boxGeometry args={[.5, .5, 10]} />
                        <meshStandardMaterial color={'blue'} />
                    </mesh>
                </group>
            </RigidBody>

        </Physics>

        {/* <Environment files="./space.hdr" background/> */}
    </>
}