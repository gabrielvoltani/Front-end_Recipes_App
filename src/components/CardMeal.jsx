import React from 'react';
import { number, shape, string } from 'prop-types';

function CardMeal({ index, infoMeal: { strMealThumb, strMeal } }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ strMealThumb }
        alt={ strMeal }
        width="150px"
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { strMeal }
      </p>
    </div>
  );
}

CardMeal.propTypes = {
  index: number,
  infoMeal: shape({
    strMealThumb: string,
    strMeal: string,
  }),
}.isRequired;

export default CardMeal;
