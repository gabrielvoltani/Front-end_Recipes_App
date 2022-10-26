import React, { useState } from 'react';

function SearchBar() {
  const [filterRadio, setFilterRadio] = useState('');

  const arrayFilter = ['Ingredient', 'Name', 'First'];
  const idTests = [
    'ingredient-search-radio',
    'name-search-radio',
    'first-letter-search-radio'];

  return (
    <div>
      { arrayFilter.map((title, i) => (
        <label htmlFor={ title } key={ i }>
          <input
            type="radio"
            name="filter"
            value={ title }
            onClick={ ({ target }) => setFilterRadio(target.value) }
            data-testid={ idTests[i] }
          />
          { title }
        </label>
      ))}
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
