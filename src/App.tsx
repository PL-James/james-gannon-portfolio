import { Hero } from './components/Hero'
import { About } from './components/About'
import { Timeline } from './components/Timeline'
import { Expertise } from './components/Expertise'
import { Affiliations } from './components/Affiliations'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen relative">
      <div className="dot-grid" />
      <div className="relative z-10">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Timeline />
        <div className="section-divider" />
        <Expertise />
        <div className="section-divider" />
        <Affiliations />
        <div className="section-divider" />
        <Contact />
        <div className="footer-line" />
        <Footer />
      </div>
    </div>
  )
}

export default App
