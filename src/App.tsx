import { lazy, Suspense } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollProgressBar } from './components/ui/ScrollProgressBar'
import { Hero } from './components/sections/Hero'
import { useTheme } from './hooks/useTheme'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useActiveSection } from './hooks/useActiveSection'

// Lazy-load below-the-fold sections for performance
const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.About })))
const CoreSkills = lazy(() =>
  import('./components/sections/CoreSkills').then((m) => ({ default: m.CoreSkills })),
)
const TechStack = lazy(() =>
  import('./components/sections/TechStack').then((m) => ({ default: m.TechStack })),
)
const FeaturedProjects = lazy(() =>
  import('./components/sections/FeaturedProjects').then((m) => ({ default: m.FeaturedProjects })),
)
const Experience = lazy(() =>
  import('./components/sections/Experience').then((m) => ({ default: m.Experience })),
)
const Marketing = lazy(() =>
  import('./components/sections/Marketing').then((m) => ({ default: m.Marketing })),
)
const TerminalSection = lazy(() =>
  import('./components/sections/TerminalSection').then((m) => ({ default: m.TerminalSection })),
)
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact })),
)

const sectionIds = [
  'hero',
  'about',
  'skills',
  'stack',
  'projects',
  'experience',
  'marketing',
  'contact',
]

function SectionLoader() {
  return <div className="section-padding mx-auto max-w-6xl h-32 animate-pulse rounded-2xl bg-bg-card/50" />
}

/** Main application shell — single-page portfolio layout. */
export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const scrollProgress = useScrollProgress()
  const activeSection = useActiveSection(sectionIds)

  return (
    <>
      <ScrollProgressBar progress={scrollProgress} />
      <Navbar activeSection={activeSection} isDark={isDark} onToggleTheme={toggleTheme} />

      <main>
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <About />
          <CoreSkills />
          <TechStack />
          <FeaturedProjects />
          <Experience />
          <Marketing />
          <TerminalSection />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
