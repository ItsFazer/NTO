import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookingComponent from './component'; // Путь к вашему компоненту


const Header = () => {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Просвещение</Link></li>
            <li><Link to="/">Развлечения</Link></li>
            <li><Link to="/">Образование</Link></li>
            <li><Link to="/registration">Регистрация</Link></li>
            <li><Link to="/booking">Бронь</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/booking" element={<BookingComponent />} />
        </Routes>
      </header>
    </Router>
  );
};

export default Header;
