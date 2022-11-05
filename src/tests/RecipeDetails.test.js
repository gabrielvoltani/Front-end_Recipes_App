import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import App from '../App';

import mockFetch from './mocks/fetchRecipes';

const mockLocalStorageInProgress = JSON.stringify({
  drinks: {
    178319: ['Hpnotiq - 2 oz'],
  },
  meals: {
    52771: ['penne rigate - 1 pound', 'olive oil - 1/4 cup'],
  },
});

const mockLocalStorageFavorites = JSON.stringify([
  {
    alcoholicOrNot: '',
    category: 'Side',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'meal',
  },
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    id: '178319',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    name: 'Aquamarine',
    nationality: '',
    type: 'drink',
  },
]);

const routeDrinksWithId178319 = '/drinks/178319';
const routeMealsWithId52771 = '/meals/52771';
describe('Testa a página de detalhes de receitas', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  test('01 - Testa se a página de detalhes de receitas contém todos os elementos da Meal', async () => {
    const { history } = renderWithRouterAndRedux(<App />, routeMealsWithId52771);
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const recipeImage = await screen.findByTestId('recipe-photo');
    const recipeInstructions = await screen.findByTestId('instructions');
    const startRecipeButton = await screen.findByTestId('start-recipe-btn');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(startRecipeButton).toBeInTheDocument();

    userEvent.click(startRecipeButton);

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  test('02 - Testa se a página de detalhes de receitas contém todos os elementos da Drink', async () => {
    const { history } = renderWithRouterAndRedux(<App />, routeDrinksWithId178319);
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const recipeImage = await screen.findByTestId('recipe-photo');
    const recipeInstructions = await screen.findByTestId('instructions');
    const startRecipeButton = await screen.findByTestId('start-recipe-btn');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(startRecipeButton).toBeInTheDocument();

    userEvent.click(startRecipeButton);

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });

  test('03 - Testando os botões de compartilhar e de favoritar página drinks', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => {},
      },
    });
    renderWithRouterAndRedux(<App />, routeDrinksWithId178319);
    const btnFavorite = screen.getByTestId('btn-fav');
    const imgBtnFavorite = screen.getByTestId('favorite-btn');
    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(imgBtnFavorite).toBeInTheDocument();
    expect(imgBtnFavorite).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');

    userEvent.click(btnShare);

    const textIsCopied = screen.getByText('Link copied!');
    expect(textIsCopied).toBeInTheDocument();

    userEvent.click(btnFavorite);

    expect(imgBtnFavorite).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
  });

  test('04 - Testando o botão de favoritar página meals', () => {
    renderWithRouterAndRedux(<App />, routeMealsWithId52771);

    const btnFavorite = screen.getByTestId('btn-fav');
    expect(btnFavorite).toBeInTheDocument();

    const imgBtnFavorite = screen.getByTestId('favorite-btn');
    expect(imgBtnFavorite).toBeInTheDocument();
    expect(imgBtnFavorite).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');

    userEvent.click(btnFavorite);

    expect(imgBtnFavorite).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
  });

  test('05 - Verifica se ao já ter o alimento no localStorage ele muda a renderização do botão', async () => {
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: (key) => {
        if (key === 'inProgressRecipes') return mockLocalStorageInProgress;
        if (key === 'favoriteRecipes') return mockLocalStorageFavorites;
        if (key === 'doneRecipes') return undefined;
      },
      setItem: () => { },
    } });
    renderWithRouterAndRedux(<App />, routeDrinksWithId178319);
    expect(fetch).toHaveBeenCalled();
    await waitFor(() => {
      const title = screen.getByText('Aquamarine');
      expect(title).toBeInTheDocument();
    });
  });
  test('06 - Verifica se ao já ter o alimento no localStorage ele muda a renderização do botão', async () => {
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: (key) => {
        if (key === 'inProgressRecipes') return mockLocalStorageInProgress;
        if (key === 'favoriteRecipes') return mockLocalStorageFavorites;
      },
      setItem: () => { },
    } });
    renderWithRouterAndRedux(<App />, routeMealsWithId52771);
    expect(fetch).toHaveBeenCalled();
    await waitFor(() => {
      const title = screen.getByText('Spicy Arrabiata Penne');
      expect(title).toBeInTheDocument();
    });
  });
});
