import { Link } from 'react-router-dom';
import FloatingIcons from '../app/components/FloatingIcons';

type SignUpProps = {
  darkMode: boolean;
};

export default function SignUp({ darkMode }: SignUpProps) {
  const pageBackground = darkMode
    ? 'linear-gradient(135deg, #020617, #0f172a 55%, #1e293b)'
    : 'linear-gradient(135deg, #f8fafc, #e2e8f0 55%, #cbd5e1)';

  const panelBackground = darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)';

  return (
    <main className="auth-main" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: pageBackground, color: darkMode ? 'white' : '#0f172a', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <FloatingIcons />
      <section className="auth-panel" style={{ width: '100%', maxWidth: 520, background: panelBackground, border: '1px solid rgba(148, 163, 184, 0.18)', borderRadius: 28, padding: '2.25rem', boxShadow: '0 24px 70px rgba(0,0,0,0.45)' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ margin: 0, color: '#f59e0b', letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.8rem', fontWeight: 700 }}>AGroup</p>
          <h1 style={{ margin: '.35rem 0 0', fontSize: '2rem' }}>Create your account</h1>
          <p style={{ margin: '.65rem 0 0', color: darkMode ? '#cbd5e1' : '#475569' }}>Join the planning workspace and keep every event decision in one place.</p>
        </div>

        <form style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gap: '.85rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <input type="text" placeholder="First name" style={inputStyle(darkMode)} />
            <input type="text" placeholder="Last name" style={inputStyle(darkMode)} />
          </div>
          <input type="email" placeholder="Email address" style={inputStyle(darkMode)} />
          <input type="password" placeholder="Password" style={inputStyle(darkMode)} />
          <button className="auth-btn" type="button" style={buttonStyle}>Create account</button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <Link to="/signin" style={linkStyle}>Already have an account?</Link>
          <Link to="/" style={linkStyle}>Back to home</Link>
        </div>
      </section>
      
    </main>
  );
}

const inputStyle = (darkMode: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '0.95rem 1rem',
  borderRadius: 14,
  border: darkMode ? '1px solid rgba(148, 163, 184, 0.22)' : '1px solid #cbd5e1',
  background: darkMode ? 'rgba(2, 6, 23, 0.88)' : '#f8fafc',
  color: darkMode ? 'white' : '#0f172a',
  outline: 'none'
});

const buttonStyle: React.CSSProperties = {
  padding: '1rem 1.1rem',
  borderRadius: 999,
  border: 'none',
  background: 'linear-gradient(135deg, #f97316, #fb7185)',
  color: 'white',
  fontWeight: 800,
  cursor: 'pointer'
};

const linkStyle: React.CSSProperties = {
  color: '#fbbf24',
  textDecoration: 'none',
  fontWeight: 600
};
