import { useTexture } from "@react-three/drei"

export default function Field({ properties }) {
    const texture = useTexture({
        map: '/wood_color.jpg',
        aoMap: '/wood_ao.jpg',
        metalnessMap: '/wood_metalness.jpg',
        normalMap: '/wood_normal.jpg',
        roughnessMap: '/wood_roughness.jpg',
    })

    return <>
        <mesh 
            position={[properties.x, 1, properties.z]} 
            rotation-x={ -Math.PI * 0.5 }
            scale={properties.size}>
            <planeGeometry />
            <meshStandardMaterial roughness={.5} metalness={2} {...texture} color={properties.type === 'black' ? 'orange' : 'brown'}  /> 
        </mesh>
    </>
}
