import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function NPC({url, animation, isMoving, position}) {
    const model = useGLTF(url);
    const animations = useAnimations(model.animations, model.scene);
    const mesh = useRef();
    const radius = .6;
    let angle = 0;

    useEffect(() => {
        const action = animations.actions[animation];
        action.play();
    }, []);

    useFrame(delta => {
        if (!isMoving)
            return

        angle += 0.03;
        mesh.current.position.x = Math.sin(angle) * radius;
        mesh.current.position.z = Math.cos(angle) * radius;

        mesh.current.rotation.y = Math.cos(angle);
        
    })
    
    return <group position={position}>
        <primitive
            object={model.scene}
            ref={mesh}
        />
    </group>
}