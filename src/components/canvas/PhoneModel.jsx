import { Html, useGLTF, RoundedBox, Cylinder, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useState } from 'react'
import { useSpring, animated } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import HomeOS from '../ui/HomeOS'

const PhoneModel = ({ modelType = 'default', activeAppId, setActiveAppId, ...props }) => {
    // Shared Screen Logic
    const ScreenContent = ({ occlude, scale = 0.035, height = '2850px' }) => (
        <Html
            transform
            occlude={occlude}
            position={[0, 0, 0.001]}
            style={{
                width: '1400px',
                height: height,
                backgroundColor: 'black',
                overflow: 'hidden'
            }}
            scale={scale} // Optimal balance: readable without overlapping phone edges
        >
            <HomeOS activeAppId={activeAppId} setActiveAppId={setActiveAppId} />
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

    if (modelType === 'pixel') {
        // Pixel 10 Style - White "Porcelain"
        // Pixel has slightly softer corners than iPhone, but flat sides (Pixel 9 Pro vibe)

        // Adjust shape for slightly softer corners if needed, but the current shape is versatile.
        // We will stick to the shared shape for consistency in screen fit, but we can change materials/add-ons.

        return (
            <group {...props} dispose={null}>
                {/* 1. SINGLE CHASSIS - Extruded Body for Flat Sides - polished silver/aluminum */}
                <mesh position={[0, 0, -0.075]}>
                    <extrudeGeometry args={[shape, extrudeSettings]} />
                    <meshStandardMaterial color="#e3e3e3" roughness={0.2} metalness={0.8} />
                </mesh>

                {/* Opaque backing layer - preventing see-through */}
                <mesh position={[0, 0, 0]}>
                    <shapeGeometry args={[shape]} />
                    <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
                </mesh>

                {/* 2. Back Glass - SURFACE SHAPE - White Porcelain / Soft Matte */}
                <mesh position={[0, 0, -0.090]} rotation={[0, Math.PI, 0]}>
                    <shapeGeometry args={[shape]} />
                    <meshStandardMaterial
                        color="#f5f5f5"
                        roughness={0.6}
                        metalness={0.1}
                        polygonOffset
                        polygonOffsetFactor={-1}
                    />

                    {/* Google G Logo */}
                    <Html
                        transform
                        position={[0, 0, 0.001]}
                        scale={0.15}
                        rotation={[0, 0, 0]}
                        occlude
                        style={{ background: 'transparent' }}
                    >
                        <div className="text-[#a0a0a0] text-6xl font-sans font-bold select-none opacity-40">
                            G
                        </div>
                    </Html>
                </mesh>

                {/* 3. Screen - SURFACE SHAPE */}
                <mesh position={[0, 0, 0.090]}>
                    <shapeGeometry args={[shape]} />
                    <meshStandardMaterial
                        color="black"
                        roughness={0.0}
                        metalness={0.2}
                        polygonOffset
                        polygonOffsetFactor={-1}
                    />

                    {/* Screen Content */}
                    <group position={[0, 0, 0.001]}>
                        <ScreenContent occlude="blending" />
                    </group>
                </mesh>

                {/* 4. Camera Bar - The Iconic Visor */}
                {/* Spans almost full width. Floating island style (Pixel 9). */}
                {/* Chassis Width is 1.5. Bar width ~1.4. Height ~0.35. Depth ~0.06. */}
                {/* Pos Z: Sits on Back Glass (-0.091) -> -0.12 */}
                <group position={[0, 1.0, -0.12]}>
                    <RoundedBox args={[1.4, 0.35, 0.06]} radius={0.15} smoothness={4}>
                        <meshStandardMaterial color="#e3e3e3" roughness={0.2} metalness={0.8} /> {/* Match Chassis Silver */}
                    </RoundedBox>

                    {/* The "Pill" - Black Glass area for lenses */}
                    {/* Slightly smaller than the bar */}
                    <RoundedBox args={[1.2, 0.22, 0.065]} radius={0.11} smoothness={4} position={[0, 0, 0.005]}>
                        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
                    </RoundedBox>

                    {/* Lenses */}
                    {/* Main (Wide) */}
                    <Cylinder args={[0.08, 0.08, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 0, 0.01]}>
                        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.5} />
                    </Cylinder>
                    {/* Ultrawide */}
                    <Cylinder args={[0.08, 0.08, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
                        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.5} />
                    </Cylinder>
                    {/* Telephoto (Periscope - modeled as slightly rectangular or just circle for simplicity) */}
                    <Cylinder args={[0.08, 0.08, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.3, 0, 0.01]}>
                        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.5} />
                    </Cylinder>
                </group>

                {/* 5. Buttons - ALL ON RIGHT SIDE for Pixel */}
                {/* Power Button (Top Right) */}
                <RoundedBox args={[0.03, 0.25, 0.08]} radius={0.01} smoothness={4} position={[0.755, 0.7, 0]}>
                    <meshStandardMaterial color="#e3e3e3" roughness={0.2} metalness={0.8} />
                </RoundedBox>

                {/* Volume Rocker (Bottom Right) */}
                <RoundedBox args={[0.03, 0.5, 0.08]} radius={0.01} smoothness={4} position={[0.755, 0.2, 0]}>
                    <meshStandardMaterial color="#e3e3e3" roughness={0.2} metalness={0.8} />
                </RoundedBox>

            </group>
        )
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

                {/* Opaque backing layer - preventing see-through */}
                <mesh position={[0, 0, 0]}>
                    <shapeGeometry args={[shape]} />
                    <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
                </mesh>

                {/* 2. Back Glass - SURFACE SHAPE */}
                {/* Matches chassis contour exactly. Positioned at back face Z (-0.075 - bevel) */}
                <mesh position={[0, 0, -0.090]} rotation={[0, Math.PI, 0]}> {/* Rotated to face back */}
                    <shapeGeometry args={[shape]} />
                    <meshStandardMaterial
                        color="#686663"
                        roughness={0.4}
                        metalness={0.4}
                        polygonOffset
                        polygonOffsetFactor={-1}
                    />

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
                <mesh position={[0, 0, 0.090]}> {/* Manual offset to clear bevel */}
                    <shapeGeometry args={[shape]} />
                    <meshStandardMaterial
                        color="black"
                        roughness={0.0}
                        metalness={0.2}
                        polygonOffset
                        polygonOffsetFactor={-1}
                    />

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

    if (modelType === 'flip7') {
        // Samsung Galaxy Flip 7 - Blue Shadow
        const [isFolded, setIsFolded] = useState(false)
        const [isNearlyUnfolded, setIsNearlyUnfolded] = useState(true) // Track when animation is near completion

        // Animation for folding - positive rotation folds screens together (inward)
        const { rotationX, zOffset } = useSpring({
            rotationX: isFolded ? Math.PI * 0.98 : 0, // Fold forward ~176 degrees
            zOffset: isFolded ? 0.08 : 0, // Minimal offset for layering without visible gap (matches 'no gap' design)
            config: { tension: 120, friction: 25 }
        })

        // Track rotation progress to show screen only when nearly unfolded
        useFrame(() => {
            const currentRotation = rotationX.get()
            const nearlyUnfolded = currentRotation < 0.1
            if (nearlyUnfolded !== isNearlyUnfolded) {
                setIsNearlyUnfolded(nearlyUnfolded)
            }
        })

        // Dimensions based on Galaxy Flip 7: 166.7mm tall unfolded, split at hinge
        const halfHeight = 1.51 // Each half ~75mm height in our scale
        const width = 1.28 // Reduced from 1.5 to be more realistic (narrower)
        const depth = 0.13
        const radius = 0.15

        // Blue Shadow color - deep blue with slight grey
        const blueShadowColor = "#2c3e50"
        const screenColor = "#000000"

        // Create rounded rect shape for each half
        const createHalfShape = (w, h, r) => {
            const shape = new THREE.Shape()
            const x = -w / 2
            const y = -h / 2

            shape.moveTo(x, y + r)
            shape.lineTo(x, y + h - r)
            shape.quadraticCurveTo(x, y + h, x + r, y + h)
            shape.lineTo(x + w - r, y + h)
            shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r)
            shape.lineTo(x + w, y + r)
            shape.quadraticCurveTo(x + w, y, x + w - r, y)
            shape.lineTo(x + radius, y)
            shape.quadraticCurveTo(x, y, x, y + r)

            return shape
        }

        const halfShape = createHalfShape(width, halfHeight, radius)
        const extrudeSettings = {
            depth: depth,
            bevelEnabled: true,
            bevelSegments: 3,
            bevelSize: 0.01,
            bevelThickness: 0.01
        }

        const LockScreen = () => (
            <Html
                transform
                occlude
                position={[0, 0, 0.001]}
                rotation={[0, 0, Math.PI]}
                style={{
                    width: '600px',
                    height: '600px',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    color: 'white'
                }}
                scale={0.024}
            >
                <div style={{ fontSize: '190px', fontWeight: '400', lineHeight: '0.85', marginBottom: '0px', letterSpacing: '-4px' }}>
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>
                <div style={{ fontSize: '28px', opacity: 0.6, marginTop: '10px' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </Html>
        )

        return (
            <group {...props} dispose={null} onClick={() => setIsFolded(!isFolded)}>
                {/* Bottom Half - Fixed */}
                <group position={[0, -halfHeight / 2, 0]}>
                    {/* Chassis */}
                    <mesh position={[0, 0, -depth / 2]}>
                        <extrudeGeometry args={[halfShape, extrudeSettings]} />
                        <meshStandardMaterial color={blueShadowColor} roughness={0.4} metalness={0.7} />
                    </mesh>

                    {/* Back Glass */}
                    <mesh position={[0, 0, -depth / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
                        <shapeGeometry args={[halfShape]} />
                        <meshStandardMaterial
                            color={blueShadowColor}
                            roughness={0.3}
                            metalness={0.6}
                            side={THREE.BackSide}
                            polygonOffset
                            polygonOffsetFactor={-1}
                        />
                    </mesh>

                    {/* Opaque backing layer - prevents see-through */}
                    <mesh position={[0, 0, 0]}>
                        <shapeGeometry args={[halfShape]} />
                        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} depthWrite={true} />
                    </mesh>

                    {/* Screen Surface - Bottom Half */}
                    <mesh position={[0, 0, depth / 2 + 0.01]}>
                        <shapeGeometry args={[halfShape]} />
                        <meshStandardMaterial
                            color={screenColor}
                            roughness={0.0}
                            metalness={0.2}
                            side={THREE.FrontSide}
                            polygonOffset
                            polygonOffsetFactor={-1}
                        />

                        {/* Main Screen Content - Hide when folding, show only when fully unfolded */}
                        {!isFolded && isNearlyUnfolded && (
                            <group position={[0, halfHeight / 2, 0.001]}>
                                {/* Opaque backing to prevent see-through */}
                                <mesh position={[0, 0, -0.001]}>
                                    <planeGeometry args={[1.2, 2.85]} />
                                    <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
                                </mesh>
                                <ScreenContent occlude="blending" scale={0.03} height="3350px" />
                            </group>
                        )}
                    </mesh>
                </group>

                {/* Top Half - Rotates on hinge */}
                {/* Pivot point is at y=0 (the hinge), meshes are offset by halfHeight/2 */}
                <animated.group
                    position-z={zOffset}
                    rotation-x={rotationX}
                >
                    {/* Chassis */}
                    <mesh position={[0, halfHeight / 2, -depth / 2]}>
                        <extrudeGeometry args={[halfShape, extrudeSettings]} />
                        <meshStandardMaterial color={blueShadowColor} roughness={0.4} metalness={0.7} />
                    </mesh>

                    {/* Back Glass */}
                    <mesh position={[0, halfHeight / 2, -depth / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
                        <shapeGeometry args={[halfShape]} />
                        <meshStandardMaterial
                            color={blueShadowColor}
                            roughness={0.3}
                            metalness={0.6}
                            side={THREE.BackSide}
                            polygonOffset
                            polygonOffsetFactor={-1}
                        />

                        {/* Cover Screen - Full coverage display (Galaxy Flip 7 style) */}
                        {/* Nearly fills entire back surface with minimal bezels */}
                        <mesh position={[0, 0, 0.001]}>
                            <shapeGeometry args={[halfShape]} />
                            <meshStandardMaterial color="#000" roughness={0.0} metalness={0.2} />
                            {/* Only show lock screen UI when folded */}
                            {isFolded && (
                                <group position={[0, 0, 0.001]}>
                                    {/* Opaque backing to prevent see-through */}
                                    <mesh position={[0, 0, -0.001]}>
                                        <planeGeometry args={[1.2, 1.4]} />
                                        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
                                    </mesh>
                                    <LockScreen />
                                </group>
                            )}
                        </mesh>
                    </mesh>

                    {/* Opaque backing layer - prevents see-through */}
                    <mesh position={[0, halfHeight / 2, 0]}>
                        <shapeGeometry args={[halfShape]} />
                        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} depthWrite={true} />
                    </mesh>

                    {/* Screen Surface - Top Half */}
                    <mesh position={[0, halfHeight / 2, depth / 2 + 0.01]}>
                        <shapeGeometry args={[halfShape]} />
                        <meshStandardMaterial
                            color={screenColor}
                            roughness={0.0}
                            metalness={0.2}
                            side={THREE.FrontSide}
                            polygonOffset
                            polygonOffsetFactor={-1}
                        />
                    </mesh>

                    {/* Camera System - Dual cameras embedded in cover screen */}
                    {/* Horizontally arranged at bottom right of lock screen */}
                    <group position={[0.35, halfHeight / 2 + 0.5, -depth - 0.02]}>
                        {/* 50MP Wide Camera (left) */}
                        <Cylinder args={[0.08, 0.08, 0.04, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.15, 0, 0]}>
                            <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
                        </Cylinder>
                        {/* 12MP Ultra-wide Camera (right) */}
                        <Cylinder args={[0.08, 0.08, 0.04, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.15, 0, 0]}>
                            <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
                        </Cylinder>
                    </group>

                    {/* Volume Rocker - RIGHT side, attached to top half */}
                    <RoundedBox args={[0.03, 0.5, 0.06]} radius={0.01} smoothness={4} position={[width / 2 + 0.015, halfHeight / 2 - 0.2, 0]}>
                        <meshStandardMaterial color={blueShadowColor} roughness={0.4} metalness={0.7} />
                    </RoundedBox>
                </animated.group>

                {/* Hinge - Waterdrop/Flex Hinge Design */}
                {/* Samsung's hinge is discrete and barely visible - represented as a thin strip */}
                <RoundedBox
                    args={[width - 0.1, 0.02, 0.04]}
                    radius={0.005}
                    smoothness={4}
                    position={[0, 0, -depth - 0.005]}
                >
                    <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.95} />
                </RoundedBox>

                {/* Side Buttons */}
                {/* Power Button - attached to bottom half */}
                <RoundedBox args={[0.03, 0.35, 0.06]} radius={0.01} smoothness={4} position={[width / 2 + 0.015, -0.3, 0]}>
                    <meshStandardMaterial color={blueShadowColor} roughness={0.4} metalness={0.7} />
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

            {/* Opaque backing layer - preventing see-through */}
            <mesh position={[0, 0, 0]}>
                <shapeGeometry args={[shape]} />
                <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
            </mesh>

            {/* 2. Back Glass - SURFACE SHAPE */}
            <mesh position={[0, 0, -0.090]} rotation={[0, Math.PI, 0]}>
                <shapeGeometry args={[shape]} />
                <meshStandardMaterial
                    color="#1c1c1c"
                    roughness={0.1}
                    metalness={0.8}
                    polygonOffset
                    polygonOffsetFactor={-1}
                />
            </mesh>

            {/* 3. Screen - SURFACE SHAPE */}
            <mesh position={[0, 0, 0.090]}> {/* Manual offset to clear bevel */}
                <shapeGeometry args={[shape]} />
                <meshStandardMaterial
                    color="black"
                    roughness={0.0}
                    metalness={0.2}
                    polygonOffset
                    polygonOffsetFactor={-1}
                />

                {/* Screen Content - HTML Overlay */}
                <group position={[0, 0, 0.001]}>
                    <ScreenContent occlude="blending" scale={0.038} />
                </group>
            </mesh>
        </group>
    )
}

export default PhoneModel
