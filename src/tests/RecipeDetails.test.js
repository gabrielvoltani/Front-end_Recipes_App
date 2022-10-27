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
    await screen.findByTestId('recipe-photo');
    await screen.findByTestId('recipe-title');
    await screen.findByTestId('recipe-category');
    await screen.findByTestId('instructions');
    await screen.findByTestId('video');
    await screen.findByTestId('0-recommendation-card');
    await screen.findByTestId('start-recipe-btn');
  });
});
