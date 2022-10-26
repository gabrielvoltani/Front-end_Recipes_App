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
}) {
  const [renderListFoods, setRenderListFoods] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [actualType, setActualType] = useState('All');
  const { pathname } = history.location;

  const dispatchActionsFoods = useCallback(() => {
    if (pathname === '/drinks') {
      setRenderListFoods(drinks);
      setCategoriesList([{ strCategory: 'All' }, ...categoriesDrinks]);
    } else {
      setRenderListFoods(meals);
      setCategoriesList([{ strCategory: 'All' }, ...categoriesMeals]);
    }
  }, [
    categoriesDrinks,
    categoriesMeals,
    drinks,
    meals,
    pathname,
  ]);

  useEffect(() => {
    const requestApis = async () => {
      await dispatch(thunkRequestDrinks());
      await dispatch(thunkRequestMeals());
    };
    requestApis();
  }, [dispatch]);

  useEffect(() => {
    dispatchActionsFoods();
  }, [pathname, dispatchActionsFoods]);

  useEffect(() => {
    if (isFiltering) {
      const filterFoods = async () => {
        if (pathname === '/drinks' && actualType !== 'All') {
          await dispatch(thunkRequestApiFilterByCategoryDrink(actualType));
          setRenderListFoods(drinks);
        } else if (pathname === '/meals' && actualType !== 'All') {
          await dispatch(thunkRequestApiFilterByCategoryMeal(actualType));
          setRenderListFoods(meals);
        } else {
          dispatchActionsFoods();
        }
        setIsFiltering(false);
      };
      filterFoods();
    }
  }, [
    isFiltering,
    actualType,
    drinks,
    dispatch,
    meals,
    dispatchActionsFoods,
    pathname,
  ]);

  const handleClickFilter = async (type) => {
    if (actualType === type) {
      setActualType('All');
      setIsFiltering(true);
    } else {
      setActualType(type);
      setIsFiltering(true);
    }
  };

  return (
    <div>
      <Header history={ history } />
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
