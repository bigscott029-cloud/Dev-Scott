import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  X,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa'
import { siteConfig } from './config/site'

const resumeUrl = '/big-scott-resume.pdf'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About Me', path: '/about' },
]

const EXPERIENCE_START_YEAR = 2024

type ProjectImage = {
  label: string
  src: string
  note: string
}

const projects = [
  {
    slug: 'campushub',
    title: 'CampusHUB',
    type: 'Full-stack web platform',
    status: 'Active development',
    started: 2024,
    link: 'https://campushub-connect.onrender.com',
    icon: Layers3,
    imageTone: 'campus',
    images: {
      hero: '/projects/campushub/hero.svg',
      gallery: [
        { label: 'Product Screen', src: '/projects/campushub/product-screen.svg', note: 'Replace with a screenshot of the main CampusHUB interface.' },
        { label: 'Architecture Diagram', src: '/projects/campushub/architecture.svg', note: 'Replace with a platform architecture or user-flow diagram.' },
        { label: 'Deployment Notes', src: '/projects/campushub/deployment.svg', note: 'Replace with deployment, testing, or maintenance screenshots.' },
      ],
    },
    summary:
      'A student-focused digital ecosystem that connects campus communities through social content, engagement, and business opportunities.',
    intro:
      'CampusHUB is designed as a campus operating layer: a place where students discover what is happening, connect with each other, distribute content, and create business opportunities inside their local academic community.',
    problem:
      'Campus communities often depend on scattered WhatsApp groups, word of mouth, and fragmented pages. That makes discovery weak, content hard to organize, and student-led opportunities difficult to scale.',
    solution:
      'I built CampusHUB as a unified social and engagement platform with a scalable product direction for campus communities, future mobile expansion, and broader rollout beyond one school.',
    role: 'Product architecture, frontend engineering, backend integration, deployment, and ongoing maintenance.',
    stack: ['React', 'Node.js', 'REST APIs', 'Responsive UI', 'Deployment', 'Community systems'],
    highlights: [
      'Designed a student-first platform model for social content, engagement, and business discovery.',
      'Built the product to support active maintenance and future expansion into mobile experiences.',
      'Structured the platform around scalable campus use rather than a single-purpose landing page.',
    ],
    architecture: [
      'User-facing platform shell',
      'Student and community content flows',
      'Engagement and discovery layer',
      'Business opportunity surfaces',
      'Deployment and maintenance workflow',
    ],
    challenges: [
      'Balancing social product flexibility with a clear first version.',
      'Designing for future scale while keeping the current platform understandable.',
      'Creating a credible student ecosystem without overcomplicating early workflows.',
    ],
    lessons: [
      'Community software needs trust, speed, and obvious paths to contribution.',
      'Campus products should leave room for local behaviors instead of forcing rigid patterns.',
      'A product can start narrow while still being architected for larger markets.',
    ],
    roadmap: ['Mobile app direction', 'Creator and vendor tools', 'Campus onboarding flows', 'Analytics for engagement'],
  },
  {
    slug: 'telegram-automation-platform',
    title: 'Telegram Automation Platform',
    type: 'Python automation system',
    status: 'Production workflow',
    started: 2024,
    link: 'https://t.me/glamour_rbot',
    icon: Bot,
    imageTone: 'telegram',
    images: {
      hero: '/projects/telegram-automation-platform/hero.svg',
      gallery: [
        { label: 'Bot Workflow', src: '/projects/telegram-automation-platform/bot-workflow.svg', note: 'Replace with a safe screenshot of the Telegram bot flow.' },
        { label: 'Automation Map', src: '/projects/telegram-automation-platform/automation-map.svg', note: 'Replace with a workflow diagram showing triggers and responses.' },
        { label: 'Operations View', src: '/projects/telegram-automation-platform/operations-view.svg', note: 'Replace with logs, testing, or redacted transaction workflow media.' },
      ],
    },
    summary:
      'A Telegram API automation platform for messaging, workflow management, repetitive operations, and transaction support.',
    intro:
      'This platform turns Telegram from a chat interface into an operational control surface. It automates repeated customer and workflow interactions so business activity can continue with minimal human input.',
    problem:
      'Manual messaging and transaction handling create delays, missed follow-ups, and unnecessary workload. Repeated chat-based operations are especially painful when volume grows.',
    solution:
      'I developed Python automation around Telegram APIs to manage messaging workflows, reduce manual steps, and support transactions that generated over 150k in a single month.',
    role: 'Python automation engineering, Telegram bot architecture, workflow design, and operational support.',
    stack: ['Python', 'Telegram API', 'Bot workflows', 'Automation', 'Transactions', 'Process design'],
    highlights: [
      'Automated repetitive messaging and operational tasks inside Telegram.',
      'Supported business transactions with minimal human input.',
      'Designed the system around practical workflows rather than novelty bot commands.',
    ],
    architecture: [
      'Telegram bot command layer',
      'Workflow orchestration logic',
      'Message and transaction triggers',
      'Operator control paths',
      'Error handling and manual fallback',
    ],
    challenges: [
      'Keeping automated flows reliable inside a fast-moving chat environment.',
      'Designing controls that operators can trust during real transactions.',
      'Preventing automation from becoming rigid when business cases change.',
    ],
    lessons: [
      'Automation is most valuable when it removes repeated decisions, not human judgment.',
      'Chat platforms can become serious business interfaces when workflows are designed carefully.',
      'Operational automation needs simple recovery paths.',
    ],
    roadmap: ['Reusable bot modules', 'Analytics dashboard', 'Role-based controls', 'Stronger logging'],
  },
  {
    slug: 'adb-hydra',
    title: 'ADB Hydra',
    type: 'Developer tooling',
    status: 'Local build available',
    started: 2024,
    link: '',
    icon: Network,
    imageTone: 'adb',
    images: {
      hero: '/projects/adb-hydra/hero.svg',
      gallery: [
        { label: 'CLI Screen', src: '/projects/adb-hydra/cli-screen.svg', note: 'Replace with a terminal screenshot of ADB Hydra running.' },
        { label: 'Device Flow', src: '/projects/adb-hydra/device-flow.svg', note: 'Replace with a diagram of discovery, connection, and recovery.' },
        { label: 'Testing Capture', src: '/projects/adb-hydra/testing-capture.svg', note: 'Replace with Android device testing or ADB workflow evidence.' },
      ],
    },
    summary:
      'An intelligent multi-device ADB Wi-Fi management system with automatic discovery, persistent connections, and self-recovery.',
    intro:
      'ADB Hydra is a developer utility built to make Android testing faster and less fragile. It manages wireless device connections so developers can spend more time building and less time reconnecting devices.',
    problem:
      'Multi-device Android testing becomes annoying when physical cables, dropped Wi-Fi debugging sessions, and repeated ADB commands interrupt development.',
    solution:
      'I engineered a Python-based ADB Wi-Fi management framework with discovery, persistent connection handling, and recovery mechanisms for smoother Android app testing.',
    role: 'Automation architecture, Python scripting, CLI workflow design, Android debugging workflow research.',
    stack: ['Python', 'ADB', 'Android', 'CLI', 'Networking', 'Automation'],
    highlights: [
      'Built around multi-device workflows instead of one-device convenience scripts.',
      'Added self-recovery thinking for dropped or unstable debugging sessions.',
      'Created to support faster development and testing of applications.',
    ],
    architecture: [
      'Device discovery layer',
      'Connection registry',
      'ADB command execution flow',
      'Health checks',
      'Self-recovery routines',
    ],
    challenges: [
      'ADB state can be inconsistent across devices and networks.',
      'Wireless debugging tools need to fail visibly and recover quickly.',
      'Developer tooling must be fast enough to feel invisible.',
    ],
    lessons: [
      'Good tooling removes friction from the developer’s body, not just the codebase.',
      'Recovery paths matter as much as happy paths in automation.',
      'A small CLI can create major speed gains when it targets a repeated pain point.',
    ],
    roadmap: ['Packaged release', 'Device groups', 'Config profiles', 'Test runner integrations'],
  },
  {
    slug: 'valuxchange',
    title: 'ValuXchange',
    type: 'Business platform',
    status: 'Live',
    started: 2024,
    link: 'https://valuxchange.vercel.app',
    icon: Database,
    imageTone: 'value',
    images: {
      hero: '/projects/valuxchange/hero.svg',
      gallery: [
        { label: 'Landing Screen', src: '/projects/valuxchange/landing-screen.svg', note: 'Replace with a screenshot of the ValuXchange homepage or service page.' },
        { label: 'Transaction Flow', src: '/projects/valuxchange/transaction-flow.svg', note: 'Replace with a diagram of inquiry, exchange, and follow-up flow.' },
        { label: 'Business Context', src: '/projects/valuxchange/business-context.svg', note: 'Replace with supporting service, admin, or deployment media.' },
      ],
    },
    summary:
      'An exchange service hub built to streamline digital asset exchange and financial transaction flows for local and international users.',
    intro:
      'ValuXchange extends an existing exchange service into a clearer digital platform, helping users understand the service, start transactions, and move through the business flow with more confidence.',
    problem:
      'Financial exchange services need trust, clarity, and streamlined transaction paths. Without a focused digital hub, users rely on scattered explanations and manual back-and-forth.',
    solution:
      'I built a responsive business platform that presents the service clearly, supports conversion, and creates a stronger digital layer for local and international exchange users.',
    role: 'Frontend engineering, service experience design, responsive UI, deployment, and product positioning.',
    stack: ['React', 'Vercel', 'Responsive UI', 'Business workflows', 'Service design'],
    highlights: [
      'Built a focused digital platform as an extension of an existing company.',
      'Improved service presentation and transaction starting points.',
      'Designed for local and international user trust.',
    ],
    architecture: [
      'Service presentation layer',
      'Conversion and inquiry paths',
      'Trust and credibility sections',
      'Responsive frontend deployment',
      'Future transaction workflow hooks',
    ],
    challenges: [
      'Financial service interfaces must feel credible without becoming visually heavy.',
      'The platform needed to support real business goals, not just look polished.',
      'Transaction flows require clarity before deeper automation is introduced.',
    ],
    lessons: [
      'Business platforms should reduce hesitation before they try to impress.',
      'Trust is a core feature in exchange products.',
      'A clean frontend can become the base for future operational automation.',
    ],
    roadmap: ['Rate engine', 'Admin dashboard', 'Transaction tracking', 'Automated status updates'],
  },
]

const testimonials = [
  {
    quote:
      'Big Scott approaches software like infrastructure. He thinks beyond the screen and builds workflows that actually reduce manual work.',
    name: 'Automation Client',
    role: 'Operations workflow',
  },
  {
    quote:
      'The work was not just design or code. The platform helped us explain the business more clearly and gave users a better path to start.',
    name: 'Business Platform Stakeholder',
    role: 'Exchange service',
  },
  {
    quote:
      'He is strong at turning messy ideas into structured product systems, especially when automation and business logic are involved.',
    name: 'Product Collaborator',
    role: 'Web and product build',
  },
]

const skills = [
  {
    title: 'Software Engineering',
    icon: Code2,
    items: ['Full-stack web development', 'REST API integration', 'Frontend systems', 'Backend workflows'],
  },
  {
    title: 'Automation',
    icon: Zap,
    items: ['Python workflow automation', 'Telegram bot engineering', 'CLI tools', 'Process automation'],
  },
  {
    title: 'Mobile And Embedded',
    icon: MonitorSmartphone,
    items: ['React Native direction', 'Android builds', 'ADB tooling', 'Arduino C/C++'],
  },
  {
    title: 'Product And Growth',
    icon: BriefcaseBusiness,
    items: ['Product strategy', 'Community building', 'Lead generation', 'Marketing funnels'],
  },
]

const techStack = [
  'Python',
  'JavaScript',
  'TypeScript',
  'SQL',
  'HTML5',
  'CSS3',
  'React',
  'Node.js',
  'Express',
  'React Native',
  'PostgreSQL',
  'SQLite',
  'Firebase',
  'Git',
  'Linux',
  'Vercel',
  'Arduino IDE',
  'Telegram API',
]

function getPath() {
  return window.location.hash.replace(/^#/, '') || '/'
}

function useHashPath() {
  const [path, setPath] = useState(getPath)

  useEffect(() => {
    const update = () => {
      setPath(getPath())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  return path
}

function navigate(path: string) {
  window.location.hash = path
}

function yearsSince(startYear: number) {
  return Math.max(new Date().getFullYear() - startYear, 0)
}

function projectYearLabel(project: (typeof projects)[number]) {
  const currentYear = new Date().getFullYear()
  return project.started >= currentYear ? `${project.started}` : `${project.started} - Present`
}

export default function App() {
  const path = useHashPath()

  return (
    <div className="min-h-screen bg-bg-primary text-text">
      <SiteBackground />
      <Navbar path={path} />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <Page path={path} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

function Page({ path }: { path: string }) {
  if (path === '/projects') return <ProjectsPage />
  if (path.startsWith('/projects/')) return <ProjectDetailPage slug={path.split('/').at(-1) ?? ''} />
  if (path === '/about') return <AboutPage />
  return <HomePage />
}

function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(230,57,70,.17),transparent_26%),radial-gradient(circle_at_84%_10%,rgba(43,166,255,.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,.035),transparent_34%)]" />
      <div className="absolute inset-0 bg-grid opacity-75" />
      <div className="absolute inset-0 bg-topo opacity-30" />
      <motion.div
        className="scan-beam"
        animate={{ y: ['-18vh', '118vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

function Navbar({ path }: { path: string }) {
  const [open, setOpen] = useState(false)
  const active = (target: string) => path === target || (target !== '/' && path.startsWith(target))

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-[#050505]/86 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button className="flex items-center gap-3 text-left" onClick={() => navigate('/')} aria-label="Home">
          <span className="grid h-10 w-10 place-items-center border border-accent/45 bg-accent/12 text-accent">
            <Sparkles size={18} />
          </span>
          <span>
            <span className="block text-sm font-bold tracking-[.2em] text-white">BIG SCOTT</span>
            <span className="block text-[11px] font-semibold text-muted">Software systems and automation</span>
          </span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-link ${active(item.path) ? 'nav-link-active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <SocialLink href={siteConfig.github} label="GitHub">
            <FaGithub size={17} />
          </SocialLink>
          <a href={resumeUrl} download className="primary-small">
            <Download size={15} />
            Download Resume
          </a>
        </div>

        <button className="grid h-10 w-10 place-items-center border border-border text-muted md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-black/70 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside
              className="ml-auto flex h-full w-[min(88vw,380px)] flex-col border-l border-border bg-[#101010] p-5"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-bold text-white">Big Scott</span>
                <button className="grid h-9 w-9 place-items-center border border-border text-muted" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={18} />
                </button>
              </div>
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path)
                      setOpen(false)
                    }}
                    className={`mobile-link ${active(item.path) ? 'mobile-link-active' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <a href={resumeUrl} download className="primary-button mt-6">
                <Download size={18} />
                Download Resume
              </a>
              <div className="mt-auto grid grid-cols-3 gap-2">
                <SocialLink href={siteConfig.github} label="GitHub"><FaGithub size={17} /></SocialLink>
                <SocialLink href={siteConfig.linkedin} label="LinkedIn"><FaLinkedin size={17} /></SocialLink>
                <SocialLink href={siteConfig.telegram} label="Telegram"><FaTelegram size={17} /></SocialLink>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function HomePage() {
  const experienceYears = yearsSince(EXPERIENCE_START_YEAR)
  const projectCount = siteConfig.projectsCount

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[1fr_.86fr] lg:px-8">
          <div>
            <Kicker icon={ShieldCheck}>
              {experienceYears}yrs+ experience · {projectCount}+ successful projects
            </Kicker>
            <h1 className="mt-7 max-w-5xl text-5xl font-extrabold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
              I build software systems that turn ideas into useful products.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-readable">
              I am Eluem Chike, also known as Big Scott: a full-stack software engineer,
              Python automation engineer, mobile developer, and product builder focused on
              scalable web apps, Telegram automation, developer tooling, and business platforms.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionButton onClick={() => navigate('/projects')} icon={<ArrowRight size={18} />}>
                View Projects
              </ActionButton>
              <ActionButton href={resumeUrl} download variant="secondary" icon={<Download size={18} />}>
                Download Resume
              </ActionButton>
              <ActionButton href={siteConfig.github} variant="ghost" icon={<FaGithub size={18} />}>
                GitHub
              </ActionButton>
            </div>
          </div>
          <HeroPanel />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Metric value={`${projectCount}+`} label="Successful projects built across web, automation, tooling, and business platforms." />
          <Metric value={`${experienceYears}yrs+`} label="Hands-on experience shipping software, automations, deployments, and product systems." />
          <Metric value="150k+" label="Monthly transaction value supported by a Telegram automation workflow." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Selected Work"
          title="Four public projects that show the range."
          description="The resume contains more work, including private and NDA-bound projects. These four are the clearest public proof of software engineering, automation, business product thinking, and developer tooling."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectPreview key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
          <Panel title="What I Build" icon={TerminalSquare}>
            <p className="text-readable">
              My work is practical: full-stack applications, Telegram bots, workflow automation,
              CLI tools, Android debugging utilities, and business platforms. The shared theme is
              simple: I build systems that reduce manual work and create real-world leverage.
            </p>
          </Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <SkillCard key={skill.title} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </>
  )
}

function HeroPanel() {
  const rows = [
    ['01', 'CampusHUB', 'Student ecosystem'],
    ['02', 'Telegram Platform', 'Workflow automation'],
    ['03', 'ADB Hydra', 'Android developer tooling'],
    ['04', 'ValuXchange', 'Exchange service hub'],
  ]

  return (
    <div className="relative border border-border bg-panel p-5 shadow-2xl">
      <div className="absolute -right-3 -top-3 h-16 w-16 border-r border-t border-cyan/60" />
      <div className="absolute -bottom-3 -left-3 h-16 w-16 border-b border-l border-accent/60" />
      <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
        <span className="mono-label text-cyan">Portfolio Snapshot</span>
        <span className="rounded-full bg-success/12 px-3 py-1 text-xs font-bold text-success">Available</span>
      </div>
      <div className="grid gap-3">
        {rows.map(([num, name, detail]) => (
          <div key={name} className="grid grid-cols-[44px_1fr] gap-4 border border-border bg-black/26 p-4">
            <span className="font-mono text-sm text-accent">{num}</span>
            <span>
              <span className="block font-semibold text-white">{name}</span>
              <span className="mt-1 block text-sm text-readable">{detail}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <MiniStat label="Stack" value="Python · React · Node" />
        <MiniStat label="Focus" value="Systems · Product" />
      </div>
    </div>
  )
}

function ProjectsPage() {
  return (
    <PageFrame
      eyebrow="Projects"
      title="Resume-backed case studies, structured like a serious portfolio."
      description="These are the four public projects from the resume. Each one opens into a detailed page covering the problem, solution, role, architecture, features, visuals, challenges, lessons, and roadmap."
    >
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <ProjectLargeCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </PageFrame>
  )
}

function ProjectDetailPage({ slug }: { slug: string }) {
  const project = useMemo(() => projects.find((item) => item.slug === slug), [slug])

  if (!project) {
    return (
      <PageFrame eyebrow="Project" title="Project not found." description="That project route does not exist yet.">
        <button className="secondary-button" onClick={() => navigate('/projects')}>
          <ArrowLeft size={18} />
          Back to Projects
        </button>
      </PageFrame>
    )
  }

  const Icon = project.icon

  return (
    <PageFrame eyebrow={project.type} title={project.title} description={project.intro}>
      <button className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-cyan hover:text-white" onClick={() => navigate('/projects')}>
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
        <div className="space-y-6">
          <ProjectVisual project={project} detailed />
          <Panel title="Project Meta" icon={Icon}>
            <div className="grid gap-4 text-sm">
              <MetaRow label="Status" value={project.status} />
              <MetaRow label="Timeline" value={projectYearLabel(project)} />
              <MetaRow label="Role" value={project.role} />
            </div>
            {project.link ? (
              <a href={project.link} target="_blank" rel="noreferrer" className="primary-button mt-6 w-full">
                <ExternalLink size={18} />
                Open Live Project
              </a>
            ) : (
              <p className="mt-6 rounded-sm border border-border bg-black/28 p-4 text-sm text-readable">
                Local build available for test on demand.
              </p>
            )}
          </Panel>
        </div>

        <div className="space-y-6">
          <DetailBlock title="Problem" text={project.problem} />
          <DetailBlock title="Solution" text={project.solution} />
          <DetailGrid title="Architecture" items={project.architecture} />
          <DetailGrid title="Features And Highlights" items={project.highlights} />
          <DetailGrid title="Challenges" items={project.challenges} />
          <DetailGrid title="Lessons Learned" items={project.lessons} />
          <DetailGrid title="Future Roadmap" items={project.roadmap} />
        </div>
      </div>

      <section className="mt-10">
        <SectionIntro
          eyebrow="Pictures Section"
          title="Visual evidence and diagrams."
          description="This section is ready for real screenshots, architecture diagrams, database diagrams, deployment screenshots, and testing captures as the project archive grows."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {project.images.gallery.map((image, index) => (
            <ProjectImageSlot key={image.label} image={image} index={index} />
          ))}
        </div>
      </section>
    </PageFrame>
  )
}

function AboutPage() {
  const experienceYears = yearsSince(EXPERIENCE_START_YEAR)
  const projectCount = siteConfig.projectsCount

  return (
    <PageFrame
      eyebrow="About Me"
      title="I am building a long-term engineering portfolio, not just a job profile."
      description="My work blends full-stack software, automation, mobile tooling, embedded systems, product thinking, and digital growth."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_.86fr]">
        <Panel title="Professional Summary" icon={FileText}>
          <div className="space-y-4 text-readable">
            <p>
              I am Eluem Chike, also known as Big Scott: a full-stack software engineer,
              Python automation engineer, and mobile developer with {experienceYears}yrs+ experience and
              {projectCount}+ successful projects across public, private, and NDA-bound work.
            </p>
            <p>
              I build scalable systems, intelligent automation, and business-focused digital
              products using modern web and mobile technologies. I am experienced in APIs,
              workflow design, deployment, maintenance, and systems that reduce manual work.
            </p>
          </div>
        </Panel>
        <Panel title="Education" icon={GraduationCap}>
          <h2 className="text-2xl font-bold text-white">Ekiti State University</h2>
          <p className="mt-2 text-readable">B.Sc. Computer Science · 2021 - Present</p>
          <div className="mt-6 rounded-sm border border-border bg-black/24 p-4">
            <p className="text-sm leading-6 text-readable">
              Academic foundation in computer science paired with practical product building,
              automation engineering, and real business delivery.
            </p>
          </div>
        </Panel>
      </div>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <Panel title="Experience" icon={BriefcaseBusiness}>
          <Timeline />
        </Panel>
        <Panel title="Technical Stack" icon={Code2}>
          <div className="flex flex-wrap gap-2">
            {techStack.map((item) => (
              <span key={item} className="tag tag-bright">
                {item}
              </span>
            ))}
          </div>
        </Panel>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill) => (
          <SkillCard key={skill.title} skill={skill} />
        ))}
      </section>

      <section className="mt-10" id="contact">
        <SectionIntro
          eyebrow="Contact Me"
          title="Bring the system, product, or automation problem."
          description="Use any direct channel below for software builds, automation systems, collaborations, technical work, and product discussions."
        />
        <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
          <Panel title="Direct Channels" icon={MessageCircle}>
            <div className="grid gap-3">
              <ContactLink href={`mailto:${siteConfig.email}`} icon={<Mail size={18} />} label={siteConfig.email} />
              <ContactLink href={`tel:${siteConfig.phone}`} icon={<Phone size={18} />} label={siteConfig.phone} />
              <ContactLink href={siteConfig.github} icon={<FaGithub size={18} />} label="github.com/LR-TechX" />
              <ContactLink href={siteConfig.linkedin} icon={<FaLinkedin size={18} />} label="linkedin.com/in/chike-eluem" />
              <ContactLink href={siteConfig.telegram} icon={<FaTelegram size={18} />} label="t.me/realbigscott" />
            </div>
          </Panel>
          <ContactForm />
        </div>
      </section>
    </PageFrame>
  )
}

function ProjectPreview({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const Icon = project.icon

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center bg-cyan/12 text-cyan">
          <Icon size={21} />
        </span>
        <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-white">{project.status}</span>
      </div>
      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-readable">{project.summary}</p>
      <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan hover:text-white" onClick={() => navigate(`/projects/${project.slug}`)}>
        View details <ArrowRight size={16} />
      </button>
    </motion.article>
  )
}

function ProjectLargeCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.article
      className="project-large"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
    >
      <div className="grid gap-6 lg:grid-cols-[.92fr_1.08fr]">
        <ProjectVisual project={project} />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="status-dot">{project.status}</span>
            <span className="mono-label">{project.type}</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">{project.title}</h2>
          <p className="mt-4 text-readable">{project.summary}</p>
          <p className="mt-5 text-sm leading-6 text-readable">{project.solution}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((item) => (
              <span key={item} className="tag tag-bright">{item}</span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="primary-button" onClick={() => navigate(`/projects/${project.slug}`)}>
              <ArrowRight size={18} />
              Open Case Study
            </button>
            {project.link && (
              <a className="secondary-button" href={project.link} target="_blank" rel="noreferrer">
                <ExternalLink size={18} />
                Live Link
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectVisual({ project, detailed = false }: { project: (typeof projects)[number]; detailed?: boolean }) {
  const Icon = project.icon

  return (
    <div className={`project-visual project-visual-${project.imageTone} ${detailed ? 'min-h-[390px]' : 'min-h-[310px]'}`}>
      {project.images.hero && (
        <img
          src={project.images.hero}
          alt={`${project.title} hero screenshot`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-5 border border-white/14" />
      <div className="relative z-10 flex h-full min-h-inherit flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center bg-black/36 text-white backdrop-blur">
            <Icon size={24} />
          </span>
          <span className="mono-label text-white/85">{projectYearLabel(project)}</span>
        </div>
        <div>
          <p className="mono-label text-white/75">Project visual</p>
          <h3 className="mt-3 text-3xl font-extrabold text-white">{project.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/82">
            Screenshot and diagram space for verified assets, with generated visual treatment matching the project category.
          </p>
        </div>
      </div>
    </div>
  )
}

function ProjectImageSlot({ image, index }: { image: ProjectImage; index: number }) {
  return (
    <div className="visual-slot overflow-hidden">
      {image.src ? (
        <img src={image.src} alt={image.label} className="mb-5 aspect-video w-full border border-border object-cover" />
      ) : (
        <div className="mb-5 grid aspect-video place-items-center border border-dashed border-cyan/35 bg-cyan/8 text-center">
          <span className="px-4 text-sm font-bold text-cyan">Add image path in project data</span>
        </div>
      )}
      <span className="mono-label text-cyan">0{index + 1}</span>
      <h3 className="mt-4 text-lg font-bold text-white">{image.label}</h3>
      <p className="mt-2 text-sm leading-6 text-readable">{image.note}</p>
    </div>
  )
}

function Timeline() {
  const rows = [
    ['2024 - Present', 'Independent Software Developer', 'Full-stack applications, Python automation, Telegram bots, ADB Hydra, CampusHUB, CLI tooling, deployment, and business automation.'],
    ['Growth & Marketing', 'Digital Growth Experience', 'Social growth strategies, online lead generation, funnels, content distribution, community management, SEO, and analytics.'],
    ['2021 - Present', 'B.Sc. Computer Science', 'Ekiti State University, with practical work across product engineering, mobile development, and embedded systems.'],
  ]

  return (
    <div className="grid gap-4">
      {rows.map(([period, title, text]) => (
        <div key={title} className="border-l-2 border-accent bg-black/24 p-4">
          <span className="mono-label text-cyan">{period}</span>
          <h3 className="mt-2 font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-readable">{text}</p>
        </div>
      ))}
    </div>
  )
}

function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <SectionIntro
        eyebrow="Client Signals"
        title="Credibility for the kind of work that does not always fit inside screenshots."
        description="Some work is private, operational, or NDA-bound. This section gives visitors a grounded sense of how clients and collaborators experience the work."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.name} className="testimonial-card">
            <div className="mb-5 flex items-center gap-1 text-cyan" aria-hidden="true">
              <Sparkles size={16} />
              <Sparkles size={16} />
              <Sparkles size={16} />
            </div>
            <p className="text-sm leading-7 text-readable">"{testimonial.quote}"</p>
            <div className="mt-6 border-t border-border pt-4">
              <h3 className="font-bold text-white">{testimonial.name}</h3>
              <p className="mt-1 text-sm text-muted">{testimonial.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    setStatus('sending')

    window.setTimeout(() => {
      form.reset()
      setStatus('success')
    }, 900)
  }

  return (
    <>
      <iframe name="contact-submit-frame" title="Contact form submission" className="hidden" />
      <form
        action={`https://formsubmit.co/${siteConfig.email}`}
        method="POST"
        target="contact-submit-frame"
        className="border border-border bg-panel p-6 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="_subject" value="New portfolio project request" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_autoresponse" value="Thanks for reaching out to Big Scott. Your request has been received and you will get feedback soon." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" name="name" placeholder="Your name" required />
          <Input label="Email" name="email" type="email" placeholder="you@company.com" required />
        </div>
        <div className="mt-4">
          <Input label="Project Type" name="project_type" placeholder="Web app, automation, mobile app, platform..." required />
        </div>
        <label className="mt-4 grid gap-2">
          <span className="meta-label">Message</span>
          <textarea name="message" className="input min-h-36 resize-y" placeholder="Describe what you want to build." required />
        </label>
        <button className="primary-button mt-5" type="submit" disabled={status === 'sending'}>
          <Mail size={18} />
          {status === 'sending' ? 'Sending...' : 'Start Conversation'}
        </button>
      </form>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/72 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-md border border-cyan/35 bg-[#101010] p-7 text-center shadow-2xl"
              initial={{ opacity: 0, scale: .94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .94, y: 12 }}
            >
              <div className="mx-auto grid h-14 w-14 place-items-center bg-cyan/12 text-cyan">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="mt-5 text-2xl font-extrabold text-white">Request received.</h2>
              <p className="mt-3 text-readable">
                Thanks for reaching out. Your message has been sent, and you will receive feedback soon.
              </p>
              <button className="primary-button mt-6" onClick={() => setStatus('idle')}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SkillCard({ skill }: { skill: { title: string; icon: LucideIcon; items: string[] } }) {
  const Icon = skill.icon

  return (
    <div className="skill-card">
      <span className="grid h-10 w-10 place-items-center bg-accent/12 text-accent">
        <Icon size={19} />
      </span>
      <h3 className="mt-4 text-lg font-bold text-white">{skill.title}</h3>
      <ul className="mt-4 grid gap-2">
        {skill.items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-readable">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyan" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PageFrame({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} large />
      {children}
    </section>
  )
}

function SectionIntro({ eyebrow, title, description, large = false }: { eyebrow: string; title: string; description: string; large?: boolean }) {
  return (
    <div className={`mb-9 max-w-4xl ${large ? 'sm:mb-12' : ''}`}>
      <Kicker icon={Sparkles}>{eyebrow}</Kicker>
      <h2 className={`mt-5 font-extrabold leading-tight tracking-normal text-white ${large ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-readable">{description}</p>
    </div>
  )
}

function Panel({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="panel">
      <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
        <span className="grid h-10 w-10 place-items-center bg-cyan/12 text-cyan">
          <Icon size={19} />
        </span>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="detail-block">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="mt-3 leading-7 text-readable">{text}</p>
    </div>
  )
}

function DetailGrid({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="detail-block">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="border border-border bg-black/24 p-4 text-sm leading-6 text-readable">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="meta-label">{label}</dt>
      <dd className="mt-1 text-readable">{value}</dd>
    </div>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric-card">
      <div className="font-mono text-4xl font-bold text-white">{value}</div>
      <p className="mt-3 text-sm leading-6 text-readable">{label}</p>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-black/28 p-4">
      <span className="mono-label">{label}</span>
      <p className="mt-2 text-sm font-bold text-white">{value}</p>
    </div>
  )
}

function Kicker({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 border border-cyan/28 bg-cyan/10 px-3 py-2 font-mono text-xs font-bold uppercase tracking-[.2em] text-cyan">
      <Icon size={14} />
      {children}
    </div>
  )
}

function ActionButton({
  children,
  icon,
  onClick,
  href,
  variant = 'primary',
  download = false,
}: {
  children: ReactNode
  icon: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  download?: boolean
}) {
  const className = variant === 'primary' ? 'primary-button' : variant === 'secondary' ? 'secondary-button' : 'ghost-button'

  if (href) {
    return (
      <a className={className} href={href} target={download ? undefined : '_blank'} rel={download ? undefined : 'noreferrer'} download={download}>
        {icon}
        {children}
      </a>
    )
  }

  return (
    <button className={className} onClick={onClick}>
      {icon}
      {children}
    </button>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 min-w-10 place-items-center border border-border text-muted transition hover:border-cyan/50 hover:bg-cyan/10 hover:text-cyan"
    >
      {children}
    </a>
  )
}

function ContactLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  const external = href.startsWith('http')

  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="flex items-center gap-3 border border-border bg-black/24 p-4 text-readable transition hover:border-cyan/50 hover:bg-cyan/10 hover:text-white">
      <span className="text-cyan">{icon}</span>
      <span>{label}</span>
    </a>
  )
}

function Input({
  label,
  placeholder,
  name,
  type = 'text',
  required = false,
}: {
  label: string
  placeholder: string
  name?: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="grid gap-2">
      <span className="meta-label">{label}</span>
      <input className="input" name={name} type={type} placeholder={placeholder} required={required} />
    </label>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-black/76">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-readable sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>Eluem Chike (Big Scott) · Full-stack software, automation, mobile tooling, and product systems.</span>
        <div className="flex items-center gap-3">
          <SocialLink href={siteConfig.github} label="GitHub"><FaGithub size={16} /></SocialLink>
          <SocialLink href={siteConfig.linkedin} label="LinkedIn"><FaLinkedin size={16} /></SocialLink>
          <SocialLink href={siteConfig.telegram} label="Telegram"><FaTelegram size={16} /></SocialLink>
        </div>
      </div>
    </footer>
  )
}
