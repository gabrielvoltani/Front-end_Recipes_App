import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { string, shape, func } from 'prop-types';
import { thunkRequestDrinks, thunkRequestMeals } from '../Redux/Actions/index';
import CardDrink from '../Components/CardDrink';
import CardMeal from '../Components/CardMeal';
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
  const { pathname } = history.location;
  useEffect(() => {
    if (pathname === '/drinks') {
      dispatch(thunkRequestDrinks());
    } else {
      dispatch(thunkRequestMeals());
    }
  }, [dispatch, pathname]);
  return (
    <div>
      <section>
        { pathname === '/drinks'
          ? categoriesDrinks
            .filter((e, index) => index < QUANTITY_OF_CATEGORIES)
            .map(({ strCategory: categorie }) => (
              <button
                type="button"
                data-testid={ `${categorie}-category-filter` }
                key={ categorie }
              >
                { categorie }
              </button>))
          : categoriesMeals
            .filter((e, index) => index < QUANTITY_OF_CATEGORIES)
            .map(({ strCategory: categorie }) => (
              <button
                type="button"
                key={ categorie }
                data-testid={ `${categorie}-category-filter` }
              >
                { categorie }
              </button>))}
      </section>
      { pathname === '/drinks'
        ? drinks
          .filter((e, index) => index < QUANTITY_OF_RECIPES)
          .map((drink, ind) => (
            <div key={ drink.idDrink }>
              <CardDrink index={ ind } infoDrink={ drink } />
            </div>))
        : meals
          .filter((e, index) => index < QUANTITY_OF_RECIPES)
          .map((meal, ind) => (
            <div key={ meal.idMeal }>
              <CardMeal index={ ind } infoMeal={ meal } />
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
}.isRequired;

const mapStateToProps = ({ recipes }) => ({
  drinks: recipes.drinks,
  meals: recipes.meals,
  categoriesMeals: recipes.categoriesMeals,
  categoriesDrinks: recipes.categoriesDrinks,
});

export default connect(mapStateToProps)(Recipes);
