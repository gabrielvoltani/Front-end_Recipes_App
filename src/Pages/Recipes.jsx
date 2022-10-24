import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { string, shape, func } from 'prop-types';
import { thunkRequestDrinks, thunkRequestMeals } from '../Redux/Actions/index';
import CardDrink from '../Components/CardDrink';
import CardMeal from '../Components/CardMeal';

const QUANTITY_OF_RECIPES = 12;
function Recipes({ dispatch, history, drinks, meals }) {
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
}.isRequired;

const mapStateToProps = ({ recipes }) => ({
  drinks: recipes.drinks,
  meals: recipes.meals,
});

export default connect(mapStateToProps)(Recipes);
