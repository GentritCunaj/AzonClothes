import {React,useMemo} from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useState,useEffect,useRef } from "react";
import './CSS/details.css';
import '../Pages/CSS/cart.css'
import parse from 'html-react-parser';
import { AddToWishlist } from '../Redux/data/action';
import { useDispatch, useSelector, } from "react-redux";
import { GetSingleProduct,PostImage, PostProduct,clearDesign } from '../Redux/data/action';
import placeholderImage from "../assets/placeholder.png";
import Navbar from '../Partials/Navbar';
import Footer from '../Partials/Footer';
import { jwtDecode } from "jwt-decode";
import * as types from '../Redux/data/types';
import axios from 'axios';
import useDragger from '../hooks/Draggable';
import {
  
  faArrowDown,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'

// import ReviewForm from './ReviewForm';

const ProductDetails = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const { image,product,guid} = useSelector((store) => store.data);
  const {isAuthenticated} = useSelector((store)=> store.auth);
  const [email,setEmail] = useState(null);
  const initialColorVariant = null;
  const [selectedColor, setSelectedColor] = useState( '');
  const [colorVariant, setColorVariant] = useState(initialColorVariant);
  const [progressbar,setProgressBar] = useState(0);
  const [boolProgress,setBoolProgress] = useState(false);
  const [size,setSize] = useState('');
  const [stock,setStock] = useState(null);

  useDragger('outputsvg');
  const cartButtons = document.querySelectorAll('.cart-button');

  cartButtons.forEach(button => {
    button.addEventListener('click', cartClick);
  });

  function cartClick() {
    let button = this;
    button.classList.add('clicked');
  }

  const getProductImage = useMemo(() => {
    const selectedColorVariant = product && product.colorVariants && product.colorVariants.find((cv) => cv.hexCode === selectedColor);
    try {
      return selectedColorVariant ? `https://storage.googleapis.com/azondesigns/hoodies/${colorVariant.picturePath}`: `https://storage.googleapis.com/azondesigns/hoodies/${product.picturePath}`;
    } catch (err) {
      return placeholderImage;
    }
  }, [product, selectedColor, colorVariant]);


  const [formValues, setFormValues] = useState({
    name: '',
    size: '',
    price: '',
    notes: '',
    stockQuantity:null,
    oldPrice:'',
    isAvailable:false,
    vector:'',
    description: '',
    picturePath:'',
    designFile:null,
    colorHexCode:''
    
  });

  useEffect(() => {
    // Assuming you have the token stored in localStorage
    const token = localStorage.getItem("azontoken");
    if (token) {
      try {
        // Decode the token to get user information
        const decodedToken = jwtDecode(token);

        // Extract name and lastname from the decoded token
       
       const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
       setEmail(email);

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    let truncated = "customer";
    if (email != null){
       truncated = email.slice(0, -4);
    }
   
    const renamedFile = new File([selectedFile],`${truncated}_${selectedFile.name}` , { type: selectedFile.type });

    setFormValues({
      ...formValues,
      designFile: renamedFile,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const tableStyles = {
    tbody: {
      td: {
        cursor: 'pointer',
      },
      'td:hover': {
        backgroundColor: 'lightgrey',
      },
      'td.selected': {
        backgroundColor: 'grey',
        color: 'white',
      },
    },
  };
  

  const handleSize = (size,stock) => {
    setSize(size);
    setStock(stock)
  
  }

  const handleClearDesign = () => {
    dispatch(clearDesign());
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', formValues.designFile);
  
      dispatch({ type: types.GET_IMAGE_REQUEST });
      try {
        setBoolProgress(true);
       
        let res = await axios.post(`${process.env.REACT_APP_VM_URL}/Home`,formData,{
          onUploadProgress:async (event) => {
            for (let progress = 10; progress <= 100; progress += 2) {
              setProgressBar(progress);
              await new Promise(resolve => setTimeout(resolve, 600)); // Simulating delay
            }
          }
        })
       
        dispatch(PostImage(res));
        
        setBoolProgress(false);
          
      }
      catch(err){
       
      }
          
    
    }

  const handleColorClick = (cv) => {
   
    setSelectedColor(cv.hexCode);
    setColorVariant(cv);
  };




    useEffect(() => {
      dispatch(GetSingleProduct(id));
    
    
      if (!selectedColor && product && product.colorVariants &&  product.colorVariants.length > 0) {
        // If no color is selected, select the first color variant
        const firstColorVariant = product.colorVariants[0];
        setSelectedColor(firstColorVariant.hexCode);
        setColorVariant(firstColorVariant);
    
        // Assuming you want to set initial size and stock as well
        const initialSize =
          firstColorVariant.stockOptions.length > 0
            ? firstColorVariant.stockOptions[0].size
            : '';
        const initialStock =
          firstColorVariant.stockOptions.length > 0
            ? firstColorVariant.stockOptions[0].stockQuantity
            : null;
    
        setSize(initialSize);
        setStock(initialStock);
      }
    }, [id]);
   

        // Assuming reviewsRating is an array of ratings
        // const averageRating = reviewsrating != null && reviewsrating.length > 0
        //     ? Math.round(reviewsrating.reduce((acc, rating) => acc + rating, 0) / reviewsrating.length)
        //     : 0;

  const bodyStyle = {
    backgroundImage: 'linear-gradient(to right bottom, rgb(251, 251, 252), rgb(212, 212, 212), #a9a8aa,  rgb(251, 251, 252))',
    height: '100%',
    margin: '0',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    };
    // const [reviewSubmitted, setReviewSubmitted] = useState(false);
    // const handleReviewSubmitSuccess = () => {
    //     setReviewSubmitted(true);
        
    // };

    const submitForm = async () => {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('size', size);
      formData.append('price', product.price);
      formData.append('oldPrice', product.oldPrice);
      formData.append('notes', formValues.notes);
      formData.append('description', product.description);
      formData.append('designFile', formValues.designFile);
      formData.append('vector',image);
      formData.append('picturePath',colorVariant.picturePath ? colorVariant.picturePath: '');
      formData.append('stockQuantity',stock);
      formData.append('colorHexCode',selectedColor);

     const newProduct = await dispatch(PostProduct(formData));
     dispatch(AddToWishlist({ productId: newProduct.productId, count: 1,originalProductId:id, guid:guid}));
   
    }

  return (
    <>
    {/* {product != null && (
<div>
   
    <img src={getProductImage(product.picturePath)} alt={product.name} class="product-image" />
  <div class="product-name"> <span> {product.name} </span></div>
  <div class="product-category"><span> Category: {product.category.name} </span></div>
  <div class="product-category"><span> SubCategory: {product.subCategory.name} </span></div>
  <div class="price"><span>{product.unitPrice} € </span></div>
              {product.oldPrice != product.unitPrice &&
              <div class="old-price"><span>{product.oldPrice} €</span></div>}
              {product.discount > 0 &&
              <div class="discount"><span> -{product.discount} %</span></div>}
  <div class="product-discount"></div>
  </div>
    )
       
    } */}
    <Navbar/>
    <body style={bodyStyle}>
  <main>
     {product != null && (

                  
    <div class="card">
      <div class="card__title">
        
      <i class="fa fa-star" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;&nbsp;<h3>New product</h3>
      </div>
      <div class="card__body">
        <div class="half">
          <div class="featured_text">
            <h1>Azon</h1>
            <p class="sub">{product.name}</p>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
              <h2>{product.price} €</h2>
              <div>
              <p>Clear Design &nbsp;&nbsp;</p>
      <button style={{border:"3px solid red"}} type="button" onClick={handleClearDesign} class="btn-close" aria-label="Close"></button>
      </div> </div>
          </div>
          <div id="productImage" class="image" style={{position:"relative"}}>
  <img src={getProductImage} alt={product.name} class="product-image" />
  
  {image != null && (

    <svg id="outputsvg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 21000 12000" >
      {parse(image)}
      <g id="corner">
    {/* <rect width="750" height="750" fill="blue">
    </rect> */}
     <foreignObject x="50%" y="30%" width="750" height="750">

            <FontAwesomeIcon icon={faArrowDown} size="xl" style={{fontSize:"750px"}}/>
   
        </foreignObject>
  
  </g>
    </svg>

  )}
</div>
        </div>
        <div id="rightHalf" class="half">

          <div class="description">
          <p>{product.description}</p>
    
         
          </div>
          <div style={{display:"flex",flexDirection:"row",width:"fit-content"}}>
          <h4 style={{position:"relative",top:"5px"}}>Colors :</h4>
          <div style={{marginTop:"5px"}}>
          {product.colorVariants.map((cv,index)=>{
               
               return (<>
                
               <button key={index}  onClick={() => handleColorClick(cv)} style={{background:cv.hexCode }} className={cv.hexCode == selectedColor ?"btnStyle active":"btnStyle" }>
                {cv.hexCode == selectedColor? <FontAwesomeIcon icon={faCheck} /> :null}
               </button></>)
               })}
               </div>
               </div>
          {/* <span class="stock"><i class="fa fa-pen"></i> In stock: {product.inStock} </span> */}
          {/* <div class="reviews">
          Average Rating:
            <ul class="stars">
                <label style={{marginLeft:"-35px"} } >
               
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            style={{ display: "inline-flex", fontSize:"30px",}}
                            key={star}
                            className={`star ${averageRating >= star ? 'filled' : ''}`}
                            
                        >
                            &#9733;
                        </span>
                    ))}
                </label>                  
            </ul>
               <span>{reviewsrating.length} Reviews</span>
               <ReviewForm productId={id} onSubmit={handleReviewSubmitSuccess} />
               {reviewSubmitted && <div style={{ color: 'green' }}>Review submitted successfully!</div>}
          </div> */}
         

          
        <table id="sizes" class="table"> {colorVariant != null && (
  <thead>
    <tr>
     
      <th style={{paddingRight:"10px"}} scope="col">Sizes</th>
     
      
    </tr>
  </thead>
  )}
  <tbody style={{"display":"flex","flexDirection":"row","justifyContent":"space-evenly"}}>
    {colorVariant != null && colorVariant.stockOptions.map((el,index) => {
      return (  
    <tr>
   
      <td  style={{
                  ...tableStyles.tbody.td,
                  
                  ...(el.size === size ? tableStyles.tbody['td.selected'] : {}),
                }}  className={el.size === size ? 'selected' : ''} onClick={() => handleSize(el.size,el.stockQuantity)} >{el.size}</td>
     
     
    </tr>
      )
    })}
    
  </tbody>
</table>



      <div id="final" style={{marginTop:"80px"}}>
        <h4>Final notes:</h4>
      <textarea 
      class="textArea"
        rows="3"
        cols="40"
        placeholder="Changes to be made about your product here..."
       
        name="notes" value={formValues.notes} onChange={handleInputChange} 
       
      ></textarea>
      <br />
      
    </div>

     <div id="chooseFile" style={{marginTop:"100px"}}>
      
      
      <div class="input-group mb-3">
  <input type="file" class="form-control" onChange={handleImageChange} id="inputGroupFile02"/>
  <button type='button' class="input-group-text" onClick={handleUpload} for="inputGroupFile02">Upload</button>
 {boolProgress && (
   <div className='progressbar'>
    <div className='progress-bar' role="progressbar" 
    aria-label='progressbar' aria-valuenow={progressbar} aria-valuemin="0" aria-valuemax="100" style={{width:`${progressbar}%`,marginTop:"20px",left:0}}>

    </div>
   
  </div>
  
 )}

</div>
<p id="mockup" style={{fontSize:"1.1rem",position:"relative",left:"60px"}}>This is only a mockup not the final design ! You can move,resize and place the design freely.</p>
      
     </div>
        </div>
      </div>
      

      <div class="card__footer">
    
    <button onClick={() => submitForm()} class="cart-button">
      <span class="add-to-cart">Add to cart</span>
            <span class="added">Added</span>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <i class="fas fa-box"></i>
          
          </button>

          <div class="icon">

          <a style={{marginRight:"50px"}} href="/products"><i class="fa fa-arrow-left"></i><span>Back Home</span></a>
   
        </div>
        </div>
       
       
    </div>
                  )}
    </main>
</body>
<Footer/>
    </>
  );
};

export default ProductDetails;