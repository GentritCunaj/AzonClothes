import React from "react";
import "../Pages/CSS/dropdown.css"

import { useState,useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { authLogout } from "../Redux/auth/action";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import logo from "../assets/logo.png"

function Navbar(){
    const {isAuthenticated} = useSelector((store)=> store.auth);
  const {selectedProducts} = useSelector((store)=>store.data);
    const dispatch = useDispatch();
  

    return (
    <>
         

            <div class="hero_area">
                
                <header class="header_section">
                    
                    <div class="header_bottom">
                        <div class="container-fluid">
                            <nav class="navbar navbar-expand-lg custom_nav-container ">
                                <div class="logo-container">
                                    <img src={logo} alt="logo" class="logo-img" />
                               </div>
                                
                               
                                <div style={{display:"flex",justifyContent:"space-between"}} class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav ">
                                        <li class="nav-item ">
                                            <a class="nav-link" href="/"><span>Home</span> </a>
                                        </li>
                                     
                                        <li class="nav-item">
                                            <a class="nav-link" href="/products"><span>Products</span></a>
                                        </li>
                                       
                                    </ul>
                                    <div class="user_option_box">
                                    <a href="/profile" class="account-link">
                                        <i class="fa fa-user"  style={{fontSize:"18px"}}  aria-hidden="true"></i>
                                        
                                    </a>
                                    <a href="/checkout" class="cart-link">
                                        <i class="fa fa-shopping-cart"  style={{fontSize:"20px"}}  aria-hidden="true"></i>
                                        {selectedProducts && selectedProducts.items && selectedProducts.items.length > 0 && (
                                             <span class="cart-count">{selectedProducts.items.length}</span>
                                        )}
                                      
                                       
                                    </a>
                                    {!isAuthenticated ? 
                                    <a
                                    className="cart-link"
                                    
                                    href="/login"
                                    >
                                    Login
                                    <div className="icon">
                                        <FiLogIn />
                                    </div>
                                    
                                    </a>
                                    :  
                                    <a
                                        className="cart-link"
                                        onClick={() => {
                                            dispatch(authLogout());
                                        }}
                                        href="/login"
                                        >
                                        LogOut 
                                        <div className="icon">
                                            <FiLogOut />
                                        </div>
                                        
                                        </a>
                                    }
                                                                        </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>

            </div>
              
        </>
    )
}

export default Navbar;


