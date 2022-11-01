import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { saveFavoriteRecipe } from '../services/localStorage';

function RecipeDetails(props) {
  const id = { props }.props.match.params.id_da_receita;
  const { pathname } = { props }.props.history.location;

  const [recipe, setRecipe] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [inProgress, setInprogress] = useState(false);
  const [shared, setShared] = useState(false);

  const isMeal = pathname.includes('meals');
  const QUANTITY_OF_RECOMENDATIONS = 6;

  const fetchMeal = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setRecipe(data.meals[0]);
  };

  const fetchDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setRecipe(data.drinks[0]);
  };

  const fetchDrinkRecommendations = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setRecomendations(data.drinks);
  };

  const fetchMealRecommendations = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setRecomendations(data.meals);
  };

  const handleStartRecipe = () => {
    const { history } = props;
    if (isMeal) {
      history.push(`/meals/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const handleShare = () => {
    const { history } = props;
    copy(`http://localhost:3000${history.location.pathname}`);
    setShared(true);
  };

  const handleFavorite = () => {
    if (isMeal) {
      saveFavoriteRecipe(recipe, 'meal');
    } else {
      saveFavoriteRecipe(recipe, 'drinks');
    }
  };

  useEffect(() => {
    if (pathname.includes('meals')) {
      fetchMeal();
      fetchDrinkRecommendations();
    } else {
      fetchDrink();
      fetchMealRecommendations();
    }
  }, []);

  const isInProgress = () => {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) inProgressRecipes = { meals: {}, drinks: {} };

    if (isMeal) {
      Object.keys(inProgressRecipes.meals).forEach((receita) => {
        if (Number(receita) === Number(recipe.idMeal)) {
          setInprogress(true);
        }
      });
    } else {
      Object.keys(inProgressRecipes.drinks).forEach((receita) => {
        if (Number(receita) === Number(recipe.idDrink)) {
          setInprogress(true);
        }
      });
    }
  };

  useEffect(() => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes) doneRecipes = [];

    if (isMeal) {
      doneRecipes.forEach((receita) => {
        if (Number(receita.id) === Number(recipe.idMeal)) {
          setDoneRecipe(true);
        }
      });
      isInProgress();
    } else {
      doneRecipes.forEach((receita) => {
        if (Number(receita.id) === Number(recipe.idDrink)) {
          setDoneRecipe(true);
        }
      });
      isInProgress();
    }
  });

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ isMeal ? recipe.strMeal : recipe.strDrink }
        className="w-100"
      />
      <h1 data-testid="recipe-title">{ isMeal ? recipe.strMeal : recipe.strDrink }</h1>
      <h2 data-testid="recipe-category">
        { isMeal ? recipe.strCategory : recipe.strAlcoholic }
      </h2>
      <h3>Ingredients</h3>
      <ul>
        {Object.keys(recipe).filter((key) => key.includes('strIngredient'))
          .filter((key) => recipe[key] !== '' && recipe[key] !== null)
          .map((key, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ key }
            >
              {recipe[key] && `${recipe[key]} - ${recipe[`strMeasure${index + 1}`]}`}
            </li>
          ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe
        data-testid="video"
        src={ recipe.strYoutube }
        title="video"
      />
      <h3>Recomendations</h3>
      <div className="scrollmenu">
        {recomendations.length > 0
         && recomendations
           .filter((_, i) => i < QUANTITY_OF_RECOMENDATIONS)
           .map((recomendation, index) => (
             <div
               key={ index }
               className="w-50 m-2"
               data-testid={ `${index}-recommendation-card` }
             >
               <img
                 src={ !isMeal
                   ? recomendation.strMealThumb : recomendation.strDrinkThumb }
                 alt={ !isMeal ? recomendation.strMeal : recomendation.strDrink }
                 className="w-50"
               />
               <h1 data-testid={ `${index}-recommendation-title` }>
                 { !isMeal ? recomendation.strMeal : recomendation.strDrink }
               </h1>
             </div>
           ))}
      </div>
      {shared && <p>Link copied!</p>}
      <div className="mb-5">
        <button
          data-testid="share-btn"
          type="button"
          onClick={ handleShare }
        >
          Share
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ handleFavorite }
        >
          Favorite
        </button>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="fixed-bottom"
        disabled={ doneRecipe }
        onClick={ handleStartRecipe }
      >
        {inProgress ? 'Continue Recipe' : 'Start recipe'}
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
