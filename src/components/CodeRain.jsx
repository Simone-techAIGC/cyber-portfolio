import { useRef, useMemo, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { useMousePosition } from '../hooks/useMousePosition'

export default function CodeRain({ count = 800, spread = 12 }) {
  const ref = useRef()
  const mouse = useMousePosition()
  const scroll = useScroll()
  const { viewport } = useThree()

  const [positions, speeds, offsets] = useMemo(() => {
    const p = new Float32Array(count * 3)
    const s = new Float32Array(count)
    const o = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * spread
      p[i * 3 + 1] = Math.random() * 8 - 2
      p[i * 3 + 2] = -2 - Math.random() * 4
      s[i] = 0.3 + Math.random() * 0.7
      o[i] = Math.random() * 100
    }
    return [p, s, o]
  }, [count, spread])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    const t = clock.getElapsedTime()
    const scrollOffset = scroll.offset * 10

    for (let i = 0; i < count; i++) {
      let y = (pos[i * 3 + 1] - speeds[i] * 0.02 * 60 * 0.016 - 0.01)
      if (i % 3 === 0) y -= scrollOffset * 0.02
      if (y < -3) y = 5
      pos[i * 3] += (mouse.x - 0.5) * 0.003 * (i % 2 === 0 ? 1 : -1)
      if (pos[i * 3] > spread / 2) pos[i * 3] = -spread / 2
      if (pos[i * 3] < -spread / 2) pos[i * 3] = spread / 2
      pos[i * 3 + 1] = y
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  const colors = ['#00f0ff', '#00ff88', '#ff00aa', '#7000ff']

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00f0ff"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export function CodeRainChars({ count = 300, spread = 10 }) {
  const groupRef = useRef()
  const mouse = useMousePosition()

  const chars = useMemo(() => {
    const c = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|&%$#@!'
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({
        char: c[Math.floor(Math.random() * c.length)],
        x: (Math.random() - 0.5) * spread,
        y: Math.random() * 10 - 3,
        z: -1 - Math.random() * 3,
        speed: 0.5 + Math.random() * 1.5,
        size: 0.08 + Math.random() * 0.12,
      })
    }
    return arr
  }, [count, spread])

  const textRefs = useRef([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    chars.forEach((c, i) => {
      c.y -= c.speed * 0.005
      c.x += (mouse.x - 0.5) * 0.002 * (i % 2 === 0 ? 1 : -1)
      if (c.y < -4) c.y = 6
      if (Math.abs(c.x) > spread / 2) c.x = -c.x * 0.9
    })
  })

  return (
    <group ref={groupRef}>
      {chars.map((c, i) => (
        <sprite key={i} position={[c.x, c.y, c.z]} scale={[c.size * 3, c.size * 3, 1]}>
          <spriteMaterial
            transparent
            opacity={0.25 + Math.random() * 0.2}
            color="#00f0ff"
            depthWrite={false}
          >
          </spriteMaterial>
        </sprite>
      ))}
    </group>
  )
}
