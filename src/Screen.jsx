import { Html, RoundedBox, Float } from "@react-three/drei";
import { Container, Root, Text } from "@react-three/uikit";
import { Button } from "@react-three/uikit-default";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import XMLParser from 'react-xml-parser'
import { extend } from "@react-three/fiber";

export default function Screen() {

    const [xml, setXml] = useState(null);
    const key = useRef(0)

    useEffect(() => {
        fetch('./Screen.xml')
            .then((response) => response.text())
            .then((xmlText) => {
                setXml(xmlText);
            })
            .catch((error) => console.error('Error while loading XML file:', error));
    }, []);

    const parseXML = (xml) => {
        let parsedXML = new XMLParser().parseFromString(xml);

        console.log(xml)
        console.log(parsedXML)

        let item = parseElement(parsedXML, 0);

        return item;
    }

    const parseElement = (element) => {
        key.current++;

        // ref.current.setStyle({ opacity: Math.sin(clock.getElapsedTime()) / 2 + 0.5 })

        const isColumns = element.attributes.class && element.attributes.class === 'columns';
        const isColumn = element.attributes.class && element.attributes.class === 'left-column';

        return element.name === 'Text' ? 
            <Text fontWeight={'bold'} color={'white'} padding={1}>
                { element.value }
            </Text> :
            <Container 
                flexDirection={isColumn ? 'column' : 'row' } 
                flexGrow={isColumn ? 1 : 0}
                padding={1}
                justifyContent={isColumns ? 'space-between' : 'center'}
                key={key.current}>
                {
                    element.children.length ? element.children.map((el) => {
                        return parseElement(el, key.current);
                    }) : null
                }
            </Container>
    }

    return <group position={[0, 3, 4]} rotation-y={-Math.PI}>
        <Float speed={2}>
            <group position-z={.06}>
                <Root backgroundColor={'black'} sizeX={2.4} sizeY={.9} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    {
                        xml ? parseXML(xml) : null
                    }
                </Root>
            </group>
            <RoundedBox args={[2.5, 1, .1]}>
                <meshPhongMaterial color="lightgray" />
            </RoundedBox>
        </Float>
    </group>
}
