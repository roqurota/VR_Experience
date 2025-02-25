import { useRef, useState } from "react"
import { useXR, XROrigin } from "@react-three/xr";
import { OrbitControls, useHelper, useGLTF, Environment } from "@react-three/drei"
import Chair from "./Chair";
import Cube from "./Cube";
import { Vector3 } from "three";


export default function Experience(){
    const directionalLight = useRef();
    const [XRPosition, setXRPosition] = useState([0,0,6])
    const camera = useRef();

    function cubeClick(event) {
        const cubePosition = event.object.position;

        setXRPosition(cubePosition);
    }

    return <>
        <OrbitControls ref={camera} makeDefault />

        <XROrigin position={XRPosition} />

        <directionalLight ref={directionalLight} position={[0, 3, 0]} intensity={ 2 } />
        <ambientLight intensity={1} />

        <Cube onClick={cubeClick} color="red" position={[0, 1, 1]} />
        <Cube onClick={cubeClick} color="blue" position={[3, 0, 3]} />
        <Cube onClick={cubeClick} color="purple" position={[-3, 0, 1]} />

        <Environment files="./space.hdr" background/>
    </>
}