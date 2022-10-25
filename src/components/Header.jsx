import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ history }) {
  const { pathname } = history.location;

  const verifyPathName = () => {
    if (pathname === '/done-recipes') {
      return 'Done Recipes';
    }
    if (pathname === '/favorite-recipes') {
      return 'Favorite Recipes';
    }
    return pathname.slice(1)[0].toUpperCase() + pathname.slice(2);
  };

  return (
    <header>
      <div>
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="Foto profile"
            data-testid="profile-top-btn"
          />
        </Link>
        <p data-testid="page-title">
          {verifyPathName()}
        </p>
      </div>
      {pathname === '/meals' || pathname === '/drinks'
        ? (
          <div>
            <img alt="Foto profile" data-testid="search-top-btn" src={ searchIcon } />
          </div>
        )
        : (
          <div />
        )}
    </header>
  );
}

Header.propTypes = {
  history: string,
}.isRequired;

export default connect()(Header);

// Mudar para a rota /profile quando clicar no link - OK
// 45% de teste do header

// Botão de busca aparece e desaparece quando clica no ícone
