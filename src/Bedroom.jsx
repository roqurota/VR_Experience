import { Clone, useGLTF, Text3D, Center, Float, Html } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three'
import Menu from './Menu';
import NPC from './NPC';

export default function Bedroom({coordinates, rotation, npc, name}) {
    const bookcase = useGLTF('./bookcase.gltf');
    const bookcaseSmall = useGLTF('./bookcase_small.gltf');
    const chair = useGLTF('./chair.gltf');
    const crate = useGLTF('./crate.gltf');
    const toy = useGLTF('./dog_toy.gltf');
    const door = useGLTF('./door.gltf');

    const frame = useRef(null);
    const tooltip = useRef(null);
    const [tooltipVisible, setTooltipVisibility] = useState(false);

    function onPointerEnter(event) {
        const item = event.eventObject;

        if (!item)
            return;

        // frame.current.position.copy(item.position);
        // frame.current.scale.copy(item.scale);
        // frame.current.rotation.clone(item.rotation);
    }

    function onPointerLeave(event) {
        // frame.current.position.copy(new THREE.Vector3(0, -1, 0));
        // frame.current.scale.copy(new THREE.Vector3(1, 1, 1));
    }

    function onClick(event) {
        const item = event.eventObject;

        if (!item)
            return;

        // Tooltip box
        if (item.name) {
            if (item.name === 'message-box') {
                setTooltipVisibility(!tooltipVisible)
            }
        }
    }

    return <group position={coordinates.room} rotation={[rotation.x, rotation.y, rotation.z]}>
        <mesh scale={3} rotation-x={-Math.PI * 0.5}>
            <planeGeometry />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightblue" />
        </mesh>

        <group position={[0, 2, -1]}>
            <Float>
                <Center>
                    <Text3D scale={.3} font={'./fonts/font.json'}>
                        {name}
                        <meshNormalMaterial />
                    </Text3D>
                </Center>
            </Float>
        </group>

        <Menu />

        {/* <mesh ref={frame} position={[0, -1, 0]}>
            <boxGeometry />
            <meshStandardMaterial color={'red'} wireframe={true}/>

            <Edges
                linewidth={4}
                scale={1.1}
                threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
                color="white"
            />
        </mesh> */}

        <NPC {...npc} />

        <Clone scale={.8} position={[.6, 0, -1.2]} object={bookcase.scene} />
        <Clone scale={.8} position={[-.7, 0, -1.2]} object={bookcaseSmall.scene} />

        {/* Chair */}
        <Clone scale={.8} position={[.7, 0, -.1]} rotation-y={Math.PI * .5 - 90} object={chair.scene}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick} 
        />

        {/* Crate */}
        <Clone scale={.6} position={[-1, .3, .5]} object={crate.scene} 
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick}
        />

        {/* Toy */}
        <Clone scale={.3} position={[-1, .6, .5]} rotation-y={Math.PI / 2} object={toy.scene} 
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick}
        />

        {/* Door */}
        <Clone scale={.5} position={[0, .5, 1.5]}  object={door.scene} 
            onClick={onClick}
        />
    </group>
}
