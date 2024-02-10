import React from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

import { useDispatch, useSelector, } from "react-redux";
import { PostProduct } from '../Redux/data/action';

import placeholderImage from "../assets/placeholder.png";
import Sidebar from '../Partials/Sidebar';
import Navbar from '../Partials/Navbar';
import { GetUserById } from '../Redux/auth/action';


const UserInfo = () => {
    const { id } = useParams();
    const {userId} = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    useEffect(()=> {dispatch(GetUserById(id))},[]);
    
    return (
        <>
        <Navbar/>
        <Sidebar/>
         <main style={{marginTop: "58px"}}>
  <div class="container pt-4"></div>
  <h1 style={{marginLeft:"25px"}}> User Info</h1>
         <div style={{marginLeft:"0",flex:"1",paddingTop:"0"}} class="shippingContainer">
       {userId && (  <form className='form' >
      <label class="field">
      <span class="field__label" >First Name</span>
        <input class="field__input" type="text" value={userId.firstName} />
      </label>

      <label class="field">
      <span class="field__label" >Last Name</span>
        <input class="field__input" type="text"  value={userId.lastName}  />
      </label>

      <label class="field">
      <span class="field__label" >Email</span>
        <input class="field__input" type="text" value={userId.email}  />
      </label>

      <label class="field"> 
        <span class="field__label" >UserName</span>
        <input
            class="field__input"
            type="text"
           
            value={userId.userName}
           
        />
        </label>

        <label class="field"> 
        <span class="field__label" >City</span>
        <input
            class="field__input"
            type="text"
           
            value={userId.city}
           
        /> </label>
         <label class="field"> 
        <span class="field__label" >Country</span>
        <input
            class="field__input"
            type="text"
           
            value={userId.country}
           
        />
       

        </label>
        <label class="field">
        <span class="field__label" >Role</span>
        <input
            class="field__input"
            type="text"
          
            value={userId.role}
            
        />
        </label>

        <label class="field">
        <span class="field__label" >Phone Number</span>
        <input
            class="field__input"
            type="number"
          
            value={userId.phoneNumber}
            
        />
        </label>
      <label class="field">
      <span class="field__label" >Birthday</span>
        <input class="field__input" type="datetime" value={userId.birthday}  />
      </label>

     
    </form>)} 
      </div></main>
        </>
    )
}
export default UserInfo;