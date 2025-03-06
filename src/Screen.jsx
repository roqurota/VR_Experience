import { Html } from "@react-three/drei";
import { Container, Root, Text } from "@react-three/uikit";
import { Button } from "@react-three/uikit-default";
import { useRef } from "react";
import * as THREE from 'three'

export default function Screen() {
    const button = useRef();
    const iframe = useRef();

    function visitUs() {
        if (!iframe.current.hasAttribute('src'))
            iframe.current.setAttribute('src', 'https://sandbox1.highqa.stpdev/')
    }

    return <group position={[0, 3, -5]}>
        <mesh scale={[5, 3, -.5]}>
            <planeGeometry />
            <meshStandardMaterial  color="gray"/>
        </mesh>
        <mesh position={[0, 0, 1]}>
            <Root sizeX={5} sizeY={3} flexDirection="row">
                <Container flexGrow={1} >
                    <Html 
                        transform
                        wrapperClass="htmlScreen"
                        distanceFactor={1.7}
                        position-z={.1}
                        occlude="blending"
                        >
                        <iframe ref={iframe} />
                    </Html>
                </Container>
            </Root>
        </mesh>
        <group position={[0, -3.5, 1]} scale={2}>
            <Root sizeX={1} sizeY={2} attachCamera={true}>
                <Button onClick={visitUs}>
                    <Text>Visit Us</Text>
                </Button>
            </Root>
        </group>
    </group>
}
