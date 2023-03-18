import './App.css';
import Header from './components/Header'
import Phases from './pages/Phases'
import HomePage from './pages/HomePage';
import React, {useState, useEffect} from "react";

function App() {
  return(
    <div className='App'>
      <HomePage/>
      
      {/*
      <Header/>
      <Phases/>
      */}
    </div>
  );
}

export default App;
