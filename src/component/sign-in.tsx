import { Link } from 'react-router-dom';
import FloatingIcons from '../app/components/FloatingIcons';

type SignInProps = {
  darkMode: boolean;
};

export default function SignIn({ darkMode }: SignInProps) {
  return (
    <main className="auth-main" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: darkMode ? '#111827' : '#f7fafc', color: darkMode ? 'white' : '#0f172a', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <FloatingIcons />
      <section className="auth-panel" style={{ width: '100%', maxWidth: 420, background: darkMode ? '#1f2937' : '#ffffff', borderRadius: 24, padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <h1 style={{ marginTop: 0, textAlign:'center'}}>Sign in</h1>
        <p style={{ color: darkMode ? '#cbd5e1' : '#475569' , textAlign:'center'}}>Welcome back to RoundaBlock.</p>
        <form style={{ display: 'grid', gap: '1rem' }}>
          <input type="email" placeholder="Email" style={{ padding: '0.9rem 1rem', borderRadius: 12, border: darkMode ? '1px solid #374151' : '1px solid #cbd5e1', background: darkMode ? '#111827' : '#f8fafc', color: darkMode ? 'white' : '#0f172a' }} />
          <input type="password" placeholder="Password" style={{ padding: '0.9rem 1rem', borderRadius: 12, border: darkMode ? '1px solid #374151' : '1px solid #cbd5e1', background: darkMode ? '#111827' : '#f8fafc', color: darkMode ? 'white' : '#0f172a' }} />
          <button className="auth-btn" type="button" style={{ padding: '0.95rem 1rem', borderRadius: 999, border: 'none', background: '#f97316', color: 'white', fontWeight: 700 }}>Sign in</button>
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