import { func, shape, string } from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  managerInProgressRecipes,
  getInProgressRecipes,
  managerDoneRecipes } from '../services/localStorage';

function ChecklistRecipe({ id, infoFood, type, history }) {
  const [arrayOfInstructions, setArrayOfInstructions] = useState([]);
  const [instructionsMade, setInstructionsMade] = useState([]);
  const [savedInstruction, setSavedInstruction] = useState({});
  const ingredients = Object.entries(infoFood)
    .filter(([key, value]) => key.includes('strIngredient')
    && value !== null && value !== '');
  const measures = Object.entries(infoFood)
    .filter(([key, value]) => key.includes('strMeasure') && value !== null);
  const instructions = ingredients
    .map(([, value], index) => (
      measures[index] !== undefined) && `${value} - ${measures[index][1]}`);

  useEffect(() => {
    if (savedInstruction.instruction) {
      managerInProgressRecipes(instructionsMade, type, id, savedInstruction.instruction);
      setArrayOfInstructions([...getInProgressRecipes()[type][id]]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedInstruction]);

  useEffect(() => {
    if (getInProgressRecipes()) {
      setArrayOfInstructions(getInProgressRecipes()[type][id] || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = ({ target: checked }, instruction) => {
    setSavedInstruction({ checked, instruction });
    return setInstructionsMade((prev) => [...prev, instruction]);
  };

  const handleFinishRecipe = () => {
    managerDoneRecipes(infoFood, type, id);
    history.push('/done-recipes');
  };

  return (
    <div
      data-testid="instructions"
    >
      { instructions.map((instruction, index) => (
        <label
          key={ index }
          htmlFor={ index }
          data-testid={ `${index}-ingredient-step` }
          className={ arrayOfInstructions.includes(instruction) ? 'checked' : undefined }
        >
          <input
            id={ index }
            type="checkbox"
            checked={ arrayOfInstructions.includes(instruction) }
            onChange={ (e) => handleOnChange(e, instruction) }
          />
          {instruction}
        </label>
      )) }
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ (arrayOfInstructions.length !== instructions.length) }
        onClick={ handleFinishRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

ChecklistRecipe.propTypes = {
  id: string,
  infoFood: shape({
    idDrink: string,
    strAlcoholic: string,
    strCategory: string,
    strDrink: string,
    strDrinkThumb: string,
    strIngredient1: string,
    strInstructions: string,
    strMeasure1: string,
  }),
  type: string,
  history: {
    push: func,
  },
}.isRequired;

export default ChecklistRecipe;
