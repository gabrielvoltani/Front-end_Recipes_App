import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/drinks/:id-da-receita" />
      <Route path="/drinks/:id-da-receita/in-progress" />
      <Route exact path="/meals" component={ Recipes } />
      <Route path="/meals/:id-da-receita" />
      <Route path="/meals/:id-da-receita/in-progress" />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
    </Switch>
  );
}

export default App;
