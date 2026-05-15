import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
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
        transform: vis
          ? 'translateY(0) scale(1)'
          : 'translateY(40px) scale(0.98)',
        filter: vis ? 'blur(0px)' : 'blur(6px)',
        transition: `
          opacity 0.7s ease ${delay}s,
          transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s,
          filter 0.7s ease ${delay}s
        `,
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
          <img src="/veil_logo.png" alt="Veil Logo" className="logo-img" loading="eager" />
          <span className="logo-text">Veil</span>
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
        <img src="/veil_logo.png" alt="Veil Logo" className="hero-logo" />
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

        <p className="hero-trust">
          Trusted by privacy-focused users worldwide
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

function Showcase() {
  useEffect(() => {
  const phone = document.querySelector('.phone-frame');

  const handleScroll = () => {
    const rect = phone?.getBoundingClientRect();
    if (!rect) return;

    const windowHeight = window.innerHeight;

    // progress (0 → 1)
    const progress = 1 - Math.min(Math.max(rect.top / windowHeight, 0), 1);

    const rotateX = 8 - progress * 8;
    const rotateY = -10 + progress * 10;
    const scale = 0.9 + progress * 0.15;

    phone.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${scale})
    `;

    // glow intensity
    phone.style.boxShadow = `
      0 60px 160px rgba(0,0,0,0.8),
      0 0 ${40 + progress * 60}px rgba(123,97,255,0.3)
    `;
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <section className="showcase">
      <div className="container">

        {/* Headline */}
        <FadeIn>
          <p className="section-eyebrow light">Experience Veil</p>
          <h2 className="section-title light">
            Own The Moment.
          </h2>
          <p className="section-lead light">
            See how Veil lets you interact freely — without ever revealing who you are.
          </p>
        </FadeIn>

        {/* Phone */}
       <div className="phone-showcase multi-phone-showcase">

        {/* PHONE 1 */}
        <div className="phone-frame">
          <div className="phone-screen-wrapper">

            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              speed={900}
              className="phone-swiper"
            >

              <SwiperSlide>
                <div className="phone-screen">
                  <img
                    src="/screenshot-1.png"
                    alt="Feed"
                    className="phone-image"
                  />
                  <div className="screen-label">Feed</div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="phone-screen">
                  <img
                    src="/screenshot-2.png"
                    alt="Chat"
                    className="phone-image"
                  />
                  <div className="screen-label">Chat</div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="phone-screen">
                  <img
                    src="/screenshot-3.png"
                    alt="Settings"
                    className="phone-image"
                  />
                  <div className="screen-label">Post details</div>
                </div>
              </SwiperSlide>

            </Swiper>

          </div>
        </div>

        {/* PHONE 2 */}
        <div className="phone-frame middle-phone">
          <div className="phone-screen-wrapper">

            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              speed={900}
              className="phone-swiper"
            >

              <SwiperSlide>
                <div className="phone-screen">
                  <img
                    src="/screenshot-4.png"
                    alt="Anonymous Feed"
                    className="phone-image"
                  />
                  <div className="screen-label">
                    Anonymous Feed
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="phone-screen">
                  <img
                    src="/screenshot-5.png"
                    alt="Anonymous Posting"
                    className="phone-image"
                  />
                  <div className="screen-label">
                    Anonymous Posting
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="phone-screen">
                  <img
                    src="/screenshot-6.png"
                    alt="Anonymous Interactions"
                    className="phone-image"
                  />
                  <div className="screen-label">
                    Anonymous Interactions
                  </div>
                </div>
              </SwiperSlide>

            </Swiper>

          </div>
        </div>

  {/* PHONE 3 */}
  <div className="phone-frame">
    <div className="phone-screen-wrapper">

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={900}
        className="phone-swiper"
      >

        <SwiperSlide>
          <div className="phone-screen">
            <img
              src="/screenshot-9.png"
              alt="Profile"
              className="phone-image"
            />
            <div className="screen-label">
              Profile
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="phone-screen">
            <img
              src="/screenshot-7.png"
              alt="Your Profile"
              className="phone-image"
            />
            <div className="screen-label">
              Your Profile
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="phone-screen">
            <img
              src="/screenshot-8.png"
              alt="Edit Profile"
              className="phone-image"
            />
            <div className="screen-label">
              Edit Profile
            </div>
          </div>
        </SwiperSlide>

      </Swiper>

    </div>
</div>
        </div>

        {/* Story Blocks */}
        <div className="showcase-features">
          <FadeIn delay={0.5}>
            <div className="showcase-item">
              <h3>Share and Control your moment</h3>
              <p>Share you moments and share with friends and family</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="showcase-item">
              <h3>Your Secret is Safe</h3>
              <p>Your identity is never exposed post, comment and browse anonymously, your secret is safe with us</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="showcase-item">
              <h3>Full Control</h3>
              <p>Your Identity make it how you want with our state of the art interface</p>
            </div>
          </FadeIn>
        </div>

        {/* CTA */}
        <FadeIn delay={0.4}>
          <div className="showcase-cta">
            <button className="btn-primary">Join the Future</button>
          </div>
        </FadeIn>

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
    <section id="why-use-it" className="section section-dark why-section">
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
  useEffect(() => {
  const slides = document.querySelectorAll('.demo-slide');

  let index = 0;

  const interval = setInterval(() => {
    slides.forEach((slide) => {
      slide.classList.remove('active-demo');
    });

    slides[index].classList.add('active-demo');

    index = (index + 1) % slides.length;
  }, 4000);

  return () => clearInterval(interval);
}, []);
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
                <div className="demo-phone-wrapper">

                <div className="phone-frame demo-phone-frame">

                  <div className="demo-video-showcase">

                    <div className="demo-slide active-demo">
                      <img
                        src="/screenshot-1.png"
                        alt="Veil Feed"
                        className="demo-image"
                      />
                    </div>

                    <div className="demo-slide">
                      <img
                        src="/screenshot-2.png"
                        alt="Veil Chat"
                        className="demo-image"
                      />
                    </div>

                    <div className="demo-slide">
                      <img
                        src="/screenshot-3.png"
                        alt="Veil Settings"
                        className="demo-image"
                      />
                    </div>

                    <div className="fake-video-overlay">
                      <button className="fake-play-btn">▶</button>

                      <div className="demo-caption">
                        Veil Product Preview
                      </div>
                    </div>

                  </div>

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
                      src="https://docs.google.com/forms/d/e/1FAIpQLScalvcAV1M3zd2kkXTPqQj9tF1h6S8moFd1CgnwXiPSqRXiTg/viewform?embedded=true"
                      title="Veil Feedback Form"
                    />
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
                <iframe
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSW-QCZWakurDDPXaHnmqkDMhae8dukp1tTGhSFJ1_mjlrYPcSIz4E_F76bN4gQsOW7roJDlAcfZc0-/pubchart?oid=306847871&format=interactive"
                    width="100%"
                    height="250"
                    frameBorder="0"
                    scrolling="no"
                    title="Live Veil Feedback Results"
                    className="live-chart-frame"
                  />

                <h4 className="chart-sub" style={{ marginTop: '1.5rem' }}>Privacy Importance Rating (1–10)</h4>
                <iframe
                  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSW-QCZWakurDDPXaHnmqkDMhae8dukp1tTGhSFJ1_mjlrYPcSIz4E_F76bN4gQsOW7roJDlAcfZc0-/pubchart?oid=1621210750&format=interactive"
                  width="100%"
                  height="250"
                  frameBorder="0"
                  scrolling="no"
                  title="Privacy Rating Results"
                  className="live-chart-frame"
                />
                <h4 className="chart-sub" style={{ marginTop: '1.5rem' }}>
                    User Demographics
                  </h4>

                  <iframe
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSW-QCZWakurDDPXaHnmqkDMhae8dukp1tTGhSFJ1_mjlrYPcSIz4E_F76bN4gQsOW7roJDlAcfZc0-/pubchart?oid=1496740597&format=interactive"
                    width="100%"
                    height="250"
                    frameBorder="0"
                    scrolling="no"
                    title="User Demographics"
                    className="live-chart-frame"
                  />
                <h4 className="chart-sub" style={{ marginTop: '1.5rem' }}>
                  Most Wanted VEIL Features
                </h4>

                <iframe
                  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSW-QCZWakurDDPXaHnmqkDMhae8dukp1tTGhSFJ1_mjlrYPcSIz4E_F76bN4gQsOW7roJDlAcfZc0-/pubchart?oid=77909998&format=interactive"
                  width="100%"
                  height="250"
                  frameBorder="0"
                  scrolling="no"
                  title="Most Wanted VEIL Features"
                  className="live-chart-frame"
                />
                
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
          <img src="/veil_logo.png" alt="Veil Logo" className="logo-img" />
          <span className="logo-text">Veil</span>
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

  useEffect(() => {
  let mouseX = 0;
  let mouseY = 0;
  let rafId;

  const update = () => {
    // Update CSS variables (for glow)
    document.body.style.setProperty('--x', `${mouseX}px`);
    document.body.style.setProperty('--y', `${mouseY}px`);

    // Parallax
    const x = (mouseX / window.innerWidth - 0.5) * 12;
    const y = (mouseY / window.innerHeight - 0.5) * 12;

    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translate(${x}px, ${y}px)`;
    }

    rafId = requestAnimationFrame(update);
  };

  const handleMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  window.addEventListener('mousemove', handleMove);
  rafId = requestAnimationFrame(update);

  return () => {
    window.removeEventListener('mousemove', handleMove);
    cancelAnimationFrame(rafId);
  };
}, []);


  /* 🔥 Card Tilt Effect */
  useEffect(() => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    let rafId;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 14;
      const rotateY = (x - centerX) / 14;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform =
          `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });
    };

    const reset = () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', reset);

    card._cleanup = () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', reset);
    };
  });

  return () => {
    cards.forEach(card => card._cleanup && card._cleanup());
  };
}, []);


  

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <WhyUseIt />
      <Market />
      <Showcase />
      <Feedback />
      <Footer />
    </>
  );
}