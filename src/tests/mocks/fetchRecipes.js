import mockCategoriesMeals from './categoriesMeals';
import mockCategoriesDrinks from './categoriesDrinks';
import mockMeals from './meals';
import mockDrinks from './drinks';
import mockFilterByCategoryDrink from './filterByCategoryDrink';
import mockFilterByCategoryMeal from './filterByCategoryMeal';
import mockIngredientMeal from './mockIngredientMeal';
import mockIngredientDrink from './mockIngredientDrink';
import mockFirstLetterDrinks from './mockFirstLetterDrinks';
import mockFirstLetterMeals from './mockFirstLetterMeals';
import mockFirstLetterDrinkstwo from './mockFirstLetterDrinkstwo';
import mockFirstLetterMealstwo from './mockFirstLetterMealstwo';
import mockIngredientMealtwo from './mockIngredientMealtwo';
import mockIngredientDrinktwo from './mockIngredientDrinktwo';
import mockMealstwo from './mockMealstwo';
import mockDrinkstwo from './mockDrinkstwo';
<<<<<<< HEAD
=======
import corbaDetails from './corbaDetails';
import oneDrink from './oneDrink';
import oneMeal from './oneMeal';
>>>>>>> cf8be083c40b22c0acb25532073a104b187ecdc1

export const mockFetch = (url) => Promise.resolve({
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(mockMeals);
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mockCategoriesMeals);
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=onion') return Promise.resolve(mockIngredientMeal);
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') return Promise.resolve(mockFilterByCategoryMeal);
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') return Promise.resolve(oneMeal);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') return Promise.resolve(mockFilterByCategoryDrink);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(mockDrinks);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=ice') return Promise.resolve(mockIngredientDrink);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mockCategoriesDrinks);
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') return Promise.resolve(corbaDetails);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') return Promise.resolve(oneDrink);
  },
});

export const mockFetchtwo = (url) => Promise.resolve({
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(mockMeals);
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=onion') return Promise.resolve(mockIngredientMeal);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(mockDrinks);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=ice') return Promise.resolve(mockIngredientDrink);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mockCategoriesDrinks);
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mockCategoriesMeals);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y') return Promise.resolve(mockFirstLetterDrinks);
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=o') return Promise.resolve(mockFirstLetterMeals);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z') return Promise.resolve(mockFirstLetterDrinkstwo);
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=y') return Promise.resolve(mockFirstLetterMealstwo);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=rice') return Promise.resolve(mockIngredientMealtwo);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka') return Promise.resolve(mockIngredientDrinktwo);

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=steak') return Promise.resolve(mockMealstwo);
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=martini') return Promise.resolve(mockDrinkstwo);
  },
});
