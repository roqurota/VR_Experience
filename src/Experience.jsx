import { useRef, useState } from "react"
import { useXR, XROrigin, useXRInputSourceState} from "@react-three/xr";
import { OrbitControls, useHelper, useGLTF, Environment, Stars, Sky, Clouds, Cloud } from "@react-three/drei"
import Bedroom from "./Bedroom";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'


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

    function Locomotion() {
        const controller = useXRInputSourceState('controller', 'right')
        const ref = useRef(null)
        useFrame((_, delta) => {
          if (ref.current == null || controller == null) {
            return
          }
          const thumstickState = controller.gamepad['xr-standard-thumbstick']
          if (thumstickState == null) {
            return
          }
          ref.current.position.x += (thumstickState.xAxis ?? 0) * delta
          ref.current.position.z += (thumstickState.yAxis ?? 0) * delta
        })
        return <XROrigin ref={ref} />
      }

    return <>
        <OrbitControls ref={camera} makeDefault />

        <directionalLight ref={directionalLight} position={[0, 3, 0]} intensity={ 2 } />
        <ambientLight intensity={1} />

        <Locomotion />

        <group scale={.5} ref={player} position={[0, -.5, 1]}>
            
        </group>

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

        <Clouds position={[-.5, 4, 1.5]} material={THREE.MeshBasicMaterial}>
            <Cloud seed={1} segments={40} bounds={[3, 1, 3]} volume={1} speed={.5} color="lightblue"/>
        </Clouds>

        {
            rooms.map(room => {
                return <Bedroom {...room} />
            })
        }

        
        {/* <Bedroom position={[5, 0, 0]} />
        <Bedroom position={[5, 0, 5]} /> */}

        {/* <Cube onClick={cubeClick} color="red" position={[0, 1, 1]} />
        <Cube onClick={cubeClick} color="blue" position={[3, 0, 3]} />
        <Cube onClick={cubeClick} color="purple" position={[-3, 0, 1]} />
        <Cube onClick={cubeClick} color="orange" position={[0, 1, 6]} />
        <Cube onClick={cubeClick} color="white" position={[1, 0, -3]} /> */}

        {/* <Environment files="./space.hdr" background/> */}
    </>
}