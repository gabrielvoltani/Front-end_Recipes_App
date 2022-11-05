import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import copy from 'clipboard-copy';
import ChecklistRecipe from '../components/ChecklistRecipe';
import { getFavoritesRecipes, saveFavoriteRecipe } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeInProgress({ history }) {
  const [changeFavorite, setChangeFavorite] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const { pathname } = history.location;
  const [recipe, setRecipe] = useState({});
  const initialType = pathname.includes('drinks') ? 'drinks' : 'meals';
  const [type, setType] = useState(initialType);
  const id = pathname.split('/')[2];

  useEffect(() => {
    const recipesSaveds = getFavoritesRecipes() || [];
    const key = pathname.includes('drinks') ? 'idDrink' : 'idMeal';
    const isFavorited = recipesSaveds
      .some((rec) => rec.id === recipe[key]);
    setIsFavorite(isFavorited);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeFavorite, recipe]);

  const fetchMeal = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await response.json();
    setRecipe(meals[0]);
    setType('meals');
  };

  const fetchDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await response.json();
    setRecipe(drinks[0]);
    setType('drinks');
  };

  useEffect(() => {
    if (pathname.includes('meals')) {
      fetchMeal();
    } else {
      fetchDrink();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickShare = () => {
    const THREE_SECONDS = 3000;
    const path = pathname.split('/in')[0];
    copy(`http://localhost:3000${path}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, THREE_SECONDS);
  };

  const handleClickFavorite = () => {
    setChangeFavorite((prev) => prev + 1);
    saveFavoriteRecipe(recipe, type);
  };

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
      <ChecklistRecipe
        id={ id }
        type={ type }
        history={ history }
        infoFood={ recipe }
      />
      <div>
        <button
          type="button"
          onClick={ handleClickFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite Button"
          />
        </button>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleClickShare }
          >
            <img
              src={ shareIcon }
              alt="Icone de Compartilhar"
            />
          </button>
          { isCopied && <p data-testid="text-copied">Link copied!</p>}
        </div>
      </div>
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
