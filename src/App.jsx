import React from 'react';

import Categories from './components/Categories/Categories';

import './App.scss';

export const App = () => (
  <div className="app">
    <h1>Event Manager</h1>
    <Categories />
  </div>
);
