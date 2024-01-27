import React from "react";
import "../Pages/CSS/shipping.css"

import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { GetWishlist,DeleteWishlist,AddToWishlist } from "../Redux/data/action";
import Footer from '../Partials/Footer';
import Navbar from '../Partials/Navbar';
import parse from 'html-react-parser';
import placeholderImage from "../assets/placeholder.png";

const Checkout = () => {
    const { data } = useSelector((store) => store);
    const {auth} = useSelector((store)=>store);
    const { selectedProducts,loading,guid } = data;
    const {isAuthenticated} = auth;
    const dispatch = useDispatch();

    const [totalUnitPrices, setTotalUnitPrices] = useState(0);
    useEffect(()=> {dispatch(GetWishlist({guid:guid})).then(res => console.log(selectedProducts,"selected"))},[]);

    const [productQuantities, setProductQuantities] = useState({});

    useEffect(() => {
        // Call calculateTotalUnitPrices when selectedProducts changes
        const newTotal = calculateTotalUnitPrices();
        setTotalUnitPrices(newTotal);
      }, [selectedProducts]);

      const calculateTotalUnitPrices = () => {
        if (!selectedProducts || !selectedProducts.items || selectedProducts.items.length === 0) {
          return 0;
        }
    
        const subtotals = selectedProducts.items.map(item => item.product.price * item.count);
        const total = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);
        return total;
      };

    const changeP = (e, productId) => {
        const newCount = Math.max(1, parseInt(e.target.value, 10));
        setProductQuantities(prevQuantities => ({ ...prevQuantities, [productId]: newCount }));
        
    }
    
    const handleChange = (productId,count) => {
        
        dispatch(AddToWishlist({productId:productId,count:count,guid:guid}))
      
    }

    const handleDelete = (wishlistId) => {
        dispatch(DeleteWishlist({id:wishlistId,guid:guid}));
    }

    const getProductImage = (productName) => {
        try {
            return require(`../${productName}`);
        } catch (err) {
            return placeholderImage;
        }

    };


    return (
        <>
       <Navbar />
       {loading  ? (
              <div className="loader-container">
                  <div className="spinner"></div>
              </div>
          ) : (
            <>
        <section class="pt-5 pb-5">
  <div id="checkoutContainer" class="container" style={{maxWidth:"1100px"}}>
  <div style={{marginLeft:"200px"}} class="checkoutwrapper">
         <div class="margin-area">
            <div class="dot one">1</div>
            <div class="dot two">2</div>
            <div class="dot three">3</div>
          
          
            <div class="progress-bar"></div>
              <div class="progress-bar second"></div>
           
            <div class="message message-1">
            Wishlist
            </div>
            <div class="message message-2">Shipping Details</div>
            <div class="message message-3">Payment</div>
           
        </div>
     </div>  
    <div class="row w-100">
        <div class="col-lg-12 col-md-12 col-12">
            <h3 class="display-5 mb-2 text-center">Shopping Cart</h3>
            {selectedProducts != null && (
            <p class="mb-5 text-center">
               
                <i style={{fontSize:"1.5rem"}} class="text-info font-weight-bold">{selectedProducts.items.length} </i>&nbsp; items in your cart</p> )} 
            <table id="shoppingCart" class="table table-condensed table-responsive">
                

            {selectedProducts != null &&  selectedProducts.items != null && selectedProducts.items.map((el) => {
                return (
        <>
       
              <thead>
                    <tr>
                    
                        <th style={{width:"60%"}}>Product</th>
                       
                        <th style={{width:"12%"}}>Price</th>
                        <th style={{width:"10%"}}>Quantity</th>
                        <th style={{width:"16%"}}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td  data-th="Product">
                            <div class="row">
                                <div class="col-md-3 text-left">
                                <div class="image">
                                <img src={getProductImage(el.product.colorVariants[0].picturePath)} alt={el.product.name} style={{marginLeft:"-30px"}} class="product-image" />
                                { el.product.vector != null  && (
                                        <svg class="img-fluid" xmlns="http://www.w3.org/2000/svg" viewBox = {"0 0 10800 7200"} id="checkoutsvg"
                                         >
                                            {parse(el.product.vector)}
                                        </svg>
                                    

                                    )}
                                
                                </div>

                                </div>
                                <div style={{display:"flex",justifyContent:"space-around"}} class="col-md-9 text-left mt-sm-2">
                                    <h4>{el.product.name}</h4>
                                   
                                    <p id="sizeP" style={{fontSize:"1.5rem"}}>{el.product.colorVariants[0].stockOptions[0].size}</p>
                                    
                                </div>
                                
                            </div>
                        </td>
                        <td data-th="Price"><span style={{fontSize:"1.5rem",marginTop:"5px"}}>{el.product.price} € </span></td>
                        <td data-th="Quantity">
                
                        <input
                                                    type="number"
                                                   
                                                    class="form-control form-control-lg text-center"
                                                    value={productQuantities[el.product.productId] !== undefined ? productQuantities[el.product.productId] : el.count}
                                                    onChange={(e) => changeP(e, el.product.productId)}
                                                />
                        </td>
                        <td class="actions" data-th="">
                            <div class="text-right">
                                <button onClick={() => handleChange(el.product.productId, productQuantities[el.product.productId])} class="btn btn-white border-secondary bg-white btn-md mb-2">
                                <i class="fa fa-edit" ></i>
                                </button>

                                <button onClick={() => handleDelete(el.wishlistItemId)} class="btn btn-white border-secondary bg-white btn-md mb-2">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </td>
                      
                    </tr>
                    
                </tbody>
                </>
          )})
        }
            </table>
            <div style={{float:"inline-end"}} class="float-right ">
                <h4>Total:</h4>
                <h1>{totalUnitPrices}€</h1>
            </div>
        </div>
    </div>
    <div class="row mt-4 d-flex align-items-center">
        <div id="checkoutButton" class="col-sm-6 order-md-2 text-right">
            <a href="/Shipping" style={{width:"inherit"}} class="btn btn-dark btn-lg mb-4 ">Checkout</a>
        </div>
        <div class="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
        <a style={{marginRight:"50px"}} href="/products"><i class="fa fa-arrow-left"></i><span>Continue Shopping</span></a>
        </div>
    </div>
</div>
</section></>)}
<Footer/>
</>
    )
}

export default Checkout;