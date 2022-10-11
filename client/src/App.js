import './App.scss';
import { Route, Routes } from "react-router-dom";
import React from 'react';

// components
import Header from './components/Header';

// pages
import Home from '../src/pages/Home'


function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      
    </div>
  )
}

export default App;
