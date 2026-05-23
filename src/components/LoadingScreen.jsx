import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|&%$#@!'

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('matrix')
  const [scanlines, setScanlines] = useState([])
  const [dots, setDots] = useState('')

  const matrixColumns = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (i / 40) * 100,
      delay: Math.random() * 2,
      speed: 0.5 + Math.random() * 1,
      length: 8 + Math.floor(Math.random() * 15),
    }))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 5 ? '.' : prev + '.'))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('scan'), 1200)
    const t2 = setTimeout(() => setPhase('done'), 2000)
    const t3 = setTimeout(() => onComplete(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#0a0a0f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Matrix rain columns */}
        {phase === 'matrix' && matrixColumns.map((col) => (
          <div key={col.id} style={{
            position: 'absolute',
            left: `${col.x}%`,
            top: 0,
            width: 20,
            animation: `matrix-fall ${1.5 * col.speed}s linear ${col.delay}s infinite`,
          }}>
            {Array.from({ length: col.length }, (_, i) => (
              <span key={i} style={{
                display: 'block',
                color: i === col.length - 1 ? '#00f0ff' : '#00f0ff55',
                fontSize: '10px',
                fontFamily: '"JetBrains Mono", monospace',
                opacity: 1 - (i / col.length) * 0.8,
              }}>
                {chars[Math.floor(Math.random() * chars.length)]}
              </span>
            ))}
          </div>
        ))}

        {/* Scan line sweep */}
        {phase === 'scan' && (
          <motion.div
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(180deg, transparent, #00f0ff88, transparent)',
              boxShadow: '0 0 30px #00f0ff',
            }}
          />
        )}

        {/* Boot text */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.8rem',
              color: '#00f0ff',
              opacity: 0.7,
              marginBottom: '0.5rem',
              letterSpacing: '0.2em',
            }}>
              NEXUS-9 BOOT SEQUENCE
            </p>
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '1rem',
              color: '#00f0ff',
              textShadow: '0 0 10px #00f0ff',
            }}>
              {phase === 'matrix' ? 'Initializing neural interfaces' : phase === 'scan' ? 'Scanning consciousness matrix' : 'System ready'}
              <span style={{ opacity: 0.6 }}>{dots}</span>
            </p>
            {phase === 'done' && (
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: '1.2rem',
                  color: '#ff00aa',
                  textShadow: '0 0 20px #ff00aa',
                  marginTop: '1rem',
                }}
              >
                ENTER NEXUS-9
              </motion.p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
