import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';

export const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);
