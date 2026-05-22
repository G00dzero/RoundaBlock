type FooterProps = {
  darkMode?: boolean;
};

export default function Footer({ darkMode = false }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ padding: '1rem 0', textAlign: 'center', color: darkMode ? '#cbd5e1' : '#475569' }}>
      <div style={{ fontSize: '0.95rem' }}>© {year} RoundaBlock. All rights reserved.</div>
    </footer>
  );
}
