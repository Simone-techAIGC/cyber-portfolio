import { motion } from 'framer-motion'

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Three.js',
  'Node.js', 'Python', 'Solidity', 'Rust', 'Docker',
  'AWS', 'WebGL', 'Figma', 'Blender', 'AI/ML',
  'Tailwind', 'GraphQL', 'PostgreSQL', 'Redis', 'Kubernetes',
]

export default function TechStack() {
  return (
    <section id="techstack" className="relative z-10" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h2 style={{
        fontFamily: '"Orbitron", sans-serif',
        fontSize: '2.5rem',
        color: '#f0f',
        textShadow: '0 0 20px #f0f',
        marginBottom: '2rem',
      }}>
        ── 神经接口协议 ──
      </h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            style={{
              background: 'linear-gradient(135deg, #0ff 0%, #f0f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              border: '1px solid #0ff',
              padding: '0.5rem 1.2rem',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 0 15px rgba(0,255,255,0.4)',
              backdropFilter: 'blur(5px)',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
