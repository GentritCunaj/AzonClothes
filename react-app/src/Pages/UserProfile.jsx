import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";

import "../Pages/CSS/profile.css"

import Navbar from "../Partials/Navbar";
import Footer from "../Partials/Footer";
import profile from "../assets/profile.png"
import $ from 'jquery';
import Tabs from "../Partials/Tabs";
import { GetInfo } from "../Redux/auth/action";
const UserProfile = () => {

    const {user} = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    useEffect(()=> {dispatch(GetInfo())},[]);
    return (
        <>
        <Navbar/>
       <div style={{marginTop:"50px",marginBottom:"100px"}} class="container bootstrap snippets bootdey">

<div class="row">
  <div class="profile-nav col-md-3">
      <div class="panel">
          <div class="user-heading round">
              <a href="#">
              <img src={profile} alt="profile" />

              </a>
             
          </div>

          <ul class="nav nav-pills nav-stacked">
            
              <li><a href="/editProfile"> <i class="fa fa-edit"></i> Edit profile</a></li>
          </ul>
      </div>
  </div>
  <div class="profile-info col-md-9">
     
      <div class="panel">
          <div class="bio-graph-heading">
             You can check all your user profile info and latest activity here including tracking your orders, reviews and changing your info.
          </div>
          <div class="panel-body bio-graph-info">
              <h1>Your info</h1>
              <div style={{marginBottom:"50px"}} class="row">
                {user != null && (
                    <>
                     <div class="bio-row">
                      <p><span>First Name </span>: {user.firstName}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>UserName </span>: {user.userName}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Last Name </span>: {user.lastName}</p>
                  </div>
                  
            
                  <div class="bio-row">
                      <p><span>Email </span>: {user.email}</p>
                  </div>
                 
                  <div class="bio-row">
                      <p><span>Phone </span>: {user.phoneNumber}</p>
                  </div>

                  <div class="bio-row">
                      <p><span>Birthday </span>: {user.birthday.slice(0,16).replace("T"," ")}</p>
                  </div>

                  <div class="bio-row">
                      <p><span>Country </span>: {user.country}</p>
                  </div>

                  <div class="bio-row">
                      <p><span>City </span>: {user.city}</p>
                  </div>
                    </>
                )}
                 
              </div>
          </div>
      </div>
    
  </div>

    <div class="panel">
        <Tabs/>
   
    </div>


    </div>
  
</div>
<Footer/>
        </>
    )

}
export default UserProfile;