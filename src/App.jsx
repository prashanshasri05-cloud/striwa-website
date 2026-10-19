import { useState } from "react";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  function handleJoin(event) {
    event.preventDefault();

    if (!email.trim()) return;

    const subject = encodeURIComponent("Connecting with STRIWA");
    const body = encodeURIComponent(
      `Hello STRIWA team,\n\nI would like to learn more about STRIWA.\nMy email: ${email}`
    );

    window.location.href =
      `mailto:hello@striwa.org?subject=${subject}&body=${body}`;
  }

  return (
    <div className="striwa">
      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-name">STRIWA</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our Vision</a>
          <a href="#values" onClick={() => setMenuOpen(false)}>Our Values</a>
          <a href="#community" onClick={() => setMenuOpen(false)}>Community</a>
          <a className="nav-cta" href="#connect" onClick={() => setMenuOpen(false)}>
            Get in Touch ↗
          </a>
          <a
            className="profile-link"
            href="/login"
            aria-label="Log in or sign up"
            title="Log in or sign up"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">WOMEN • OPPORTUNITY • GROWTH</span>
            <h1 className="striwa-slogan"> 
              Her Voice. Her Dream. <em>Her Striwa</em></h1>
            <p>
              A future where every woman has the confidence, connections,
              and opportunities to turn her ambitions into action.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#about">
                Discover STRIWA <span>↗</span>
              </a>
              <a className="text-link" href="#values">What we believe ↓</a>
            </div>
            <div className="hero-note">
              <span className="note-star">✳</span>
              <span>Women entrepreneurs, stronger tomorrow.</span>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-frame logo-frame">
              <img
                src="/striwa-logo.png"
                alt="STRIWA-Empower, Connect, Build"
              />
            </div>
            <p className="logo-tagline"> Big dreams deserves real opportunities.</p>
          </div>

          <div className="hero-index">01 / A NEW POSSIBILITY</div>
        </section>

        <section className="intro-section" id="about">
          <div className="section-label">01 — OUR VISION</div>
          <div>
            <h2>When women move forward, <em>communities move forward.</em></h2>
            <p>
              STRIWA is a women-empowerment initiative envisioned to help
              women entrepreneurs explore opportunities, build meaningful
              connections, and grow with confidence. We believe potential
              deserves a chance to be seen, supported, and developed.
            </p>
            <a className="text-link" href="#connect">Be part of the conversation ↗</a>
          </div>
        </section>

        <section className="values-section" id="values">
          <div className="section-heading">
            <div>
              <div className="section-label">02 — WHAT GUIDES US</div>
              <h2>Built on belief.<br /><em>Driven by possibility.</em></h2>
            </div>
            <p>Our starting point is simple: every woman deserves the space to dream bigger.</p>
          </div>

          <div className="values-grid">
            <article className="value-card">
              <span className="value-number">01</span>
              <span className="value-icon">✳</span>
              <h3>Empowerment</h3>
              <p>Encouraging women to recognise their strengths and pursue their ambitions.</p>
            </article>
            <article className="value-card">
              <span className="value-number">02</span>
              <span className="value-icon">↗</span>
              <h3>Opportunity</h3>
              <p>Exploring pathways to knowledge, resources, and entrepreneurial growth.</p>
            </article>
            <article className="value-card">
              <span className="value-number">03</span>
              <span className="value-icon">◎</span>
              <h3>Community</h3>
              <p>Creating space for ideas, shared learning, and meaningful connections.</p>
            </article>
            <article className="value-card">
              <span className="value-number">04</span>
              <span className="value-icon">♡</span>
              <h3>Inclusion</h3>
              <p>Believing every woman's voice, experience, and aspiration matters.</p>
            </article>
          </div>
        </section>

        <section className="community-section" id="community">
          <div className="community-image">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
              alt="A team sharing ideas at a meeting"
              loading="lazy"
            />
            <span className="image-note">BETTER, TOGETHER.</span>
          </div>
          <div className="community-copy">
            <div className="section-label">03 — THE BIGGER PICTURE</div>
            <h2>There is room for <em>every woman's ambition.</em></h2>
            <p>
              We imagine a connected ecosystem where women can exchange
              ideas, discover possibilities, learn from one another, and
              take their next steps with greater confidence.
            </p>
            <a className="button button-light" href="#connect">Let's Connect ↗</a>
          </div>
        </section>

        <section className="connect-section" id="connect">
          <div className="section-label">04 — START A CONVERSATION</div>
          <h2>Every meaningful change<br />starts with <em>a conversation.</em></h2>
          <p>
            Interested in STRIWA's vision? Share your email to start a conversation.
          </p>
          <form className="connect-form" onSubmit={handleJoin}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-label="Your email address"
            />
            <button type="submit">Let's Talk ↗</button>
          </form>
          <small>Your email app will open so you can send us a message.</small>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">S.</span>
          <span>STRIWA<span className="accent">.</span></span>
        </a>
        <p>Women entrepreneurs, stronger tomorrow.</p>
        <a href="#home">Back to top ↑</a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} STRIWA</span>
          <span>Rooted in possibility. Growing together.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;