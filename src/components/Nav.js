import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';

function Nav() {
  return (
    <header className="navigator">
      <h1>
        Mars Explorer
      </h1>
      <nav className="homeLink">
        <Link to="/home">
          Home
        </Link>
      </nav>
      <nav className="favoriteLink">
        <Link to="/favorites">
          Favoritos
        </Link>
      </nav>
      <nav className="exitLink">
        <a href="/">
          Desconectar
        </a>
      </nav>
    </header>
  );
}

export default Nav;
