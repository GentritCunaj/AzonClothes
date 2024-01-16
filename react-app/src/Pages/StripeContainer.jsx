import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
const PUBLIC_KEY = "pk_test_51OTQCVIVNMR3Ah04kgPtGMdVbNGDRmn58MuyM9IsN3VrhIvOsusLrqSoyE9hi0iRqLvdrWRb4KAy618O3OJHd5a1003o6qjhj0";
const stripeTestPromise = loadStripe(PUBLIC_KEY)


export default function StripeContainer(){
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    )
}