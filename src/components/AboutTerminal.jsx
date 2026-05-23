import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bioLines = [
  '> initializing VibeCoder personality matrix...',
  '> OK.',
  '',
  'I am a builder wandering the frontier where code meets consciousness.',
  '',
  'My laboratory is the terminal. My medium is the neural network.',
  'I believe vibecoding is the future of creation — a dance between',
  'human intent and machine imagination.',
  '',
  'I explore generative AI, neural architectures, cybernetic systems,',
  'and the quantum foam where bits become meaning.',
  '',
  'This space is my digital garden — a collection of experiments,',
  'artifacts, and half-formed dreams rendered in geometry and light.',
  '',
  '> STATUS: Currently probing the latent spaces of possibility.',
  '> TOOLKIT: Python · Three.js · Transformers · Noise · Curiosity',
  '> SIGNAL: Strong',
  '',
  '_',
]

const scrollingLogs = [
  '[INFO]  neural_corex v2.3.1 — latent diffusion OK',
  '[INFO]  quantum_entropy pool: 0.8472',
  '[INFO]  vibration damping: 98.7%',
  '[WARN]  high-dimensional drift detected — recalibrating',
  '[INFO]  embedding space: 768d → 1024d — expanded',
  '[INFO]  token stream: 47.2k/s avg',
  '[OK]    checkpoint saved: epoch_2049.pt',
  '[INFO]  gradient norm: 0.042',
  '[INFO]  attention heads: 16 active',
  '[WARN]  residual stream overflow — clipping at 3σ',
  '[INFO]  sampling temperature: 0.85',
  '[INFO]  top-k: 40 · top-p: 0.92',
  '[OK]    inference pipeline healthy',
  '[INFO]  GPU memory: 18.7/24.0 GB',
  '[INFO]  batch size: 32 · gradient accumulation: 4',
  '[WARN]  NaN detected in layer 17 — applying stable norm',
  '[INFO]  recovered — continuing optimization',
  '[OK]    loss: 0.037 · perplexity: 1.038',
  '[INFO]  model_merge: syncing LoRA weights',
  '[INFO]  hallucination threshold: 0.12',
  '[INFO]  context window: 128k tokens',
  '[WARN]  attention pattern anomaly — investigating',
  '[INFO]  self-repair mechanism engaged',
  '[OK]    system nominal',
  '[INFO]  agent_loop iteration 42 complete',
  '[INFO]  embedding similarity: 0.93 (target concept: "consciousness")',
  '[WARN]  semantic drift: 0.014 — within tolerance',
  '[OK]    everything is on fire but we are fine.',
]

const terminalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

function LogBackground() {
  const [logs, setLogs] = useState([])
  const intervalRef = useRef()

  useEffect(() => {
    const addLog = () => {
      setLogs((prev) => {
        const log = scrollingLogs[Math.floor(Math.random() * scrollingLogs.length)]
        const prefix = `[${new Date().toLocaleTimeString()}]`
        return [...prev.slice(-40), `${prefix} ${log}`]
      })
    }
    addLog()
    intervalRef.current = setInterval(addLog, 300 + Math.random() * 600)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ animation: 'scroll-logs 60s linear infinite' }}>
        {logs.map((log, i) => (
          <div
            key={i}
            className="text-[10px] leading-[1.2] opacity-20 whitespace-nowrap"
            style={{
              color: log.includes('[WARN]') ? '#ff8800' : log.includes('[OK]') ? '#00ff88' : '#00f0ff',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}

function TypewriterText({ lines, onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= lines.length) {
      onComplete?.()
      return
    }
    const line = lines[currentLine]
    if (!line) {
      setVisibleLines((prev) => [...prev, ''])
      setCurrentLine((prev) => prev + 1)
      setCurrentChar(0)
      return
    }
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar((prev) => {
          const next = prev + 1
          if (next >= line.length) {
            setVisibleLines((prevLines) => [...prevLines, line])
            setCurrentLine((prev) => prev + 1)
            setCurrentChar(0)
          } else {
            setVisibleLines((prevLines) => {
              const copy = [...prevLines]
              copy[copy.length - 1] = line.slice(0, next)
              return copy
            })
          }
          return next
        })
      }, 15 + Math.random() * 40)
      return () => clearTimeout(timer)
    }
  }, [currentLine, currentChar, lines, onComplete])

  return (
    <div className="font-mono text-xs md:text-sm leading-relaxed">
      {visibleLines.map((line, i) => (
        <div
          key={i}
          className={
            line.startsWith('>')
              ? 'text-neon-cyan opacity-80'
              : line === '_'
              ? 'text-neon-cyan animate-pulse'
              : 'text-gray-300'
          }
        >
          {line}
          {i === visibleLines.length - 1 && line !== '_' && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="text-neon-cyan ml-0.5"
            >
              ▊
            </motion.span>
          )}
        </div>
      ))}
    </div>
  )
}

function KeyResidue() {
  const [residues, setResidues] = useState([])
  const ref = useRef()

  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      const id = Math.random().toString(36).slice(2)
      const char = String.fromCharCode(e.keyCode).toLowerCase()
      const displayChar = Math.random() < 0.7 ? char : terminalChars[Math.floor(Math.random() * terminalChars.length)]
      const x = Math.random() * 80 + 10
      const y = Math.random() * 60 + 10
      setResidues((prev) => [...prev.slice(-15), { id, char: displayChar || '?', x, y }])
      setTimeout(() => {
        setResidues((prev) => prev.filter((r) => r.id !== id))
      }, 1500)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {residues.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.6, scale: 1.2 }}
            animate={{ opacity: 0, scale: 0.8, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute font-mono text-sm"
            style={{
              left: `${r.x}%`,
              top: `${r.y}%`,
              color: ['#00f0ff', '#ff00aa', '#00ff88', '#7000ff'][Math.floor(Math.random() * 4)],
              textShadow: `0 0 6px currentColor`,
            }}
          >
            {r.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function AboutTerminal() {
  const [typingDone, setTypingDone] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 px-4"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d1a 50%, #0a0a0f 100%)',
      }}
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Terminal header */}
        <div
          className="border border-[#00f0ff22] rounded-t-lg overflow-hidden"
          style={{
            background: 'rgba(10, 10, 15, 0.9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#00f0ff22]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[10px] opacity-30 tracking-wider">
              VIBECODER@NEXUS-9 ~ /home/consciousness
            </span>
          </div>
          <div className="p-4 md:p-6 min-h-[300px] max-h-[500px] overflow-y-auto">
            <LogBackground />
            <div className="relative z-10">
              <TypewriterText lines={bioLines} onComplete={() => setTypingDone(true)} />
            </div>
          </div>
        </div>

        {/* Interactive input (visual only) */}
        <div
          className="mt-4 border border-[#ff00aa22] rounded-lg overflow-hidden"
          style={{
            background: 'rgba(10, 10, 15, 0.9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="p-4 relative">
            <KeyResidue />
            <div className="flex items-center gap-2 relative z-10">
              <span className="text-neon-cyan font-mono text-xs md:text-sm opacity-70">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type anything — watch the echoes..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs md:text-sm text-neon-cyan placeholder-gray-600"
                style={{ caretColor: '#00f0ff' }}
              />
              {inputValue && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] text-neon-pink font-mono opacity-50"
                >
                  Input registered in Nexus-9
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center mt-16">
        <p className="font-mono text-[10px] opacity-20 tracking-[0.3em]">
          BUILT WITH CODE · DREAMING IN NEURONS · SIGNAL FROM THE EDGE
        </p>
        <div className="flex justify-center gap-6 mt-4">
          {[
            { label: 'GitHub', url: 'https://github.com/Simone-techAIGC' },
            { label: 'Twitter', url: '#' },
            { label: 'Farcaster', url: '#' },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ opacity: 1, y: -2 }}
              className="font-mono text-xs opacity-30 hover:opacity-70 transition-all"
              style={{ color: '#00f0ff', textDecoration: 'none' }}
            >
              [{s.label}]
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
