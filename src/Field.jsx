import { Text, useTexture } from "@react-three/drei"
import { useCheckerStore } from "./Store";
import { useState, useEffect } from "react";

export default function Field({ properties, model }) {
    const texture = useTexture({
        map: '/wood_color.jpg',
        aoMap: '/wood_ao.jpg',
        metalnessMap: '/wood_metalness.jpg',
        normalMap: '/wood_normal.jpg',
        roughnessMap: '/wood_roughness.jpg',
    })

    // console.log(properties)

    const { selectedChecker, selectChecker } = useCheckerStore();

    let propertiesColor = properties.type === 'black' ? 'brown' : 'orange';
    const [color, setColor] = useState(propertiesColor);
    const [active, setActive] = useState(false);

    const isFieldActive = () => {
        if (properties.type === 'white')
            return false;

        if (properties.checker)
            return false;
        
        // White
        if (selectedChecker.type === 'white') {
            if (properties.row === selectedChecker.row - 1 &&
                properties.col === selectedChecker.col - 1) {
                    return true;
            } else if (properties.row === selectedChecker.row - 1 &&
                       properties.col === selectedChecker.col + 1) {
                return true;
            }
        // Black
        } else  {
            if (properties.row === selectedChecker.row + 1 &&
                properties.col === selectedChecker.col - 1) {
                    return true;
            } else if (properties.row === selectedChecker.row + 1 &&
                       properties.col === selectedChecker.col + 1) {
                return true;
            }
        }

        return false;

        // Object.keys(model.matrix).map((row, rowIndex) => {
        //     Object.keys(model.matrix[row]).map((col, colIndex) => {
        //         const field = model.matrix[row][col];

        //         if (field.row !== selectedChecker.row && 
        //             field.col !== selectedChecker.col &&
        //             field.type !== 'white') {

        //             console.log((selectedChecker.row + selectedChecker.col) % (field.row + field.col))
                    
        //             if ((selectedChecker.row + selectedChecker.col) % (field.row + field.col) === 0)
        //                 return true

        //         }
        //     })
        // })

        return false;
    }

    useEffect(() => {
        if (isFieldActive())
            activateField();
        else
            deactivateField()

    }, [selectedChecker])

    const activateField = () => {
        setColor('white');
        setActive(true);
    }

    const deactivateField = () => {
        setColor(propertiesColor);
        setActive(false);
    }

    const fieldClick = () => {
        const checkerField = model.matrix[selectedChecker.row][selectedChecker.col];
        const checker = checkerField.checker;

        checker.x = properties.x;
        checker.z = properties.z;
        checker.row = properties.row;
        checker.col = properties.col;

        properties.checker = checker;
        delete checkerField.checker;

        deactivateField();

        selectChecker({
            row: -1,
            col: -1,
            type: 'white'
        })

        console.log(checker)
    }

    return <>
        {/* {   
            properties.type === 'black' ? <Text fontSize={.3} rotation-x={-Math.PI / 2} rotation-z={Math.PI / 2} color={'red'} position={[properties.x, 1.4, properties.z]} characters="abcdefghijklmnopqrstuvwxyz0123456789!">
                {properties.row + '/' + properties.col}
            </Text> : null
        } */}
        {
            active ? 
                <mesh position={[properties.x, 1.5, properties.z]} onClick={fieldClick}>
                    <boxGeometry />
                    <meshStandardMaterial wireframe={true} color={'green'} />
                </mesh> : <></>
        }
        <mesh 
            position={[properties.x, 1, properties.z]}
            rotation-x={ -Math.PI * 0.5 }
            scale={properties.size}>
            <planeGeometry />
            <meshStandardMaterial roughness={.5} metalness={2} {...texture} color={color}  /> 
        </mesh>
    </>
}