import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import App from '../App';
import Footer from '../components/Footer';

import mockFetch from './mocks/fetchRecipes';
import Profile from '../pages/Profile';

const loginButton = 'login-submit-btn';
const emailInputId = 'email-input';
const passwordInputId = 'password-input';
const email = 'grupo23@gmail.com';
const password = '1234567';
const drinkBottomBtn = 'drinks-bottom-btn';
const mealsBottomBtn = 'meals-bottom-btn';
const doneRecipes = '/done-recipes';

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

    const buttonFilterAll = await screen.findByTestId(/all-category-filter/i);
    expect(buttonFilterAll).toBeInTheDocument();
    userEvent.click(buttonFilterBeef);
    const cardsFoodsRemovedFilter = await screen.findAllByTestId(/-recipe-card/i);
    expect(cardsFoodsRemovedFilter[0].innerHTML).toContain('Corba');
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
  });
});

describe('Testes da pagina Profile', () => {
  test('01 - Testa se o Profile tem os ids', () => {
    renderWithRouterAndRedux(<Profile />, '/profile');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('02 - Testa os botões pra mudar de tela(Done Recipes)', () => {
    const { history } = renderWithRouterAndRedux(<Profile />, '/profile');
    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);

    const path = history.location.pathname;

    expect(path).toBe(doneRecipes);
  });

  test('03 - Testa os botões pra mudar de tela(Done Recipes)', () => {
    const { history } = renderWithRouterAndRedux(<Profile />, '/profile');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);

    const path = history.location.pathname;

    expect(path).toBe('/favorite-recipes');
  });

  test('04 - Testa os botões pra mudar de tela(Done Recipes)', () => {
    const { history } = renderWithRouterAndRedux(<Profile />, '/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    const path = history.location.pathname;

    expect(path).toBe('/');
  });

  test('05 - Testa os botões pra mudar de tela', () => {
    renderWithRouterAndRedux(<Profile />, '/profile');

    const emailProfile = screen.getByTestId('profile-email');
    expect(emailProfile).toBeInTheDocument();
  });
});

describe('Testes do component Header', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  test('01 - Testando o botão de busca', () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
  });
  test('02 - Teste botão do profile', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');
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

describe('15 - Testando o componente SearchBar', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  test('Testando se os inputs são renderizados/Botão', () => {
    renderWithRouterAndRedux(<App />, '/meals');
    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const ingredienteRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchFilterBtn = screen.getByTestId('exec-search-btn');

    expect(inputSearch).toBeInTheDocument();
    expect(ingredienteRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchFilterBtn).toBeInTheDocument();
  });
});

describe('Teste da tela receitas em progresso', () => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: () => {},
    },
  });
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  const urlPathInProgressMeal = '/meals/52771/in-progress';
  const urlPathInProgressDrink = '/drinks/178319/in-progress';
  const linkWhiteIcon = 'http://localhost/whiteHeartIcon.svg';
  const favoriteTestIdBtn = 'favorite-btn';
  test('01 - Testando se as informações da receita aparecem corretamente na página meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />, urlPathInProgressMeal);
    const { pathname } = history.location;
    expect(pathname).toBe(urlPathInProgressMeal);

    await waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Spicy Arrabiata Penne');

      const category = screen.getByTestId('recipe-category');
      expect(category).toBeInTheDocument();
      expect(category).toHaveTextContent('Vegetarian');

      const imageRecipe = screen.getByTestId('recipe-photo');
      expect(imageRecipe).toBeInTheDocument();
      expect(imageRecipe).toHaveProperty('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
      expect(imageRecipe).toHaveProperty('alt', 'Spicy Arrabiata Penne');

      const instructions = screen.getAllByTestId(/-ingredient-step/i);
      expect(instructions).toHaveLength(8);

      const favoriteBtn = screen.getByTestId(favoriteTestIdBtn);
      expect(favoriteBtn).toBeInTheDocument();
      expect(favoriteBtn).toHaveProperty('src', linkWhiteIcon);

      const shareBtn = screen.getByTestId('share-btn');
      expect(shareBtn).toBeInTheDocument();

      userEvent.click(shareBtn);

      const textIsCopied = screen.getByTestId('text-copied');
      expect(textIsCopied).toBeInTheDocument();
    });
  });

  test('02 - Testando components página de drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />, urlPathInProgressDrink);
    const { pathname } = history.location;
    expect(pathname).toBe(urlPathInProgressDrink);

    await waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Aquamarine');

      const category = screen.getByTestId('recipe-category');
      expect(category).toBeInTheDocument();
      expect(category).toHaveTextContent('Cocktail');

      const imageRecipe = screen.getByTestId('recipe-photo');
      expect(imageRecipe).toBeInTheDocument();
      expect(imageRecipe).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
      expect(imageRecipe).toHaveProperty('alt', 'Aquamarine');

      const instructions = screen.getAllByTestId(/-ingredient-step/i);
      expect(instructions).toHaveLength(3);

      const favoriteBtn = screen.getByTestId(favoriteTestIdBtn);
      expect(favoriteBtn).toBeInTheDocument();
      expect(favoriteBtn).toHaveProperty('src', linkWhiteIcon);

      const shareBtn = screen.getByTestId('share-btn');
      expect(shareBtn).toBeInTheDocument();
    });
  });

  test('03 - Testando comportamento dos botões', async () => {
    const { history } = renderWithRouterAndRedux(<App />, urlPathInProgressMeal);
    const { pathname } = history.location;
    expect(pathname).toBe(urlPathInProgressMeal);

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId(favoriteTestIdBtn);
      expect(favoriteBtn).toBeInTheDocument();
      expect(favoriteBtn).toHaveProperty('src', linkWhiteIcon);

      userEvent.click(favoriteBtn);
      expect(favoriteBtn).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
    });
  });

  test('04 - Testando o funcionamento do checkbox', async () => {
    const { history } = renderWithRouterAndRedux(<App />, urlPathInProgressMeal);
    const { pathname } = history.location;
    expect(pathname).toBe(urlPathInProgressMeal);

    await waitFor(() => {
      const instructions = screen.getAllByTestId(/-ingredient-step/i);
      expect(instructions).toHaveLength(8);

      const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
      expect(finishRecipeBtn).toBeDisabled();
      instructions.forEach((instruction) => {
        userEvent.click(instruction);
      });
      expect(instructions[0]).toHaveClass('checked');
      expect(finishRecipeBtn).not.toBeDisabled();

      window.location.reload();

      expect(instructions[0]).toHaveClass('checked');

      userEvent.click(finishRecipeBtn);

      expect(history.location.pathname).toBe(doneRecipes);
    });
  });

  test('05 - Testando se a página funciona sem que haja algum id cadastrado no localStorage', async () => {
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => null,
      setItem: () => { },
    } });
    renderWithRouterAndRedux(<App />, urlPathInProgressMeal);
    await waitFor(() => {
      const instructions = screen.getAllByTestId(/-ingredient-step/i);
      expect(instructions).toHaveLength(8);
      instructions.forEach((instruction) => {
        expect(instruction).not.toHaveClass('checked');
      });
    });
  });
});

// test('Testa se um Alert aparece quando a API retorna null', () => {
//   renderWithRouterAndRedux(<App />, '/meals');
//   const searchBtn = screen.getByTestId('search-top-btn');

//   userEvent.click(searchBtn);

//   const inputSearch = screen.getByTestId('search-input');
//   const ingredienteRadio = screen.getByTestId('ingredient-search-radio');
//   const nameRadio = screen.getByTestId('name-search-radio');
//   const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
//   const searchFilterBtn = screen.getByTestId('exec-search-btn');

//   userEvent.type(inputSearch, 'xablau');

//   userEvent.selectOptions(ingredienteRadio);
//   userEvent.click(searchFilterBtn);

//   const alertMock = jest.spyOn(window, 'alert');
// });
// })
