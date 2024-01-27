import './CSS/Login.css';

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../Redux/auth/action";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Footer from '../Partials/Footer';
import Navbar from '../Partials/Navbar';
const notify = (text) => toast(text);

function CLogin() {

  const [form, setForm] = useState({ email: "", password: ""});

   const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
  const dispatch = useDispatch();
  const onChange = (e) => {
  
    setForm({ ...form, [e.target.name]: e.target.value });
 
  };


  const navigate = useNavigate();
  const handleClick = (e) => {
    try {
      
      
      dispatch(Login(form.email,form.password)).then((res) => {
        if (res.message == "No user found"){
            navigate("/login")
            notify(res.message);
        }
   
          if (res.message == "Admin Logged in") {
              navigate("/dashboard");
              notify("Login Successful.");
         
          }
          if (res.message == "Customer Logged in") {
            navigate("/");
            notify("Login Successful.");
       
        }
          else if (res.message == "Not Logged in") {
              return notify("Wrong credentials, Please try again.");

          }
      });

      
    } catch (error) {
      
      return notify("Error occurred, unable to Login.");
    }

    
  };
  return (
      <>

          <ToastContainer />
          <Navbar />
          
          
          {loading ? (
              <div className="loader-container">
                  <div className="spinner"></div>
              </div>
          ) : (

              <><section id="loginSection" class="vh-100">

                      <div  class="container-fluid h-custom">
                          <div id="loginContainer" class="row d-flex justify-content-center align-items-center h-100">
                              <div id="imageContainer" style={{position:"relative",left:"200px"}} class="col-md-9 col-lg-6 col-xl-5">
                                  <img id="loginImage" src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
                                      class="img-fluid" alt="Sample image" />
                              </div>
                              <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                  <form>
                                      <h3>Login</h3>

                                      <div class="form-outline mb-4">

                                          <input
                                              name="email"
                                              value={form.email}
                                              type="text"
                                              className="form-control form-control-lg"
                                              placeholder="Email"
                                              onChange={onChange}
                                          ></input>
                                          <label class="form-label" for="form3Example3">Email address</label>
                                      </div>

                                      <div class="form-outline mb-3">

                                          <input
                                              name="password"
                                              value={form.password}
                                              type="password"
                                              className="form-control form-control-lg"
                                              placeholder="Password"
                                              onChange={onChange}
                                          ></input>
                                      </div>

                                      <div class="d-flex justify-content-between align-items-center">

                                          <div class="form-check mb-0">
                                              <input class="form-check-input me-2" name="checked" type="checkbox"  id="form2Example3" />
                                              <label class="form-check-label" for="form2Example3">
                                                  Remember me
                                              </label>
                                          </div>
                                          <a href="#!" class="text-body">Forgot password?</a>
                                      </div>

                                      <div onClick={handleClick} class="text-center text-lg-start mt-4 pt-2">
                                          <Link type="button" style={{background:"black",border:"black",paddingLeft: '2rem', paddingRight: '2.5rem'}} class="btn btn-primary btn-lg"
                                             >Login</Link>
                                          <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                                              class="link-danger">Register</a></p>
                                      </div>

                                  </form>
                              </div>
                          </div>
                      </div>

                  </section><Footer /></>
          )

          }
          
    </>
  );
}

export default CLogin;
