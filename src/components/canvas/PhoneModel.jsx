import { Html, useGLTF, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import HomeOS from '../ui/HomeOS'

const PhoneModel = (props) => {
    // We'll use a RoundedBox to simulate the phone body if we don't have a GLTF yet.
    // But strictly speaking, a simple box is ugly. 
    // Let's make a sleek procedural phone.

    return (
        <group {...props} dispose={null}>
            {/* Phone Body */}
            <RoundedBox args={[1.5, 3, 0.2]} radius={0.15} smoothness={4}>
                <meshStandardMaterial color="#1c1c1c" roughness={0.1} metalness={0.8} />
            </RoundedBox>

            {/* Titanium Frame Border (Slightly larger) */}
            <RoundedBox args={[1.52, 3.02, 0.19]} radius={0.16} smoothness={4}>
                <meshStandardMaterial color="#3a3a3a" roughness={0.2} metalness={1} />
            </RoundedBox>

            {/* Screen Area with rounded corners */}
            <RoundedBox args={[1.4, 2.85, 0.01]} radius={0.12} smoothness={4} position={[0, 0, 0.11]}>
                <meshBasicMaterial color="black" />

                {/* The Interactive HTML Screen */}
                <Html
                    transform
                    position={[0, 0, 0.05]}
                    style={{
                        width: '1400px',
                        height: '2850px',
                        backgroundColor: 'black',
                        overflow: 'hidden'
                    }}
                    scale={0.035} // Optimal balance: readable without overlapping phone edges
                >
                    <HomeOS />
                </Html>
            </RoundedBox>
        </group>
    )
}

export default PhoneModel
