import { RigidBody, CapsuleCollider, CuboidCollider } from "@react-three/rapier";
import { useAnimations, useFBX, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { XROrigin, useXR, useXRControllerLocomotion } from "@react-three/xr";
import * as THREE from 'three'

export default function Player() {
    const { controllers } = useXR();
    const [stickDirection, setStickDirection] = useState(null);

    const body = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const [animationName, setAnimationName] = useState('Idle');

    const model = useFBX('./character/Walking.fbx');
    const idle = useFBX('./character/Idle.fbx');

    const leftward = useFBX('./character/Left.fbx');
    const rightward = useFBX('./character/Right.fbx');
    const backward = useFBX('./character/Back.fbx');

    model.animations[0].name = 'Forward';
    leftward.animations[0].name = 'Leftward';
    rightward.animations[0].name = 'Rightward';
    backward.animations[0].name = 'Backward';
    idle.animations[0].name = 'Idle';

    if (!model.animations.some((el) => { return el.name === 'Leftward'}))
        model.animations.push(leftward.animations[0])

    if (!model.animations.some((el) => { return el.name === 'Rightward'}))
        model.animations.push(rightward.animations[0])

    if (!model.animations.some((el) => { return el.name === 'Backward'}))
        model.animations.push(backward.animations[0])

    if (!model.animations.some((el) => { return el.name === 'Idle'}))
        model.animations.push(idle.animations[0])

    const animations = useAnimations(model.animations, model);

    useEffect(() => {
        subscribeKeys(
            (state) => state.forward,
            (pressed) => {
                if (pressed)
                    setAnimation('Forward')
                else
                    setAnimation('Idle')
            }
        )

        subscribeKeys(
            (state) => state.backward,
            (pressed) => {
                if (pressed)
                    setAnimation('Backward')
                else
                    setAnimation('Idle')
            }
        )

        subscribeKeys(
            (state) => state.leftward,
            (pressed) => {
                if (pressed)
                    setAnimation('Leftward')
                else
                    setAnimation('Idle')
            }
        )

        subscribeKeys(
            (state) => state.rightward,
            (pressed) => {
                if (pressed)
                    setAnimation('Rightward')
                else
                    setAnimation('Idle')
            }
        )
    }, [])

    useEffect(() => {
        const action = animations.actions[animationName];
        action.reset().fadeIn(0.2).play();

        return () => {
            action.fadeOut(0.2)
        }
    }, [animationName])

    function setAnimation(name) {
        setAnimationName(name)
    }

    const handleStickMovement = (controller) => {
        if (controller) {
          const { thumbstick } = controller.inputSource;
          if (thumbstick) {
            const { x, y } = thumbstick;

            if (x > 0.5) {
              setStickDirection('Right');
            } else if (x < -0.5) {
              setStickDirection('Left');
            } else if (y > 0.5) {
              setStickDirection('Up');
            } else if (y < -0.5) {
              setStickDirection('Down');
            } else {
              setStickDirection('Center');
            }
          }
        }
      };

    const userMove = (inputVector, rotationInfo) => {
        if (body.current) {
            const currentLinvel = body.current.linvel()
            const newLinvel = { x: inputVector.x, y: currentLinvel.y, z: inputVector.z }
            body.current.setLinvel(newLinvel, true)
            body.current.setRotation(new THREE.Quaternion().setFromEuler(rotationInfo), true)
        }
    }

    useXRControllerLocomotion(userMove)

    useFrame((state, delta) => {
        // const { forward, backward, leftward, rightward } = getKeys();

        // const impulse = { x: 0, y: 0, z: 0 };
        // const impulseStrength = 20 * delta;

        // // console.log(animationName)

        // if (forward) {
        //     // console.log('here')
        //     // impulse.z -= impulseStrength;
        // }

        // if (backward) {
        //     // impulse.z += impulseStrength;
        // }

        // if (leftward) {
        //     // impulse.x -= impulseStrength;
        // }

        // if (rightward) {
        //     // impulse.x += impulseStrength;
        // }

        // if (body.current)
        //     body.current.applyImpulse(impulse)

        // if (controllers) {
        //     const controller = controllers[0];
    
        //     console.log(controller)
        // }
    })

    return <RigidBody position={[3, 2, 3]} ref={body} colliders={false} >
        <primitive
            object={model}
            scale={.01}
            position={[0, -.8, 0]}
            rotation={[0, Math.PI, 0]}
            colliders={false}
            type='dynamic'
            enabledRotations={[false, false, false]}
            canSleep={false}
        />
        <CuboidCollider args={[.2, .8, .3]} />
        <XROrigin position={[0, .3, .5]} />

        {/* <mesh castShadow position={[3, .6, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
            <XROrigin />
        </mesh> */}
    </RigidBody>
}
