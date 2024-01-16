import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import Navbar from '../Partials/Navbar';
import Footer from '../Partials/Footer';
import banner1 from '../assets/banner-1.jpeg'
import banner2 from '../assets/banner-2.jpg'
import banner3 from "../assets/banner-3.jpg"
import banner5 from "../assets/banner-5.jpeg";
import banner6 from "../assets/banner-6.jpg";
import banner7 from "../assets/banner-7.jpeg";
import banner4 from "../assets/banner-4.JPG"
import AOS from 'aos';
import 'aos/dist/aos.css';


function Home () {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    AOS.init();
    console.log('Effect triggered. slideIndex:', slideIndex);
    showSlides(slideIndex);
  }, [slideIndex]);
  
  const plusSlides = (n) => {
    console.log('plusSlides called with', n);
    setSlideIndex((prevIndex) => prevIndex + n);
  };
  
  const minusSlides = (n) => {
    console.log('minusSlides called with', n);
    setSlideIndex((prevIndex) => prevIndex - n);
  };
  
  const currentSlide = (n) => {
    console.log('currentSlide called with', n);
    setSlideIndex(n);
  };
  
  const showSlides = useCallback(
    (n) => {
      var i;
      var slides = document.querySelectorAll(".mySlides.fade1");
  
      // Check if slides is undefined or empty
      if (!slides || slides.length === 0) {
        console.error("No slides found.");
        return;
      }
  
      // Ensure n is within valid range
      const newIndex = (n - 1) % slides.length + 1;

      // Hide all slides
      slides.forEach((slide) => {
        slide.style.display = "none";
      });
  
      // Display the current slide
      slides[newIndex - 1].style.display = "block";
    },
    [] // No dependencies needed here
  );
    return (
        <>
        <Navbar/>
        <body>

    <div>
      <div class="slideshow-container">
        <div class="mySlides fade1">
          <img
            id="slideImg"
            src={banner1}
          />
          <p id="sale">S A L E</p>
          <p id="saleTag">ONLINE</p>
        </div>

        <div class="mySlides fade1">
          <img
        
            id="slideImg"
src={banner2}
style={{ width: '100%', height: 'auto',marginLeft:"-100px" }}
/>
          <p id="sale">S A L E</p>
          <p id="saleTag">ONLINE</p>
        </div>

        <div class="mySlides fade1">
          <img
            id="slideImg"
            src={banner3}
          />
          <p id="sale">S A L E</p>
          <p id="saleTag">ONLINE</p>
        </div>

        <div class="mySlides fade1">
          <img
            id="slideImg"
            src={banner4}
            style={{ width: '100%', height: 'auto',marginLeft:"-120px" }}
          />
          <p id="sale">S A L E</p>
          <p id="saleTag">ONLINE</p>
        </div>

        <a class="prev" onClick={() => minusSlides(1)}>&#10094;</a>
        <a class="next" onClick={() => plusSlides(1)}>&#10095;</a>
      </div>
      <div class="position-relative row my-lg-7 pt-5 pt-lg-0 g-8">
                
                <div class="col-12 col-md-6 position-relative z-index-20 mb-7 mb-lg-0" data-aos="fade-right">
                  
                    <p class="text-muted title-small">Welcome</p>
                    <h3 class="display-3 fw-bold mb-5"><span class="text-outline-dark">AzonClothes</span> -clothes,bags and more.</h3>
                    <p class="lead">We are Azon,  where fashion meets craftsmanship! Step into a world of elegance and style as we bring you a curated collection of premium clothing and meticulously embroidered items.</p>
                    <p class="lead">Explore our collection and embrace the fusion of contemporary design and artisanal expertise. Where every piece tells a story of craftsmanship, quality, and style. Happy shopping!</p>
                    <a href="/products" class="btn btn-psuedo" role="button">Shop New Arrivals 2024</a>
                    
                    <h2 style={{fontSize:"300px",marginTop:"250px"}} class="bg-text-title opacity-10"><span class="text-outline-dark">Azon</span></h2>
                    <h2 style={{fontSize:"300px",marginTop:"-220px",marginLeft:"100px",}} class="bg-text-title opacity-10"><span style={{color:"black"}} class="text-outline-dark">Clothes</span></h2>
               
                </div>
                <div class="col-12 col-md-6 position-relative z-index-20 pe-0" data-aos="fade-left">
                    <picture class="w-50 d-block position-relative z-index-10 border border-white border-4 shadow-lg">
                        <img class="img-fluid" src={banner5} alt="HTML Bootstrap Template by Pixel Rocket"/>
                    </picture>
                    <picture class="w-60 d-block me-8 mt-n10 shadow-lg border border-white border-4 position-relative z-index-20 ms-auto">
                        <img class="img-fluid" src={banner6} alt="HTML Bootstrap Template by Pixel Rocket"/>
                    </picture>
                    <picture class="w-50 d-block me-8 mt-n7 shadow-lg border border-white border-4 position-absolute top-0 end-0 z-index-0 ">
                        <img class="img-fluid" src={banner7} alt="HTML Bootstrap Template by Pixel Rocket"/>
                    </picture>
                    
                </div>
            </div>
      <p id="smallText">INTRODUCING THE NEW COLLECTION</p>
    
    </div>
   
  </body>
  <Footer/>
        </>
    )
}
export default Home;