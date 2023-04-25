import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';

import './index.css'
import { AuthProvider } from './AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='signup' element={<Signup />}></Route>
          <Route path='dashboard' element={<Dashboard />}></Route>  
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

