import { RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { XROrigin } from "@react-three/xr";

export default function Player() {
    const body = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 };
        const impulseStrength = 20 * delta;

        if (forward) {
            impulse.z -= impulseStrength;
        }

        if (backward) {
            impulse.z += impulseStrength;
        }

        if (leftward) {
            impulse.x -= impulseStrength;
        }

        if (rightward) {
            impulse.x += impulseStrength;
        }

        if (body.current)
            body.current.applyImpulse(impulse)
    })

    return <RigidBody friction={1} ref={body} >
        <mesh castShadow position={[3, .6, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
            <XROrigin />
        </mesh>
    </RigidBody>
}
