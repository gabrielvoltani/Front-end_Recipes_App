export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
};

export const getFavoritesRecipes = () => JSON
  .parse(localStorage.getItem('favoriteRecipes'));

export const saveFavoriteRecipe = (recipe, type) => {
  const recipeFavorite = {
    id: type === 'drinks' ? recipe.idDrink : recipe.idMeal,
    type: type === 'drinks' ? 'drink' : 'meal',
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    name: type === 'drinks' ? recipe.strDrink : recipe.strMeal,
    image: type === 'drinks' ? recipe.strDrinkThumb : recipe.strMealThumb,
    alcoholicOrNot: type === 'drinks' ? recipe.strAlcoholic : '',
  };
  const recipesSaveds = getFavoritesRecipes() || [];
  const isFavorited = recipesSaveds
    .some((rec) => rec.id === recipeFavorite.id);
  if (isFavorited === false) {
    return localStorage
      .setItem('favoriteRecipes', JSON.stringify([...recipesSaveds, recipeFavorite]));
  }
  const removedFavorite = recipesSaveds.filter((rec) => rec.id !== recipeFavorite.id);
  return localStorage
    .setItem('favoriteRecipes', JSON.stringify(removedFavorite));
};

export const getInProgressRecipes = () => JSON
  .parse(localStorage.getItem('inProgressRecipes'));

export const managerInProgressRecipes = (ArrayOfInstruction, type, id, instruction) => {
  const recipesInProgress = {
    drinks: {},
    meals: {},
  };
  const recipesSaveds = getInProgressRecipes() || recipesInProgress;
  const arrayOfInstructionsMadeds = recipesSaveds[type][id] || [];
  if (arrayOfInstructionsMadeds.includes(instruction)) {
    const arrayOfInstructionsMadedsFiltered = arrayOfInstructionsMadeds
      .filter((instructionMade) => instructionMade !== instruction);
    recipesInProgress[type][id] = arrayOfInstructionsMadedsFiltered;
  } else {
    const arrayTotal = [...arrayOfInstructionsMadeds, ...ArrayOfInstruction];
    const removeDuplicateds = arrayTotal
      .reduce((acc, instruc) => (acc.includes(instruc) ? acc : acc.concat(instruc)), []);
    recipesInProgress[type][id] = removeDuplicateds;
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
};

export const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'));

export const saveDoneRecipes = (recipe) => localStorage
  .setItem('doneRecipes', JSON.stringify(recipe));

export const managerDoneRecipes = (recipe, type, id) => {
  const data = new Date().toISOString();
  let tags = [];
  if (recipe.strTags && recipe.strTags.includes(',')) {
    tags = recipe.strTags.split(',');
  } else if (recipe.strTags) {
    tags = [recipe.strTags];
  }
  const objectRecipeDone = {
    id,
    type: type === 'drinks' ? 'drink' : 'meal',
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: type === 'drinks' ? recipe.strDrink : recipe.strMeal,
    image: type === 'drinks' ? recipe.strDrinkThumb : recipe.strMealThumb,
    doneDate: data,
    tags,
  };
  const donesRecipes = getDoneRecipes() || [];
  const idVerification = type === 'drinks' ? 'idDrink' : 'idMeal';
  const conditionToAdd = donesRecipes
    .some((rec) => rec.id === recipe[idVerification]);
  if (conditionToAdd === true) {
    const recipesFiltered = donesRecipes
      .filter((rec) => rec.id !== recipe[idVerification]);
    return saveDoneRecipes([...recipesFiltered, objectRecipeDone]);
  }
  return saveDoneRecipes([...donesRecipes, objectRecipeDone]);
};
