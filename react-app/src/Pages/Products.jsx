import React from "react";
import '../Pages/CSS/cart.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { GetProducts } from "../Redux/data/action";
import Navbar from "../Partials/Navbar";
import Footer from "../Partials/Footer";
import placeholderImage from '../assets/placeholder.png'
import { filterProducts,refresh } from "../Redux/data/action";
// 3 filtera: names, color, size
//  names jan te subcategories navbar, price veq esht, color edhe size duhet mu shtu


const Products = () => {
    const { data } = useSelector((store) => store);
    // const {auth} = useSelector((store ) => store);
    // const { filteredProducts,products,subcFiltered,subcKeyWord } = data;
    const {filteredProducts,loading} = data;
    const {products} = data;
    // const {isAuthenticated} = auth;
    const dispatch = useDispatch();

    // const handleCheckout = (product) => {
    //   dispatch(AddToWishlist({productId:product.productId,count:1}))
     
    // };


    const [searchKeyword, setSearchKeyword] = useState('');
    const handleSearch = (e) => {
      const keyword = e.target.value;

      console.log("Search keyword:", keyword);
      
      setSearchKeyword(keyword);
      dispatch(filterProducts(keyword));
     
      
  };


    useEffect(()=> {dispatch(GetProducts()).then(res => console.log(res,"okay"))},[]);

    const cartButtons = document.querySelectorAll('.cart-button');

    cartButtons.forEach(button => {
      button.addEventListener('click', cartClick);
    });

    function cartClick() {
      let button = this;
      button.classList.add('clicked');
    }

    // const handleBackToListClick = (event) => {
     
    //   event.preventDefault();
    //   dispatch(refresh());
  
      
    // };

    let combinedProducts;
    const displayProducts = () => {
      if (filteredProducts != null &&  filteredProducts.length > 0 && searchKeyword.length > 0) {
        // Display products based on searching only
        combinedProducts = filteredProducts;
      }
      else {
        // Display all products if no filters are applied
        combinedProducts = products;
      }
      return combinedProducts;
    }


    const getProductImage = (productName) => {
        try {
            return require(`../${productName}`);
        } catch (err) {
            return placeholderImage;
        }

    };

    const handleBackToListClick = (event) => {
      // Dispatch the initialDataLoad action
      event.preventDefault();
      dispatch(refresh());
  
      // Add other logic or navigation as needed
    };


    const [priceSort, setPriceSort] = useState(null);

    const handleSortChange = (sortOption) => {
        setPriceSort(sortOption);
    };

    const sortByPrice = () => {
      displayProducts();
      
        if (priceSort === "sort_high") {
            const sortedProducts = products.sort((a, b) => b.price - a.price);
            combinedProducts = sortedProducts;
            return combinedProducts;
        } else if (priceSort === "sort_low") {
            const sortedProducts = products.sort((a, b) => a.price - b.price);
            combinedProducts = sortedProducts;
            return combinedProducts;
        }

        return combinedProducts
        
    };
    // console.log(sortByPrice());

  

  
    return (
        <>
        
      
        <Navbar/>
                  
        {loading  ? (
              <div className="loader-container">
                  <div className="spinner"></div>
              </div>
          ) : (
            <>
        <body class="sub_page" style={{zIndex:0}}>
  <section class="product_section layout_padding">
    <div class="container" style={{maxWidth:"1320px"}}>
    <form class="search_form">
                          <input type="text" class="form-control" value={searchKeyword}
                              onChange={handleSearch} placeholder="Search Product"></input>
                               <i style={{marginTop:"10px",marginLeft:"5px"}} class="fa fa-search" aria-hidden="true"></i>

                               <p style={{marginLeft:"50px"}}> Sort by Price:</p>
                        <select
                            id="sortDropdown"
                            value={priceSort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            style={{
                                marginLeft: '5px',
                                width:'110px',
                                padding: '5px', // Add your styles here
                                borderRadius: '5px',
                                // Add more styles as needed
                            }}
                        >
                            <option value="">Select</option>
                            <option value="sort_low">Low to High</option>
                            <option value="sort_high">High to Low</option>
                        </select> 
                           
                               <a style={{ marginLeft: "auto", position: "relative" }} onClick={handleBackToListClick} href="/products"><i class="fa fa-arrow-left"></i><span>Back To Full List</span></a>
                               
                        </form>
                       

      <div style={{marginTop:"50px"}} class="heading_container heading_center">
        <h2>
          Our Products
        </h2>
      </div>
                        <div class="row">
                        {sortByPrice() != null && sortByPrice().map((el) => {
            return (
              
  
        <div class="col-sm-6 col-lg-4">
          <div class="box">
            <div class="img-box">
            
            <img src={getProductImage(el.picturePath)} alt={el.Name} />
         
              <a href="" class="add_cart_btn">
              <a href={`/ProductDetails/${el.productId}`}>
                <span>
                  Go to Product Details
                </span>
                </a>
              </a>
            </div>
          

    {/* {isAuthenticated ?   
    <button onClick={() => handleCheckout(el)} class="cart-button">
      <span class="add-to-cart">Add to cart</span>
            <span class="added">Added</span>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <i class="fas fa-box"></i>
          
          </button>
  :  <a href="/login" ><button class="cart-button"><span class="add-to-cart">Add to cart</span></button></a> } */}
           
            
        
            <div class="detail-box">
              <h5 style={{fontSize:"2em"}}>
                {el.name}
                {el.colorVariants.map((cv,index)=>{
               
               return <button key={index} style={{background:cv.hexCode }} className="btnStyle">
                
               </button>
             })}
              </h5>
              
            
              <div class="product_info">
              <div class="price"><span style={{paddingRight:"25px"}}>{el.price} € </span></div>
             
              {el.discount > 0 &&
              <div class="discount"><span style={{paddingRight:"25px"}}> -{el.discount}%</span></div>}
                <div class="star_container">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          
          </div>
        </div>
  

            )})
        }
  </div>
</div>
</section>
</body></>)}
<Footer/>
        </>
    );
};

export default Products;
