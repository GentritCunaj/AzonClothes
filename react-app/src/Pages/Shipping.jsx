import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect,useState,useRef } from "react";
import "../Pages/CSS/shipping.css"
import Navbar from "../Partials/Navbar";
import Footer from "../Partials/Footer";
import { AddShippingDetails,GetShippingDetails } from "../Redux/data/action";
import {MapContainer,Marker,Popup,TileLayer} from 'react-leaflet'
import providers from './providers';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerpng from '../assets/markerpng.png'
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import useGeoLocation from "./useGeoLocation";
const Shipping = () => {

    const {user,guid} = useSelector((store)=>store.data);

    const mapRef = useRef();
    const [center,setCenter] = useState({ lat: 42.57, lng: 20.78 });
    const ZOOM_LEVEL = 9;

    const dispatch = useDispatch();
    const location = useGeoLocation()

    const markerIcon = new L.icon({
      iconUrl:iconMarker,
      iconSize:[35,45],
      iconAnchor:[17,46],
      popupAnchor:[0,-46]
    })

    const {shippingDetails} = useSelector((store) => store.data);
    useEffect(()=> {
      dispatch(GetShippingDetails({guid:guid})).then(res => console.log(res,"okay"))
    
    },[]);

    const [formData,setFormData] = useState({
      address:'',
      city:'',
      firstName:user ? user.firstName:'',
      lastName:user ? user.lastName:'',
      email:user ? user.email:'',
      mobile:  user ? user.mobile: '',
      postCode:'',
      info:'',
      country:'',
      guid:guid
    })
    

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    useEffect(() => {
     
      if (shippingDetails) {
        setFormData({
          address: shippingDetails.address,
          city: shippingDetails.city ,
         mobile:shippingDetails.mobile,
         postCode:shippingDetails.postCode ,
         info:shippingDetails.info,
         country:shippingDetails.country,
         guid:guid
          // ... update other form fields
        });
      }
    }, [shippingDetails]);

    function updateLocation() {
      if (location.loaded){
        console.log(location)
        setFormData({
          ...formData,

          city:location.city,
          postCode:location.zip,
          address:location.add,
          country:location.country
        })
      }
    }

    return (
        <>
       
    <Navbar/>
    <section id="checkoutSection" class="pt-5 pb-5">
        <div style={{marginLeft:"0",flex:"1"}} class="shippingContainer">
        <div class="wrapper">
          
         <div class="margin-area">
            <div class="dot one">1</div>
            <div class="dot two">2</div>
            <div class="dot three">3</div>
          
            <div class="progress-bar first"></div>
            <div class="progress-bar second"></div>
           
            <div class="message message-1">
            Wishlist
            </div>
            <div class="message message-2">Shipping Details</div>
            <div class="message message-3">Payment</div>
           
        </div>
     
     
     </div>  

  <h1>Shipping</h1>
  <p>Please enter your shipping details.</p>
  <hr />
  <div id="shippingForm" class="form">
  <div class="fields fields--2">
  <label class="field">
    <span class="field__label" for="firstName">First Name</span>
    <input class="field__input" type="text" name="firstName" onChange={handleInputChange} value={formData.firstName}/>
  </label>

     <label class="field">
    <span class="field__label" for="lastName">LastName</span>
    <input class="field__input" type="text" name="lastName" onChange={handleInputChange} value={formData.lastName}/>
  </label>
  </div>
  <div class="fields fields--2">
     <label class="field">
    <span class="field__label" for="email">Email</span>
    <input class="field__input" type="text" name="email" onChange={handleInputChange} value={formData.email}/>
  </label>

  <label class="field">
    <span class="field__label" for="mobile">Mobile Phone</span>
    <input class="field__input" type="number" name="mobile" onChange={handleInputChange} value={formData.mobile} />
  </label>
</div>
  
  <label class="field">
    <span class="field__label" for="address">Address</span>
    <input class="field__input" type="text" name="address" onChange={handleInputChange} value={formData.address}/>
  </label>
  <div class="fields fields--3">
    <label class="field">
      <span class="field__label" for="postCode">Post code</span>
      <input class="field__input" type="text" name="postCode" onChange={handleInputChange}  value={formData.postCode} />
    </label>
    <label class="field">
      <span class="field__label" for="country">Country</span>
      <input class="field__input" type="text" name="country" onChange={handleInputChange} value={formData.country}/>
    </label>
    <label class="field">
      <span class="field__label" for="city">City</span>
      <input class="field__input" type="text" name="city" onChange={handleInputChange} value={formData.city}/>
    </label>
    <label class="field">
      <span class="field__label" for="info">Additional Info</span>
      <input class="field__input" type="text" name="info" onChange={handleInputChange} value={formData.info}/>
    </label>
   
  </div>
  </div>
<a href="/payment">
  <button   onClick={() => {dispatch(AddShippingDetails(formData));  }} class="button">Continue</button>   </a>                   

</div>
<div style={{flex:"1",marginTop:"100px"}} class="mapContainer">

     <MapContainer id="mapContainer" center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
      <TileLayer url={providers.maptiler.url} attribution={providers.maptiler.attribution}/>
      
     {location.loaded && !location.error && (
      <Marker icon={markerIcon} position={[location.coordinates.lat,location.coordinates.lng]}>
        <Popup>
          <b>{location.add} </b>
        </Popup>

      </Marker>
     )}
     </MapContainer>
     <button  style={{marginTop:"2px"}} onClick={() => updateLocation()} class="button">Get Location</button>
     </div>

</section>
<Footer/>
        </>
    )
}

export default Shipping;