import { useMemo, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingIcons from '../app/components/FloatingIcons';

type CreatePlanProps = {
  darkMode: boolean;
};

type Step = 'details' | 'friends' | 'date';

type FriendInvite = {
  id: number;
  name: string;
  email: string;
};

const steps: Array<{ id: Step; label: string }> = [
  { id: 'details', label: 'Plan details' },
  { id: 'friends', label: 'Invite friends' },
  { id: 'date', label: 'Pick date' },
];

export default function CreatePlan({ darkMode }: CreatePlanProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('details');
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [friends, setFriends] = useState<FriendInvite[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');

  const canContinueToFriends = planName.trim().length > 0 && description.trim().length > 0;
  const canContinueToDate = friends.length > 0;

  const summaryText = useMemo(() => {
    if (!planName.trim()) {
      return 'Name the plan to get started.';
    }

    if (friends.length === 0) {
      return `${planName.trim()} is ready for invites.`;
    }

    if (!selectedDate) {
      return `${friends.length} friend${friends.length === 1 ? '' : 's'} invited. Pick the date next.`;
    }

    return `${planName.trim()} is set for ${selectedDate}.`;
  }, [friends.length, planName, selectedDate]);

  const handleDetailsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!canContinueToFriends) {
      setError('Add a plan name and description first.');
      return;
    }

    setStep('friends');
  };

  const handleFriendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!friendName.trim() || !friendEmail.trim()) {
      setError('Add your friend\'s name and email.');
      return;
    }

    setFriends((currentFriends) => [
      ...currentFriends,
      {
        id: Date.now(),
        name: friendName.trim(),
        email: friendEmail.trim(),
      },
    ]);
    setFriendName('');
    setFriendEmail('');
  };

  const removeFriend = (friendId: number) => {
    setFriends((currentFriends) => currentFriends.filter((friend) => friend.id !== friendId));
  };

  const goToDateStep = () => {
    setError('');

    if (!canContinueToDate) {
      setError('Invite at least one friend before picking a date.');
      return;
    }

    setStep('date');
  };

  const finishPlan = () => {
    setError('');

    if (!selectedDate) {
      setError('Pick a date for the plan.');
      return;
    }

    navigate('/dashboard', { replace: true });
  };

  return (
    <main style={pageStyle(darkMode)}>
      <FloatingIcons />
      <section style={shellStyle}>
        <nav style={navStyle}>
          <Link to="/dashboard" style={brandStyle(darkMode)}>RoundaBlock</Link>
          <Link to="/dashboard" style={backLinkStyle(darkMode)}>Dashboard</Link>
        </nav>

        <section style={layoutStyle}>
          <aside style={summaryPanelStyle(darkMode)}>
            <p style={eyebrowStyle}>Create plan</p>
            <h1 style={headlineStyle}>Build the plan in order</h1>
            <p style={copyStyle(darkMode)}>{summaryText}</p>

            <div style={stepListStyle}>
              {steps.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  disabled={item.id === 'friends' && !canContinueToFriends || item.id === 'date' && !canContinueToDate}
                  style={stepButtonStyle(darkMode, step === item.id)}
                >
                  <span style={stepNumberStyle(step === item.id)}>{index + 1}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          <section style={formPanelStyle(darkMode)}>
            {step === 'details' ? (
              <form onSubmit={handleDetailsSubmit} style={formStyle}>
                <div>
                  <p style={eyebrowStyle}>Step 1</p>
                  <h2 style={sectionTitleStyle}>Name the plan</h2>
                </div>
                <label style={labelStyle}>
                  Plan name
                  <input value={planName} onChange={(event) => setPlanName(event.target.value)} placeholder="Friday dinner, beach day, movie night..." style={inputStyle(darkMode)} />
                </label>
                <label style={labelStyle}>
                  Description
                  <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What are you planning and what should friends know?" rows={5} style={textareaStyle(darkMode)} />
                </label>
                {error ? <p style={errorStyle}>{error}</p> : null}
                <button type="submit" style={primaryButtonStyle}>Invite friends</button>
              </form>
            ) : null}

            {step === 'friends' ? (
              <div style={formStyle}>
                <div>
                  <p style={eyebrowStyle}>Step 2</p>
                  <h2 style={sectionTitleStyle}>Invite your friends</h2>
                </div>
                <form onSubmit={handleFriendSubmit} style={friendFormStyle}>
                  <input value={friendName} onChange={(event) => setFriendName(event.target.value)} placeholder="Friend name" style={inputStyle(darkMode)} />
                  <input value={friendEmail} onChange={(event) => setFriendEmail(event.target.value)} placeholder="Friend email" type="email" style={inputStyle(darkMode)} />
                  <button type="submit" style={primaryButtonStyle}>Add invite</button>
                </form>
                {friends.length > 0 ? (
                  <div style={inviteListStyle}>
                    {friends.map((friend) => (
                      <div key={friend.id} style={inviteRowStyle(darkMode)}>
                        <div>
                          <strong>{friend.name}</strong>
                          <p style={inviteEmailStyle(darkMode)}>{friend.email}</p>
                        </div>
                        <button type="button" onClick={() => removeFriend(friend.id)} style={removeButtonStyle(darkMode)}>Remove</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={copyStyle(darkMode)}>Add at least one friend before picking a date.</p>
                )}
                {error ? <p style={errorStyle}>{error}</p> : null}
                <div style={actionsStyle}>
                  <button type="button" onClick={() => setStep('details')} style={secondaryButtonStyle(darkMode)}>Back</button>
                  <button type="button" onClick={goToDateStep} style={primaryButtonStyle}>Pick a date</button>
                </div>
              </div>
            ) : null}

            {step === 'date' ? (
              <div style={formStyle}>
                <div>
                  <p style={eyebrowStyle}>Step 3</p>
                  <h2 style={sectionTitleStyle}>Pick the date</h2>
                </div>
                <label style={labelStyle}>
                  Plan date
                  <input value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} type="date" style={inputStyle(darkMode)} />
                </label>
                <div style={dateSummaryStyle(darkMode)}>
                  <strong>{planName || 'Untitled plan'}</strong>
                  <span>{friends.length} invite{friends.length === 1 ? '' : 's'} ready</span>
                </div>
                {error ? <p style={errorStyle}>{error}</p> : null}
                <div style={actionsStyle}>
                  <button type="button" onClick={() => setStep('friends')} style={secondaryButtonStyle(darkMode)}>Back</button>
                  <button type="button" onClick={finishPlan} style={primaryButtonStyle}>Finish plan</button>
                </div>
              </div>
            ) : null}
          </section>
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
    color: darkMode ? 'white' : '#0f172a',
    fontWeight: 900,
    fontSize: '1.2rem',
    textDecoration: 'none',
  };
}

function backLinkStyle(darkMode: boolean): CSSProperties {
  return {
    border: darkMode ? '1px solid rgba(255, 255, 255, 0.24)' : '1px solid rgba(15, 23, 42, 0.18)',
    borderRadius: 999,
    background: darkMode ? 'rgba(15, 23, 42, 0.62)' : 'rgba(255, 255, 255, 0.76)',
    color: darkMode ? 'white' : '#0f172a',
    fontWeight: 800,
    padding: '0.75rem 1rem',
    textDecoration: 'none',
  };
}

const layoutStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(260px, 0.8fr) minmax(0, 1.2fr)',
  gap: '1rem',
  alignItems: 'start',
};

function summaryPanelStyle(darkMode: boolean): CSSProperties {
  return panelBaseStyle(darkMode, {
    position: 'sticky',
    top: '1rem',
  });
}

function formPanelStyle(darkMode: boolean): CSSProperties {
  return panelBaseStyle(darkMode);
}

function panelBaseStyle(darkMode: boolean, extra: CSSProperties = {}): CSSProperties {
  return {
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    borderRadius: 28,
    border: darkMode ? '1px solid rgba(148, 163, 184, 0.22)' : '1px solid rgba(15, 23, 42, 0.08)',
    background: darkMode ? 'rgba(15, 23, 42, 0.82)' : 'rgba(255, 255, 255, 0.86)',
    boxShadow: darkMode ? '0 28px 80px rgba(0, 0, 0, 0.45)' : '0 28px 80px rgba(15, 23, 42, 0.12)',
    ...extra,
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
  fontSize: 'clamp(2rem, 5vw, 3.4rem)',
  lineHeight: 1,
  letterSpacing: 0,
};

const sectionTitleStyle: CSSProperties = {
  margin: '0.55rem 0 0',
  fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
  lineHeight: 1.08,
  letterSpacing: 0,
};

function copyStyle(darkMode: boolean): CSSProperties {
  return {
    margin: '1rem 0 0',
    color: darkMode ? '#cbd5e1' : '#475569',
    fontSize: '1rem',
    lineHeight: 1.7,
  };
}

const stepListStyle: CSSProperties = {
  display: 'grid',
  gap: '0.65rem',
  marginTop: '2rem',
};

function stepButtonStyle(darkMode: boolean, active: boolean): CSSProperties {
  return {
    minHeight: 52,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    border: active ? '1px solid rgba(249, 115, 22, 0.8)' : darkMode ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(15, 23, 42, 0.1)',
    borderRadius: 16,
    background: active ? 'rgba(249, 115, 22, 0.14)' : 'transparent',
    color: darkMode ? 'white' : '#0f172a',
    cursor: 'pointer',
    fontWeight: 800,
    padding: '0.75rem',
    textAlign: 'left',
  };
}

function stepNumberStyle(active: boolean): CSSProperties {
  return {
    width: 28,
    height: 28,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 999,
    background: active ? '#f97316' : '#64748b',
    color: 'white',
    flex: '0 0 auto',
  };
}

const formStyle: CSSProperties = {
  display: 'grid',
  gap: '1rem',
};

const labelStyle: CSSProperties = {
  display: 'grid',
  gap: '0.5rem',
  fontWeight: 800,
};

function inputStyle(darkMode: boolean): CSSProperties {
  return {
    width: '100%',
    border: darkMode ? '1px solid rgba(148, 163, 184, 0.24)' : '1px solid #cbd5e1',
    borderRadius: 16,
    background: darkMode ? 'rgba(2, 6, 23, 0.82)' : '#f8fafc',
    color: darkMode ? 'white' : '#0f172a',
    fontSize: '1rem',
    outline: 'none',
    padding: '0.95rem 1rem',
  };
}

function textareaStyle(darkMode: boolean): CSSProperties {
  return {
    ...inputStyle(darkMode),
    minHeight: 140,
    resize: 'vertical',
  };
}

const friendFormStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr)) auto',
  gap: '0.75rem',
  alignItems: 'center',
};

const inviteListStyle: CSSProperties = {
  display: 'grid',
  gap: '0.75rem',
};

function inviteRowStyle(darkMode: boolean): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    border: darkMode ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(15, 23, 42, 0.08)',
    borderRadius: 18,
    background: darkMode ? 'rgba(2, 6, 23, 0.5)' : 'rgba(248, 250, 252, 0.88)',
    padding: '0.85rem 1rem',
  };
}

function inviteEmailStyle(darkMode: boolean): CSSProperties {
  return {
    margin: '0.2rem 0 0',
    color: darkMode ? '#cbd5e1' : '#64748b',
  };
}

function removeButtonStyle(darkMode: boolean): CSSProperties {
  return {
    border: darkMode ? '1px solid rgba(248, 113, 113, 0.36)' : '1px solid rgba(220, 38, 38, 0.24)',
    borderRadius: 999,
    background: 'transparent',
    color: darkMode ? '#fca5a5' : '#b91c1c',
    cursor: 'pointer',
    fontWeight: 800,
    padding: '0.55rem 0.8rem',
  };
}

const actionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.85rem',
  flexWrap: 'wrap',
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

function dateSummaryStyle(darkMode: boolean): CSSProperties {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap',
    borderRadius: 18,
    background: darkMode ? 'rgba(2, 6, 23, 0.5)' : 'rgba(248, 250, 252, 0.88)',
    color: darkMode ? '#e5e7eb' : '#334155',
    padding: '1rem',
  };
}

const errorStyle: CSSProperties = {
  margin: 0,
  color: '#ef4444',
  fontWeight: 800,
};
