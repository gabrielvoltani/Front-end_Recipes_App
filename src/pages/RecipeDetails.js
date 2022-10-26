import React, { useEffect } from 'react';

function RecipeDetails(props) {
  const id = { props }.props.match.params.id_da_receita;
  const { pathname } = { props }.props.history.location;

  const [recipe, setRecipe] = React.useState([]);

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

  useEffect(() => {
    if (pathname.includes('meals')) {
      fetchMeal();
      console.log('meal');
    } else {
      console.log('drink');
      fetchDrink();
    }
  }, []);

  const isMeal = pathname.includes('meals');

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ isMeal ? recipe.strMeal : recipe.strDrink }
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
        allowFullScreen
      />
    </div>
  );
}

export default RecipeDetails;
