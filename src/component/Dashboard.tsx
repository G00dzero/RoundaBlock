import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import FloatingIcons from '../app/components/FloatingIcons';

type DashboardProps = {
  darkMode: boolean;
};

const planningCards = [
  {
    title: 'Create plan',
    description: 'Create a new hangout, trip, dinner, or event and invite your people.',
  },
  {
    title: 'View current plans',
    description: 'See active plans, pending decisions, and what still needs a vote.',
  },
  {
    title: 'Plan history',
    description: 'Look back at completed events and repeat the plans that worked.',
  },
  {
    title: 'Live chat',
    description: 'Keep the conversation beside the plan so nothing gets lost.',
  },
];

const floatingNavItems = [
  {
    label: 'Create plan',
    target: 'create-plan',
  },
  {
    label: 'View plans',
    target: 'current-plans',
  },
  {
    label: 'History',
    target: 'plan-history',
  },
  {
    label: 'Live chat',
    target: 'live-chat',
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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const name = user?.displayName || user?.email?.split('@')[0] || 'there';

  return (
    <main style={pageStyle(darkMode)}>
      <FloatingIcons />
      <nav style={floatingNavStyle(darkMode)} aria-label="Dashboard navigation">
        {floatingNavItems.map((item) => (
          <button key={item.target} type="button" onClick={() => scrollToSection(item.target)} style={floatingNavButtonStyle(darkMode)}>
            {item.label}
          </button>
        ))}
      </nav>
      <section style={shellStyle}>
        <nav style={navStyle}>
          <button type="button" onClick={() => scrollToSection('dashboard-home')} style={brandStyle(darkMode)}>RoundaBlock</button>
          <button type="button" onClick={handleSignOut} style={outlineButtonStyle(darkMode)}>
            Sign out
          </button>
        </nav>

        <section id="dashboard-home" style={heroStyle(darkMode)}>
          <p style={eyebrowStyle}>Your planning hub</p>
          <h1 style={headlineStyle}>Welcome, {loading ? '...' : name}</h1>
          <p style={copyStyle(darkMode)}>
            You are signed in. Start something new or jump back into the plans already moving.
          </p>
          <div style={actionsStyle}>
            <button type="button" onClick={() => navigate('/create-plan')} style={primaryButtonStyle}>Create a plan</button>
            <button type="button" onClick={() => scrollToSection('current-plans')} style={secondaryButtonStyle(darkMode)}>View current plans</button>
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

        <section id="create-plan" style={panelSectionStyle(darkMode)}>
          <div>
            <p style={eyebrowStyle}>Create plan</p>
            <h2 style={sectionTitleStyle}>Start with the basics</h2>
            <p style={copyStyle(darkMode)}>
              Add the plan name, suggested dates, location ideas, and the friends you want involved.
            </p>
          </div>
          <button type="button" onClick={() => navigate('/create-plan')} style={primaryButtonStyle}>New plan</button>
        </section>

        <section id="current-plans" style={panelSectionStyle(darkMode)}>
          <div>
            <p style={eyebrowStyle}>View current plans</p>
            <h2 style={sectionTitleStyle}>Active plans will show here</h2>
            <p style={copyStyle(darkMode)}>
              Once plans are saved, this area can list open votes, pending invites, and next decisions.
            </p>
          </div>
          <button type="button" style={secondaryButtonStyle(darkMode)}>View plans</button>
        </section>

        <section id="plan-history" style={panelSectionStyle(darkMode)}>
          <div>
            <p style={eyebrowStyle}>Plan history</p>
            <h2 style={sectionTitleStyle}>Past plans, saved decisions</h2>
            <p style={copyStyle(darkMode)}>
              Completed events can live here so users can reuse dates, places, and invite lists.
            </p>
          </div>
        </section>

        <section id="live-chat" style={panelSectionStyle(darkMode)}>
          <div>
            <p style={eyebrowStyle}>Live chat</p>
            <h2 style={sectionTitleStyle}>Chat beside the plan</h2>
            <p style={copyStyle(darkMode)}>
              A chat feed can be connected here later so every decision stays attached to the right plan.
            </p>
          </div>
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
    padding: '1.25rem 1.25rem 7rem',
    position: 'relative',
    overflow: 'hidden auto',
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
    border: 'none',
    background: 'transparent',
    color: darkMode ? 'white' : '#0f172a',
    cursor: 'pointer',
    fontWeight: 900,
    fontSize: '1.2rem',
    padding: 0,
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

function secondaryButtonStyle(darkMode: boolean): CSSProperties {
  return {
    border: darkMode ? '1px solid rgba(253, 230, 138, 0.34)' : '1px solid rgba(180, 83, 9, 0.28)',
    borderRadius: 999,
    background: darkMode ? 'rgba(253, 230, 138, 0.1)' : 'rgba(255, 247, 237, 0.95)',
    color: darkMode ? '#fde68a' : '#b45309',
    cursor: 'pointer',
    fontWeight: 800,
    padding: '0.9rem 1.25rem',
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

function floatingNavStyle(darkMode: boolean): CSSProperties {
  return {
    position: 'fixed',
    left: '50%',
    bottom: '1rem',
    transform: 'translateX(-50%)',
    zIndex: 20,
    width: 'min(760px, calc(100% - 1.5rem))',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '0.35rem',
    padding: '0.45rem',
    border: darkMode ? '1px solid rgba(148, 163, 184, 0.24)' : '1px solid rgba(15, 23, 42, 0.12)',
    borderRadius: 999,
    background: darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.92)',
    boxShadow: darkMode ? '0 18px 50px rgba(0, 0, 0, 0.36)' : '0 18px 50px rgba(15, 23, 42, 0.14)',
    backdropFilter: 'blur(14px)',
  };
}

function floatingNavButtonStyle(darkMode: boolean): CSSProperties {
  return {
    minHeight: 42,
    border: 'none',
    borderRadius: 999,
    background: 'transparent',
    color: darkMode ? '#e5e7eb' : '#334155',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 800,
    padding: '0.45rem 0.55rem',
    whiteSpace: 'nowrap',
  };
}

function panelSectionStyle(darkMode: boolean): CSSProperties {
  return {
    scrollMarginTop: '1rem',
    marginTop: '1rem',
    minHeight: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    flexWrap: 'wrap',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    borderRadius: 24,
    border: darkMode ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(15, 23, 42, 0.08)',
    background: darkMode ? 'rgba(15, 23, 42, 0.78)' : 'rgba(255, 255, 255, 0.8)',
    boxShadow: darkMode ? '0 18px 50px rgba(0, 0, 0, 0.24)' : '0 18px 50px rgba(15, 23, 42, 0.08)',
  };
}

const sectionTitleStyle: CSSProperties = {
  margin: '0.55rem 0 0',
  fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
  lineHeight: 1.08,
  letterSpacing: 0,
};
