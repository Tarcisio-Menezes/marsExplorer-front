import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import AddUser from './pages/AddUser';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/create-user" element={ <AddUser /> } />
          <Route exact path="/favorites" element={ <Favorites /> } />
          <Route exact path="/home" element={ <Home /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
