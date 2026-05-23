import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function CustomCursor() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [trails, setTrails] = useState([])
  const trailId = useRef(0)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 300, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 20 })

  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)
  const ringSpringX = useSpring(ringX, { stiffness: 150, damping: 15 })
  const ringSpringY = useSpring(ringY, { stiffness: 150, damping: 15 })

  const lastTrail = useRef(0)

  useEffect(() => {
    setVisible(true)

    const move = (e) => {
      const x = e.clientX
      const y = e.clientY
      cursorX.set(x)
      cursorY.set(y)
      ringX.set(x)
      ringY.set(y)

      const now = Date.now()
      if (now - lastTrail.current > 80) {
        lastTrail.current = now
        const id = trailId.current++
        setTrails((prev) => [...prev.slice(-8), { id, x, y }])
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== id))
        }, 800)
      }
    }

    const over = (e) => {
      if (e.target.closest('a, button, input, [role="button"], [tabindex]:not([tabindex="-1"])')) {
        setHovering(true)
      }
    }

    const out = () => setHovering(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)

    const style = document.createElement('style')
    style.textContent = '* { cursor: none !important; }'
    document.head.appendChild(style)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      style.remove()
    }
  }, [])

  const ringColor = hovering ? '#ff00aa' : (theme === 'light' ? '#6666ff' : '#00f0ff')
  const ringSize = hovering ? 48 : 32

  return (
    <>
      {trails.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.5, scale: 1, x: t.x - 2, y: t.y - 2 }}
          animate={{ opacity: 0, scale: 0, x: t.x - 2, y: t.y - 2 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: ringColor,
            pointerEvents: 'none',
            zIndex: 99998,
            boxShadow: `0 0 6px ${ringColor}`,
          }}
        />
      ))}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: ringColor,
          boxShadow: `0 0 10px ${ringColor}`,
          pointerEvents: 'none',
          zIndex: 99999,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: ringColor,
          boxShadow: hovering
            ? `0 0 20px ${ringColor}, inset 0 0 10px ${ringColor}33`
            : `0 0 10px ${ringColor}44`,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{
          position: 'fixed',
          left: ringSpringX,
          top: ringSpringY,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `1.5px solid #00f0ff`,
          pointerEvents: 'none',
          zIndex: 99999,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
