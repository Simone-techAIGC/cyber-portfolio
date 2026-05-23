export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="footer"
      className="relative z-10"
      style={{
        padding: '3rem 2rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border-glow)',
        background: 'var(--bg-secondary)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'GitHub', url: 'https://github.com/Simone-techAIGC' },
          { label: 'Twitter', url: '#' },
          { label: 'Farcaster', url: '#' },
          { label: 'LinkedIn', url: '#' },
        ].map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.75rem',
              color: 'var(--accent)',
              opacity: 0.6,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '1')}
            onMouseLeave={(e) => (e.target.style.opacity = '0.6')}
          >
            [{s.label}]
          </a>
        ))}
      </div>
      <p style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.65rem',
        color: 'var(--text-secondary)',
        opacity: 0.5,
        letterSpacing: '0.15em',
      }}>
        © {year} VibeCoder · BUILT WITH CODE · DREAMING IN NEURONS
      </p>
      <p style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.6rem',
        color: 'var(--accent-alt)',
        opacity: 0.3,
        marginTop: '0.5rem',
        letterSpacing: '0.2em',
      }}>
        NEXUS-9 // SIGNAL FROM THE EDGE
      </p>
    </footer>
  )
}
