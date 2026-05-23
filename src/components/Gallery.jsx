import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { artifacts } from '../data/artifacts'
import {
  HolographicBrain,
  CrystalStructure,
  NeuralNetwork,
  CyberneticEye,
  QuantumBits,
  ServerTower,
} from './Artifacts'

const artifactComponents = {
  'generative-ai': HolographicBrain,
  'neural-chaos': NeuralNetwork,
  'cybernetics': CyberneticEye,
  'quantum-computing': QuantumBits,
  'ai-safety': CrystalStructure,
  'vibecoding': ServerTower,
}

function ArtifactMesh({ artifact, index, isHovered, onHover, onLeave }) {
  const groupRef = useRef()
  const initialPos = useMemo(
    () => [artifact.position[0], artifact.position[1] + Math.random() * 0.3, artifact.position[2]],
    [artifact.position]
  )
  const Component = artifactComponents[artifact.id]

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const floatY = Math.sin(t * 0.4 + index * 1.5) * 0.15
    const hoverScale = isHovered ? 1.3 : 1
    groupRef.current.position.y = initialPos[1] + floatY
    groupRef.current.scale.setScalar(hoverScale)
  })

  return (
    <group
      ref={groupRef}
      position={initialPos}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(artifact.id)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        onLeave()
        document.body.style.cursor = 'default'
      }}
    >
      <Component color={artifact.color} />
    </group>
  )
}

function GalleryScene({ hoveredId, onHover, onLeave }) {
  const { camera } = useThree()
  const controlsRef = useRef()

  useFrame(() => {
    if (hoveredId && controlsRef.current) {
      const art = artifacts.find((a) => a.id === hoveredId)
      if (art) {
        controlsRef.current.target.lerp(
          new THREE.Vector3(art.position[0], art.position[1], 0),
          0.05
        )
      }
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 3, 4]} intensity={0.4} color="#00f0ff" />
      <pointLight position={[0, -3, 4]} intensity={0.2} color="#ff00aa" />
      <group>
        {artifacts.map((art, i) => (
          <ArtifactMesh
            key={art.id}
            artifact={art}
            index={i}
            isHovered={hoveredId === art.id}
            onHover={onHover}
            onLeave={onLeave}
          />
        ))}
      </group>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={4}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

function InfoPanel({ artifact }) {
  if (!artifact) return null

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      style={{
        width: 'min(90vw, 420px)',
        background: 'rgba(10, 10, 15, 0.85)',
        border: `1px solid ${artifact.color}44`,
        padding: '20px 24px',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.03) 2px, rgba(0, 240, 255, 0.03) 4px)`,
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full" style={{ background: artifact.color, boxShadow: `0 0 8px ${artifact.color}` }} />
          <span
            className="font-orbitron text-xs tracking-[0.15em]"
            style={{ color: artifact.color }}
          >
            {artifact.subtitle}
          </span>
        </div>
        <h3
          className="font-orbitron text-xl font-bold mb-1"
          style={{ color: artifact.color }}
        >
          {artifact.title}
        </h3>
        <p className="font-mono text-xs leading-relaxed opacity-70">
          {artifact.description}
        </p>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState(null)
  const hoveredArt = artifacts.find((a) => a.id === hoveredId)

  const sectionRef = useRef(null)

  return (
    <section id="gallery" ref={sectionRef} className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <GalleryScene
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
          />
        </Canvas>
      </div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <span className="font-orbitron text-xs tracking-[0.3em] text-neon-cyan opacity-40">
          DIGITAL LAB // EXPERIMENTS
        </span>
        <h2 className="font-orbitron text-lg md:text-xl font-bold text-white mt-1">
          Concept Exhibits
        </h2>
        <p className="font-mono text-xs opacity-40 mt-1">Hover to inspect · Drag to explore</p>
      </div>
      <InfoPanel artifact={hoveredArt} />
    </section>
  )
}
