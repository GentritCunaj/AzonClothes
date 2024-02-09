import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { decodeToken } from './AuthUtils'; // Replace with your token decoding logic
import { useSelector } from 'react-redux';

const OrderPrivateRoute = ({ children,roles }) => {
  const isAuthenticated = localStorage.getItem('azontoken');
  const decodedToken = decodeToken(localStorage.getItem('azontoken'));

  const {order} = useSelector((store) => store.data); // Get order from Redux store
   
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if admin is logged in
  if (decodedToken && decodedToken.role === 'Admin') {
    return children;
  }

  // Check if the decoded token id matches the customerId in the order

  if (decodedToken && order && order.customer.email === decodedToken.id) {
    return children;
  }

  // Redirect to unauthorized if the user is not an admin and doesn't own the order
  return <Navigate to="/unauthorized" />;
};

export default OrderPrivateRoute;