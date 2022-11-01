import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

import App from '../App';

import mockFetch from './mocks/fetchRecipes';

describe('Testa a página de detalhes de receitas', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  test('01 - Testa se a página de detalhes de receitas contém todos os elementos', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals/52771');
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
  });
});
