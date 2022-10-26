import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route
        path="/drinks/:id_da_receita"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route path="/drinks/:id_da_receita/in_progress" />
      <Route exact path="/meals" component={ Recipes } />
      <Route
        path="/meals/:id_da_receita"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route path="/meals/:id_da_receita/in_progress" />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
    </Switch>
  );
}

export default App;
