import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getMealsFiltred, getDrinksFiltred } from '../Redux/Actions';

import {
  requestIngredientApi,
  requestNameApi,
  requestFirstLetter,
  requestDriksIngredientApi,
  requestDriksNameApi,
  requestDriksFirstLetterApi } from '../services/apiSearch';

function SearchBar({ pathname, dispatch }) {
  const [filterRadio, setFilterRadio] = useState('Ingredient');
  const [searchValue, setSearchValue] = useState('');
  const [redirectCaseOne, setRedirectCaseOne] = useState(false);
  const [verifyPathName, setVerifyPathName] = useState(false);
  const [reciveIdFromApis, setReciveIdFromApis] = useState('');

  const arrayFilter = [
    'Ingredient',
    'Name',
    'First Letter',
  ];
  const idTests = [
    'ingredient-search-radio',
    'name-search-radio',
    'first-letter-search-radio',
  ];

  const FILTER_LIMIT_RENDER = 12;

  const dispatchSeachFIlterMeals = (result) => {
    if (result[0].meals.length > FILTER_LIMIT_RENDER) {
      dispatch(getMealsFiltred(result[0].meals[12]));
    }

    dispatch(getMealsFiltred(result[0].meals));
  };

  const dispatchSeachFIlterDrinks = (result) => {
    if (result[0].drinks.length > FILTER_LIMIT_RENDER) {
      dispatch(getDrinksFiltred(result[0].drinks[12]));
    }

    dispatch(getDrinksFiltred(result[0].drinks));
  };

  const searchApiRadioFiltersMeals = async () => {
    if (filterRadio === arrayFilter[0]) {
      const result = [];
      result.push(await requestIngredientApi(searchValue));
      if (result[0].meals.length === 1) {
        setRedirectCaseOne(true);
        setReciveIdFromApis(result[0].meals[0].idMeal);
      }
      dispatchSeachFIlterMeals(result);
    }
    if (filterRadio === arrayFilter[1]) {
      const result = [];
      result.push(await requestNameApi(searchValue));
      if (result[0].meals.length === 1) {
        setRedirectCaseOne(true);
        setReciveIdFromApis(result[0].meals[0].idMeal);
      }
      dispatchSeachFIlterMeals(result);
    }
    if (filterRadio === arrayFilter[2]) {
      if (searchValue.length === 1) {
        const result = [];
        result.push(await requestFirstLetter(searchValue));
        if (result[0].meals.length === 1) {
          setRedirectCaseOne(true);
          setReciveIdFromApis(result[0].meals[0].idMeal);
        }
        dispatchSeachFIlterMeals(result);
      }
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  const searchApiRadioFiltersDrinks = async () => {
    if (filterRadio === arrayFilter[0]) {
      const result = [];

      result.push(await requestDriksIngredientApi(searchValue));
      if (result[0].drinks.length === 1) {
        setRedirectCaseOne(true);
        setReciveIdFromApis(result[0].drinks[0].idDrink);
      }
      dispatchSeachFIlterDrinks(result);
    }

    if (filterRadio === arrayFilter[1]) {
      const result = [];

      result.push(await requestDriksNameApi(searchValue));
      if (result[0].drinks.length === 1) {
        setRedirectCaseOne(true);
        setReciveIdFromApis(result[0].drinks[0].idDrink);
      }
      dispatchSeachFIlterDrinks(result);
    }

    if (filterRadio === arrayFilter[2]) {
      if (searchValue.length === 1) {
        const result = [];
        result.push(await requestDriksFirstLetterApi(searchValue));
        if (result[0].drinks.length === 1) {
          setRedirectCaseOne(true);
          setReciveIdFromApis(result[0].drinks[0].idDrink);
        }

        dispatchSeachFIlterDrinks(result);
      }
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  const chooseFilter = () => {
    if (pathname === '/meals') {
      searchApiRadioFiltersMeals();
      setVerifyPathName(true);
    }
    if (pathname === '/drinks') {
      searchApiRadioFiltersDrinks();
      setVerifyPathName(true);
    }
  };

  return (
    <div>
      { redirectCaseOne && verifyPathName && <Redirect
        to={ `${pathname}/${reciveIdFromApis}` }
      />}

      <input
        type="text"
        placeholder="Pesquise Aqui"
        data-testid="search-input"
        value={ searchValue }
        onChange={ ({ target }) => setSearchValue(target.value) }
      />
      { arrayFilter.map((title, i) => (
        <label htmlFor={ title } key={ i }>
          <input
            type="radio"
            name="filter"
            checked={ filterRadio === title }
            value={ title }
            onChange={ ({ target }) => setFilterRadio(target.value) }
            data-testid={ idTests[i] }
          />
          { title }

        </label>
      ))}
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => chooseFilter() }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(SearchBar);
