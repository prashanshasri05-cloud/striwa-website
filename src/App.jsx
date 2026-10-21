import { useState } from "react";
import "./App.css";
import Auth from "./Auth";

// In development, Vite forwards /api to the Python backend.
const API = import.meta.env.VITE_API_URL || "";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [joinMsg, setJoinMsg] = useState("");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("striwa_user"));
  } catch {
    user = null;
  }

  function handleLogout() {
    localStorage.removeItem("striwa_token");
    localStorage.removeItem("striwa_user");
    window.location.href = "/";
  }

  if (window.location.pathname === "/login") {
  return <Auth />;
}
  async function handleJoin(event) {
    event.preventDefault();

    if (!email.trim()) return;

    setJoinMsg("Sending...");
    try {
      const res = await fetch(`${API}/api/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setJoinMsg(data.message);
        setEmail("");
      } else {
        setJoinMsg("Please enter a valid email address.");
      }
    } catch {
      setJoinMsg("Cannot reach the server. Please try again later.");
    }
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
          <a href="#opportunities" onClick={() => setMenuOpen(false)}>Opportunities</a>
          <a href="#workshops" onClick={() => setMenuOpen(false)}>Workshops</a>
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
            {user && (
              <span style={{ marginLeft: 6, fontSize: 14 }}>
                {user.name.split(" ")[0]}
              </span>
            )}
          </a>
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              style={{
                marginLeft: 12,
                background: "none",
                border: "none",
                cursor: "pointer",
                font: "inherit",
                textDecoration: "underline",
              }}
            >
              Log out
            </button>
          )}
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

        
        <section className="opportunities-section" id="opportunities">
          <div className="section-label">03 — EXPLORE YOUR POTENTIAL</div>

          <div className="section-heading">
            <div>
              <h2>
                Your next chapter
                <br />
                <em>starts with possibility.</em>
              </h2>
            </div>
            <p>
              Discover ways to learn new skills, explore ideas, and take
              confident steps towards your personal and professional goals.
            </p>
          </div>

          <div className="opportunities-grid">
            <article className="opportunity-card">
              <span className="opportunity-number">01</span>
              <h3>Entrepreneurship</h3>
              <p>
                Explore business ideas, understand the basics of starting
                something of your own, and learn from other women.
              </p>
              <a href="#connect" className="text-link">
                Explore possibilities ↗
              </a>
            </article>

            <article className="opportunity-card">
              <span className="opportunity-number">02</span>
              <h3>Skills & Creativity</h3>
              <p>
                Discover creative learning through art, crochet, design,
                and practical skills that can grow with you.
              </p>
              <a href="#workshops" className="text-link">
                Explore workshops ↗
              </a>
            </article>

            <article className="opportunity-card">
              <span className="opportunity-number">03</span>
              <h3>Career & Confidence</h3>
              <p>
                Build confidence, strengthen communication, and explore
                resume preparation and professional development.
              </p>
              <a href="#connect" className="text-link">
                Get involved ↗
              </a>
            </article>
          </div>
        </section>

        <section className="workshops-section" id="workshops">
          <div className="section-label">04 — LEARN TOGETHER</div>

          <div className="section-heading">
            <div>
              <h2>
                Small steps.
                <br />
                <em>New possibilities.</em>
              </h2>
            </div>
            <p>
              Workshops are a space to discover interests, exchange ideas,
              learn together, and turn inspiration into action.
             </p>
          </div>

          <div className="workshops-grid">
            <article className="workshop-card">
              <div className="workshop-topline">
                <span>01 / BUSINESS</span>
                <span>Coming soon</span>
              </div>
              <h3>From Idea to Initiative</h3>
              <p>
                Explore how to shape an idea, identify a need, and take
                the first steps towards a small business or initiative.
              </p>
              <a className="button button-primary" href="#connect">
                Register Interest ↗
              </a>
            </article>

            <article className="workshop-card">
              <div className="workshop-topline">
                <span>02 / CREATIVE SKILLS</span>
                <span>Coming soon</span>
              </div>
              <h3>Create, Learn & Grow</h3>
              <p>
                Discover creative skills and explore how learning can
                become a pathway to confidence and future opportunities.
              </p>
              <a className="button button-primary" href="#connect">
                Register Interest ↗
              </a>
            </article>
          </div>

          <p className="workshop-note">
            Workshop dates and registration details will be announced here.
          </p>
        </section>

        <section className="community-section" id="community">
          <div className="community-image">
            <img
             src="/community-illustration.png"
             alt="Women sharing ideas and supporting one another in the STRIWA community"
             loading="lazy"
            />
             <span className="image-note">BETTER, TOGETHER.</span>
          </div>

          <div className="community-copy">
            <div className="section-label">03 — THE BIGGER PICTURE</div>

            <h2>
               There is room for <em>every woman's ambition.</em>
            </h2>
            <p>
               We imagine a connected community where women can exchange
               ideas, discover possibilities, learn from one another, and
               take their next steps with greater confidence.
            </p>

            <a className="button button-light" href="#connect">
              Let's Connect ↗
            </a>
          </div>
      </section>


                   
        <section className="connect-section community-connect" id="connect">
          <div className="section-label">05 — OUR COMMUNITY</div>

          <div className="community-connect-grid">
            <div className="community-connect-copy">
              <h2>
                Together,<br />
                <em>we grow stronger.</em>
              </h2>

              <p>
                 STRIWA is a community where women can connect, share ideas,
                 learn new skills, explore opportunities, and support one
                 another on the journey towards confidence and financial
                 independence.
              </p>

              <form
                onSubmit={handleJoin}
                style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "20px 0" }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: "1 1 220px",
                    padding: "12px 14px",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    font: "inherit",
                  }}
                />
                <button type="submit" className="button button-primary">
                  Keep me updated
                </button>
              </form>
              {joinMsg && <p>{joinMsg}</p>}

              <div className="community-connect-actions">
                <a className="button button-primary" href="#opportunities">
                  Explore Opportunities ↗
                </a>
                <a className="text-link" href="#workshops">
                  Discover Workshops →
                </a>
              </div>
            </div>

            <div className="social-connect">
              <h3>Follow us on our journey</h3>

              <div className="social-icons">
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                  <span>Instagram</span>
                </a>

                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                 <i className="bi bi-linkedin"></i>
                 <span>LinkedIn</span>
                </a>

                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
                 <i className="bi bi-youtube"></i>
                 <span>YouTube</span>
                </a>

                <a
                  href="mailto:striva833@gmail.com"
                  aria-label="Contact STRIWA"
                >
                  <i className="bi bi-telephone-fill"></i>
                  <span>Contact</span>
                </a>
              </div>

              <p className="social-note">
                Stay connected for updates, events, stories and more.
              </p>

              <a className="community-email" href="mailto:striva833@gmail.com">
                Contact STRIWA ↗
              </a>
          </div>
        </div>
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