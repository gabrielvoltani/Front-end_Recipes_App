import React, { useEffect, useState } from 'react';
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

const QUANTITY_OF_RECIPES = 12;
const QUANTITY_OF_CATEGORIES = 5;
function Recipes({
  dispatch,
  history,
  drinks,
  meals,
  categoriesDrinks,
  categoriesMeals,
}) {
  const [renderDidMount, setRenderDidMount] = useState(true);
  const [renderListFoods, setRenderListFoods] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [actualType, setActualType] = useState('All');
  const { pathname } = history.location;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatchActionsFoods = async () => {
    if (pathname === '/drinks') {
      await dispatch(thunkRequestDrinks());
      setRenderListFoods(drinks);
      setCategoriesList(categoriesDrinks);
    } else {
      await dispatch(thunkRequestMeals());
      setRenderListFoods(meals);
      setCategoriesList(categoriesMeals);
    }
  };

  useEffect(() => {
    if (renderDidMount) {
      const callDispatchActionFoods = async () => {
        await dispatchActionsFoods();
      };
      callDispatchActionFoods();
      if (renderListFoods.length > 0 && categoriesList.length > 0) {
        setRenderDidMount(false);
      }
    }
  }, [
    renderDidMount,
    dispatchActionsFoods,
    categoriesList,
    renderListFoods,
    dispatch,
    categoriesDrinks,
    categoriesMeals,
    pathname,
    drinks,
    meals]);

  useEffect(() => {
    if (isFiltering) {
      const filterFoods = async () => {
        if (pathname === '/drinks' && actualType !== 'all') {
          await dispatch(thunkRequestApiFilterByCategoryDrink(actualType));
          setRenderListFoods(drinks);
        } else if (pathname === '/meals' && actualType !== 'all') {
          await dispatch(thunkRequestApiFilterByCategoryMeal(actualType));
          setRenderListFoods(meals);
        } else {
          await dispatchActionsFoods();
        }
        setIsFiltering(false);
      };
      filterFoods();
    }
  }, [
    dispatchActionsFoods,
    renderListFoods,
    actualType,
    isFiltering,
    pathname,
    dispatch,
    drinks,
    meals,
  ]);

  const handleClickFilter = async (type) => {
    if (actualType === type) {
      setActualType('all');
      setIsFiltering(true);
    } else {
      setActualType(type);
      setIsFiltering(true);
    }
  };

  return (
    <div>
      <section>
        { categoriesList
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
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleClickFilter('all') }
        >
          All
        </button>
      </section>
      { renderListFoods.length > 0 && renderListFoods
        .filter((e, index) => index < QUANTITY_OF_RECIPES)
        .map((food, ind) => (
          <div key={ pathname === '/drinks' ? food.idDrink : food.idMeal }>
            <CardFood url={ pathname } index={ ind } info={ food } />
          </div>))}
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
});

export default connect(mapStateToProps)(Recipes);
