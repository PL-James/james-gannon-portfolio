import { Hero } from './components/Hero'
import { About } from './components/About'
import { Timeline } from './components/Timeline'
import { Expertise } from './components/Expertise'
import { Affiliations } from './components/Affiliations'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="noise-bg min-h-screen">
      <Hero />
      <About />
      <Timeline />
      <Expertise />
      <Affiliations />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
