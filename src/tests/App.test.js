import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import App from '../App';
import Footer from '../components/Footer';

import mockCategoriesMeals from './mocks/categoriesMeals';
import mockCategoriesDrinks from './mocks/categoriesDrinks';
import mockMeals from './mocks/meals';
import mockDrinks from './mocks/drinks';

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
  test('01 - verifica se as 5 primeiras categorias de meals são exibidas corretamente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockCategoriesMeals),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const loginSubmitButton = screen.getByTestId(loginButton);
    const emailInput = screen.getByTestId(emailInputId);
    const passwordInput = screen.getByTestId(passwordInputId);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(loginSubmitButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const category = await screen.findAllByTestId(/category-filter/i);
    expect(category.length).toBe(6);

    const beefCategory = await screen.findByTestId('Beef-category-filter');
    expect(beefCategory).toBeInTheDocument();
  });

  test('02 - verifica se as 12 primeiras comidas são exibidas corretamente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    }));

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
    global.fetch = () => Promise.resolve({
      json: () => Promise.resolve(mockCategoriesDrinks),
    });

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
    expect(twelveMeals.length).toBe(11);
  });

  test('04 - verifica se as 12 primeiras bebidas são exibidas corretamente', async () => {
    global.fetch = () => Promise.resolve({
      json: () => Promise.resolve(mockDrinks),
    });

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
});
