import React from 'react';
import { string } from 'prop-types';
import Header from '../components/Header';

function DoneRecipes({ history }) {
  return (
    <main>
      <Header history={ history } />
    </main>
  );
}

DoneRecipes.propTypes = {
  history: string,
}.isRequired;

export default DoneRecipes;
