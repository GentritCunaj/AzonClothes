import React from 'react';
import Navbar from '../Partials/Navbar';
import Footer from '../Partials/Footer';
import './CSS/unauthorized.css';
const UnAuthorized = () => {

    return (
        <>
        <Navbar/>
      
        <div class="unauthorizedContainer">
            <h1>4<div class="lock"><div class="top"></div><div class="bottom"></div>
                </div>3</h1><h5>Access denied</h5>
            </div>
   
        </>
    )
}
export default UnAuthorized;