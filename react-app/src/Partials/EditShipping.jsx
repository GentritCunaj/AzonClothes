import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Pages/CSS/shipping.css"
import { AddShippingDetails,GetShippingDetails } from "../Redux/data/action";
const EditShipping = () => {

    const dispatch = useDispatch();
    const {shippingDetails,loading} = useSelector((store) => store.data);
    useEffect(()=> {dispatch(GetShippingDetails()).then(res => console.log(res,"okay"))},[]);

    const [formData,setFormData] = useState({
      address:'',
      city:'',
      mobile:'',
      postCode:''
    })

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    useEffect(() => {
      // Update the form data when shippingDetails changes
     
      if (shippingDetails) {
        setFormData({
          address: shippingDetails.address,
          city: shippingDetails.city,
         mobile:shippingDetails.mobile,
         postCode:shippingDetails.postCode,
         info:shippingDetails.info,
         country:shippingDetails.country
          // ... update other form fields
        });
      }
    }, [shippingDetails]);

    return (
        <>
          <hr />
  {loading ? (
              <div className="loader-container">
                  <div className="spinner"></div>
              </div>
          ) : (
  <div class="form">
    
    <h3>Shipping Details</h3>
  <label class="field">
    <span class="field__label" for="address">Address</span>
    <input class="field__input" type="text" name="address" onChange={handleInputChange} value={formData.address}/>
  </label>
  <label class="field">
    <span class="field__label" for="mobile">Mobile Phone</span>
    <input class="field__input" type="number" name="mobile" onChange={handleInputChange} value={formData.mobile} />
  </label>
  <div class="fields fields--3">
    <label class="field">
      <span class="field__label" for="postCode">Post code</span>
      <input class="field__input" type="text" name="postCode" onChange={handleInputChange}  value={formData.postCode} />
    </label>
    <label class="field">
      <span class="field__label" for="city">City</span>
      <input class="field__input" type="text" name="city" onChange={handleInputChange} value={formData.city}/>
    </label>
    <label class="field">
      <span class="field__label" for="city">Country</span>
      <input class="field__input" type="text" name="country" onChange={handleInputChange} value={formData.country}/>
    </label>
    <label class="field">
      <span class="field__label" for="info">Additional Info</span>
      <input class="field__input" type="text" name="info" onChange={handleInputChange} value={formData.info}/>
    </label>
   
   
  </div>
  <button   onClick={() => {dispatch(AddShippingDetails(formData));  }} class="button">Update</button>      
  </div>

  )}
   </>
    )


}
export default EditShipping ;