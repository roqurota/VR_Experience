import { useRef } from "react"
import { OrbitControls, useHelper, useGLTF, Environment } from "@react-three/drei"
import Chair from "./Chair";


export default function Experience(){

    const directionalLight = useRef();

    const table = useGLTF('./table.gltf')

    return <>
        <OrbitControls makeDefault />

        <directionalLight ref={directionalLight} position={[2, 2, 3]} intensity={ 2 } />
        <ambientLight intensity={0.5} />

        <Environment files="./golf.hdr" background/>

        <mesh position-y={0} scale={10} rotation-x={ -Math.PI * 0.5 }>
            <planeGeometry />
            <meshBasicMaterial color="greenyellow"/>
        </mesh>

        <group position-x={2.5} rotation-y={-Math.PI * 0.5}>
            <Chair/>
        </group>

        <group position-x={-2.5} rotation-y={Math.PI * 0.5}>
            <Chair/>
        </group>

        <primitive object={table.scene} />
    </>
}