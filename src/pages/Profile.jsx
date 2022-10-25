import React from 'react';
import { string } from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history }) {
  return (
    <main>
      <Header history={ history } />
      <Footer />
    </main>
  );
}

Profile.propTypes = {
  history: string,
}.isRequired;

export default Profile;
