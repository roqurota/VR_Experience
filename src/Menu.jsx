import { Container, Root, Text } from "@react-three/uikit"
import { Float, RoundedBox } from "@react-three/drei"
import { Button } from "@react-three/uikit-default"
import { ChevronRight, ChevronsLeft } from "@react-three/uikit-lucide"


export default function Menu() {
    return <group position={[-.6, 1, -.3]} rotation={[0, 0, 0]}>
        {/* <RoundedBox
            args={[1, 1, .1]} // Width, height, depth. Default is [1, 1, 1]
            radius={0.05} // Radius of the rounded corners. Default is 0.05
            smoothness={4} // The number of curve segments. Default is 4
            bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
            creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
            >
            <meshPhongMaterial color="#f3f3f3" wireframe />
        </RoundedBox> */}
        <Root sizeX={1} sizeY={.5} attachCamera={true}>
            <Button variant="outline" size="icon">
                <ChevronsLeft width={16} height={16}/>
            </Button>
            <Container backgroundColor="red" >
                <Text fontWeight="bold">Hello World!</Text>
            </Container>
            <Button variant="outline" size="icon">
                <ChevronRight width={16} height={16}/>
            </Button>
        </Root>
    </group>
}
