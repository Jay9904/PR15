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
    const fetchAdminUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/adminUser');
        const json = await response.json();
        dispatch({
          type: "addUserAdmin",
          payload: json
        });
      } catch (error) {
        console.error('Error fetching admin user:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/cuurentUser');
        const json = await response.json();
        dispatch({
          type: "UPDATEUSER",
          payload: json
        });
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchAdminUser();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchCurrentUserAndLog = async () => {
      try {
        const response = await fetch('http://localhost:8000/cuurentUser');
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUserAndLog();
  }, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserLogin />} />
          <Route path='/restaurant' element={<Restaurant />} />
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
