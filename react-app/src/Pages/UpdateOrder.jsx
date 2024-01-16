import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from '../Partials/Sidebar';
import { useParams } from 'react-router-dom';
import { GetOrderDetailsById } from "../Redux/data/action";
import { UpdateOrderStatus } from "../Redux/data/action";
import { useState } from "react";
import Navbar from "../Partials/Navbar";
const UpdateOrder = () => {

    const dispatch = useDispatch();  
    const { id } = useParams();
    const {loading} = useSelector((store) => store.data);

    
    const [formData, setFormData] = useState({
        orderId:'',
        orderStatusName:'',
        deliveredDate:'',
        shippedDate:''
      });

      const handleChange = (e) => {
       
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      }


      
  const handleSelect = (e) => {
    setFormData((prevData => ({
      ...prevData,
      orderStatusName : e.target.value
    })));
  };


      
      useEffect(()=>{
        dispatch(GetOrderDetailsById(id)).then((res)=>{
          if (res){
            const {orderStatusName,deliveredDate,shippedDate,orderId} = res.data;
            
            setFormData({
              orderStatusName,
              deliveredDate,
              shippedDate,
             orderId
            });
          }
        })

      },[dispatch])


    return (
        <>
         <Navbar/>
     <Sidebar/>
     {loading  ? (
              <div className="loader-container">
                  <div className="spinner"></div>
              </div>
          ) : (
            <>
        <main style={{marginTop: "58px"}}>
  <div class="container pt-4">
  <div style={{marginLeft:"0",flex:"1",paddingTop:"0"}} class="shippingContainer">
          <h1>Edit Product</h1>
         <form className='form' >

       
    <select class="form-select form-select-sm" aria-label=".form-select-sm example" value={formData.orderStatusName} onChange={handleSelect} >
      
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>

      <label class="field">
      <span class="field__label">ShippedDate</span>
        <input class="field__input"  type="datetime-local" name="shippedDate" value={formData.shippedDate} onChange={(e) => handleChange(e)} />
                                            
      </label>

      <label class="field">
      <span class="field__label">DeliveredDate</span>
        <input class="field__input"  type="datetime-local" name="deliveredDate" value={formData.deliveredDate} onChange={(e) => handleChange(e)} />
                                            
      </label>

      <button   onClick={() => {dispatch(UpdateOrderStatus(formData)).then((res)=>console.log(res))}} class="button">Update</button>     
            </form>
        </div>
 </div>
 </main> </>)}
        </>
    )

}
export default UpdateOrder;