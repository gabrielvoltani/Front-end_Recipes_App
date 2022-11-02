import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import App from '../App';

const mockLocalStorage = JSON.stringify([
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

describe('Testando página de Receitas Favoritas', () => {
  const favRoute = '/favorite-recipes';
  test('01 - Testando se os elementos estão na tela', () => {
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => mockLocalStorage,
      setItem: () => undefined,
    } });
    renderWithRouterAndRedux(<App />, favRoute);
    const btnFilters = screen.getAllByTestId(/filter-by-/i);
    expect(btnFilters).toHaveLength(3);
    btnFilters.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    const mealName = screen.getByTestId('0-horizontal-name');
    expect(mealName).toHaveTextContent('Corba');
    const mealNationalityAndCategory = screen.getByTestId('0-horizontal-top-text');
    expect(mealNationalityAndCategory).toHaveTextContent('Turkish - Side');
    const mealImage = screen.getByTestId('0-horizontal-image');
    expect(mealImage).toHaveProperty('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(mealImage).toHaveProperty('alt', 'Corba');
    const mealImageFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(mealImageFavoriteBtn).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
    const mealShareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(mealShareBtn).toHaveProperty('src', 'http://localhost/shareIcon.svg');

    const drinkName = screen.getByTestId('1-horizontal-name');
    expect(drinkName).toHaveTextContent('Aquamarine');
    const drinkNationalityAndIsAlcoholic = screen.getByTestId('1-horizontal-top-text');
    expect(drinkNationalityAndIsAlcoholic).toHaveTextContent('Alcoholic - Cocktail');
    const drinkImage = screen.getByTestId('1-horizontal-image');
    expect(drinkImage).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(drinkImage).toHaveProperty('alt', 'Aquamarine');
    const drinkFavoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');
    expect(drinkFavoriteBtn).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
    const drinkShareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(drinkShareBtn).toHaveProperty('src', 'http://localhost/shareIcon.svg');
  });
  test('02- Testa remoção de um elemento da lista', () => {
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => mockLocalStorage,
      setItem: () => undefined,
    } });
    renderWithRouterAndRedux(<App />, favRoute);
    const mealBtnFavorite = screen.getByTestId('0-favorite-btn');
    expect(mealBtnFavorite).toBeInTheDocument();
    const drinkBtnFavorite = screen.getByTestId('1-favorite-btn');
    expect(drinkBtnFavorite).toBeInTheDocument();
    userEvent.click(mealBtnFavorite);
    userEvent.click(drinkBtnFavorite);
  });
  test('03 - Testa se aparece o texto de link copiado ao abertar no botão de share', () => {
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => mockLocalStorage,
      setItem: () => { },
    } });
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => {},
      },
    });
    renderWithRouterAndRedux(<App />, favRoute);
    const mealBtnShare = screen.getByTestId('0-share-btn');
    expect(mealBtnShare).toBeInTheDocument();
    userEvent.click(mealBtnShare);
    expect(screen.getByTestId('text-copied')).toBeInTheDocument();
  });
  test('04 - Testa se os filtros aparecem corretamente', () => {
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => mockLocalStorage,
      setItem: () => { },
    } });
    renderWithRouterAndRedux(<App />, favRoute);
    const btnFilters = screen.getAllByTestId(/filter-by-/i);
    expect(btnFilters).toHaveLength(3);
    btnFilters.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    const foodsWithoutFilters = screen.getAllByTestId(/-horizontal-name/i);
    expect(foodsWithoutFilters).toHaveLength(2);

    userEvent.click(btnFilters[1]);
    const itemFiltradoDrink = screen.getAllByTestId(/-horizontal-name/i);
    expect(itemFiltradoDrink).toHaveLength(1);
    expect(itemFiltradoDrink[0]).toHaveTextContent('Aquamarine');

    userEvent.click(btnFilters[2]);
    const itemFiltradoMeal = screen.getAllByTestId(/-horizontal-name/i);
    expect(itemFiltradoMeal).toHaveLength(1);
    expect(itemFiltradoMeal[0]).toHaveTextContent('Corba');

    userEvent.click(btnFilters[0]);
    const itemFiltradoAll = screen.getAllByTestId(/-horizontal-name/i);
    expect(itemFiltradoAll).toHaveLength(2);
    expect(itemFiltradoAll[0]).toHaveTextContent('Corba');
    expect(itemFiltradoAll[1]).toHaveTextContent('Aquamarine');
  });
  test('05 - Testa se a página funciona caso não tenha nada salvo no localStorage', () => {
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => undefined,
      setItem: () => { },
    } });
    renderWithRouterAndRedux(<App />, favRoute);
    const btnFilters = screen.getAllByTestId(/filter-by-/i);
    expect(btnFilters).toHaveLength(3);
    userEvent.click(btnFilters[1]);
    const title = screen.getByText(/favorite recipes/i);
    expect(title).toBeInTheDocument();
  });
});
