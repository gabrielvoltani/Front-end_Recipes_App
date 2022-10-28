import React from 'react';
import { useHistory } from 'react-router-dom';
// import { getUser } from '../services/localStorage';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const user = localStorage.getItem('user');
  if (!user) localStorage.setItem('user', JSON.stringify({ email: '' }));

  const { email } = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>
      <Header history={ history } />
      <section>
        <p data-testid="profile-email">{ email }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout
        </button>
      </section>
      <Footer />
    </main>
  );
}

export default Profile;
