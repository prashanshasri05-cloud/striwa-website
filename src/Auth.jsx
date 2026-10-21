import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

// In development, Vite forwards /api to the Python backend (see vite.config.js).
// After deploying, set VITE_API_URL to your backend link.
const API = import.meta.env.VITE_API_URL || "";

export default function Auth() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isSignup ? { name, email, password } : { email, password }
        ),
      });
      const data = await res.json();

      if (!res.ok) {
        const msg =
          typeof data.detail === "string"
            ? data.detail
            : "Please check your details and try again.";
        setError(msg);
        return;
      }

      localStorage.setItem("striwa_token", data.token);
      localStorage.setItem("striwa_user", JSON.stringify(data.user));
      navigate("/");
    } catch {
      setError("Cannot reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <a href="/" className="auth-brand">STRIWA.</a>

      <div className="auth-card">
        <h1>{isSignup ? "Join STRIWA" : "Welcome Back"}</h1>

        <p>
          {isSignup
            ? "Create an account and become part of our community."
            : "Log in to continue your STRIWA journey."}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {isSignup && (
            <small className="auth-hint">
              Password must be at least 6 characters.
            </small>
          )}

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New to STRIWA?"}

          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>

        <a href="/" className="back-home">← Back to website</a>
      </div>
    </div>
  );
}