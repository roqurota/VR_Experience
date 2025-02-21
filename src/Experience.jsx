import { useFrame } from "@react-three/fiber"
import { useRef } from "react"


export default function Experience(){
    const torus = useRef();
    const sphere = useRef();
    const cube = useRef();

    useFrame((state, delta) => {
        torus.current.rotation.y += delta;
    })

    return <>
        {/* plane */}
        <mesh position-y={-1} scale={10} rotation-x={Math.PI * 0.5}>
            <planeGeometry scale={10}/>
            <meshBasicMaterial color={'green'}/>
        </mesh>
        {/* torus */}
        <mesh ref={torus} position-x={-3}>
            <torusKnotGeometry  />
            <meshNormalMaterial />
        </mesh>
        {/* sphere */}
        <mesh >
            <sphereGeometry />
            <meshBasicMaterial color={'orange'}/>
        </mesh>
        {/* box */}
        <mesh position-x={3} >
            <boxGeometry />
            <meshBasicMaterial color={'blue'}/>
        </mesh>
    </>
}