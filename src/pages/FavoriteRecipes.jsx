import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';

import Header from '../components/Header';
import { getFavoritesRecipes } from '../services/localStorage';

import CardFavoriteFood from '../components/CardFavoriteFood';

function FavoriteRecipes({ history }) {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [changeFavorite, setChangeFavorite] = useState(0);
  const [actualFilter, setActualFilter] = useState('All');

  useEffect(() => {
    const recipesSaveds = getFavoritesRecipes();
    setFavoritesRecipes(recipesSaveds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeFavorite]);

  const applyFilters = () => {
    if (actualFilter !== 'All' && getFavoritesRecipes()) {
      const recipesSaveds = getFavoritesRecipes();
      const filteredRecipes = recipesSaveds.filter((rec) => rec.type === actualFilter);
      setFavoritesRecipes(filteredRecipes);
    } else {
      const recipesSaveds = getFavoritesRecipes();
      setFavoritesRecipes(recipesSaveds);
    }
  };

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualFilter]);

  const handleClickFilter = (filter) => {
    setActualFilter(filter);
  };

  return (
    <main>
      <Header history={ history } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFilter('All') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFilter('drink') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleClickFilter('meal') }
        >
          Meals
        </button>
      </div>
      { favoritesRecipes.map((recipe, index) => (
        <CardFavoriteFood
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
          setChangeFavorite={ setChangeFavorite }
        />
      ))}
    </main>
  );
}

FavoriteRecipes.propTypes = {
  history: string,
}.isRequired;

export default FavoriteRecipes;
