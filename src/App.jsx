import React from 'react';

import Categories from './components/Categories/Categories';

import './App.scss';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className="app">
    <div className="container">
      <Header />
      <Categories />
    </div>
  </div>
);
