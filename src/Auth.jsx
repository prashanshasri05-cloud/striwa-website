
import { useState } from "react";
import "./Auth.css";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="auth-page">
      <a href="/" className="auth-brand">STRIWA.</a>

      <div className="auth-card">
        <h1>
          {isSignup ? "Join STRIWA" : "Welcome Back"}
        </h1>

        <p>
          {isSignup
            ? "Create an account and become part of our community."
            : "Log in to continue your STRIWA journey."}
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full name"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup
            ? "Already have an account?"
            : "New to STRIWA?"}

          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>

        <a href="/" className="back-home">
          ← Back to website
        </a>
      </div>
    </div>
  );
}
