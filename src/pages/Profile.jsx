import React from 'react';
import { string } from 'prop-types';
import Header from '../components/Header';

function Profile({ history }) {
  return (
    <main>
      <Header history={ history } />
    </main>
  );
}

Profile.propTypes = {
  history: string,
}.isRequired;

export default Profile;
