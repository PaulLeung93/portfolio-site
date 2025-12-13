import { Html, useGLTF, RoundedBox, Cylinder, Text } from '@react-three/drei'
import * as THREE from 'three'
import HomeOS from '../ui/HomeOS'

const PhoneModel = ({ modelType = 'default', ...props }) => {
    // Shared Screen Logic
    const ScreenContent = ({ occlude, scale = 0.035 }) => (
        <Html
            transform
            occlude={occlude}
            position={[0, 0, 0.05]}
            style={{
                width: '1400px',
                height: '2850px',
                backgroundColor: 'black',
                overflow: 'hidden'
            }}
            scale={scale} // Optimal balance: readable without overlapping phone edges
        >
            <HomeOS />
        </Html>
    )





    // Generate Rounded Rect Shape for Extrusion (Shared)
    const shape = new THREE.Shape()
    const width = 1.5
    const height = 3.02
    const radius = 0.22
    const x = -width / 2
    const y = -height / 2

    shape.moveTo(x, y + radius)
    shape.lineTo(x, y + height - radius)
    shape.quadraticCurveTo(x, y + height, x + radius, y + height)
    shape.lineTo(x + width - radius, y + height)
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
    shape.lineTo(x + width, y + radius)
    shape.quadraticCurveTo(x + width, y, x + width - radius, y)
    shape.lineTo(x + radius, y)
    shape.quadraticCurveTo(x, y, x, y + radius)

    const extrudeSettings = {
        depth: 0.15,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize: 0.015, // Smooth edge rounding
        bevelThickness: 0.015
    }

    if (modelType === 'iphone') {
        // iPhone 15 Pro Style - Natural Titanium
        return (
            <group {...props} dispose={null}>
                {/* 1. SINGLE CHASSIS - Extruded Body for Flat Sides */}
                <mesh position={[0, 0, -0.075]}>
                    <extrudeGeometry args={[shape, extrudeSettings]} />
                    <meshStandardMaterial color="#787572" roughness={0.3} metalness={0.9} />
                </mesh>

                {/* 2. Back Glass - SURFACE SHAPE */}
                {/* Matches chassis contour exactly. Positioned at back face Z (-0.075 - bevel) */}
                <mesh position={[0, 0, -0.091]} rotation={[0, Math.PI, 0]}> {/* Rotated to face back */}
                    <shapeGeometry args={[shape]} />
                    <meshStandardMaterial color="#686663" roughness={0.4} metalness={0.4} />

                    {/* Apple Logo - Attached to Back Glass */}
                    <Html
                        transform
                        position={[0, 0.2, 0.001]} // Just off the surface
                        scale={0.15}
                        rotation={[0, 0, 0]} // Fixed rotation: 0,0,0 relative to parent mesh (already rotated) puts it upright
                        occlude
                        style={{ background: 'transparent' }}
                    >
                        <div className="text-[#e0e0e0] text-6xl font-sans select-none" style={{ textShadow: '0 0 2px rgba(255,255,255,0.5)' }}>
                            
                        </div>
                    </Html>
                </mesh>

                {/* 3. Screen - SURFACE SHAPE */}
                {/* Matches chassis contour exactly. Positioned at front face Z (+0.075 + bevel) */}
                <mesh position={[0, 0, 0.091]}> {/* Manual offset to clear bevel */}
                    <shapeGeometry args={[shape]} />
                    <meshStandardMaterial color="black" roughness={0.0} metalness={0.2} />

                    {/* Screen Content - HTML Overlay */}
                    <group position={[0, 0, 0.001]}>
                        <ScreenContent occlude="blending" />
                    </group>
                </mesh>

                {/* 4. Camera Bump Container */}
                {/* Sits ON TOP of back glass (-0.091). Thickness 0.04. Center at -0.111 */}
                <RoundedBox args={[0.65, 0.7, 0.04]} radius={0.12} smoothness={4} position={[0.3, 1.05, -0.111]}>
                    <meshStandardMaterial color="#5e5c5a" roughness={0.2} metalness={0.6} /> {/* Glossy camera island */}
                </RoundedBox>

                {/* 5. Camera Lenses (Triple) */}
                {/* Sit ON TOP of camera bump. Bump face at -0.131. Lenses need to be at -0.14 or so */}
                <group position={[0.3, 1.05, -0.14]}>
                    <Cylinder args={[0.12, 0.12, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.15, 0.15, 0]}>
                        <meshStandardMaterial color="#222" roughness={0.1} metalness={0.9} />
                    </Cylinder>
                    <Cylinder args={[0.12, 0.12, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.15, -0.15, 0]}>
                        <meshStandardMaterial color="#222" roughness={0.1} metalness={0.9} />
                    </Cylinder>
                    <Cylinder args={[0.12, 0.12, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.13, 0, 0]}>
                        <meshStandardMaterial color="#222" roughness={0.1} metalness={0.9} />
                    </Cylinder>
                </group>

                {/* 6. Buttons - Refined & Accurate Layout */}
                {/* Power Button (Right Side) - Large Pill */}
                <RoundedBox args={[0.03, 0.5, 0.08]} radius={0.01} smoothness={4} position={[0.755, 0.4, 0]}>
                    <meshStandardMaterial color="#787572" roughness={0.3} metalness={0.9} />
                </RoundedBox>

                {/* Volume Rockers (Left Side) */}
                {/* Volume Up - Upper Pill */}
                <RoundedBox args={[0.03, 0.25, 0.08]} radius={0.015} smoothness={4} position={[-0.755, 0.65, 0]}>
                    <meshStandardMaterial color="#787572" roughness={0.3} metalness={0.9} />
                </RoundedBox>
                {/* Volume Down - Lower Pill */}
                <RoundedBox args={[0.03, 0.25, 0.08]} radius={0.015} smoothness={4} position={[-0.755, 0.32, 0]}>
                    <meshStandardMaterial color="#787572" roughness={0.3} metalness={0.9} />
                </RoundedBox>

                {/* Action Button (Left - Top) - Small Pill */}
                <RoundedBox args={[0.03, 0.15, 0.08]} radius={0.015} smoothness={4} position={[-0.755, 0.95, 0]}>
                    <meshStandardMaterial color="#787572" roughness={0.3} metalness={0.9} />
                </RoundedBox>

            </group>
        )
    }

    // Default "Sleek" Black Phone
    return (
        <group {...props} dispose={null}>
            {/* 1. SINGLE CHASSIS - Extruded Body for Flat Sides */}
            <mesh position={[0, 0, -0.075]}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial color="#3a3a3a" roughness={0.2} metalness={1.0} />
            </mesh>

            {/* 2. Back Glass - SURFACE SHAPE */}
            <mesh position={[0, 0, -0.091]} rotation={[0, Math.PI, 0]}>
                <shapeGeometry args={[shape]} />
                <meshStandardMaterial color="#1c1c1c" roughness={0.1} metalness={0.8} />
            </mesh>

            {/* 3. Screen - SURFACE SHAPE */}
            <mesh position={[0, 0, 0.091]}> {/* Manual offset to clear bevel */}
                <shapeGeometry args={[shape]} />
                <meshStandardMaterial color="black" roughness={0.0} metalness={0.2} />

                {/* Screen Content - HTML Overlay */}
                <group position={[0, 0, 0.001]}>
                    <ScreenContent scale={0.038} />
                </group>
            </mesh>
        </group>
    )
}

export default PhoneModel
