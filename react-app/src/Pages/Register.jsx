import React, { useState,useEffect } from "react";
import './CSS/Login.css';

import { useDispatch, useSelector, } from "react-redux";
import { RegisterCustomer } from "../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../Partials/Footer';

import { Navigate } from "react-router-dom";
import Navbar from "../Partials/Navbar";


const notify = (text) => toast(text);

const Register = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

  const [errors, setErrors] = useState({});

  const initData = {
   firstName:'',
   lastName:'',
   email:'',
    phoneNumber: '',
   userName:'',
   password:''

  };
  const [Customer, setCustomer] = useState(initData);

  const onChange = (e) => {
    setCustomer({ ...Customer, [e.target.name]: e.target.value });
  };
  const validatePassword = (password) => {
    const errors = {password:''};

    // Password must be at least six characters long
    if (Customer.password.length < 6) {
      errors.password = 'Password must be at least six characters long.';
    }

    // Password must contain an uppercase character, a lowercase character, a digit, and a non-alphanumeric character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      errors.password =
        'Password must contain an uppercase character, a lowercase character, a digit, and a non-alphanumeric character.';
    }

    return errors;
  };

    function validateEmail(email) {
        const errors = { email: ''};
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)){
        errors.email = 'Email is not valid';
    }
    return errors;
  }
  

  const handleClick= (e) => {
    e.preventDefault(); 
    
    const passwordErrors = validatePassword(Customer.password);
    const emailErrors = validateEmail(Customer.email);
    if (passwordErrors.password !== ''){
        setErrors(passwordErrors);
        return
    }
    if (emailErrors.email !== ''){
        setErrors(emailErrors);
        return
    }
    setLoading(true);
    dispatch(RegisterCustomer(Customer)).then((res) => {
      if (res.success == false) {
        setLoading(false);
        return notify(res.message);
      }
      else {
        setLoading(false);
      setCustomer(initData);
      navigate("/login");
      return notify("You're registered");
      }
      

    });
    
  };


  return (
    <>
    <Navbar/>
          <ToastContainer />
          {loading ? (
              <div className="loader-container">
                  <div className="spinner"></div>
              </div>
          ) : (
              <>
             
                      <div class="shippingContainer" style={{padding:0}}>
                         
                                  <div id="registerForm" className="form">
                                  
                                      <h2>Register</h2>

                                      <label class="field">
                                     <span class="field__label" for="firstName">First Name</span>
                                          <input
                                            class="field__input"
                                              name="firstName"
                                              value={Customer.firstName}
                                              type="text"
                                             
                                             
                                              onChange={onChange}
                                          ></input>
                                         
                                       </label>

                                   
                                       <label class="field">
                                     <span class="field__label" for="lastName">Last Name</span>
                                          <input
                                           class="field__input"
                                              name="lastName"
                                              value={Customer.lastName}
                                              type="text"
                                              
                                              
                                              onChange={onChange}
                                          ></input>
                                         
                                    </label>

                                    <label class="field">
                                     <span class="field__label" for="email">Email</span>
                                          <input
                                            class="field__input"
                                              name="email"
                                              value={Customer.email}
                                              type="email"
                                              
                                             
                                              onChange={onChange}
                                          ></input>
                                         
                                          {errors.email !== '' && <div className="error">{errors.email}</div>}
                                      </label>

                                      <label class="field">
                                     <span class="field__label" for="password">Password</span>
                                          <input
                                           class="field__input"
                                              name="password"
                                              value={Customer.password}
                                              type="password"
                                              
                                             
                                              onChange={onChange}
                                          ></input>
                                         
                                          {errors.password !== '' && <div className="error">{errors.password}</div>}
                                      </label>
                                  

<div class="fields fields--3">
                                         <label class="field">
                                     <span class="field__label" for="phoneNumber">Phone Number</span>
                                          <input
                                           class="field__input"
                                              name="phoneNumber"
                                              value={Customer.phoneNumber}
                                              type="number"
                                              
                                              
                                              onChange={onChange}
                                          ></input>
                                         
                                      </label>
                                      <label class="field">
                                     <span class="field__label" for="userName">UserName</span>
                                          <input
                                            class="field__input"
                                              name="userName"
                                              value={Customer.userName}
                                              type="text"
                                              
                                             
                                              onChange={onChange}
                                          ></input>
                                         </label>

                                    

                                    
                                    
</div>

<div class="fields fields--3">
                                      <label class="field">
                                     <span class="field__label" for="city">City</span>
                                          <input
                                           class="field__input"
                                              name="city"
                                              value={Customer.city}
                                              type="text"
                                              
                                            
                                              onChange={onChange}
                                          ></input>
                                         
                                      </label>

                                      <label class="field">
                                     <span class="field__label" for="country">Country</span>
                                          <input
                                           class="field__input"
                                              name="country"
                                              value={Customer.country}
                                              type="text"
                                              
                                             
                                              onChange={onChange}
                                          ></input>
                                        
                                      </label>

                                      <label class="field">
                                     <span class="field__label" for="birthday">Birthday</span>
                                        <input
                                         class="field__input"
                                            name="birthday"
                                            value={Customer.birthday}
                                            type="datetime-local"
                                            
                                          
                                            onChange={onChange}
                                        ></input>
                                       
                                        </label>
                                        </div>
                                
                                      {/* <div class="form-outline mb-3"> */}

                                      {/* <input
name="confirmPassword"
value={Customer.confirmPassword}
type="password"

placeholder="Confirm Password"
onChange={onChange}
></input>
<label class="form-label" for="form3Example3">Confirm Password</label>
</div>

*/}

                                      <div class="text-center text-lg-start mt-4 pt-2">
                                          <button onClick={handleClick} type="button" class="button"
                                              style={{ paddingLeft: '2rem', paddingRight: '2.5rem' }}>Register</button>
                                      </div>
                                      <p class="small fw-bold mt-2 pt-1 mb-0">Have an account already? <a href="/login"
                                          class="link-danger">Login</a></p>


                                  </div>
                              </div>
                        
                <Footer /> </>
              
          )};
         
          
   </>
  );
};

export default Register;
