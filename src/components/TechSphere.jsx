import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

const techData = [
  { name: 'React', desc: 'UI 构建库' },
  { name: 'Vue', desc: '渐进式框架' },
  { name: 'Three.js', desc: '3D 渲染引擎' },
  { name: 'Node.js', desc: '服务端运行时' },
  { name: 'TypeScript', desc: '类型化 JS' },
  { name: 'Python', desc: 'AI 首选语言' },
  { name: 'Docker', desc: '容器化部署' },
  { name: 'AWS', desc: '云基础设施' },
  { name: 'Figma', desc: '设计协作工具' },
  { name: 'Blender', desc: '3D 创作套件' },
  { name: 'WebGL', desc: 'GPU 加速图形' },
  { name: 'Rust', desc: '系统级语言' },
  { name: 'Solidity', desc: '智能合约' },
  { name: 'Tailwind', desc: '原子化 CSS' },
  { name: 'GraphQL', desc: 'API 查询语言' },
  { name: 'PostgreSQL', desc: '关系型数据库' },
  { name: 'Redis', desc: '内存缓存' },
  { name: 'Kubernetes', desc: '容器编排' },
  { name: 'Next.js', desc: 'React 全栈框架' },
  { name: 'WebSocket', desc: '实时通信' },
  { name: 'AI/ML', desc: '机器学习' },
  { name: 'Go', desc: '高性能语言' },
]

const tagColors = ['#00f0ff', '#ff00aa', '#7000ff', '#00ff88', '#ff8800', '#ff0066']

function TagLabel({ tech, index, total, hoveredId, setHoveredId }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const isActive = hoveredId === tech.name

  const pos = useMemo(() => {
    const phi = Math.acos(2 * (index / total) - 1)
    const theta = Math.PI * (1 + Math.sqrt(5)) * index
    const r = 2.5
    return [
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    ]
  }, [index, total])

  const color = tagColors[index % tagColors.length]

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const s = isActive ? 1.5 : 1
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 2 + index) * 0.04
    groupRef.current.scale.setScalar(s * pulse)
  })

  return (
    <group
      ref={groupRef}
      position={pos}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredId(tech.name)
      }}
      onPointerOut={() => {
        setHovered(false)
        setHoveredId(null)
      }}
    >
      <Billboard>
        <Text
          font={undefined}
          fontSize={0.32}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#000000"
          opacity={isActive ? 1 : 0.85}
        >
          {tech.name}
        </Text>
      </Billboard>
    </group>
  )
}

function VisualAnchor() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.05
  })
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[2.4, 24, 16]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.07} />
      </mesh>
      <mesh>
        <ringGeometry args={[2.5, 2.55, 64]} />
        <meshBasicMaterial color="#ff00aa" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-x={Math.PI / 3}>
        <ringGeometry args={[2.5, 2.55, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function SphereScene() {
  const [hoveredId, setHoveredId] = useState(null)
  const groupRef = useRef()
  const controlsRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current && !controlsRef.current?.isDragging) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.05
    }
  })

  return (
    <>
      <VisualAnchor />
      <group ref={groupRef}>
        {techData.map((tech, i) => (
          <TagLabel
            key={tech.name}
            tech={tech}
            index={i}
            total={techData.length}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </group>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.8}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export default function TechSphere() {
  return (
    <section
      id="techsphere"
      className="relative z-10"
      style={{ padding: '2rem 1rem 4rem', textAlign: 'center' }}
    >
      <h2
        style={{
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '2rem',
          color: 'var(--accent-alt)',
          textShadow: '0 0 20px var(--accent-alt)',
          marginBottom: '0.5rem',
        }}
      >
        ── 神经接口协议 ──
      </h2>
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          opacity: 0.6,
        }}
      >
        Hover to inspect · Drag to rotate · Scroll to zoom
      </p>
      <div
        style={{
          width: '100%',
          height: '520px',
          maxWidth: '620px',
          margin: '0 auto',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#0d0d1a' }}
        >
          <SphereScene />
        </Canvas>
      </div>
    </section>
  )
}
