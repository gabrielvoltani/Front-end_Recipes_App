import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import App from '../App';
import Footer from '../components/Footer';


import mockFetch from './mocks/fetchRecipes';


const loginButton = 'login-submit-btn';
const emailInputId = 'email-input';
const passwordInputId = 'password-input';
const email = 'grupo23@gmail.com';
const password = '1234567';
const drinkBottomBtn = 'drinks-bottom-btn';
const mealsBottomBtn = 'meals-bottom-btn';

describe('Testes da page Login', () => {
  test('01 - Teste se a tela de login contém os atributos descritos no protótipo', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);
    const loginSubmitButton = screen.getByTestId(loginButton);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitButton).toBeInTheDocument();
  });

  test('02 - Teste se o botão de login é desabilitado caso o email ou senha estejam inválidos', () => {
    renderWithRouterAndRedux(<App />);
    const loginSubmitButton = screen.getByTestId(loginButton);

    expect(loginSubmitButton).toBeDisabled();
  });

  test('03 - Teste se o botão de login é habilitado caso o email e senha estejam válidos', () => {
    renderWithRouterAndRedux(<App />);
    const loginSubmitButton = screen.getByTestId(loginButton);
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(loginSubmitButton).toBeEnabled();
  });

  test('04 - Teste se o botão de login redireciona para a tela principal de receitas de comidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const loginSubmitButton = screen.getByTestId(loginButton);
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(loginSubmitButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});

describe('Testes do component Footer', () => {
  test('01 - Testa se o Footer tem os ids', () => {
    renderWithRouterAndRedux(<Footer />);
    const footerId = screen.getByTestId('footer');
    const mealId = screen.getByTestId(mealsBottomBtn);
    const drinkId = screen.getByTestId(drinkBottomBtn);
    expect(mealId).toBeInTheDocument();
    expect(drinkId).toBeInTheDocument();
    expect(footerId).toBeInTheDocument();
  });
  test('02 - Testa se os textos alternativos das imagens estão presentes', () => {
    renderWithRouterAndRedux(<Footer />);
    const mealImg = screen.getByAltText(/Meal Icon/i);

    expect(mealImg).toBeInTheDocument();
  });
});

describe('Testes da page Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  test('01 - verifica se as 5 primeiras categorias de meals são exibidas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/meals');
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const category = await screen.findAllByTestId(/-category-filter/i);
    expect(category.length).toBe(6);

    const beefCategory = await screen.findByTestId('Beef-category-filter');
    expect(beefCategory).toBeInTheDocument();
  });

  test('02 - verifica se as 12 primeiras comidas são exibidas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const loginSubmitButton = screen.getByTestId(loginButton);
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(loginSubmitButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
    expect(fetch).toHaveBeenCalled();

    const corba = await screen.findByText(/Corba/i);
    expect(corba).toBeInTheDocument();

    const twelveMeals = await screen.findAllByTestId(/-card-name/i);
    expect(twelveMeals.length).toBe(12);
  });

  test('03 - verifica se as 5 primeiras categorias de drinks são exibidas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const loginSubmitButton = screen.getByTestId(loginButton);
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(loginSubmitButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const drinkButton = await screen.findByTestId(drinkBottomBtn);
    userEvent.click(drinkButton);

    const category = await screen.findAllByTestId(/-category-filter/i);
    expect(category.length).toBe(6);

    const twelveMeals = await screen.findAllByTestId(/-card-name/i);
    expect(twelveMeals.length).toBe(12);
  });

  test('04 - verifica se as 12 primeiras bebidas são exibidas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const loginSubmitButton = screen.getByTestId(loginButton);
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(loginSubmitButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const drinkButton = await screen.findByTestId(drinkBottomBtn);
    userEvent.click(drinkButton);

    const kir = await screen.findByText(/Kir/i);
    expect(kir).toBeInTheDocument();

    const twelveDrinks = await screen.findAllByTestId(/-card-name/i);
    expect(twelveDrinks.length).toBe(12);
  });


  test('05 - Verifica se os botões de filtro funcionam devidamente na página /meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/meals');
    expect(history.location.pathname).toBe('/meals');
    const cardsFoods = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoods[0].innerHTML).toContain('Corba');
    const buttonFilterBeef = await screen.findByTestId(/beef-category-filter/i);
    expect(buttonFilterBeef).toBeInTheDocument();
    userEvent.click(buttonFilterBeef);
    const cardsFoodsFiltered = await screen.findAllByTestId(/-recipe-card/i);

    expect(cardsFoodsFiltered[0].innerHTML).toContain('Beef and Mustard Pie');

    // const buttonFilterAll = await screen.findByTestId(/all-category-filter/i);
    // expect(buttonFilterAll).toBeInTheDocument();
    // userEvent.click(buttonFilterBeef);
    // const cardsFoodsRemovedFilter = await screen.findAllByTestId(/-recipe-card/i);
    // expect(cardsFoodsRemovedFilter[0].innerHTML).toContain('Corba');
  });

  test('06 - Verifica se os botões de filtro funcionam devidamente na página /drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');
    expect(history.location.pathname).toBe('/drinks');
    const cardsFoods = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoods[0].innerHTML).toContain('GG');
    const buttonFilterCocktail = await screen.findByTestId(/cocktail-category-filter/i);
    expect(buttonFilterCocktail).toBeInTheDocument();
    userEvent.click(buttonFilterCocktail);
    const cardsFoodsFiltered = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoodsFiltered[0].innerHTML).toContain('155 Belmont');
    userEvent.click(buttonFilterCocktail);
    const cardsFoodsRemovedFilter = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoodsRemovedFilter[0].innerHTML).toContain('GG');
  });
  test('07 - Verifica se o botão All retorna os resultados sem filtros na página /meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/meals');
    expect(history.location.pathname).toBe('/meals');
    const cardsFoods = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoods[0].innerHTML).toContain('Corba');
    const buttonFilterBeef = await screen.findByTestId(/beef-category-filter/i);
    expect(buttonFilterBeef).toBeInTheDocument();
    userEvent.click(buttonFilterBeef);
    const cardsFoodsFiltered = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoodsFiltered[0].innerHTML).toContain('Beef and Mustard Pie');
    const buttonFilterAll = await screen.findByTestId(/all-category-filter/i);
    expect(buttonFilterAll).toBeInTheDocument();
    userEvent.click(buttonFilterAll);
    const cardsFoodsRemovedFilter = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoodsRemovedFilter[0].innerHTML).toContain('Corba');
  });
  test('08 - Verifica se o botão All retorna os resultados sem filtros na página /drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');
    expect(history.location.pathname).toBe('/drinks');
    const cardsFoods = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoods[0].innerHTML).toContain('GG');
    const buttonFilterCocktail = await screen.findByTestId(/cocktail-category-filter/i);
    expect(buttonFilterCocktail).toBeInTheDocument();
    userEvent.click(buttonFilterCocktail);
    const cardsFoodsFiltered = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoodsFiltered[0].innerHTML).toContain('155 Belmont');
    const buttonFilterAll = await screen.findByTestId(/all-category-filter/i);
    expect(buttonFilterAll).toBeInTheDocument();
    userEvent.click(buttonFilterAll);
    const cardsFoodsRemovedFilter = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoodsRemovedFilter[0].innerHTML).toContain('GG');

  describe('Testes do component Header', () => {
    test('01 - Testando o botão de busca', () => {
      renderWithRouterAndRedux(<App />, '/drinks');
      const searchTopBtn = screen.getByTestId('search-top-btn');

      userEvent.click(searchTopBtn);

      const searchInput = screen.getByTestId('search-input');

      expect(searchInput).toBeInTheDocument();
    });
    test('02 - Teste botão do profile', async () => {
      const { history } = renderWithRouterAndRedux(<App />, '/meals');
      const profileTopBtn = screen.getByTestId('profile-top-btn');

      userEvent.click(profileTopBtn);

      const path = history.location.pathname;

      expect(path).toBe('/profile');
    });
    test('03', () => {
      renderWithRouterAndRedux(<App />, '/done-recipes');
      const doneName = screen.getByText(/done recipes/i);
      expect(doneName).toBeInTheDocument();
    });
    test('04', () => {
      renderWithRouterAndRedux(<App />, '/favorite-recipes');
      const favoriteName = screen.getByText(/favorite recipes/i);
      expect(favoriteName).toBeInTheDocument();
    });

  });
});
