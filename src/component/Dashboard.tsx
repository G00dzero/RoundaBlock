import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import FloatingIcons from '../app/components/FloatingIcons';

type DashboardProps = {
  darkMode: boolean;
};

const planningCards = [
  {
    title: 'Start a plan',
    description: 'Create a new hangout, trip, dinner, or event and invite your people.',
  },
  {
    title: 'Pick a time',
    description: 'Collect everyone\'s availability before the group chat gets messy.',
  },
  {
    title: 'Decide together',
    description: 'Vote on places, food, dates, and details from one shared space.',
  },
];

export default function Dashboard({ darkMode }: DashboardProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/', { replace: true });
  };

  const name = user?.displayName || user?.email?.split('@')[0] || 'there';

  return (
    <main style={pageStyle(darkMode)}>
      <FloatingIcons />
      <section style={shellStyle}>
        <nav style={navStyle}>
          <Link to="/" style={brandStyle(darkMode)}>RoundaBlock</Link>
          <button type="button" onClick={handleSignOut} style={outlineButtonStyle(darkMode)}>
            Sign out
          </button>
        </nav>

        <section style={heroStyle(darkMode)}>
          <p style={eyebrowStyle}>Your planning hub</p>
          <h1 style={headlineStyle}>Welcome, {loading ? '...' : name}</h1>
          <p style={copyStyle(darkMode)}>
            This is where your group plans will live. Start with a plan, invite friends, and keep the decisions in one place.
          </p>
          <div style={actionsStyle}>
            <button type="button" style={primaryButtonStyle}>Create a plan</button>
            <Link to="/" style={secondaryLinkStyle(darkMode)}>Back to home</Link>
          </div>
        </section>

        <section style={cardsStyle}>
          {planningCards.map((card) => (
            <article key={card.title} style={cardStyle(darkMode)}>
              <h2 style={cardTitleStyle}>{card.title}</h2>
              <p style={cardCopyStyle(darkMode)}>{card.description}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

function pageStyle(darkMode: boolean): CSSProperties {
  return {
    minHeight: '100vh',
    background: darkMode
      ? 'linear-gradient(135deg, #020617, #111827 55%, #312e81)'
      : 'linear-gradient(135deg, #fff7ed, #f8fafc 55%, #e0f2fe)',
    color: darkMode ? 'white' : '#0f172a',
    padding: '1.25rem',
    position: 'relative',
    overflow: 'hidden',
  };
}

const shellStyle: CSSProperties = {
  width: 'min(1120px, 100%)',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
};

const navStyle: CSSProperties = {
  minHeight: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
};

function brandStyle(darkMode: boolean): CSSProperties {
  return {
    color: darkMode ? 'white' : '#0f172a',
    fontWeight: 900,
    fontSize: '1.2rem',
    textDecoration: 'none',
  };
}

function heroStyle(darkMode: boolean): CSSProperties {
  return {
    marginTop: '2rem',
    padding: 'clamp(2rem, 6vw, 4.5rem)',
    borderRadius: 28,
    border: darkMode ? '1px solid rgba(148, 163, 184, 0.22)' : '1px solid rgba(15, 23, 42, 0.08)',
    background: darkMode ? 'rgba(15, 23, 42, 0.82)' : 'rgba(255, 255, 255, 0.86)',
    boxShadow: darkMode ? '0 28px 80px rgba(0, 0, 0, 0.45)' : '0 28px 80px rgba(15, 23, 42, 0.12)',
  };
}

const eyebrowStyle: CSSProperties = {
  margin: 0,
  color: '#f97316',
  fontSize: '0.82rem',
  fontWeight: 800,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const headlineStyle: CSSProperties = {
  margin: '0.65rem 0 0',
  fontSize: 'clamp(2rem, 6vw, 4.4rem)',
  lineHeight: 1,
  letterSpacing: 0,
};

function copyStyle(darkMode: boolean): CSSProperties {
  return {
    maxWidth: 680,
    margin: '1rem 0 0',
    color: darkMode ? '#cbd5e1' : '#475569',
    fontSize: '1.05rem',
    lineHeight: 1.7,
  };
}

const actionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
  marginTop: '2rem',
};

const primaryButtonStyle: CSSProperties = {
  border: 'none',
  borderRadius: 999,
  background: 'linear-gradient(135deg, #f97316, #fb7185)',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 800,
  padding: '0.95rem 1.35rem',
};

function secondaryLinkStyle(darkMode: boolean): CSSProperties {
  return {
    color: darkMode ? '#fde68a' : '#b45309',
    fontWeight: 800,
    textDecoration: 'none',
  };
}

function outlineButtonStyle(darkMode: boolean): CSSProperties {
  return {
    border: darkMode ? '1px solid rgba(255, 255, 255, 0.24)' : '1px solid rgba(15, 23, 42, 0.18)',
    borderRadius: 999,
    background: darkMode ? 'rgba(15, 23, 42, 0.62)' : 'rgba(255, 255, 255, 0.76)',
    color: darkMode ? 'white' : '#0f172a',
    cursor: 'pointer',
    fontWeight: 800,
    padding: '0.75rem 1rem',
  };
}

const cardsStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1rem',
  marginTop: '1rem',
};

function cardStyle(darkMode: boolean): CSSProperties {
  return {
    minHeight: 160,
    padding: '1.25rem',
    borderRadius: 20,
    border: darkMode ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(15, 23, 42, 0.08)',
    background: darkMode ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255, 255, 255, 0.78)',
    boxShadow: darkMode ? '0 18px 50px rgba(0, 0, 0, 0.24)' : '0 18px 50px rgba(15, 23, 42, 0.08)',
  };
}

const cardTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: '1.1rem',
};

function cardCopyStyle(darkMode: boolean): CSSProperties {
  return {
    margin: '0.75rem 0 0',
    color: darkMode ? '#cbd5e1' : '#475569',
    lineHeight: 1.6,
  };
}
