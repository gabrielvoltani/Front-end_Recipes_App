import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom">
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="Drink Icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="Meal Icon"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}
