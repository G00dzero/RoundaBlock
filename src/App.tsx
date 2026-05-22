import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './component/Homepage';
import SignIn from './component/sign-in';
import SignUp from './component/sign-up';
import Footer from './app/components/Footer';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('agroup-dark-mode');
    return stored ? stored === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem('agroup-dark-mode', String(darkMode));
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AppShell darkMode={darkMode} setDarkMode={setDarkMode} />
    </BrowserRouter>
  );
}

function AppShell({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: Dispatch<SetStateAction<boolean>> }) {
  const location = useLocation();
  const showFooter = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Homepage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/signup" element={<SignUp darkMode={darkMode} />} />
          <Route path="/signin" element={<SignIn darkMode={darkMode} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {showFooter ? <Footer darkMode={darkMode} /> : null}
    </div>
  );
}

export default App;