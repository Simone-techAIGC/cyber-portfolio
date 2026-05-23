import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import HolographicText from './HolographicText'
import CodeRain from './CodeRain'
import ProceduralGeometry from './ProceduralGeometry'

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#00f0ff" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#00f0ff" />
      <ProceduralGeometry color="#00f0ff" />
      <CodeRain />
      <HolographicText
        text="VibeCoder"
        position={[0, 1.8, 0.5]}
        color="#00f0ff"
        size={0.6}
      />
      <HolographicText
        text="探索 · 生成 · 进化"
        position={[0, -2.6, 0.5]}
        color="#ff00aa"
        size={0.25}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={15}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <HeroScene />
        </Canvas>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-auto z-30">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="22" height="38" rx="11" stroke="#00f0ff" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx="12" cy="14" r="3" fill="#00f0ff" fillOpacity="0.6">
            <animate attributeName="cy" values="14;24;14" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div className="absolute top-4 left-4 pointer-events-auto z-30">
        <span className="text-neon-cyan font-orbitron text-xs tracking-[0.2em] opacity-50">
          NEXUS-9 // SYSTEM ACTIVE
        </span>
      </div>
    </section>
  )
}
