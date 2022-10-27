import React from 'react';
import { number, shape, string } from 'prop-types';

function CardFood({ url, index, info }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ url === '/drinks' ? info.strDrinkThumb : info.strMealThumb }
        alt={ url === '/drinks' ? info.strDrink : info.strMeal }
        width="150px"
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { url === '/drinks' ? info.strDrink : info.strMeal }
      </p>
    </div>
  );
}

CardFood.propTypes = {
  url: string,
  index: number,
  infoDrinks: shape({
    strDrinkThumb: string,
    strDrink: string,
  }),
}.isRequired;

export default CardFood;
