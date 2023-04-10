import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import App from '../App';

import { mockFetchtwo } from './mocks/fetchRecipes';

const searchTopBtnId = 'search-top-btn';
const searchInputId = 'search-input';
const ingredientSearchRadioId = 'ingredient-search-radio';
const nameSearchRadioId = 'name-search-radio';
const firstLetterSearchRadioId = 'first-letter-search-radio';
const searchButtonId = 'exec-search-btn';

describe('Testes do componente SearchBar', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetchtwo);
  });
  test('Testando se os inputs/botões são renderizados', () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    const ingredienteRadio = screen.getByTestId(ingredientSearchRadioId);
    const nameRadio = screen.getByTestId(nameSearchRadioId);
    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadioId);
    const searchFilterBtn = screen.getByTestId(searchButtonId);

    expect(inputSearch).toBeInTheDocument();
    expect(ingredienteRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchFilterBtn).toBeInTheDocument();
  });

  test('Testando radio buttons e o name search', async () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'Corba');
    expect(inputSearch).toHaveValue('Corba');

    const ingredienteRadio = screen.getByTestId(ingredientSearchRadioId);
    const nameRadio = screen.getByTestId(nameSearchRadioId);
    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadioId);

    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    expect(ingredienteRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);

    const food = await screen.findByAltText('Corba');
    expect(food).toBeInTheDocument();
  });

  test('Testando checks e um search por name', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'GG');
    expect(inputSearch).toHaveValue('GG');

    const ingredienteRadio = screen.getByTestId(ingredientSearchRadioId);
    const nameRadio = screen.getByTestId(nameSearchRadioId);
    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadioId);

    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    expect(ingredienteRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);

    const food = await screen.findByAltText('GG');
    expect(food).toBeInTheDocument();
  });

  test('Testando search por nome único (MEALS)', () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'steak');
    expect(inputSearch).toHaveValue('steak');

    const nameRadio = screen.getByTestId(nameSearchRadioId);

    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testando search por nome único (DRINKS)', () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'martini');
    expect(inputSearch).toHaveValue('martini');

    const nameRadio = screen.getByTestId(nameSearchRadioId);

    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testando search por ingredient (MEALS)', () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'onion');
    expect(inputSearch).toHaveValue('onion');

    const ingredienteRadio = screen.getByTestId(ingredientSearchRadioId);

    userEvent.click(ingredienteRadio);
    expect(ingredienteRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testando search por ingredient único (MEALS)', () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'rice');
    expect(inputSearch).toHaveValue('rice');

    const ingredienteRadio = screen.getByTestId(ingredientSearchRadioId);

    userEvent.click(ingredienteRadio);
    expect(ingredienteRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testando search por ingredient (DRINKS)', () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'ice');
    expect(inputSearch).toHaveValue('ice');

    const ingredienteRadio = screen.getByTestId(ingredientSearchRadioId);

    userEvent.click(ingredienteRadio);
    expect(ingredienteRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testando search por ingredient único (DRINKS)', () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'vodka');
    expect(inputSearch).toHaveValue('vodka');

    const ingredienteRadio = screen.getByTestId(ingredientSearchRadioId);

    userEvent.click(ingredienteRadio);
    expect(ingredienteRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testando search por firstLetter (DRINKS)', () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'y');
    expect(inputSearch).toHaveValue('y');

    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadioId);

    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testando search por firstLetter direto (DRINKS)', () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'z');
    expect(inputSearch).toHaveValue('z');

    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadioId);

    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testando search por firstLetter direto (MEALS)', () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'y');
    expect(inputSearch).toHaveValue('y');

    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadioId);

    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testando search por firstLetter (MEALS)', () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const searchBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'o');
    expect(inputSearch).toHaveValue('o');

    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadioId);

    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);
  });

  test('Testa se um Alert aparece quando a API retorna null (MEALS)', async () => {
    renderWithRouterAndRedux(<App />, '/meals');
    jest.spyOn(global, 'alert').mockReturnValue(alert);
    const searchBtn = screen.getByTestId(searchTopBtnId);

    userEvent.click(searchBtn);

    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadioId);
    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);

    expect(global.alert()).toBe(alert);
  });

  test('Testa se um Alert aparece quando a API retorna null (DRINKS)', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    jest.spyOn(global, 'alert').mockReturnValue(alert);
    const searchBtn = screen.getByTestId(searchTopBtnId);

    userEvent.click(searchBtn);

    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadioId);
    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();

    const searchFilterBtn = screen.getByTestId(searchButtonId);
    userEvent.click(searchFilterBtn);

    expect(global.alert()).toBe(alert);
  });
});
