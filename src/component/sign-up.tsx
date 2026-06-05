import { useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import FloatingIcons from '../app/components/FloatingIcons';
import { auth, database } from '../lib/firebase';

type SignUpProps = {
  darkMode: boolean;
};

export default function SignUp({ darkMode }: SignUpProps) {
  const navigate = useNavigate();
  const pageBackground = darkMode
    ? 'linear-gradient(135deg, #020617, #0f172a 55%, #1e293b)'
    : 'linear-gradient(135deg, #f8fafc, #e2e8f0 55%, #cbd5e1)';

  const panelBackground = darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const displayName = `${firstName.trim()} ${lastName.trim()}`.trim();

      if (displayName) {
        await updateProfile(credential.user, { displayName });
      }

      await set(ref(database, `users/${credential.user.uid}`), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        displayName: displayName || null,
        createdAt: new Date().toISOString(),
      });

      navigate('/signin', {
        replace: true,
        state: { message: 'Account created successfully. Please sign in.' },
      });
    } catch (err) {
      setError(getAuthMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-main" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: pageBackground, color: darkMode ? 'white' : '#0f172a', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <FloatingIcons />
      <section className="auth-panel" style={{ width: '100%', maxWidth: 520, background: panelBackground, border: '1px solid rgba(148, 163, 184, 0.18)', borderRadius: 28, padding: '2.25rem', boxShadow: '0 24px 70px rgba(0,0,0,0.45)' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ margin: 0, color: '#f59e0b', letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.8rem', fontWeight: 700 }}>AGroup</p>
          <h1 style={{ margin: '.35rem 0 0', fontSize: '2rem' }}>Create your account</h1>
          <p style={{ margin: '.65rem 0 0', color: darkMode ? '#cbd5e1' : '#475569' }}>Join the planning workspace and keep every event decision in one place.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gap: '.85rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <input type="text" placeholder="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" required style={inputStyle(darkMode)} />
            <input type="text" placeholder="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" required style={inputStyle(darkMode)} />
          </div>
          <input type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required style={inputStyle(darkMode)} />
          <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required minLength={6} style={inputStyle(darkMode)} />
          {error ? <p style={messageStyle('#ef4444')}>{error}</p> : null}
          <button className="auth-btn" type="submit" disabled={loading} style={{ ...buttonStyle, opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}>{loading ? 'Creating account...' : 'Create account'}</button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <Link to="/signin" style={linkStyle}>Already have an account?</Link>
          <Link to="/" style={linkStyle}>Back to home</Link>
        </div>
      </section>
    </main>
  );
}

function getAuthMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unable to create account. Please try again.';
}

const inputStyle = (darkMode: boolean): CSSProperties => ({
  width: '100%',
  padding: '0.95rem 1rem',
  borderRadius: 14,
  border: darkMode ? '1px solid rgba(148, 163, 184, 0.22)' : '1px solid #cbd5e1',
  background: darkMode ? 'rgba(2, 6, 23, 0.88)' : '#f8fafc',
  color: darkMode ? 'white' : '#0f172a',
  outline: 'none'
});

const buttonStyle: CSSProperties = {
  padding: '1rem 1.1rem',
  borderRadius: 999,
  border: 'none',
  background: 'linear-gradient(135deg, #f97316, #fb7185)',
  color: 'white',
  fontWeight: 800,
  cursor: 'pointer'
};

const linkStyle: CSSProperties = {
  color: '#fbbf24',
  textDecoration: 'none',
  fontWeight: 600
};

const messageStyle = (color: string): CSSProperties => ({
  margin: 0,
  fontSize: '0.95rem',
  color,
  textAlign: 'center'
});
