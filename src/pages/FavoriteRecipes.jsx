import React from 'react';
import { string } from 'prop-types';
import Header from '../components/Header';

function FavoriteRecipes({ history }) {
  return (
    <main>
      <Header history={ history } />
    </main>
  );
}

FavoriteRecipes.propTypes = {
  history: string,
}.isRequired;

export default FavoriteRecipes;
