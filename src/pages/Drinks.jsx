import React from 'react';
import { string } from 'prop-types';
import Header from '../components/Header';

function Drinks({ history }) {
  return (
    <main>
      <Header history={ history } />
    </main>
  );
}

Drinks.propTypes = {
  history: string,
}.isRequired;

export default Drinks;
