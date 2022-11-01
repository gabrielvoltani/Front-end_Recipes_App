// meels API
const ALERT = 'Sorry, we haven\'t found any recipes for these filters.';

export const requestIngredientApi = async (ingrediente) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    const request = await fetch(url);
    const { meals } = await request.json();
    if (meals === null) throw new Error('erro');
    return meals;
  } catch (err) {
    global.alert(ALERT);
  }
};

export const requestNameApi = async (nome) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
    const request = await fetch(url);
    const { meals } = await request.json();
    if (meals === null) throw new Error('erro');
    return meals;
  } catch (err) {
    global.alert(ALERT);
    return [];
  }
};

export const requestFirstLetter = async (firstLetter) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const request = await fetch(url);
    const { meals } = await request.json();
    if (meals === null) throw new Error('erro');
    return meals;
  } catch (err) {
    global.alert(ALERT);
  }
};

// driks API

export const requestDriksIngredientApi = async (ingrediente) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    const request = await fetch(url);
    const { drinks } = await request.json();
    if (drinks === null) throw new Error('erro');
    return drinks;
  } catch (err) {
    global.alert(ALERT);
  }
};

export const requestDriksNameApi = async (nome) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
    const request = await fetch(url);
    const { drinks } = await request.json();
    if (drinks === null) throw new Error('erro');
    return drinks;
  } catch (err) {
    global.alert(ALERT);
  }
};

export const requestDriksFirstLetterApi = async (firstLetter) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const request = await fetch(url);
    const { drinks } = await request.json();
    if (drinks === null) throw new Error('erro');
    return drinks;
  } catch (err) {
    global.alert(ALERT);
  }
};
