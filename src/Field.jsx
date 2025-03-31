import { useTexture } from "@react-three/drei"

export default function Field({ properties }) {
    const texture = useTexture({
        map: './textures/wood/wood_color.jpg',
        aoMap: './textures/wood/wood_ao.jpg',
        metalnessMap: './textures/wood/wood_metalness.jpg',
        normalMap: './textures/wood/wood_normal.jpg',
        roughnessMap: './textures/wood/wood_roughness.jpg',
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
