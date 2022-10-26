import React, { useEffect } from 'react';

function RecipeDetails(props) {
  const id = { props }.props.match.params.id_da_receita;
  const { pathname } = { props }.props.history.location;

  const [recipe, setRecipe] = React.useState([]);

  const fetchMeal = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setRecipe(data.meals[0]);
    console.log(data);
  };

  const fetchDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setRecipe(data.drinks[0]);
    console.log(data);
  };

  useEffect(() => {
    if (pathname.includes('meals')) {
      fetchMeal();
      console.log('meal');
    } else {
      console.log('teste');
      fetchDrink();
    }
  }, []);

  return (
    <div>recipe</div>
  );
}

export default RecipeDetails;
