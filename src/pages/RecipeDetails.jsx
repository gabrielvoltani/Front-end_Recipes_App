import { shape, string } from 'prop-types';
import React from 'react';

function RecipeDetails({ history }) {
  const { pathname } = history.location;
  const handleClick = () => {
    const path = `${pathname}/in-progress`;
    history.push(path);
  };
  return (
    <button
      type="button"
      onClick={ handleClick }
    >
      Start Recipe
    </button>
  );
}

RecipeDetails.propTypes = {
  history: shape({
    location: shape({
      pathname: string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
