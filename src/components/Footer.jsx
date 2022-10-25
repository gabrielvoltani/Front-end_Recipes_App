import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom">
      <Link to="/drinks">
        <img
          src="/images/drinkIcon.svg"
          alt="Drink Icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src="images/mealIcon.svg"
          alt="Meal Icon"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}
