import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import App from '../App';

const rotaDoneRecipes = '/done-recipes';

const dateMeal = '2022-11-07T16:30:46.309Z';
const dateDrink = '2022-11-07T16:31:19.928Z';
const mockLocalStorage = JSON.stringify([
  {
    alcoholicOrNot: '',
    category: 'Side',
    doneDate: dateMeal,
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    tags: ['Soup'],
    type: 'meal',
  },
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    doneDate: dateDrink,
    id: '178319',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    name: 'Aquamarine',
    nationality: '',
    tags: [],
    type: 'drink',
  },
]);

describe('Testando página de Receitas Feitas', () => {
  Object.defineProperty(global, 'localStorage', { value: {
    getItem: () => mockLocalStorage,
    setItem: () => undefined,
  } });
  test('01 - Testando se os elementos estão na tela', () => {
    const { debug } = renderWithRouterAndRedux(<App />, rotaDoneRecipes);
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
    const mealShareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(mealShareBtn).toHaveProperty('src', 'http://localhost/shareIcon.svg');
    const dateFinishedMeal = screen.getByTestId('0-horizontal-done-date');
    expect(dateFinishedMeal).toHaveTextContent(dateMeal);

    const drinkName = screen.getByTestId('1-horizontal-name');
    expect(drinkName).toHaveTextContent('Aquamarine');
    const drinkNationalityAndIsAlcoholic = screen.getByTestId('1-horizontal-top-text');
    expect(drinkNationalityAndIsAlcoholic).toHaveTextContent('Alcoholic - Cocktail');
    const drinkImage = screen.getByTestId('1-horizontal-image');
    expect(drinkImage).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(drinkImage).toHaveProperty('alt', 'Aquamarine');
    const drinkShareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(drinkShareBtn).toHaveProperty('src', 'http://localhost/shareIcon.svg');
    const dateFinishedDrink = screen.getByTestId('1-horizontal-done-date');
    expect(dateFinishedDrink).toHaveTextContent(dateDrink);
    debug();
  });

  test('02 - Testando share Button', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => {},
      },
    });
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => mockLocalStorage,
      setItem: () => undefined,
    } });
    renderWithRouterAndRedux(<App />, rotaDoneRecipes);
    const mealBtnShare = screen.getByTestId('0-share-btn');
    expect(mealBtnShare).toBeInTheDocument();
    userEvent.click(mealBtnShare);
    const mealIsCopied = screen.getByTestId('0-text-copied');
    expect(mealIsCopied).toBeInTheDocument();
    setTimeout(() => {
      expect(mealIsCopied).not.toBeInTheDocument();
    }, 3500);

    const drinkBtnShare = screen.getByTestId('1-share-btn');
    expect(drinkBtnShare).toBeInTheDocument();
    userEvent.click(drinkBtnShare);
    const drinkIsCopied = screen.getByTestId('1-text-copied');
    expect(drinkIsCopied).toBeInTheDocument();
    setTimeout(() => {
      expect(drinkIsCopied).not.toBeInTheDocument();
    }, 3500);
  });
  test('03 - Testando click dos botões', () => {
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => mockLocalStorage,
      setItem: () => { },
    } });
    renderWithRouterAndRedux(<App />, rotaDoneRecipes);
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
    expect(itemFiltradoDrink[0]).toHaveTextContent('Corba');

    userEvent.click(btnFilters[2]);
    const itemFiltradoMeal = screen.getAllByTestId(/-horizontal-name/i);
    expect(itemFiltradoMeal).toHaveLength(1);
    expect(itemFiltradoMeal[0]).toHaveTextContent('Aquamarine');

    userEvent.click(btnFilters[0]);
    const itemFiltradoAll = screen.getAllByTestId(/-horizontal-name/i);
    expect(itemFiltradoAll).toHaveLength(2);
    expect(itemFiltradoAll[0]).toHaveTextContent('Corba');
    expect(itemFiltradoAll[1]).toHaveTextContent('Aquamarine');
  });
});
