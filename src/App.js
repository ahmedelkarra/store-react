import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import Admin from './pages/admin';
import Login from './pages/login';
import Register from './pages/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Home from './pages/home';
import ProductesDetails from './pages/productesDetails';
import Profile from './pages/profile';
import MyOrders from './pages/myOrders';


function App() {
  const online = useSelector((state) => state.user.online)
  const user = useSelector((state) => state.user.user)
  return (
    <div className="App">
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path='*' element={<Home />} />
        {!online && <Route path='/register' element={<Register />} />}
        {!online && <Route path='/login' element={<Login />} />}
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='/products/:id' element={<ProductesDetails />} />
        {online && user.isAdmin && <Route path='/admin' element={<Admin />} />}
        <Route path='profile' element={<Profile />} />
        <Route path='/orders' element={<MyOrders />} />
      </Routes>
    </div>
  );
}

export default App;