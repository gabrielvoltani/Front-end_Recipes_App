import React, { useState } from 'react';
import copy from 'clipboard-copy';

import { number, string, shape, func } from 'prop-types';
import { getFavoritesRecipes, saveFavoriteRecipe } from '../services/localStorage';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function CardFavoriteFood({ recipe, index, setChangeFavorite }) {
  const [isCopied, setCopied] = useState(false);

  const handleClickFavorite = () => {
    setChangeFavorite((prev) => prev + 1);
    saveFavoriteRecipe(recipe);
  };

  const handleClickShare = () => {
    const THREE_SECONDS = 3000;
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, THREE_SECONDS);
  };

  const recipeFavorites = getFavoritesRecipes() || [];
  return (
    <div>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { recipe.name }
      </p>
      {recipe.type === 'meal'
        ? (
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
          </p>)
        : (
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.alcoholicOrNot} - ${recipe.category}`}
          </p>)}
      <img
        src={ recipe.image }
        alt={ recipe.name }
        width="150px"
        data-testid={ `${index}-horizontal-image` }
      />
      <button
        type="button"
        onClick={ () => handleClickFavorite() }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ recipeFavorites.some((rec) => rec.id === recipe.id)
            ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite Button"
        />
      </button>
      <button
        type="button"
        onClick={ () => handleClickShare() }
      >
        <img
          src={ shareIcon }
          alt="Icone de Compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      { isCopied && <p data-testid="text-copied">Link copied!</p>}
    </div>
  );
}

CardFavoriteFood.propTypes = {
  index: number,
  recipe: shape({
    alcoholicOrNot: string,
    category: string,
    id: string,
    image: string,
    name: string,
    nationality: string,
    type: string,
  }),
  setChangeFavorite: func,
}.isRequired;

export default CardFavoriteFood;
