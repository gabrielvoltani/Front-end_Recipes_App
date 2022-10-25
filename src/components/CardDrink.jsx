import React from 'react';
import { number, shape, string } from 'prop-types';

function CardDrink({ index, infoDrink: { strDrinkThumb, strDrink } }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        width="150px"
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { strDrink }
      </p>
    </div>
  );
}

CardDrink.propTypes = {
  index: number,
  infoDrinks: shape({
    strDrinkThumb: string,
    strDrink: string,
  }),
}.isRequired;

export default CardDrink;
