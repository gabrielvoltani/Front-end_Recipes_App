const requestApiDrinks = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(endpoint);
  const { drinks } = await request.json();
  return drinks;
};

export default requestApiDrinks;
