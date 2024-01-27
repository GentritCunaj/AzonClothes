import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";
import { useDispatch, useSelector, } from "react-redux";
import { PostProduct } from '../Redux/data/action';
import Navbar from "../Partials/Navbar"
import placeholderImage from "../assets/placeholder.png";
import Sidebar from '../Partials/Sidebar';


const CreateProduct = () => {
   
    const dispatch = useDispatch();  

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        oldPrice: 0,
        description: '',
        size:'',
        colorHexCode:'',
        imageFile:''
      });
      

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
          ...prevData,
          imageFile: file,
        }));
      };
      
      const navigate = useNavigate();
      const handleChange = (e) => {
       
          setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }));
        }
      
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            const newFormData = new FormData();
            newFormData.append('name', formData.name);
            newFormData.append('description', formData.description);
            newFormData.append('price', formData.price);
            newFormData.append('oldPrice', formData.oldPrice);
            newFormData.append('imageFile', formData.imageFile);
            newFormData.append('size',formData.size);
            newFormData.append('colorHexCode',formData.colorHexCode)
            newFormData.append('isAvailable',true);
            await dispatch(PostProduct(formData)).then((res) => 
            {
              console.log(res);
            navigate(`/editProduct/${res.data.data.productId}`)}
            );
           
            
        }
    
    return (
        <>
        <Navbar/>
        <Sidebar/>
         <main style={{marginTop: "58px"}}>
  <div class="container pt-4"></div>
         <div style={{marginLeft:"0",flex:"1",paddingTop:"0"}} class="shippingContainer">
         <form className='form' onSubmit={handleSubmit}>
      <label class="field">
      <span class="field__label" >Name</span>
        <input class="field__input" type="text" name="name" value={formData.name} onChange={(e) => handleChange(e)} />
      </label>

      <label class="field">
      <span class="field__label" >Price</span>
        <input class="field__input" type="number" name="price" value={formData.price} onChange={(e) => handleChange(e)} />
      </label>

      <label class="field">
      <span class="field__label" >Old Price</span>
        <input class="field__input" type="number" name="oldPrice" value={formData.oldPrice} onChange={(e) => handleChange(e)} />
      </label>

      <label class="field"> 
        <span class="field__label" >Size</span>
        <input
            class="field__input"
            type="text"
            name='size'
            value={formData.size}
            onChange={(e) => handleChange(e)}
        />
        </label>

        <label class="field">
        <span class="field__label" >HexCode Color</span>
        <input
            class="field__input"
            type="text"
            name='colorHexCode'
            value={formData.colorHexCode}
            onChange={(e) => handleChange(e)}
        />
        </label>

      <label class="field">
      <span class="field__label" >Description</span>
        <input class="field__input" type="text" name="description" value={formData.description} onChange={(e) => handleChange(e)} />
      </label>

      <label>
        Image:
        <input
          type="file"
          accept="image/*"
          name="imageFile"
          onChange={handleImageChange}
        />
      </label> 

      {/* Add more input fields for other product information as needed */}

      <button class="button" type="submit">Submit</button>
    </form></div></main>
        </>
    )
}
export default CreateProduct;