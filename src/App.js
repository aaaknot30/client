import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'

function App() {
  return (
    <div>
      <AppNavbar />
      <ShoppingList />
    </div>
  );
}

export default App;
