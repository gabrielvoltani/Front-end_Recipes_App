import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import ChecklistRecipe from '../components/ChecklistRecipe';

function RecipeInProgress({ history }) {
  const { pathname } = history.location;
  const [recipe, setRecipe] = useState({});

  const id = pathname.split('/')[2];
  const fetchMeal = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await response.json();
    setRecipe(meals[0]);
  };

  const fetchDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await response.json();
    setRecipe(drinks[0]);
  };

  useEffect(() => {
    if (pathname.includes('meals')) {
      fetchMeal();
    } else {
      fetchDrink();
    }
  }, []);

  const category = pathname.includes('drinks')
    ? recipe.strCategory : recipe.strCategory;
  const src = pathname.includes('drinks')
    ? recipe.strDrinkThumb : recipe.strMealThumb;
  const nameMeal = pathname.includes('drinks')
    ? recipe.strDrink : recipe.strMeal;
  return (
    <div>
      <h1
        data-testid="recipe-title"
      >
        { nameMeal }
      </h1>
      <h2
        data-testid="recipe-category"
      >
        { category }
      </h2>
      <img
        src={ src }
        alt={ nameMeal }
        data-testid="recipe-photo"
      />
      <ChecklistRecipe infoFood={ recipe } />
      <div>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: shape({
    location: shape({
      pathname: string,
    }),
  }),
}.isRequired;

export default RecipeInProgress;
