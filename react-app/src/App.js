
import logo from './logo.svg';
import {React,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import '../src/Pages/CSS/theme.bundle.css';
import '../src/Pages/CSS/libs.bundle.css';

import 'bootstrap/dist/css/bootstrap.css';

import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import CLogin from './Pages/Login';
import Register from './Pages/Register';
import Checkout from './Pages/Checkout';
import Shipping from './Pages/Shipping';
import StripeContainer from './Pages/StripeContainer';
import UserProfile from './Pages/UserProfile';
import OrderDetails from './Pages/OrderDetails';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Sidebar from './Partials/Sidebar';
import EditProduct from './Pages/EditProduct';
import CreateProduct from './Pages/CreateProduct';
import Users from './Pages/Users';
import UserInfo from './Pages/UserInfo';
import ThankYou from './Pages/ThankYou';
import AllOrders from './Pages/AllOrders';
import UnAuthorized from './Pages/UnAuthorized';
import PrivateRoute from './Pages/PrivateRoute';
import { Navigate } from 'react-router-dom';
import OrderPrivateRoute from './Pages/OrderPrivateRoute';
import UpdateOrder from './Pages/UpdateOrder';

function App() {
 

  return (
    
      <Router>
          <Routes>
             <Route path="/" element={<Home/>}/>
 
              <Route path="/products" element={<Products/>}/>
              <Route path="/ProductDetails/:id" element={<ProductDetails/>}/>
              <Route path="/login" element={<CLogin />} />
              <Route path="/register" element ={<Register/>}/>
              <Route path="/Checkout" element={<Checkout/>}/>
              <Route path="/Shipping" element={<Shipping/>}/>
              <Route path="/payment" element={<StripeContainer/>}/>
              <Route path="/profile" element={<UserProfile/>}/>
              
              <Route path="/orderDetails/:id" element={
                  <OrderPrivateRoute > <OrderDetails/></OrderPrivateRoute>
              }/>
            <Route path="/dashboard"  element={
              <PrivateRoute roles={['Admin']}><Dashboard/></PrivateRoute>
            }/>
             
             <Route path="/editProduct/:id"  element={
              <PrivateRoute roles={['Admin']}><EditProduct/></PrivateRoute>
            }/>
             
              <Route path="/createProduct"  element={
              <PrivateRoute roles={['Admin']}><CreateProduct/></PrivateRoute>
            }/>
             
              <Route path="/users"  element={
              <PrivateRoute roles={['Admin']}><Users/></PrivateRoute>
            }/>

            <Route path="/updateOrder/:id"  element={
              <PrivateRoute roles={['Admin']}><UpdateOrder/></PrivateRoute>
            }/>
             
              <Route path="/userInfo/:id" element={<UserInfo/>}/>
              <Route path="/thankYou" element={<ThankYou/>}/>
              <Route path="/allOrders"  element={
              <PrivateRoute roles={['Admin']}><AllOrders/></PrivateRoute>
            }/>
             
              <Route path="/unauthorized" element={<UnAuthorized/>}/>
              
    </Routes>
      </Router>
    
  );
}

export default App;
