import React from 'react';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { GetOrderDetailsById } from '../Redux/data/action';
import "../Pages/CSS/modal.css"
import "../Pages/CSS/wishlist.css";
import "../Pages/CSS/shipping.css";
import "../Pages/CSS/payment.css";
import "../Pages/CSS/tracked.css"

import placeholderImage from "../assets/placeholder.png";
import Footer from '../Partials/Footer';
import Navbar from '../Partials/Navbar';
import cancelled from "../assets/cancelled.png";
import Modal from '../Partials/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faShippingFast,faHouse, faRoute, faHome, faClock } from '@fortawesome/free-solid-svg-icons';

const OrderDetails = () => {
    const { id } = useParams();
    const { order,loading } = useSelector((store) => store.data);
    const {isAuthenticated} = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);


    const backgroundStyle = {
      "--backgroundafter":"#6520ff",
      "--backgroundbefore":"#6520ff"
    }
  
 

    useEffect(()=> {dispatch(GetOrderDetailsById(id)).then(console.log(order))},[]);
    const getProductImage = (productName) => {
        try {
            return require(`../${productName}`);
        } catch (err) {
            return placeholderImage;
        }

    };


    return (
        <>
        <Navbar/>
        {loading  ? (
              <div className="loader-container">
                  <div className="spinner"></div>
              </div>
          ) : (
            <>
         <section class="pt-5 pb-5">
          
      

      
  <div class="container" style={{maxWidth:"1100px",display:"flex",borderTop:"2px solid black",borderBottom:"2px solid black"}} >

       

         <div style={{borderLeft:"2px solid black",paddingTop:"30px"}} class="row w-50">
         
         {order != null && order.orderStatusName == 'Cancelled' && (
          <img src={cancelled}  className="cancelled-sign"
          />
        )}
         <h3 style={{marginLeft:"30px"}}>Order No. { order != null && order.orderId}</h3>
         <h4 class="text-center">Items ordered</h4>
            <table id="shoppingCart" class="table table-condensed table-responsive">
                

            {isAuthenticated && order != null && order.wishlist.items.map((el) => {
                return (
        <>
       
              <thead>
                    <tr>
                    
                        <th style={{width:"60%"}}>Product</th>
                        <th style={{width:"12%"}}>Price</th>
                        <th style={{width:"10%"}}>Quantity</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-th="Product">
                            <div class="row">
                                <div class="col-md-3 text-left">
                                <img src={getProductImage(el.product.picturePath)} alt={el.product.name}  class="img-fluid d-none d-md-block rounded mb-2 shadow "/>

                                </div>
                                <div class="col-md-6 text-left mt-sm-3">
                                    <h4>{el.product.name}</h4>
                                    <p class="font-weight-light">{el.product.colorVariants[0].stockOptions[0].size}</p>
                                </div>
                            </div>
                        </td>
                        <td data-th="Price"><h4>{el.product.price} € </h4></td>
                        <td data-th="Quantity">
                            <h4>{el.count}</h4>
                            </td>
                        
                        
                      
                    </tr>
                    
                </tbody>
                </>
          )})
        }
            </table>
          
            <div style={{textAlign:"center"}} >
             
                <h1>Total: {order != null && order.totalAmount} €</h1>
                
            </div>
        </div>
        
        <div style={{marginLeft:"50px"}} class="row w-50">
      
        <div class="form" style={{display:"flow",borderRight:"2px solid black",paddingTop:"30px"}}>
        <h4 style={{marginBottom:"20px"}}>Shipping and Payment Details</h4>
 {order != null && (
  <>
   <label  style={{marginBottom:"20px"}} class="field">
   <span class="field__label" for="address">Address</span>
   <input class="field__input" type="text" name="address"  value={order.shipping.address}/>
 </label>
 <label style={{marginBottom:"20px"}}  class="field">
   <span class="field__label" for="mobile">Mobile Phone</span>
   <input class="field__input" type="number" name="mobile"  value={order.shipping.mobile} />
 </label>
 <div class="fields fields--3">
   <label style={{marginBottom:"20px"}}  class="field">
     <span class="field__label" for="zipcode">Post code</span>
     <input class="field__input" type="text" name="zipcode"   value={order.shipping.postCode} />
   </label>
   <label style={{marginBottom:"20px"}}  class="field">
     <span class="field__label" for="city">City</span>
     <input class="field__input" type="text" name="city"  value={order.shipping.city}/>
   </label>
   <label style={{marginBottom:"20px"}}  class="field">
     <span class="field__label" for="country">Country</span>
     <input class="field__input" type="text" name="country"  value={order.shipping.country}/>
   </label>
   <label style={{marginBottom:"20px"}}  class="field">
     <span class="field__label" for="info">Info</span>
     <input class="field__input" type="text" name="info"  value={order.shipping.info}/>
   </label>
  
  
 </div></>
 )}
   

        </div>
    
        </div>
       
     
  </div>

  <div class="card-stepper" style={{borderRadius: "16px;",display:"flex",flexDirection:"column",alignItems:"center"}}>

{order != null && order.orderStatusName !== "Cancelled" && (


<div class="card-body p-5" style={{width:"70%"}}>

 

  {order.orderStatusName == 'Pending' && (
  <ul id="progressbar-2" class="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
   
   
    <li class="step0 active text-center"  style={{ "--backgroundbefore": backgroundStyle["--backgroundbefore"] }} id="step1"></li>
    <li class="step0 active text-center" id="step2"></li>
    <li class="step0 active text-center" id="step3"></li>
    <li class="step0 text-muted text-end" id="step4"></li> 
  
  </ul>  )}




 {order.orderStatusName == 'Processing' && (
  <ul id="progressbar-2" class="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
   
   
    <li class="step0 active text-center"  style={backgroundStyle} id="step1"></li>
    <li class="step0 active text-center"   style={{ "--backgroundbefore": backgroundStyle["--backgroundbefore"] }} id="step2"></li>
    <li class="step0 active text-center" id="step3"></li>
    <li class="step0 text-muted text-end" id="step4"></li> 
  
  </ul>  )}

  {order.orderStatusName == 'Shipped' && (
  <ul id="progressbar-2" class="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
   
   
    <li class="step0 active text-center"  style={backgroundStyle} id="step1"></li>
    <li class="step0 active text-center"  style={backgroundStyle}  id="step2"></li>
    <li class="step0 active text-center" style={{ "--backgroundbefore": backgroundStyle["--backgroundbefore"] }} id="step3"></li>
    <li class="step0 text-muted text-end" id="step4"></li> 
  
  </ul>  )}

  {order.orderStatusName == 'Delivered' && (
  <ul id="progressbar-2" class="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
   
   
    <li class="step0 active text-center"  style={backgroundStyle} id="step1"></li>
    <li class="step0 active text-center"  style={backgroundStyle}  id="step2"></li>
    <li class="step0 active text-center" style={backgroundStyle} id="step3"></li>
    <li class="step0 text-muted text-end" style={backgroundStyle} id="step4"></li> 
  
  </ul>  )}


  <div class="d-flex justify-content-between">
  <div class="d-lg-flex align-items-center">
    <FontAwesomeIcon icon={faClock} size="3x"/>
  
      <div>
        <p class="fw-bold mb-1">Order</p>
        <p class="fw-bold mb-0">Pending</p>
      </div>
    </div>
    <div class="d-lg-flex align-items-center">
    
    <FontAwesomeIcon icon={faClipboardList} size="3x"/>
      <div>
        <p class="fw-bold mb-1">Order</p>
        <p class="fw-bold mb-0">Processed</p>
      </div>
    </div>
    <div class="d-lg-flex align-items-center">
    <FontAwesomeIcon icon={faShippingFast} size="3x"/>
      <div>
        <p class="fw-bold mb-1">Order</p>
        <p class="fw-bold mb-0">Shipped</p>
      </div>
    </div>

    <div class="d-lg-flex align-items-center" style={{display:"flex",flexDirection:"inherit"}}>
    {order.deliveredDate != null && (
          <p>{order.deliveredDate}</p>
        )}&nbsp;
    <FontAwesomeIcon icon={faHouse} size="3x"/>
      <div>
     
        <p class="fw-bold mb-1">Order</p>
        <p class="fw-bold mb-0">Arrived</p>
        
      </div>
      
    </div>
    
    </div>
 

    {order.orderStatusName == "Cancelled" && (
      <h1>Order has been cancelled !</h1>
    )}
      
    </div>
    )}
 
    
</div>
       </section></>
          )}
       <Footer/>
   
        </>
    )
}
export default OrderDetails;