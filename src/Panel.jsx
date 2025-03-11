import * as THREE from 'three'
import { Box } from '@react-three/drei';
import { Text } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { Keyboard } from 'three-mesh-ui';
import FontJSON from '../public/fonts/Roboto-msdf.json'

export default function Panel() {

    const keys = [
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ];

    // const createKey = (x, y, z, keyLabel) => {
    //     return (
    //         // <Box position={[x, y, z]} args={[1, 0.5, 0.2]} castShadow receiveShadow>
    //         //     <meshStandardMaterial color="lightblue" />
    //         //     <textGeometry args={[keyLabel, { font: 'helvetiker', size: 0.3, height: 0.1 }]} />
    //         // </Box>
    //         <Text position={[x, y, z]}>
    //             {keyLabel}
    //         </Text>
    //     );f
    // };

    // const renderKeys = () => {
    //     const keyComponents = [];
    //     let zPos = 0;

    //     for (let rowIndex = 0; rowIndex < keys.length; rowIndex++) {
    //         const row = keys[rowIndex];
    //         let xPos = 0;
    //         for (let keyIndex = 0; keyIndex < row.length; keyIndex++) {
    //             const keyLabel = row[keyIndex];
    //             keyComponents.push(createKey(xPos, rowIndex * 2, zPos, keyLabel));
    //             xPos += 0.8;  // Расстояние между клавишами по оси X
    //         }
    //         // zPos += 1;  // Расстояние между рядами по оси Z
    //     }
    //     return keyComponents;
    // };


    function keyboard(){
        const colors = {
            keyboardBack: 0x858585,
            panelBack: 0x262626,
            button: 0x363636,
            hovered: 0x1c1c1c,
            selected: 0x109c5d
        };

        const keys = new Keyboard({
            language: 'EU',
            fontFamily: FontJSON,
            fontSize: 0.035, // fontSize will propagate to the keys blocks
            backgroundColor: new THREE.Color( colors.keyboardBack ),
            backgroundOpacity: 1,
        })

        console.log(keys)

        return <>
            {keys}
        </>
    }


    return <group>
        {keyboard()}
    </group>
}
