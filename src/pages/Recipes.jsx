import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { string, shape, func, bool } from 'prop-types';
import {
  thunkRequestDrinks,
  thunkRequestMeals,
  thunkRequestApiFilterByCategoryDrink,
  thunkRequestApiFilterByCategoryMeal,
} from '../Redux/Actions/index';
import CardFood from '../components/CardFood';
import Footer from '../components/Footer';
import Header from '../components/Header';

const QUANTITY_OF_RECIPES = 12;
const QUANTITY_OF_CATEGORIES = 6;
function Recipes({
  dispatch,
  history,
  drinks,
  meals,
  categoriesDrinks,
  categoriesMeals,
  drinksWhithoutFilters,
  mealsWhithoutFilters,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [renderListFoods, setRenderListFoods] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [actualType, setActualType] = useState('All');
  const { pathname } = history.location;

  useEffect(() => {
    const callDispatchActionFoods = async () => {
      await dispatch(thunkRequestDrinks());
      await dispatch(thunkRequestMeals());
    };
    callDispatchActionFoods();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyFilters = () => {
    if (pathname === '/drinks') {
      setRenderListFoods(drinks);
      setCategoriesList([{ strCategory: 'All' }, ...categoriesDrinks]);
    } else {
      setRenderListFoods(meals);
      setCategoriesList([{ strCategory: 'All' }, ...categoriesMeals]);
    }
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, drinks, meals]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetFilters = () => {
    if (pathname === '/drinks') {
      setRenderListFoods(drinksWhithoutFilters);
      setCategoriesList([{ strCategory: 'All' }, ...categoriesDrinks]);
    } else {
      setRenderListFoods(mealsWhithoutFilters);
      setCategoriesList([{ strCategory: 'All' }, ...categoriesMeals]);
    }
  };

  const filterFoods = useCallback(async () => {
    if (pathname === '/drinks' && actualType !== 'All') {
      await dispatch(thunkRequestApiFilterByCategoryDrink(actualType));
      setRenderListFoods(drinks);
    } else if (pathname === '/meals' && actualType !== 'All') {
      await dispatch(thunkRequestApiFilterByCategoryMeal(actualType));
      setRenderListFoods(meals);
    } else {
      resetFilters();
    }
    setIsFiltering(false);
  }, [actualType, dispatch, drinks, meals, pathname, resetFilters]);

  useEffect(() => {
    if (isFiltering) {
      const callFilterFoods = async () => {
        filterFoods();
      };
      setIsLoading(true);
      callFilterFoods();
      setIsLoading(false);
    }
  }, [
    isFiltering,
    actualType,
    filterFoods,
  ]);

  const handleClickFilter = async (type) => {
    if (actualType === type) {
      setRenderListFoods([]);
      setActualType('All');
      setIsFiltering(true);
    } else {
      setRenderListFoods([]);
      setActualType(type);
      setIsFiltering(true);
    }
  };

  return (
    <div>
      <Header history={ history } />
      {isLoading ? <p>Loading</p> : (
        <main>
          <section>
            { categoriesList.length > 1 && categoriesList
              .filter((e, index) => index < QUANTITY_OF_CATEGORIES)
              .map(({ strCategory: categorie }) => (
                <button
                  key={ categorie }
                  type="button"
                  data-testid={ `${categorie}-category-filter` }
                  onClick={ () => handleClickFilter(categorie) }
                >
                  { categorie }
                </button>))}
          </section>
          { renderListFoods.length > 0 && renderListFoods
            .filter((e, index) => index < QUANTITY_OF_RECIPES)
            .map((food, ind) => (
              <div
                key={ pathname === '/drinks'
                  ? `${food.idDrink}-${ind}` : `${food.idMeal}-${ind}` }
              >
                <Link
                  to={ pathname === '/drinks'
                    ? `/drinks/${food.idDrink}`
                    : `/meals/${food.idMeal}` }
                >
                  <CardFood url={ pathname } index={ ind } info={ food } />
                </Link>

              </div>))}
        </main>)}
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  history: shape({
    location: shape({
      pathname: string,
    }),
  }),
  dispatch: func,
  categoriesMeals: shape({
    strCategory: string,
  }),
  categoriesDrinks: shape({
    strCategory: string,
  }),
  isFiltering: bool,
}.isRequired;

const mapStateToProps = ({ recipes }) => ({
  drinks: recipes.drinks,
  meals: recipes.meals,
  categoriesMeals: recipes.categoriesMeals,
  categoriesDrinks: recipes.categoriesDrinks,
  isFiltering: recipes.isFiltering,
  drinksWhithoutFilters: recipes.drinksWhithoutFilters,
  mealsWhithoutFilters: recipes.mealsWhithoutFilters,
});

export default connect(mapStateToProps)(Recipes);
