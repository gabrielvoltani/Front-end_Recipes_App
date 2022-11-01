import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import copy from 'clipboard-copy';

import Header from '../components/Header';
import { getFavoritesRecipes, saveFavoriteRecipe } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteRecipes({ history }) {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [changeFavorite, setChangeFavorite] = useState(0);
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    const recipesSaveds = getFavoritesRecipes() || [];
    setFavoritesRecipes(recipesSaveds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeFavorite]);

  const handleClickFavorite = (recipe) => {
    setChangeFavorite((prev) => prev + 1);
    saveFavoriteRecipe(recipe);
  };

  const handleClickShare = (recipe) => {
    console.log(recipe);
    const THREE_SECONDS = 3000;
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, THREE_SECONDS);
  };

  const recipeFavorites = getFavoritesRecipes() || [];
  return (
    <main>
      <Header history={ history } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
      </div>
      { favoritesRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { recipe.name }
          </p>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.category }
          </p>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            width="150px"
            data-testid={ `${index}-horizontal-image` }
          />
          <button
            type="button"
            onClick={ () => handleClickFavorite(recipe) }
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
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleClickShare(recipe) }
          >
            Compartilhar
          </button>
          { isCopied && <p data-testid="text-copied">Link copied!</p>}
        </div>
      ))}
    </main>
  );
}

FavoriteRecipes.propTypes = {
  history: string,
}.isRequired;

export default FavoriteRecipes;

// * Todos os data-testids estão presentes:
// * O botão de filtro `All` deve ter o atributo `data-testid="filter-by-all-btn"`;
// * O botão de filtro `Meals` deve ter o atributo `data-testid="filter-by-meal-btn"`;
// * O botão de `Drinks` deve ter o atributo `data-testid="filter-by-drink-btn"`;
// * A imagem do card de receita deve ter o atributo `data-testid="${index}-horizontal-image"`;
// * O texto da categoria da receita deve ter o atributo `data-testid="${index}-horizontal-top-text"`;
// * O texto do nome da receita deve ter o atributo `data-testid="${index}-horizontal-name"`;
// * O elemento de compartilhar a receita deve ter o atributo `data-testid="${index}-horizontal-share-btn"`;
// * O elemento de favoritar a receita deve ter o atributo `data-testid="${index}-horizontal-favorite-btn"`;
