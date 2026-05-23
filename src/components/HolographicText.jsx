import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function HolographicText({ text, position = [0, 0, 0], color = '#00f0ff', size = 0.5 }) {
  const groupRef = useRef()
  const canvas = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 256
    const ctx = c.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, 1024, 256)
      ctx.font = `600 ${size * 120}px "Orbitron", sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.shadowColor = color
      ctx.shadowBlur = 30
      ctx.fillStyle = color
      ctx.fillText(text, 512, 128)

      ctx.shadowBlur = 60
      ctx.fillStyle = color
      ctx.fillText(text, 512, 128)

      ctx.shadowBlur = 0
      ctx.fillStyle = '#ffffff'
      ctx.fillText(text, 512, 128)

      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(10, 10, 15, ${0.1 + Math.random() * 0.3})`
        ctx.fillRect(Math.random() * 1024, Math.random() * 256, Math.random() * 4, Math.random() * 2)
      }
    }
    return c
  }, [text, color, size])

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas)
    t.needsUpdate = true
    return t
  }, [canvas])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    groupRef.current.children.forEach((child, i) => {
      if (child.isSprite) {
        const opacity = 0.7 + Math.sin(t * 2 + i) * 0.15
        child.material.opacity = opacity
        child.material.needsUpdate = true
      }
    })
  })

  return (
    <group ref={groupRef} position={position}>
      <sprite scale={[4, 1, 1]}>
        <spriteMaterial
          map={texture}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  )
}

export function GlitchText({ text, position = [0, 0, 0], color = '#ff00aa', size = 0.3 }) {
  const canvas = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 128
    const ctx = c.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, 1024, 128)
      ctx.font = `400 ${size * 100}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.shadowColor = color
      ctx.shadowBlur = 20
      ctx.fillStyle = color
      ctx.fillText(text, 512, 64)

      ctx.shadowBlur = 0
      ctx.fillStyle = '#ffffff'
      ctx.fillText(text, 512, 64)
    }
    return c
  }, [text, color, size])

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas)
    t.needsUpdate = true
    return t
  }, [canvas])

  return (
    <sprite position={position} scale={[2.5, 0.35, 1]}>
      <spriteMaterial map={texture} transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  )
}
