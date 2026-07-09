import { useEffect, useRef, useState } from 'react';
import { jobs, filters, projects, skillGroups, certifications, education, contact } from './data.js';

// Maps each content category to one of the four accent colors defined in index.css.
// Keeping this in one place means the filter tabs, card borders, and tags all agree.
const CATEGORY_COLORS = {
  cloud: 'blue',
  devops: 'amber',
  ai: 'purple',
  github: 'green',
};

const SECTION_ACCENTS = {
  about: 'blue',
  experience: 'amber',
  projects: 'purple',
  skills: 'green',
  certifications: 'blue',
  education: 'amber',
  contact: 'purple',
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function Reveal({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'in-view' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function CopyButton({ text, children }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e) => {
    if (!navigator.clipboard) return; // fall back to default mailto: behavior
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      window.location.href = `mailto:${text}`;
    }
  };

  return (
    <a href={`mailto:${text}`} className="copy-btn" onClick={handleClick}>
      {children}
      <span className={`copy-toast ${copied ? 'show' : ''}`}>copied ✓</span>
    </a>
  );
}

function NavToggle({ open, onClick }) {
  return (
    <button
      className={`nav-toggle ${open ? 'open' : ''}`}
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={open}
    >
      <span />
    </button>
  );
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      /* localStorage unavailable (e.g. private browsing) — fall through to system preference */
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore — theme just won't persist across reloads */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return [theme, toggleTheme];
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('about');
  const sectionRefs = useRef({});

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerSection = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const visibleProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <nav>
        <div className="wrap nav-inner">
          <div className="nav-id">
            <span className="name">Usha Nagula</span>
            <span className="tagline">Cloud Engineer • DevOps • GCP/AWS/K8s</span>
          </div>
          <ul className="nav-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <a className="btn btn-secondary-text" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="btn" href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="btn btn-primary" href={contact.resume} download>
              ↓ Resume
            </a>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <NavToggle open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
        </div>
        <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
          <div className="theme-toggle-row">
            <span>Theme: {theme === 'dark' ? 'Dark' : 'Light'}</span>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
            LinkedIn ↗
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
            GitHub ↗
          </a>
          <a href={contact.resume} download onClick={() => setMobileOpen(false)}>
            Download Resume ↓
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <div className="eyebrow-badge">Open to Cloud Engineer • DevOps roles</div>
          <h1>
            Hi, I'm <span className="gradient-text">Usha Nagula</span>.
          </h1>
          <p className="lede">
            I design, deploy, and operate scalable cloud infrastructure for enterprise applications —
            from Infrastructure as Code and container orchestration to CI/CD automation and production
            monitoring. 3+ years across GCP, AWS, and Azure environments.
          </p>

          <div className="pill-row">
            {['Terraform', 'Kubernetes', 'GCP / AWS / Azure', 'Jenkins · CI/CD', 'Prometheus · Grafana'].map(
              (pill) => (
                <span key={pill} className="pill">
                  {pill}
                </span>
              )
            )}
          </div>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn" href={contact.resume} download>
              ↓ Download Resume
            </a>
            <a className="btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn" href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </div>

          <div className="highlight-row">
            <Reveal className="highlight-card accent-blue">
              <div className="icon">☁</div>
              <h3>Cloud Platforms</h3>
              <p>High-availability infrastructure across GCP, AWS, and Azure — provisioned and managed as code.</p>
            </Reveal>
            <Reveal className="highlight-card accent-amber">
              <div className="icon">⚙</div>
              <h3>DevOps &amp; IaC</h3>
              <p>Terraform, Jenkins, and CI/CD pipelines that cut deployment time by 60% while improving consistency.</p>
            </Reveal>
            <Reveal className="highlight-card accent-green">
              <div className="icon">◎</div>
              <h3>Monitoring &amp; Cost</h3>
              <p>Prometheus and Grafana dashboards for proactive alerting, plus rightsizing to control cloud spend.</p>
            </Reveal>
          </div>
        </div>
      </header>

      <section id="about" ref={registerSection('about')}>
        <div className="wrap">
          <Reveal className="section-head" as="div">
            <span className="section-eyebrow accent-text-blue">About</span>
            <h2>What I do, and how I work</h2>
            <p>The infrastructure philosophy behind every environment I build.</p>
          </Reveal>

          <div className="about-grid">
            <Reveal className="about-card accent-border-blue">
              <span className="kicker kicker-blue">My focus</span>
              <h3>Reliable, cost-efficient cloud platforms</h3>
              <p>
                I specialize in building and operating cloud infrastructure that's automated, observable, and
                secure — combining Infrastructure as Code with strong DevOps practices so teams can ship faster
                without sacrificing stability.
              </p>
              <ul>
                <li>End-to-end infrastructure: provisioning → deployment → monitoring</li>
                <li>Infrastructure as Code with Terraform for repeatable, auditable environments</li>
                <li>Container orchestration across GKE, EKS, and AKS</li>
                <li>Proactive monitoring and cost optimization for production workloads</li>
              </ul>
            </Reveal>

            <Reveal className="about-card accent-border-purple">
              <span className="kicker kicker-purple">How I work</span>
              <h3>Collaborative &amp; reliability-focused</h3>
              <p>
                I partner closely with development teams to troubleshoot infrastructure issues, tighten feedback
                loops, and keep releases predictable — with clear documentation and dashboards so systems stay
                maintainable as they scale.
              </p>
              <div className="about-tags">
                {['Terraform Modules', 'CI/CD Automation', 'Incident Response', 'Cost Optimization', 'Cross-team Collaboration'].map(
                  (tag) => (
                    <span key={tag} className="chip chip-purple">
                      {tag}
                    </span>
                  )
                )}
              </div>
              <div className="about-callout">
                <strong>What you get:</strong> automated pipelines, dependable uptime, and infrastructure that's
                easy to hand off.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="experience" ref={registerSection('experience')}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-eyebrow accent-text-amber">Experience</span>
            <h2>Recent roles and the impact I delivered</h2>
            <p>3 roles across cloud engineering and DevOps, 2022 – present.</p>
          </Reveal>

          <div className="timeline">
            {jobs.map((job) => (
              <Reveal className="job" key={job.title}>
                <span className="dates">{job.dates}</span>
                <h3>{job.title}</h3>
                <div className="company">{job.company}</div>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" ref={registerSection('projects')}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-eyebrow accent-text-purple">Projects</span>
            <h2>Infrastructure work, framed as outcomes</h2>
            <p>A selection of initiatives from my recent roles, plus applied ML work and open-source projects on GitHub.</p>
          </Reveal>

          <div className="filter-row">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${activeFilter === f.key ? 'active' : ''} ${
                  f.key !== 'all' ? `filter-${CATEGORY_COLORS[f.key]}` : ''
                }`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map((project) => (
              <Reveal className={`card accent-border-${CATEGORY_COLORS[project.category]}`} key={project.title}>
                <span className={`tag tag-${CATEGORY_COLORS[project.category]}`}>{project.tag}</span>
                <h3>{project.title}</h3>
                <p className="desc">{project.desc}</p>
                <div className="impact-label">Impact</div>
                <ul>
                  {project.impact.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="chips">
                  {project.chips.map((chip) => (
                    <span key={chip} className={`chip chip-${CATEGORY_COLORS[project.category]}`}>
                      {chip}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a className="card-link" href={project.link} target="_blank" rel="noopener noreferrer">
                    View on GitHub ↗
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" ref={registerSection('skills')}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-eyebrow accent-text-green">Skills</span>
            <h2>Core technologies I build with</h2>
            <p>Across cloud platforms, automation, networking, and data.</p>
          </Reveal>

          <div className="skill-groups">
            {skillGroups.map((group, i) => {
              const colorKeys = ['blue', 'amber', 'purple', 'green'];
              const color = colorKeys[i % colorKeys.length];
              return (
                <Reveal className={`skill-card accent-border-${color}`} key={group.label}>
                  <div className="label">{group.label}</div>
                  <div className="chips">
                    {group.chips.map((chip) => (
                      <span key={chip} className={`chip chip-${color}`}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="certifications" ref={registerSection('certifications')}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-eyebrow accent-text-blue">Certifications</span>
            <h2>Active credentials</h2>
          </Reveal>
          <div className="cert-grid">
            {certifications.map((cert) => (
              <Reveal className="cert accent-border-blue" key={cert}>
                <span className="dot dot-blue" /> {cert}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="education" ref={registerSection('education')}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-eyebrow accent-text-amber">Education</span>
            <h2>{education.school}</h2>
          </Reveal>
          <Reveal className="edu-row">
            <h3>{education.degree}</h3>
            <span className="dates">{education.dates}</span>
          </Reveal>
          <Reveal as="div" className="edu-meta">
            {education.meta}
          </Reveal>
          <Reveal as="div" className="edu-coursework">
            Coursework:{' '}
            {education.coursework.map((c, i) => (
              <span key={c}>
                <span className="mono">{c}</span>
                {i < education.coursework.length - 1 ? ', ' : ''}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <footer id="contact" ref={registerSection('contact')}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-eyebrow accent-text-purple">Contact</span>
            <h2>Let's connect — I respond quickly</h2>
            <p>Open to Cloud Engineer and DevOps roles. Reach out directly or find me on LinkedIn.</p>
          </Reveal>
          <div className="contact-grid">
            <CopyButton text={contact.email}>{contact.email}</CopyButton>
            <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            <span>{contact.location}</span>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={contact.resume} download>
              ↓ Download Resume
            </a>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Usha Nagula</span>
            <span>Built with Terraform-grade attention to detail</span>
          </div>
        </div>
      </footer>
    </>
  );
}
