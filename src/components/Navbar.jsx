import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'techstack', label: 'Stack' },
  { id: 'about', label: 'About' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 50)

      const hero = document.getElementById('hero')
      const projects = document.getElementById('projects')
      const gallery = document.getElementById('gallery')
      const tech = document.getElementById('techstack')
      const about = document.getElementById('about')

      const check = (el) => {
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 200 && rect.bottom >= 200
      }

      if (check(hero)) setActive('hero')
      else if (check(projects)) setActive('projects')
      else if (check(gallery)) setActive('gallery')
      else if (check(tech)) setActive('techstack')
      else if (check(about)) setActive('about')
    })
  }, [scrollY])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const isLight = theme === 'light'

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 2.8 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0.8rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-glow)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        onClick={() => scrollTo('hero')}
        style={{
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '0.9rem',
          color: 'var(--accent)',
          letterSpacing: '0.15em',
          cursor: 'pointer',
        }}
      >
        {'<'}VibeCoder{'/>'}
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.3rem 0',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.75rem',
              color: active === s.id ? 'var(--accent)' : 'var(--text-secondary)',
              textShadow: active === s.id ? '0 0 10px var(--accent)' : 'none',
              letterSpacing: '0.1em',
              borderBottom: active === s.id ? '1px solid var(--accent)' : '1px solid transparent',
              transition: 'all 0.3s ease',
            }}
          >
            [{s.label}]
          </button>
        ))}
        <div style={{ width: '1px', height: '16px', background: 'var(--text-secondary)', opacity: 0.3 }} />
        <button
          onClick={toggle}
          style={{
            background: 'none',
            border: '1px solid var(--border-glow)',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 10px var(--shadow-glow)',
          }}
          aria-label="Toggle theme"
        >
          {isLight ? '🌙' : '☀️'}
        </button>
      </div>
    </motion.nav>
  )
}
