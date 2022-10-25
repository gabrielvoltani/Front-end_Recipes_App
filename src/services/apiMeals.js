export const requestApiMeals = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(endpoint);
  const { meals } = await request.json();
  return meals;
};

export const requestApiListCategoriesMeals = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(endpoint);
  const { meals } = await request.json();
  return meals;
};

export const requestApiFilterByCategoryMeal = async (type) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`;
  const request = await fetch(endpoint);
  const { meals } = await request.json();
  return meals;
};
