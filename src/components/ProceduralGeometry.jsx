import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMousePosition } from '../hooks/useMousePosition'

function IcosahedronCore({ color = '#00f0ff' }) {
  const meshRef = useRef()
  const wireRef = useRef()
  const mouse = useMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current || !wireRef.current) return
    const t = clock.getElapsedTime()

    meshRef.current.rotation.x = t * 0.15
    meshRef.current.rotation.y = t * 0.2 + mouse.x * 0.5
    meshRef.current.position.y = Math.sin(t * 0.3) * 0.2

    wireRef.current.rotation.x = t * 0.15
    wireRef.current.rotation.y = t * 0.2 + mouse.x * 0.5
    wireRef.current.position.y = Math.sin(t * 0.3) * 0.2

    const scale = 1 + Math.sin(t * 0.5) * 0.05
    meshRef.current.scale.setScalar(scale)
    wireRef.current.scale.setScalar(scale)
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          transparent
          opacity={0.25}
          wireframe={false}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

function InnerSphere() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.getElapsedTime() * 0.1
    ref.current.rotation.y = clock.getElapsedTime() * 0.15
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.6, 24, 16]} />
      <meshBasicMaterial color="#ff00aa" wireframe transparent opacity={0.3} />
    </mesh>
  )
}

function OuterParticles() {
  const count = 2000
  const ref = useRef()
  const mouse = useMousePosition()

  const [positions] = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 1.2
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = r * Math.cos(phi)
    }
    return [p]
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    const t = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const idx = i * 3
      const x = pos[idx], y = pos[idx + 1], z = pos[idx + 2]
      const theta = Math.atan2(z, x) + 0.003
      const phi = Math.acos(y / Math.sqrt(x * x + y * y + z * z))
      const r = Math.sqrt(x * x + y * y + z * z)
      pos[idx] = r * Math.sin(phi) * Math.cos(theta)
      pos[idx + 1] = r * Math.sin(phi) * Math.sin(theta) * (1 + Math.sin(t * 0.3 + i * 0.01) * 0.02)
      pos[idx + 2] = r * Math.cos(phi)
      if (i % 3 === 0) {
        pos[idx] += (mouse.x - 0.5) * 0.002
        pos[idx + 1] += (mouse.y - 0.5) * 0.002
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  const colors = useMemo(() => {
    const c = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const col = new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.8, 0.5)
      c[i * 3] = col.r
      c[i * 3 + 1] = col.g
      c[i * 3 + 2] = col.b
    }
    return c
  }, [])

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function GlowRing() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    ref.current.rotation.z = Math.cos(clock.getElapsedTime() * 0.15) * 0.1
  })
  return (
    <mesh ref={ref} rotation-x={Math.PI / 2}>
      <ringGeometry args={[2.5, 2.8, 64]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

export default function ProceduralGeometry({ color = '#00f0ff' }) {
  return (
    <group>
      <IcosahedronCore color={color} />
      <InnerSphere />
      <OuterParticles />
      <GlowRing />
      <GlowRing />
    </group>
  )
}
