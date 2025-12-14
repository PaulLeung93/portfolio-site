import { Html, useGLTF, RoundedBox, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import { useState, useMemo, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import HomeOS from '../ui/HomeOS'

// --- SHARED GEOMETRY ---
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

// Shared Screen Logic
const ScreenContent = ({ activeAppId, setActiveAppId, occlude, scale = 0.035, width = '1400px', height = '2850px', borderRadius = '0px' }) => (
    <Html
        transform
        occlude={occlude}
        position={[0, 0, 0.001]}
        style={{
            width: width,
            height: height,
        }}
        scale={scale}
    >
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            overflow: 'hidden',
            borderRadius: borderRadius
        }}>
            <HomeOS activeAppId={activeAppId} setActiveAppId={setActiveAppId} />
        </div>
    </Html>
)

// --- SUB-COMPONENTS ---

const IPhoneModel = ({ activeAppId, setActiveAppId, ...props }) => {
    // iPhone 17 Pro - Custom Model
    const { scene } = useGLTF('/portfolio-site/models/iphone.glb')
    const clone = useMemo(() => scene.clone(), [scene])

    return (
        <group {...props} dispose={null}>
            <primitive object={clone} scale={20} position={[0, 0, 0]} rotation={[0, 0, 0]} />

            {/* Screen Content - Manual Alignment */}
            <group position={[0, 0, 0.087]} rotation={[0, 0, 0]}>
                <ScreenContent
                    activeAppId={activeAppId}
                    setActiveAppId={setActiveAppId}
                    occlude="blending"
                    scale={0.036}
                    width="1500px"
                    height="2800px"
                    borderRadius="140px"
                />
            </group>
        </group>
    )
}

const PixelModel = ({ activeAppId, setActiveAppId, ...props }) => {
    // Pixel 10 Style - White "Porcelain" (Procedural Restore)
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
                    <ScreenContent activeAppId={activeAppId} setActiveAppId={setActiveAppId} occlude="blending" />
                </group>
            </mesh>

            {/* 4. Camera Bar - The Iconic Visor */}
            <group position={[0, 1.0, -0.12]}>
                <RoundedBox args={[1.4, 0.35, 0.06]} radius={0.15} smoothness={4}>
                    <meshStandardMaterial color="#e3e3e3" roughness={0.2} metalness={0.8} /> {/* Match Chassis Silver */}
                </RoundedBox>

                {/* The "Pill" - Black Glass area for lenses */}
                <RoundedBox args={[1.2, 0.22, 0.065]} radius={0.11} smoothness={4} position={[0, 0, 0.005]}>
                    <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
                </RoundedBox>

                {/* Lenses */}
                <Cylinder args={[0.08, 0.08, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 0, 0.01]}>
                    <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.5} />
                </Cylinder>
                <Cylinder args={[0.08, 0.08, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
                    <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.5} />
                </Cylinder>
                <Cylinder args={[0.08, 0.08, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.3, 0, 0.01]}>
                    <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.5} />
                </Cylinder>
            </group>

            {/* 5. Buttons - ALL ON RIGHT SIDE for Pixel */}
            <RoundedBox args={[0.03, 0.25, 0.08]} radius={0.01} smoothness={4} position={[0.755, 0.7, 0]}>
                <meshStandardMaterial color="#e3e3e3" roughness={0.2} metalness={0.8} />
            </RoundedBox>
            <RoundedBox args={[0.03, 0.5, 0.08]} radius={0.01} smoothness={4} position={[0.755, 0.2, 0]}>
                <meshStandardMaterial color="#e3e3e3" roughness={0.2} metalness={0.8} />
            </RoundedBox>

        </group>
    )
}

const Flip7Model = ({ activeAppId, setActiveAppId, ...props }) => {
    // Samsung Galaxy Flip 7 - Blue Shadow
    const [isFolded, setIsFolded] = useState(false)
    const [isNearlyUnfolded, setIsNearlyUnfolded] = useState(true)

    // Animation for folding
    const { rotationX, zOffset } = useSpring({
        rotationX: isFolded ? Math.PI * 0.98 : 0,
        zOffset: isFolded ? 0.08 : 0,
        config: { tension: 120, friction: 25 }
    })

    useFrame(() => {
        const currentRotation = rotationX.get()
        const nearlyUnfolded = currentRotation < 0.1
        if (nearlyUnfolded !== isNearlyUnfolded) {
            setIsNearlyUnfolded(nearlyUnfolded)
        }
    })

    // Dimensions
    const halfHeight = 1.51
    const width = 1.28
    const depth = 0.13
    const radius = 0.15
    const blueShadowColor = "#2c3e50"
    const screenColor = "#000000"

    // Shape helpers
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
    const extrudeSettings = { depth, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.01, bevelThickness: 0.01 }

    const LockScreen = () => (
        <Html
            transform
            occlude
            position={[0, 0, 0.001]}
            rotation={[0, 0, Math.PI]}
            style={{ width: '600px', height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}
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
            {/* Bottom Half */}
            <group position={[0, -halfHeight / 2, 0]}>
                <mesh position={[0, 0, -depth / 2]}>
                    <extrudeGeometry args={[halfShape, extrudeSettings]} />
                    <meshStandardMaterial color={blueShadowColor} roughness={0.4} metalness={0.7} />
                </mesh>
                <mesh position={[0, 0, -depth / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
                    <shapeGeometry args={[halfShape]} />
                    <meshStandardMaterial color={blueShadowColor} roughness={0.3} metalness={0.6} side={THREE.BackSide} />
                </mesh>
                <mesh position={[0, 0, 0]}><shapeGeometry args={[halfShape]} /><meshBasicMaterial color="#000000" side={THREE.DoubleSide} /></mesh>
                <mesh position={[0, 0, depth / 2 + 0.01]}>
                    <shapeGeometry args={[halfShape]} />
                    <meshStandardMaterial color={screenColor} roughness={0.0} metalness={0.2} side={THREE.FrontSide} />
                    {!isFolded && isNearlyUnfolded && (
                        <group position={[0, halfHeight / 2, 0.001]}>
                            <mesh position={[0, 0, -0.001]}><planeGeometry args={[1.2, 2.85]} /><meshBasicMaterial color="#000000" side={THREE.DoubleSide} /></mesh>
                            <ScreenContent activeAppId={activeAppId} setActiveAppId={setActiveAppId} occlude="blending" scale={0.03} height="3350px" />
                        </group>
                    )}
                </mesh>
            </group>

            {/* Top Half */}
            <animated.group position-z={zOffset} rotation-x={rotationX}>
                <mesh position={[0, halfHeight / 2, -depth / 2]}><extrudeGeometry args={[halfShape, extrudeSettings]} /><meshStandardMaterial color={blueShadowColor} roughness={0.4} metalness={0.7} /></mesh>
                <mesh position={[0, halfHeight / 2, -depth / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
                    <shapeGeometry args={[halfShape]} />
                    <meshStandardMaterial color={blueShadowColor} roughness={0.3} metalness={0.6} side={THREE.BackSide} />
                    <mesh position={[0, 0, 0.001]}>
                        <shapeGeometry args={[halfShape]} /><meshStandardMaterial color="#000" roughness={0.0} metalness={0.2} />
                        {isFolded && (
                            <group position={[0, 0, 0.001]}>
                                <mesh position={[0, 0, -0.001]}><planeGeometry args={[1.2, 1.4]} /><meshBasicMaterial color="#000000" side={THREE.DoubleSide} /></mesh>
                                <LockScreen />
                            </group>
                        )}
                    </mesh>
                </mesh>
                <mesh position={[0, halfHeight / 2, 0]}><shapeGeometry args={[halfShape]} /><meshBasicMaterial color="#000000" side={THREE.DoubleSide} /></mesh>
                <mesh position={[0, halfHeight / 2, depth / 2 + 0.01]}>
                    <shapeGeometry args={[halfShape]} /><meshStandardMaterial color={screenColor} roughness={0.0} metalness={0.2} side={THREE.FrontSide} />
                </mesh>
                <group position={[0.35, halfHeight / 2 + 0.5, -depth - 0.02]}>
                    <Cylinder args={[0.08, 0.08, 0.04, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.15, 0, 0]}><meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} /></Cylinder>
                    <Cylinder args={[0.08, 0.08, 0.04, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.15, 0, 0]}><meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} /></Cylinder>
                </group>
                <RoundedBox args={[0.03, 0.5, 0.06]} radius={0.01} smoothness={4} position={[width / 2 + 0.015, halfHeight / 2 - 0.2, 0]}><meshStandardMaterial color={blueShadowColor} roughness={0.4} metalness={0.7} /></RoundedBox>
            </animated.group>

            <RoundedBox args={[width - 0.1, 0.02, 0.04]} radius={0.005} position={[0, 0, -depth - 0.005]}><meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.95} /></RoundedBox>
            <RoundedBox args={[0.03, 0.35, 0.06]} radius={0.01} position={[width / 2 + 0.015, -0.3, 0]}><meshStandardMaterial color={blueShadowColor} roughness={0.4} metalness={0.7} /></RoundedBox>
        </group>
    )
}

const DefaultModel = ({ activeAppId, setActiveAppId, ...props }) => {
    // Uses shared shape and settings
    return (
        <group {...props} dispose={null}>
            <mesh position={[0, 0, -0.075]}><extrudeGeometry args={[shape, extrudeSettings]} /><meshStandardMaterial color="#3a3a3a" roughness={0.2} metalness={1.0} /></mesh>
            <mesh position={[0, 0, 0]}><shapeGeometry args={[shape]} /><meshBasicMaterial color="#000000" side={THREE.DoubleSide} /></mesh>
            <mesh position={[0, 0, -0.090]} rotation={[0, Math.PI, 0]}><shapeGeometry args={[shape]} /><meshStandardMaterial color="#1c1c1c" roughness={0.1} metalness={0.8} /></mesh>
            <mesh position={[0, 0, 0.090]}>
                <shapeGeometry args={[shape]} /><meshStandardMaterial color="black" roughness={0.0} metalness={0.2} />
                <group position={[0, 0, 0.001]}>
                    <ScreenContent activeAppId={activeAppId} setActiveAppId={setActiveAppId} occlude="blending" scale={0.038} />
                </group>
            </mesh>
        </group>
    )
}

// --- MAIN COMPONENT ---
const PhoneModel = ({ modelType = 'default', activeAppId, setActiveAppId, ...props }) => {
    if (modelType === 'iphone') return <IPhoneModel activeAppId={activeAppId} setActiveAppId={setActiveAppId} {...props} />
    if (modelType === 'pixel') return <PixelModel activeAppId={activeAppId} setActiveAppId={setActiveAppId} {...props} />
    if (modelType === 'flip7') return <Flip7Model activeAppId={activeAppId} setActiveAppId={setActiveAppId} {...props} />
    return <DefaultModel activeAppId={activeAppId} setActiveAppId={setActiveAppId} {...props} />
}

// Preload models
useGLTF.preload('/portfolio-site/models/iphone.glb')

export default PhoneModel
