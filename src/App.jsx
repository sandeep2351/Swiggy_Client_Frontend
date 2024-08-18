import React from 'react';
import Landingpage from './swiggy/pages/Landingpage';
import Productmenu from './swiggy/components/Productmenu';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/products/:firmId/:firmName" element={<Productmenu />} />

      </Routes>
    </div>
  );
};

export default App;
