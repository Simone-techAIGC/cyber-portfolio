import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    title: 'VibeCoder AI',
    desc: '自然语言生成全栈应用，赛博空间原生 IDE。',
    tags: ['React', 'Node.js', 'OpenAI'],
    category: 'AI',
    github: 'https://github.com/Simone-techAIGC',
    live: '#',
    coverColors: ['#00f0ff', '#7000ff'],
  },
  {
    title: 'NeuroMesh',
    desc: '去中心化神经网络训练网络，P2P 算力共享。',
    tags: ['Rust', 'Web3', 'Three.js'],
    category: 'Web3',
    github: 'https://github.com/Simone-techAIGC',
    live: '#',
    coverColors: ['#ff00aa', '#7000ff'],
  },
  {
    title: 'QuantumUI',
    desc: '量子计算可视化控制台，支持拖拽量子电路。',
    tags: ['Vue 3', 'D3.js', 'Qiskit'],
    category: '3D',
    github: 'https://github.com/Simone-techAIGC',
    live: '#',
    coverColors: ['#00ff88', '#00f0ff'],
  },
  {
    title: 'CypherOS',
    desc: '基于 Rust 的轻量级操作系统，内置加密引擎。',
    tags: ['Rust', 'Kernel', 'Cryptography'],
    category: 'Tool',
    github: 'https://github.com/Simone-techAIGC',
    live: '#',
    coverColors: ['#ff8800', '#ff0066'],
  },
  {
    title: 'DreamDiffusion',
    desc: '脑电波信号到图像的生成式 AI 管线。',
    tags: ['Python', 'Diffusion', 'EEG'],
    category: 'AI',
    github: 'https://github.com/Simone-techAIGC',
    live: '#',
    coverColors: ['#7000ff', '#ff00aa'],
  },
  {
    title: 'NeonDB',
    desc: '实时图数据库，边缘计算优先。',
    tags: ['Go', 'Graph', 'WebSocket'],
    category: 'Tool',
    github: 'https://github.com/Simone-techAIGC',
    live: '#',
    coverColors: ['#00f0ff', '#00ff88'],
  },
  {
    title: 'VoxelForge',
    desc: '体素引擎编辑器，基于 WebGL 的 Minecraft 风格世界构建器。',
    tags: ['Three.js', 'WebGL', 'React'],
    category: '3D',
    github: 'https://github.com/Simone-techAIGC',
    live: '#',
    coverColors: ['#ff0066', '#ff8800'],
  },
  {
    title: 'ChainVault',
    desc: '去中心化密钥管理系统，多方计算签名。',
    tags: ['Solidity', 'Rust', 'Web3'],
    category: 'Web3',
    github: 'https://github.com/Simone-techAIGC',
    live: '#',
    coverColors: ['#7000ff', '#00f0ff'],
  },
]

const categories = ['All', 'AI', '3D', 'Web3', 'Tool']

function CoverCanvas({ colors }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, colors[0])
    grad.addColorStop(0.5, colors[1])
    grad.addColorStop(1, colors[0])
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.15})`
      ctx.fillRect(
        Math.random() * w,
        Math.random() * h,
        Math.random() * 6 + 2,
        Math.random() * 2 + 1,
      )
    }

    for (let i = 0; i < 8; i++) {
      ctx.beginPath()
      ctx.arc(
        Math.random() * w,
        Math.random() * h,
        Math.random() * 20 + 5,
        0,
        Math.PI * 2,
      )
      ctx.strokeStyle = `rgba(255,255,255,${0.1 + Math.random() * 0.2})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.moveTo(Math.random() * w, Math.random() * h)
      ctx.lineTo(Math.random() * w, Math.random() * h)
      ctx.strokeStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.1})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }, [colors])

  return (
    <canvas
      ref={ref}
      width={400}
      height={200}
      style={{
        width: '100%',
        height: '140px',
        borderRadius: '8px',
        marginBottom: '1rem',
        display: 'block',
        filter: 'brightness(0.8) contrast(1.2)',
      }}
    />
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <section
      id="projects"
      className="relative z-10"
      style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}
    >
      <h2
        style={{
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '2.5rem',
          color: 'var(--accent)',
          textShadow: '0 0 20px var(--accent)',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        ── 项目遗迹 ──
      </h2>

      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.8rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background:
                filter === cat ? 'var(--accent)' : 'transparent',
              border: `1px solid var(--accent)`,
              color: filter === cat ? '#0a0a1a' : 'var(--accent)',
              padding: '0.3rem 1rem',
              borderRadius: '20px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: filter === cat ? '0 0 15px var(--accent)' : 'none',
            }}
          >
            [{cat}]
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px var(--accent-alt)',
                borderColor: 'var(--accent-alt)',
              }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glow)',
                borderRadius: '12px',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-glow)',
                transition: 'border-color 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Vibecoding badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'var(--accent-alt)',
                  color: '#fff',
                  fontSize: '0.55rem',
                  fontFamily: '"Orbitron", sans-serif',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px',
                  opacity: 0.7,
                  letterSpacing: '0.05em',
                }}
              >
                VIBE
              </div>

              <CoverCanvas colors={p.coverColors} />

              <h3
                style={{
                  color: 'var(--accent)',
                  fontFamily: '"Orbitron", sans-serif',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem',
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: '0.85rem',
                  opacity: 0.8,
                  fontFamily: '"JetBrains Mono", monospace',
                  color: 'var(--text-secondary)',
                }}
              >
                {p.desc}
              </p>
              <div
                style={{
                  margin: '1rem 0',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(255,0,255,0.15)',
                      border: '1px solid var(--accent-alt)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      color: 'var(--accent-alt)',
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                  }}
                >
                  <FiGithub /> 源码
                </a>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent-alt)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                  }}
                >
                  <FiExternalLink /> 演示
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
