import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/profile" />
      <Route exact path="/drinks" />
      <Route path="/drinks/:id-da-receita" />
      <Route path="/drinks/:id-da-receita/in-progress" />
      <Route exact path="/meals" />
      <Route path="/meals/:id-da-receita" />
      <Route path="/meals/:id-da-receita/in-progress" />
      <Route path="/favorite-recipes" />
      <Route path="/done-recipes" />
    </Switch>
  );
}

export default App;
