import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMousePosition } from '../hooks/useMousePosition'

function Edges({ color, opacity }) {
  return (
    <lineSegments>
      <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
      <lineBasicMaterial color={color} opacity={opacity} transparent />
    </lineSegments>
  )
}

function Buildings() {
  const count = 60
  const data = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const w = 0.3 + Math.random() * 0.8
      const h = 1 + Math.random() * 5
      const d = 0.3 + Math.random() * 0.8
      arr.push({
        pos: [(Math.random() - 0.5) * 30, -2 + h / 2, -8 - Math.random() * 12],
        scale: [w, h, d],
      })
    }
    return arr.sort((a, b) => a.pos[2] - b.pos[2])
  }, [])

  return (
    <group>
      {data.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={b.scale} />
          <meshStandardMaterial
            color={`hsl(${200 + Math.random() * 40}, 80%, ${10 + Math.random() * 15}%)`}
            emissive={`hsl(${200 + Math.random() * 40}, 90%, ${2 + Math.random() * 4}%)`}
            roughness={0.8}
            metalness={0.2}
            transparent
            opacity={0.7 + Math.random() * 0.3}
          />
        </mesh>
      ))}
      {data.map((b, i) => (
        <lineSegments key={`e${i}`} position={b.pos}>
          <edgesGeometry args={[new THREE.BoxGeometry(...b.scale)]} />
          <lineBasicMaterial color="#00f0ff" transparent opacity={0.08 + Math.random() * 0.08} />
        </lineSegments>
      ))}
    </group>
  )
}

function GridFloor() {
  return (
    <gridHelper args={[30, 30, '#00f0ff22', '#00f0ff11']} position={[0, -1.5, 0]} rotation-x={-Math.PI / 2} />
  )
}

function SearchLights() {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.02
  })
  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 5, 0]} rotation-y={(i / 3) * Math.PI * 2} rotation-x={0.4}>
          <coneGeometry args={[0.08, 10, 4]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.04} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function DataStreams() {
  const count = 40
  const pairs = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25
      const z = -5 - Math.random() * 10
      arr.push({
        sx: x, sy: -1, sz: z,
        ex: x, ey: 3 + Math.random() * 4, ez: z,
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * 100,
      })
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    const t = clock.getElapsedTime()
    pairs.forEach((p, i) => {
      const frac = ((t * p.speed + p.offset) % 1)
      const idx = i * 6
      const lerp = (a, b, f) => a + (b - a) * f
      pos[idx] = lerp(p.sx, p.ex, frac)
      pos[idx + 1] = lerp(p.sy, p.ey, frac)
      pos[idx + 2] = lerp(p.sz, p.ez, frac)
      pos[idx + 3] = lerp(p.sx, p.ex, (frac + 0.05) % 1)
      pos[idx + 4] = lerp(p.sy, p.ey, (frac + 0.05) % 1)
      pos[idx + 5] = lerp(p.sz, p.ez, (frac + 0.05) % 1)
    })
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * 2}
          array={new Float32Array(count * 6)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00f0ff" transparent opacity={0.12} />
    </lineSegments>
  )
}

function AmbientParticles() {
  const count = 400
  const ref = useRef()
  const mouse = useMousePosition()

  const [positions] = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40
      p[i * 3 + 1] = (Math.random() - 0.5) * 30
      p[i * 3 + 2] = -5 - Math.random() * 20
    }
    return [p]
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3] += (mouse.x - 0.5) * 0.002
      pos[i * 3 + 1] += (mouse.y - 0.5) * 0.002
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00f0ff" size={0.06} transparent opacity={0.25} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function CyberBackground() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 10, 5]} intensity={0.25} color="#00f0ff" />
      <directionalLight position={[-5, -5, 5]} intensity={0.1} color="#ff00aa" />
      <fog attach="fog" args={['#0a0a0f', 15, 35]} />
      <GridFloor />
      <Buildings />
      <SearchLights />
      <DataStreams />
      <AmbientParticles />
    </>
  )
}
