import React from 'react';

function ChecklistRecipe({ infoFood }) {
  const ingredients = Object.entries(infoFood)
    .filter(([key, value]) => key.includes('strIngredient')
    && value !== null && value !== '');
  const measures = Object.entries(infoFood)
    .filter(([key, value]) => key.includes('strMeasure') && value !== null);
  const instructions = ingredients
    .map(([, value], index) => {
      if (measures[index] !== undefined) return `${value} - ${measures[index][1]}`;
      return value;
    });

  console.log(ingredients);
  return (
    <div
      data-testid="instructions"
    >
      { instructions.map((instruction, index) => (
        <label
          key={ index }
          htmlFor={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input id={ index } type="checkbox" />
          {instruction}
        </label>
      )) }
    </div>
  );
}

ChecklistRecipe.propTypes = {

}.isRequired;

export default ChecklistRecipe;
