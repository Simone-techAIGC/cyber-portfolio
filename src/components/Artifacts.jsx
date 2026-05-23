import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function HolographicBrain({ color = '#ff00aa' }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.3
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.15
  })
  return (
    <group ref={ref} scale={0.6}>
      <mesh>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[
          Math.sin(i * 2.1) * 0.5,
          Math.cos(i * 1.7) * 0.5,
          Math.sin(i * 1.3) * 0.5
        ]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      ))}
      <lineSegments>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(0.9, 1)]} />
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </lineSegments>
    </group>
  )
}

export function CrystalStructure({ color = '#7000ff' }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.25
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.1
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.4 + 1) * 0.15
  })

  const crystals = useMemo(() => {
    const arr = []
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2
      const r = 0.4 + Math.random() * 0.3
      arr.push({
        pos: [Math.cos(angle) * r, Math.sin(angle) * r * 0.5, (Math.random() - 0.5) * 0.5],
        scale: 0.2 + Math.random() * 0.3,
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      })
    }
    return arr
  }, [])

  return (
    <group ref={groupRef} scale={0.6}>
      <mesh>
        <octahedronGeometry args={[0.7, 0]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.9}
          clearcoat={0.3}
          wireframe={false}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
      {crystals.map((c, i) => (
        <mesh key={i} position={c.pos} rotation={c.rot} scale={c.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

export function NeuralNetwork({ color = '#00f0ff' }) {
  const groupRef = useRef()
  const nodes = 20
  const [nodePositions, edges] = useMemo(() => {
    const pos = []
    for (let i = 0; i < nodes; i++) {
      pos.push([
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      ])
    }
    const edgePairs = []
    for (let i = 0; i < nodes; i++) {
      for (let j = i + 1; j < nodes; j++) {
        const dx = pos[i][0] - pos[j][0]
        const dy = pos[i][1] - pos[j][1]
        const dz = pos[i][2] - pos[j][2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 1.2 && Math.random() < 0.6) {
          edgePairs.push([pos[i], pos[j]])
        }
      }
    }
    return [pos, edgePairs]
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.2
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
  })

  return (
    <group ref={groupRef} scale={0.6}>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      {edges.map(([a, b], i) => {
        const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]
        const dir = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
        const len = Math.sqrt(dir[0] ** 2 + dir[1] ** 2 + dir[2] ** 2)
        return (
          <lineSegments key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...a, ...b])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={color} transparent opacity={0.2} />
          </lineSegments>
        )
      })}
    </group>
  )
}

export function CyberneticEye({ color = '#ff8800' }) {
  const groupRef = useRef()
  const pupilRef = useRef()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.4
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3 + 2) * 0.15
    if (pupilRef.current) {
      pupilRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.7) * 0.15
      pupilRef.current.position.y = Math.cos(clock.getElapsedTime() * 0.5) * 0.15
    }
  })

  return (
    <group ref={groupRef} scale={0.55}>
      <mesh>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          roughness={0.3}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
      <mesh ref={pupilRef} position={[0, 0, 0.55]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.55]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#000" transparent opacity={0.5} />
      </mesh>
      {[0, 0.5, 1].map((i) => (
        <mesh key={i} position={[0, 0, 0.55]} rotation-z={i * Math.PI / 1.5}>
          <planeGeometry args={[0.4, 0.01]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export function QuantumBits({ color = '#00ff88' }) {
  const groupRef = useRef()
  const particlesRef = useRef()
  const orbCount = 12

  const [orbitalPositions] = useMemo(() => {
    const p = []
    for (let i = 0; i < 3; i++) {
      const radius = 0.5 + i * 0.3
      for (let j = 0; j < orbCount; j++) {
        const angle = (j / orbCount) * Math.PI * 2
        p.push({
          angle,
          radius,
          speed: 0.3 + i * 0.2,
          tilt: (i / 3) * Math.PI * 0.5,
          startOffset: j * 0.1,
        })
      }
    }
    return [p]
  }, [])

  const [centerPositions] = useMemo(() => {
    const p = new Float32Array(3 * 3)
    const colors = ['#00ff88', '#00f0ff', '#ff00aa']
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2
      p[i * 3] = Math.cos(angle) * 0.2
      p[i * 3 + 1] = Math.sin(angle) * 0.2
      p[i * 3 + 2] = 0
    }
    return [p]
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.3
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5 + 3) * 0.12
  })

  return (
    <group ref={groupRef} scale={0.55}>
      {/* Center core */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      {centerPositions.map((_, i) => (
        <mesh key={i} position={[centerPositions[i * 3], centerPositions[i * 3 + 1], centerPositions[i * 3 + 2]]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={[color, '#00f0ff', '#ff00aa'][i]} />
        </mesh>
      ))}
      {/* Orbital paths */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation-x={i * 0.8} rotation-y={i * 0.5}>
          <ringGeometry args={[0.5 + i * 0.3 - 0.01, 0.5 + i * 0.3 + 0.01, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Orbiting particles */}
      {orbitalPositions.map((p, i) => (
        <OrbitingParticle key={i} data={p} color={color} />
      ))}
    </group>
  )
}

function OrbitingParticle({ data, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * data.speed + data.startOffset
    const x = Math.cos(t) * data.radius
    const z = Math.sin(t) * data.radius
    ref.current.position.set(x, 0, z)
    ref.current.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), data.tilt)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

export function ServerTower({ color = '#ff0066' }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.2
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3 + 4) * 0.12
  })

  const vinePoints = useMemo(() => {
    const pts = []
    for (let i = 0; i < 50; i++) {
      const t = i / 50
      pts.push(new THREE.Vector3(
        Math.sin(t * Math.PI * 6) * 0.3 + (Math.random() - 0.5) * 0.05,
        -0.7 + t * 1.4,
        Math.cos(t * Math.PI * 4) * 0.3 + (Math.random() - 0.5) * 0.05,
      ))
    }
    return pts
  }, [])

  const vineCurve = useMemo(() => new THREE.CatmullRomCurve3(vinePoints), [vinePoints])

  return (
    <group ref={groupRef} scale={0.55}>
      {/* Main tower */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          roughness={0.4}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* Glowing strips */}
      {[-0.21, 0.21].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.201]}>
          <planeGeometry args={[0.01, 1.0]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      ))}
      {/* Blinking lights */}
      {Array.from({ length: 6 }).map((_, i) => (
        <BlinkLight key={i} position={[0.21, -0.5 + i * 0.25, 0]} color={color} />
      ))}
      {/* Vine tube */}
      <mesh>
        <tubeGeometry args={[vineCurve, 40, 0.03, 6, false]} />
        <meshPhysicalMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[vineCurve, 40, 0.04, 6, false]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

function BlinkLight({ position, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = Math.sin(clock.getElapsedTime() * 2 + position[1] * 3)
    ref.current.material.opacity = t > 0 ? 0.8 : 0.1
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}
