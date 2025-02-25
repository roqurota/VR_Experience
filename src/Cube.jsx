import { Float } from "@react-three/drei";
import { useTexture } from "@react-three/drei";

export default function Cube({ color, position, onClick }) {

    const props = useTexture({
        map: './Textures/Planet/basecolor.jpg',
        aoMap: './Textures/Planet/occlusion.jpg',
        height: './Textures/Planet/height.png',
        normalMap: './Textures/Planet/normal.jpg',
        roughnessMap: './Textures/Planet/roughness.jpg'
    });

    return <>
        <Float speed={2}>
            <mesh onClick={onClick} position={position}>
                <sphereGeometry />
                <meshStandardMaterial {...props} color={color}/>
            </mesh>
        </Float>
    </>
}
