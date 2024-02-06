import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Partials/Navbar";
import Footer from "../Partials/Footer";
import '../Pages/CSS/payment.css'
;
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#fff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#fff" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const { data } = useSelector((store) => store);
    const {auth} = useSelector((store)=>store);
    const { selectedProducts,guid } = data;
    const {isAuthenticated,token} = auth;
    const [success, setSuccess ] = useState(false);
    const [totalUnitPrices, setTotalUnitPrices] = useState(0);
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate();
    useEffect(() => {
        // Call calculateTotalUnitPrices when selectedProducts changes
        const newTotal = calculateTotalUnitPrices();
        setTotalUnitPrices(newTotal);
        console.log(guid,"guid");
      }, [selectedProducts]);
    
      const calculateTotalUnitPrices = () => {
        if (!selectedProducts || !selectedProducts.items || selectedProducts.items.length === 0) {
          return 0;
        }
    
        const subtotals = selectedProducts.items.map(item => item.product.price * item.count);
        const total = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);
        return total;
      };
      
    const handleDelivery = async () => {
    
      try {
         
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Payments`,
        {
            amount:totalUnitPrices,
            guid:guid
          
        },{

            headers: {
                Authorization: "Bearer " + token
            },
        }
        ).then((res)=>{
          navigate("/thankYou");
        })
      }
      catch (err){
        console.log(err);
      }
    } 

    const handleSubmit = async (e) => {
      e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
       
        try {
           
            const {id} = paymentMethod;
            
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Payments`,
            {
                amount:totalUnitPrices,
                currency:"EUR",
                paymentMethodId:id,
                guid:guid
            },{

                headers: {
                    Authorization: "Bearer " + token
                },
            }
            )

            const {clientSecret,success} = response.data;
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                  card: elements.getElement(CardElement)
                 
                },
              });
              if (success) {
                navigate("/thankYou");
             }
               


        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
         <Navbar/>
        <main style={{paddingLeft:"0px"}} class="page payment-page">
        <div style={{marginLeft:"180px"}} class="wrapper">
         <div class="margin-area">
            <div class="dot one">1</div>
            <div class="dot two">2</div>
            <div class="dot three">3</div>
          
          
            <div class="progress-bar1"></div>
              <div class="progress-bar1 second"></div>
           
            <div class="message message-1">
            Wishlist
            </div>
            <div class="message message-2">Shipping Details</div>
            <div class="message message-3">Payment</div>
           
        </div>
     </div>  
     <section class="payment-form dark">
      <div id="paymentContainer" class="container">
        <div class="block-heading">
          <h2>Confirm order and pay</h2>
          <p>Complete your purchase by providing payment details</p>
        </div>
       
          <div class="products">
            <h3 class="title">Checkout</h3>
            {selectedProducts != null && selectedProducts.items.map((el) => {
                return (
        <>
           <div class="item">
            {el.count > 1 && (
              <h5  style={{display:"flex",flexDirection:"row-reverse"}}>{el.count} &nbsp; X</h5> 
            )}

              <span class="price">${el.product.price}</span>
             
              <p class="item-name">{el.product.name} &nbsp;&nbsp;&nbsp; {el.product.colorVariants[0].stockOptions[0].size}</p>
     
            </div>
           
                  
        </>
         )})
        }
         <div class="total">Total<span class="price">${totalUnitPrices}</span></div>
            </div>
    
        <form onSubmit={handleSubmit} style={{marginTop:"20px",paddingBottom:"20px"}} >
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
          
            <button style={{width:"50%",marginLeft:"25%"}} className="button">Pay</button>
           
          
        </form>
        <a onClick={()=> handleDelivery()} style={{"fontSize":"20px","float":"inline-end","position":"relative","left":"auto","top":"30px","cursor":"pointer","textDecoration":"underline !important"}} >Or Pay On Delivery?</a>
     
        
        </div>
            </section>
            </main>
            <Footer/>
        </>
    )
}