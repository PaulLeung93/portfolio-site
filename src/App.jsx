import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import PhoneModel from './components/canvas/PhoneModel'
import Overlay from './components/ui/Overlay'
import AnimatedBackground from './components/ui/AnimatedBackground'

function App() {
  return (
    <div className="w-full min-h-screen relative">
      {/* Animated Gradient Background - Behind everything */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>

      <Overlay />

      {/* 3D Scene - Absolute Background (Scrolls with page) */}
      <div className="absolute top-0 left-0 w-full h-screen z-0">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />

          <Suspense fallback={null}>
            <group rotation={[0, 0, 0]}> {/* Initial rotation to face user */}
              <PhoneModel scale={0.75} />
            </group>
          </Suspense>

          <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.8} />
        </Canvas>
      </div>
    </div>
  )
}

export default App
