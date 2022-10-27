import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/drinks/:id_da_receita" component={ RecipeDetails } />
      <Route path="/drinks/:id_da_receita/in-progress" component={ RecipeInProgress } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/meals/:id_da_receita" component={ RecipeDetails } />
      <Route path="/meals/:id_da_receita/in-progress" component={ RecipeInProgress } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
    </Switch>
  );
}

export default App;
