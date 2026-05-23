import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import CyberBackground from './components/CyberBackground'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import TechStack from './components/TechStack'
import AboutTerminal from './components/AboutTerminal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'

function AppContent() {
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <CustomCursor />
      <Navbar />

      <div className="relative min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ background: theme === 'dark' ? '#0a0a0f' : 'var(--canvas-bg)' }}
        >
          <Canvas
            camera={{ position: [0, 2, 12], fov: 50 }}
            dpr={[1, 1.2]}
            gl={{ antialias: false, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <CyberBackground />
          </Canvas>
        </div>

        <div className="relative z-10">
          <Hero />
          <Projects />
          <Gallery />
          <TechStack />
          <AboutTerminal />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
