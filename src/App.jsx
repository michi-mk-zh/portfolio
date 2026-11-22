import { useState, useEffect } from 'react'
import profilePic from './assets/profile.jpg'
import { profile, config, content } from './data.js'

function GitHubIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.27-.01-1.15-.02-2.09-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.67.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    </svg>
  )
}

function LiveIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  )
}

function Heading({ children }) {
  return (
    <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
      <span className="font-mono font-medium text-accent">#</span> {children}
    </h2>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line/60 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <Heading>{title}</Heading>
        {children}
      </div>
    </section>
  )
}

function EntryRow({ item }) {
  return (
    <li className="flex gap-4 rounded-xl border border-line/70 bg-panel/60 p-4 transition-colors hover:border-accent/50">
      <span className="mt-0.5 whitespace-nowrap font-mono text-xs text-accent">{item.period}</span>
      <div>
        <h4 className="font-display text-base font-semibold text-fg">{item.title}</h4>
        {item.detail && <p className="mt-0.5 text-sm text-muted">{item.detail}</p>}
      </div>
    </li>
  )
}

function ProjectCard({ p, ui }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-accent/60">
      <h3 className="font-display text-lg font-semibold text-fg transition-colors group-hover:text-accent">
        {p.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {p.description || ui.noDescription}
      </p>
      {p.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-md bg-panel-2 px-2.5 py-1 font-mono text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      )}
      {(p.codeUrl || p.liveUrl) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {p.codeUrl && (
            <a
              href={p.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
              {ui.code}
            </a>
          )}
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-dim"
            >
              <LiveIcon className="h-4 w-4" />
              {ui.live}
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default function App() {
  const [lang, setLang] = useState('de')
  const [repos, setRepos] = useState(null) // null = lädt, [] = keine, [...] = geladen
  const [ghFailed, setGhFailed] = useState(false)

  // Sprache merken
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'de' || saved === 'en') setLang(saved)
    } catch (e) {
      /* ignore */
    }
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch (e) {
      /* ignore */
    }
    document.documentElement.lang = lang
  }, [lang])

  // Projekte live von GitHub laden
  useEffect(() => {
    const url = `https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=100`
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('GitHub nicht erreichbar')
        return r.json()
      })
      .then((data) => {
        const list = (Array.isArray(data) ? data : [])
          .filter((r) => !r.fork && !r.archived && !config.hiddenRepos.includes(r.name))
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, config.maxProjects)
          .map((r) => ({
            title: r.name,
            description: r.description,
            tags: [r.language, ...(r.topics || [])].filter(Boolean).slice(0, 4),
            codeUrl: r.html_url,
            liveUrl: r.homepage && r.homepage.trim() ? r.homepage : '',
          }))
        setRepos(list)
      })
      .catch(() => setGhFailed(true))
  }, [])

  const c = content[lang]
  const other = lang === 'de' ? 'en' : 'de'

  const nav = [
    ['about', c.ui.nav.about],
    ['projects', c.ui.nav.projects],
    ['skills', c.ui.nav.skills],
    ['path', c.ui.nav.path],
  ]

  // Welche Projekte anzeigen: Live-Repos, sonst Fallback
  const useFallback = ghFailed || (repos !== null && repos.length === 0)
  const shownProjects = useFallback ? c.fallbackProjects : repos

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-line/60 bg-ink/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <a href="#top" className="font-mono text-sm font-medium text-accent">
            ~/michael
          </a>
          <ul className="hidden gap-7 text-sm font-medium text-muted sm:flex">
            {nav.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center rounded-lg border border-line p-0.5 font-mono text-xs"
              role="group"
              aria-label={lang === 'de' ? 'Sprache wählen' : 'Choose language'}
            >
              {['de', 'en'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                    lang === l ? 'bg-accent text-ink' : 'text-muted hover:text-fg'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-accent"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <div id="top" className="dotgrid relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-96 w-96 animate-glow rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-20 sm:pt-28">
          <div className="grid items-center gap-10 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="animate-rise font-mono text-sm text-accent" style={{ animationDelay: '0ms' }}>
                {c.role}
              </p>
              <h1
                className="animate-rise mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl"
                style={{ animationDelay: '80ms' }}
              >
                {profile.name}
              </h1>
              <p
                className="animate-rise mt-5 max-w-md text-lg leading-relaxed text-muted"
                style={{ animationDelay: '160ms' }}
              >
                {c.tagline}
              </p>
              <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
                <a
                  href="#projects"
                  className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-dim"
                >
                  {c.ui.cta}
                </a>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>

            <div className="animate-rise justify-self-center sm:justify-self-end" style={{ animationDelay: '120ms' }}>
              <div className="relative">
                <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-2xl border border-accent/40" aria-hidden="true" />
                <img
                  src={profilePic}
                  alt={profile.name}
                  className="h-44 w-44 rounded-2xl object-cover ring-1 ring-line sm:h-52 sm:w-52"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Über mich */}
      <Section id="about" title={c.ui.nav.about}>
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
          {c.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Projekte (live von GitHub) */}
      <Section id="projects" title={c.ui.nav.projects}>
        {repos === null && !ghFailed ? (
          <p className="font-mono text-sm text-muted">{c.ui.projectsLoading}</p>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {shownProjects.map((p) => (
                <ProjectCard key={p.title} p={p} ui={c.ui} />
              ))}
            </div>
            <a
              href={profile.githubUrl + '?tab=repositories'}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
              {c.ui.allProjects}
            </a>
          </>
        )}
      </Section>

      {/* Fähigkeiten */}
      <Section id="skills" title={c.ui.nav.skills}>
        <div className="grid gap-5 sm:grid-cols-2">
          {c.skills.map((s) => (
            <div key={s.group} className="rounded-2xl border border-line bg-panel p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent">{s.group}</h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-line bg-panel-2 px-3 py-1.5 text-sm font-medium text-fg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Werdegang */}
      <Section id="path" title={c.ui.nav.path}>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-fg">{c.ui.education}</h3>
            <ul className="space-y-3">
              {c.education.map((item, i) => (
                <EntryRow key={i} item={item} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-fg">{c.ui.experience}</h3>
            <ul className="space-y-3">
              {c.experience.map((item, i) => (
                <EntryRow key={i} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-line/60 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 text-center">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <GitHubIcon className="h-5 w-5" />
            github.com/{profile.githubUser}
          </a>
          <p className="text-xs text-muted/70">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </div>
  )
}
