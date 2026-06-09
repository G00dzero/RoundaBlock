import { useState } from 'react';
import type { FormEvent, CSSProperties } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FloatingIcons from '../app/components/FloatingIcons';
import { auth } from '../lib/firebase';

type SignInProps = {
  darkMode: boolean;
};

type LocationState = {
  message?: string;
};

export default function SignIn({ darkMode }: SignInProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(state?.message ?? '');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(getAuthMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-main" style={pageStyle(darkMode)}>
      <FloatingIcons />
      <section className="auth-panel" style={panelStyle(darkMode)}>
        <h1 style={{ marginTop: 0, textAlign: 'center' }}>Sign in</h1>
        <p style={{ color: darkMode ? '#cbd5e1' : '#475569', textAlign: 'center' }}>Welcome back to RoundaBlock.</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            style={inputStyle(darkMode)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            style={inputStyle(darkMode)}
          />
          {error ? <p style={messageStyle('#ef4444')}>{error}</p> : null}
          {success ? <p style={messageStyle('#22c55e')}>{success}</p> : null}
          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
            style={{ ...buttonStyle, opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: '1rem', marginBottom: '.5rem', textAlign: 'center', color: darkMode ? '#cbd5e1' : '#475569' }}>
          Don't have an Acct?{' '}
          <Link to="/signup" style={{ color: '#fbbf24', fontWeight: 700 }}>Sign up</Link>
        </p>
        <p style={{ marginTop: '.25rem', textAlign: 'center' }}><Link to="/" style={{ color: '#fbbf24' }}>Back home</Link></p>
      </section>
    </main>
  );
}

function getAuthMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unable to sign in. Please try again.';
}

function pageStyle(darkMode: boolean): CSSProperties {
  return {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: darkMode ? '#111827' : '#f7fafc',
    color: darkMode ? 'white' : '#0f172a',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  };
}

function panelStyle(darkMode: boolean): CSSProperties {
  return {
    width: '100%',
    maxWidth: 420,
    background: darkMode ? '#1f2937' : '#ffffff',
    borderRadius: 24,
    padding: '2rem',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
  };
}

function inputStyle(darkMode: boolean): CSSProperties {
  return {
    padding: '0.9rem 1rem',
    borderRadius: 12,
    border: darkMode ? '1px solid #374151' : '1px solid #cbd5e1',
    background: darkMode ? '#111827' : '#f8fafc',
    color: darkMode ? 'white' : '#0f172a',
  };
}

function messageStyle(color: string): CSSProperties {
  return {
    margin: 0,
    fontSize: '0.95rem',
    color,
    textAlign: 'center',
  };
}

const buttonStyle: CSSProperties = {
  padding: '0.95rem 1rem',
  borderRadius: 999,
  border: 'none',
  background: '#f97316',
  color: 'white',
  fontWeight: 700,
};
