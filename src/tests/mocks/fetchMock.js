import mockDrinks from './drinks';
import mockCategoriesDrinks from './categoriesDrinks';
import mockMeals from './meals';
import mockCategoriesMeals from './categoriesMeals';

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(mockDrinks);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(mockCategoriesDrinks);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(mockMeals);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(mockCategoriesMeals);
    }
  },
});

export default fetch;
