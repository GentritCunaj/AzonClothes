import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Pages/CSS/orders.css";
import { GetOrderDetails,GetOrderDetailsById } from "../Redux/data/action";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEdit } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
  const navigate = useNavigate();
    const { data } = useSelector((store) => store);
    const dispatch = useDispatch();
    const { orders } = data;

    const getStatusClass = (status) => {
        switch (status) {
          case 'Pending':
            return 'secondary';
          case 'Processing':
            return 'primary';
          case 'Cancelled':
            return 'danger';
          case 'Delivered':
            return 'success';
          case 'Shipped':
            return 'info';
          default:
            return ''; // Return an empty string for unknown status
        }
    }

    useEffect(()=> {dispatch(GetOrderDetails()).then(console.log(orders))},[]);

    const viewOrderDetails = async (id) => {
      try {
        // Dispatch an action to fetch and save the order details to the Redux store
        await dispatch(GetOrderDetailsById(id));
  
        // Navigate to the order details page
        navigate(`/orderDetails/${id}`);
      } catch (error) {
        console.error('Error fetching order details:', error);
        // Handle errors as needed
      }
    };
  
    return (
        <>
       
       
        <div class="page-content page-container" id="page-content">
        <div class="padding">
        
    
    <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Orders</h4>
                      <p class="card-description">
                        Check your orders on detail 
                      </p>
                      <div class="table-responsive">
                        <table class="table" >
                          <thead>
                            <tr style={{textAlign:"center"}}>
                              <th>Name</th>
                              <th>ID No.</th>
                              <th>Order placed</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Details</th>
                            </tr>
                          </thead>
                          
                          <tbody>
                          {orders != null && orders.map((order) => {
                             return (
                                <>
                            <tr style={{textAlign:"center"}}>
                              <td>{order.customer.firstName} &nbsp; {order.customer.lastName}</td>
                              <td>{order.orderId}</td>
                              <td>{order.createdDate.slice(0,16).replace("T"," ")}</td>
                              <td>{order.totalAmount} €</td>
                              <td><label className={`badge bg-${getStatusClass(order.orderStatusName)}`}>{order.orderStatusName}</label></td>
                              <td>  <a style={{cursor:"pointer"}} onClick={() => viewOrderDetails(order.orderId)}> <FontAwesomeIcon icon={faEye} size="xl" /></a></td>
                              
                            </tr>
                            </>)
                            })}
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                  </div>
                </div>
                </>
      
       
    )
}
export default Orders;