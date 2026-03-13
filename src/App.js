import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import './App.css';

/* ─────────────────────────── DATA ─────────────────────────── */
const ratingData = [
  { label: '1-2', count: 2, fill: '#c7d2e8' },
  { label: '3-4', count: 5, fill: '#93a8d4' },
  { label: '5-6', count: 12, fill: '#5b7ec2' },
  { label: '7-8', count: 28, fill: '#2d57a8' },
  { label: '9-10', count: 19, fill: '#0d3580' },
];

const yesNoData = [
  { name: 'Would Use It', value: 62, fill: '#2d57a8' },
  { name: 'Would Not', value: 12, fill: '#c7d2e8' },
  { name: 'Unsure', value: 26, fill: '#93a8d4' },
];

const marketData = [
  { segment: 'Students', size: 38, fill: '#0d3580' },
  { segment: 'Professionals', size: 27, fill: '#2d57a8' },
  { segment: 'Activists', size: 18, fill: '#5b7ec2' },
  { segment: 'General Public', size: 17, fill: '#93a8d4' },
];

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'why-use-it', label: 'Why Use It' },
  { id: 'market', label: 'Market Analysis' },
  { id: 'feedback', label: 'Feedback' },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function useVisible(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return vis;
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef();
  const vis = useVisible(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────── NAVBAR ─────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scrollTo('home')}>
          <span className="logo-shield">⬡</span>
          <span className="logo-text">Veil<em>Veil</em></span>
        </button>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <button onClick={() => { scrollTo(l.id); setMenuOpen(false); }}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="orb orb1" />
        <div className="orb orb2" />
      </div>
      <div className="hero-content">
        <div className="hero-badge">Social Media Anonymity </div>
        <h1 className="hero-title">
          Privacy,<br />
          <span className="accent-text">Simplified</span><br />
          for Everyone.
        </h1>
        <p className="hero-sub">
          Veil lets you participate in social platforms, forums, and communities
          without exposing your real identity — secure, seamless, and open to all.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('about')}>
            Discover Veil
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('feedback')}>
            Give Feedback
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>100%</strong><span>Anonymous</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>Zero</strong><span>Data Sold</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>Open</strong><span>Protocol</span></div>
        </div>
      </div>
      <div className="hero-scroll-hint" onClick={() => scrollTo('about')}>
        <span>Scroll</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
}

/* ─────────────────────────── ABOUT ─────────────────────────── */
function About() {
  const cards = [
    { icon: '🔐', title: 'Identity Masking', body: 'Your real credentials are never shared with social platforms. Veil generates ephemeral identifiers per session.' },
    { icon: '🌐', title: 'Cross-Platform', body: 'One gateway to access forums, social networks, and communities without creating traceable accounts on each.' },
    { icon: '⚡', title: 'Real-Time Relay', body: 'Messages and interactions are relayed instantly through our anonymisation layer with no noticeable latency.' },
    { icon: '🛡️', title: 'End-to-End Encrypted', body: 'All traffic passing through Veil is encrypted so no third party — not even us — can read your data.' },
  ];

  return (
    <section id="about" className="section section-light">
      <div className="container">
        <FadeIn>
          <p className="section-eyebrow">What Is Veil?</p>
          <h2 className="section-title">A Social Media App Built for<br />the Privacy-Conscious</h2>
          <p className="section-lead">
            Veil is a Social Media App with Top tier Anonymity —It strips identifying metadata and keeps your identity hidden and everyone
            else guessing.
          </p>
        </FadeIn>
        <div className="cards-grid">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.1}>
              <div className="card">
                <div className="card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Sign In Privately', body: 'Create a Veil account using only an email or passphrase. No phone number, no government ID required.' },
    { num: '02', title: 'Connect a Platform', body: 'Choose the social network or forum you want to engage with from our supported integrations list.' },
    { num: '03', title: 'Veil Anonymises You', body: 'Our gateway generates a disposable proxy identity and routes your session through it — the platform never sees your real details.' },
    { num: '04', title: 'Participate Freely', body: 'Post, comment, react, and message as normal. When done, revoke the proxy identity in one click.' },
  ];

  return (
    <section id="how-it-works" className="section section-dark">
      <div className="container">
        <FadeIn>
          <p className="section-eyebrow light">How It Works</p>
          <h2 className="section-title light">Four Steps to Digital Freedom</h2>
        </FadeIn>
        <div className="steps-list">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.12}>
              <div className="step">
                <div className="step-num">{s.num}</div>
                <div className="step-body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── WHY USE IT ─────────────────────────── */
function WhyUseIt() {
  const reasons = [
    { icon: '🧑‍🎓', title: 'Students & Researchers', body: 'Discuss sensitive academic topics or whistleblow on institutional issues without career risk.' },
    { icon: '💼', title: 'Working Professionals', body: 'Engage in industry conversations, seek career advice, or report workplace misconduct without jeopardising employment.' },
    { icon: '✊', title: 'Activists & Journalists', body: 'Organise, report, and communicate in regions where digital surveillance puts lives at risk.' },
    { icon: '👥', title: 'Everyday Internet Users', body: 'Reclaim your right to a private online life — no ad-targeting, no shadow profiles, no data harvesting.' },
    { icon: '🩺', title: 'Health & Wellbeing', body: 'Seek support for sensitive health matters in online communities without the fear of exposure.' },
    { icon: '🔬', title: 'Security Researchers', body: 'Investigate threats and vulnerabilities without revealing your institutional affiliation or identity.' },
  ];

  return (
    <section id="why-use-it" className="section section-light">
      <div className="container">
        <FadeIn>
          <p className="section-eyebrow">Why Veil?</p>
          <h2 className="section-title">Who Needs Anonymity Online?</h2>
          <p className="section-lead">
            The need for privacy is universal. Whether you're a student, a professional, or simply someone who
            values their digital rights, Veil gives you the freedom to engage without risk.
          </p>
        </FadeIn>
        <div className="reasons-grid">
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.08}>
              <div className="reason-card">
                <span className="reason-icon">{r.icon}</span>
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── MARKET ─────────────────────────── */
function Market() {
  return (
    <section id="market" className="section section-dark">
      <div className="container">
        <FadeIn>
          <p className="section-eyebrow light">Market Analysis</p>
          <h2 className="section-title light">A Growing, Underserved Market</h2>
          <p className="section-lead light">
            The global privacy software market is projected to exceed <strong>$25 billion by 2027</strong>.
            Despite this growth, no dominant consumer-facing solution exists for social-media anonymity —
            Veil targets this gap directly.
          </p>
        </FadeIn>

        <div className="market-charts">
          <FadeIn delay={0.1} className="chart-card">
            <h3 className="chart-title">Target Segment Breakdown (%)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={marketData} dataKey="size" nameKey="segment" cx="50%" cy="50%" outerRadius={100} label={({ segment, size }) => `${segment} ${size}%`}>
                  {marketData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </FadeIn>

          <FadeIn delay={0.2} className="chart-card">
            <h3 className="chart-title">Segment Market Size (relative units)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={marketData} barSize={36}>
                <XAxis dataKey="segment" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="size" radius={[6, 6, 0, 0]}>
                  {marketData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="market-stats-row">
            <div className="mstat"><strong>$25B+</strong><span>Projected market by 2027</span></div>
            <div className="mstat"><strong>3.5B</strong><span>Active social media users globally</span></div>
            <div className="mstat"><strong>79%</strong><span>Users concerned about online privacy</span></div>
            <div className="mstat"><strong>0</strong><span>Dominant consumer anonymity gateways today</span></div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────── SIDEBAR / FEEDBACK ─────────────────────────── */
function Feedback() {
  return (
    <section id="feedback" className="section section-light">
      <div className="container">
        <FadeIn>
          <p className="section-eyebrow">Demo & Feedback</p>
          <h2 className="section-title">See It. Use It. Tell Us What You Think.</h2>
        </FadeIn>

        <div className="sidebar-layout">
          {/* LEFT: main embed column */}
          <div className="sidebar-main">
            {/* Demo Video */}
            <FadeIn>
              <div className="embed-card">
                <div className="embed-label">🎥 Demo Video</div>
                <div className="video-wrapper">
                  {/* Replace src with your Google Drive iframe preview link */}
                  <iframe
                    src="https://drive.google.com/file/d/YOUR_FILE_ID/preview"
                    title="Veil Demo Video"
                    allow="autoplay"
                    allowFullScreen
                  />
                  <div className="video-placeholder">
                    <div className="play-icon">▶</div>
                    <p>Replace the iframe <code>src</code> with your Google Drive video preview link.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Feedback Form */}
            <FadeIn delay={0.1}>
              <div className="embed-card">
                <div className="embed-label">📝 Share Your Feedback</div>
                <div className="form-wrapper">
                  {/* Replace src with your Google Form embed link */}
                  <iframe
                    src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
                    title="Veil Feedback Form"
                  />
                  <div className="form-placeholder">
                    <p>📋 Replace the iframe <code>src</code> with your Google Form embed link.</p>
                    <p className="placeholder-sub">The form should include Yes/No questions and a 1–10 rating scale.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: results sidebar */}
          <div className="sidebar-aside">
            <FadeIn delay={0.15}>
              <div className="embed-card results-card">
                <div className="embed-label">📊 Live Feedback Results</div>
                <p className="results-note">Sample data shown below. Embed your live Google Sheets chart here.</p>

                <h4 className="chart-sub">Would you use Veil? (n=100)</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={yesNoData} dataKey="value" cx="50%" cy="50%" outerRadius={70} label={({ name, value }) => `${value}%`}>
                      {yesNoData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

                <h4 className="chart-sub" style={{ marginTop: '1.5rem' }}>Privacy Importance Rating (1–10)</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={ratingData} barSize={28}>
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: 'rgba(45,87,168,0.07)' }} />
                    <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                      {ratingData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                <div className="live-badge">
                  🔴 Replace charts above with embedded Google Sheets chart iframes for live data
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-shield">⬡</span>
          <span className="logo-text">Veil<em>Veil</em></span>
        </div>
        <p className="footer-tagline">Privacy, Simplified for Everyone.</p>
        <div className="footer-links">
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
        </div>
        <p className="footer-copy">© 2026 Veil Project. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─────────────────────────── APP ─────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <WhyUseIt />
      <Market />
      <Feedback />
      <Footer />
    </>
  );
}
