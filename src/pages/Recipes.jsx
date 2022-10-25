import React from 'react';
import { string } from 'prop-types';
import Header from '../components/Header';

function Recipes({ history }) {
  return (
    <main>
      <Header history={ history } />
    </main>
  );
}

Recipes.propTypes = {
  history: string,
}.isRequired;

export default Recipes;
