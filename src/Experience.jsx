import { useRef, useState } from "react"
import { useXR, XROrigin, useXRInputSourceState} from "@react-three/xr";
import { OrbitControls, useHelper, useGLTF, Environment } from "@react-three/drei"
import Chair from "./Chair";
import Cube from "./Cube";
import { Vector3 } from "three";
import Bedroom from "./Bedroom";
import { useFrame } from "@react-three/fiber";


export default function Experience(){
    const directionalLight = useRef();
    const player = useRef();
    const [XRPosition, setXRPosition] = useState([1, .3, 1]);
    const camera = useRef();

    const controller = useXRInputSourceState('controller', 'right');

    useFrame(delta => {
        if (controller == null)
            return;
        
        const thumstickState = controller.gamepad['xr-standard-thumbstick']

        if (thumstickState == null)
            return;

        const xAxis = thumstickState.xAxis;
        const yAxis = thumstickState.yAxis;
        const state = thumstickState.state;

        if (state !== 'touched')
            return;

        if (yAxis === 1) {
            // forward

            player.current.position.z += 0.02
        } else if (yAxis === -1) {
            // backward
            player.current.position.z -= 0.02
        } else if (xAxis === 1) {
            // left
            player.current.position.x += 0.02
        } else if (xAxis === -1) {
            // right
            player.current.position.x -= 0.02
        }

        setXRPosition(new Vector3(player.current.position.x, player.current.position.y, player.current.position.z));
    })

    return <>
        <OrbitControls ref={camera} makeDefault />

        <XROrigin position={XRPosition} />

        <directionalLight ref={directionalLight} position={[0, 3, 0]} intensity={ 2 } />
        <ambientLight intensity={1} />

        <mesh scale={.5} ref={player} position={[1, .3, 1]}>
            <boxGeometry />
            <meshStandardMaterial color="orange"/>
        </mesh>

        <Bedroom />

        {/* <Cube onClick={cubeClick} color="red" position={[0, 1, 1]} />
        <Cube onClick={cubeClick} color="blue" position={[3, 0, 3]} />
        <Cube onClick={cubeClick} color="purple" position={[-3, 0, 1]} />
        <Cube onClick={cubeClick} color="orange" position={[0, 1, 6]} />
        <Cube onClick={cubeClick} color="white" position={[1, 0, -3]} /> */}

        {/* <Environment files="./space.hdr" background/> */}
    </>
}