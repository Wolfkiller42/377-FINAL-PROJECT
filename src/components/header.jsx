import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#eee' }}>
    <Link to="/">Home</Link>
    <Link to="/verify">Verify</Link>
    <Link to="/about">About</Link>
  </nav>
);

export default Header;
