import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import Dashboard from './admin/Dashboard';
import Registration from './admin/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './admin/Login'
import FoodMenu from './admin/FoodMenu';
import Errors404 from './admin/Errors404';
import Restaurant from './Components/Restaurant';
import UserLogin from './Components/UserLogin';
import UserSignup from './Components/UserSignup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Menu from './Components/Menu';
import Cart from './Components/Cart';
import OrderLsit from './Components/OrderLsit';

function App() {
  const dispatch = useDispatch();
  const adminUser = useSelector((state) => state.adminUser);

  useEffect(() => {
    fetch('http://localhost:8000/adminUser')
      .then((response) => response.json())
      .then((json) => dispatch({
        type: "addUserAdmin",
        payload: json
      }));
    fetch('http://localhost:8000/cuurentUser')
      .then((response) => response.json())
      .then((json) => dispatch({
        type: "UPDATEUSER",
        payload: json
      }));
  }, [])

  useEffect(() => {
    fetch('http://localhost:8000/cuurentUser')
      .then((response) => response.json)
      .then((json) => console.log(json));
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Restaurant />} />
          <Route path='/signup' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userlogin' element={<UserLogin />} />
          <Route path='/usersignup' element={<UserSignup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orderlist' element={<OrderLsit />} />
          <Route path='/menu/:id' element={<Menu />} />
          <Route path='/dashboard' element={adminUser.length === 0 ? <Errors404 /> : <Dashboard />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
