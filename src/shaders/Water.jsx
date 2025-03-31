import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import vertexShader from './water/water.vert';
import fragShader from './water/water.frag';
import { useRef } from "react";
import { useEffect } from "react";

export default function Water() {

    const waterMesh = useRef();
    const { scene } = useThree();

    useEffect(() => {
        waterMesh.current.material.transparent = true;
        waterMesh.current.material.depthTest = true;
        waterMesh.current.material.side = THREE.DoubleSide;
    }, [])

    const WaterMaterial = shaderMaterial(
        {
            uTime: { value: 0 },
            uOpacity: 0.8,
            uEnvironmentMap: scene.environment,
            uWavesAmplitude: 0.025,
            uWavesFrequency: 1.07,
            uWavesPersistence:  0.3,
            uWavesLacunarity: 2.18,
            uWavesIterations: 8,
            uWavesSpeed: 0.4,
            uTroughColor: new THREE.Color('#186691'),
            uSurfaceColor: new THREE.Color('#9bd8c0'),
            uPeakColor: new THREE.Color('#bbd8e0'),
            uPeakThreshold: 0.08,
            uPeakTransition: 0.05,
            uTroughThreshold: -0.01,
            uTroughTransition: 0.15,
            uFresnelScale: 0.8,
            uFresnelPower: 0.5
        },
        vertexShader,
        fragShader,
    )

    extend({ WaterMaterial })

    useFrame((data) => {
        const elapsedTime = data.clock.getElapsedTime();

        waterMesh.current.material.uniforms.uTime.value = elapsedTime;
    })

    return <>
        <mesh ref={waterMesh} position-y={2} rotation-x={ -Math.PI * .5 }>
            <planeGeometry args={[10, 10, 512, 512]} />
            <waterMaterial transparent={true} depthTest={true} side={ THREE.DoubleSide } />
        </mesh>

        <mesh position-y={1} rotation-x={ -Math.PI * .5 }>
            <planeGeometry args={[10, 10, 512, 512]} />
            <meshBasicMaterial side={ THREE.DoubleSide } color="orange"/>
        </mesh>
    </>
    
}

