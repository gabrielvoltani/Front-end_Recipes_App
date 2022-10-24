const requestApiMeals = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(endpoint);
  const { meals } = await request.json();
  return meals;
};

export default requestApiMeals;
