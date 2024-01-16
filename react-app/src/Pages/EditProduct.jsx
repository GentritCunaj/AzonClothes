import React from 'react';
import { useParams } from 'react-router-dom';
import { useState,useEffect,useRef,useMemo,useCallback } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { DeleteCV, EditProductById, GetSingleProduct,PostImage, PostProduct,clearDesign } from '../Redux/data/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faAdd } from '@fortawesome/free-solid-svg-icons';
import placeholderImage from "../assets/placeholder.png";
import Sidebar from '../Partials/Sidebar';

const EditProduct = () => {
     const { id } = useParams();
     const [isDataFetched, setIsDataFetched] = useState(false);    
     const dispatch = useDispatch();  
     const [formData, setFormData] = useState({
      name: '',
      price: 0,
      oldPrice: 0,
      description: '',
      colorVariants: [],
    });
  
    useEffect(() => {
      dispatch(GetSingleProduct(id)).then((res) => {
        // Check if the fetched product is defined and colorVariants is an array
     
        if (res && Array.isArray(res.colorVariants)) {
          const { name, price, oldPrice, description, colorVariants } = res;
          // Update formData after fetching product data
          setFormData({
            name,
            price,
            oldPrice,
            description,
            colorVariants: colorVariants.map((colorVariant) => ({
              ...colorVariant,
              stockOptions: Array.isArray(colorVariant.stockOptions)
                ? colorVariant.stockOptions.map((stockOption) => ({ ...stockOption }))
                : [],
            })),
          });
  
          // Trigger re-render to display images
          setRenderImage(true);
        }
      });
    }, [dispatch, id]);
 
    const {product,loading} = useSelector((store) => store.data);
    const [renderImage, setRenderImage] = useState(false);
    const getProductImage = (productName) => {
      try {
        // Use require only for static imports, not dynamic ones.
        // Use a regular import statement for dynamic file paths.
        const image = require(`../${productName}`);
        
        // Delay rendering by 2 seconds (adjust the time as needed)
        setTimeout(() => {
          // Set a state variable to trigger a re-render after the delay
          setRenderImage(true);
        }, 2000);
    
        // Render a placeholder initially
        return renderImage ? image : placeholderImage;
      } catch (err) {
        return placeholderImage;
      }
    };
   

   


  
      const addColorVariant = () => {
        setFormData((prevFormData) => {
          // Create a shallow copy of the formData object
          const updatedFormData = { ...prevFormData };
      
          // Create a new color variant with default values
          const newColorVariant = {
            productId: id,
            hexCode: '',
            picturePath: '',
            stockOptions: [{ size: '', stockQuantity: '' }],
          };
      
          // Update the colorVariants array with the new color variant
          updatedFormData.colorVariants = [...updatedFormData.colorVariants, newColorVariant];
      
          // Return the updated formData object
          return updatedFormData;
        });
      };

      const addStockOption = (colorVariantID, colorVariantIndex) => {
        setFormData((prevFormData) => {
          const updatedFormData = { ...prevFormData };
          const currentStockOptions = updatedFormData.colorVariants[colorVariantIndex].stockOptions;
      
          // Check if the last stock option is empty (indicating it's not filled yet)
          const lastStockOption = currentStockOptions[currentStockOptions.length - 1];
          if (lastStockOption && !lastStockOption.size && lastStockOption.stockQuantity === "") {
            // If the last stock option is empty, don't add a new one
            return updatedFormData;
          }
      
          // Add a new stock option
          const stockOption = {
            colorVariantId: colorVariantID,
            size: '',
            stockQuantity: '',
          };
          updatedFormData.colorVariants[colorVariantIndex].stockOptions = [
            ...currentStockOptions,
            stockOption,
          ];
      
          return updatedFormData;
        });
      };

      const handleDeleteColorVariant = useCallback(
  (colorVariantIndex) => {
    // Your logic for deleting the color variant from the state
    const updatedColorVariants = [...formData.colorVariants];
    const colorVariantToDelete = updatedColorVariants[colorVariantIndex];

    // Your logic for dispatching an action (e.g., API call to delete from the backend)
    if (colorVariantToDelete && colorVariantToDelete.stockOptions && colorVariantToDelete.stockOptions.length > 0) {
      const colorVariantIdToDelete = colorVariantToDelete.stockOptions[0].colorVariantId;

      // Dispatch the action to delete the color variant by ID
      dispatch(DeleteCV(colorVariantIdToDelete))
        .then((res) => {
          // Handle success response if needed
          console.log("DeleteCV Success:", res);

          // Update the state after the successful deletion
          setFormData((prevData) => {
            
            updatedColorVariants.splice(colorVariantIndex, 1);
      
            console.log("Updated Color Variants:", updatedColorVariants);
      
            return {
              ...prevData,
              colorVariants: updatedColorVariants,
            }
            })
        })
        .catch((error) => {
          // Handle error response if needed
          console.error("DeleteCV Error:", error);
        });
    } else {
      // Handle the case where stockOptions is undefined or empty
      console.error("Invalid colorVariant or stockOptions");
    }
  },
  [formData, setFormData, dispatch] // Add any dependencies here
);
      
      const handleImageChange = (e, colorVariantIndex) => {
        const file = e.target.files[0];
      
        setFormData((prevData) => {
          const updatedColorVariants = [...prevData.colorVariants];
          updatedColorVariants[colorVariantIndex].image = file;
      
          return {
            ...prevData,
            colorVariants: updatedColorVariants,
          };
        });
      };
      
      const handleSizeChange = (e, colorVariantIndex, stockOptionIndex) => {
        const { name, value } = e.target;
      
        if (stockOptionIndex !== undefined) {
          setFormData((prevData) => {
            const updatedColorVariants = [...prevData.colorVariants];
            // Assuming 'stockQuantity' is a property of 'stockOptions'
            updatedColorVariants[colorVariantIndex].stockOptions[stockOptionIndex].size = value;
           
            
      
            return {
              ...prevData,
              colorVariants: updatedColorVariants,
            };
          });
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };

      const handleColorChange = (e, colorVariantIndex, stockOptionIndex) => {
        const { name, value } = e.target;
       
        if (colorVariantIndex !== undefined) {
          setFormData((prevData) => {
            const updatedColorVariants = [...prevData.colorVariants];
            
            // Assuming 'stockQuantity' is a property of 'stockOptions'
            updatedColorVariants[colorVariantIndex].hexCode= value;
           
            
      
            return {
              ...prevData,
              colorVariants: updatedColorVariants,
            };
          });
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
    

      const handleStockChange = (e, colorVariantIndex, stockOptionIndex) => {
        const { name, value } = e.target;
      
        if (stockOptionIndex !== undefined) {
          setFormData((prevData) => {
            const updatedColorVariants = [...prevData.colorVariants];
            // Assuming 'stockQuantity' is a property of 'stockOptions'
            updatedColorVariants[colorVariantIndex].stockOptions[stockOptionIndex].stockQuantity = value;
           
            
      
            return {
              ...prevData,
              colorVariants: updatedColorVariants,
            };
          });
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
    
      
      const handleChange = (e) => {
       
          setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }));
        }
      
    
        const handleSubmit = (e) => {
            e.preventDefault();
            const newFormData = new FormData();
            newFormData.append('name', formData.name);
            newFormData.append('description', formData.description);
            newFormData.append('price', formData.price);
            newFormData.append('oldPrice', formData.oldPrice);
          
            formData.colorVariants.forEach((colorVariant, index) => {
              // Append basic colorVariant properties
              
              newFormData.append(`colorVariants[${index}].hexCode`, colorVariant.hexCode);
              newFormData.append(`colorVariants[${index}].picturePath`, colorVariant.picturePath);
              // Iterate over stockOptions and append their properties
              colorVariant.stockOptions.forEach((stockOption, stockOptionIndex) => {
                newFormData.append(`colorVariants[${index}].stockOptions[${stockOptionIndex}].stockQuantity`, stockOption.stockQuantity);
                newFormData.append(`colorVariants[${index}].stockOptions[${stockOptionIndex}].size`, stockOption.size);
              });
          
              // Append image if available
              if (colorVariant.image) {
                newFormData.append(`colorVariants[${index}].image`, colorVariant.image);
              }
            });
          
            // Pass the updated product data to the parent component
            dispatch(EditProductById(id, newFormData)).then( dispatch(GetSingleProduct(id)));
          };
    
  
    
    return (
        <>
        <Sidebar/>
  
        {loading  ? (
              <div className="loader-container">
                  <div className="spinner"></div>
              </div>
          ) : (
            <>
         <main style={{marginTop: "58px"}}>
  <div class="container pt-4"></div>
         <div style={{marginLeft:"0",flex:"1",paddingTop:"0"}} class="shippingContainer">
          <h1>Edit Product</h1>
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
      <span class="field__label" >Description</span>
        <input class="field__input" type="text" name="description" value={formData.description} onChange={(e) => handleChange(e)} />
      </label>

      {formData.colorVariants.map((colorVariant, colorVariantIndex) => (
        <div key={colorVariantIndex}>
            <div style={{display:"flex","flexDirection":"row"}}> 
          <label  class="field">
          <span class="field__label" >Hex Code</span>
            <input
             
              class="field__input"
              type="text"
              name={`colorVariants[${colorVariantIndex}].hexCode`}
              value={colorVariant.hexCode}
              onChange={(e) => handleColorChange(e, colorVariantIndex)}
            /> 
           
          </label>
         
          <a
        onClick={() => handleDeleteColorVariant(colorVariantIndex)}
        style={{ marginLeft: "10px", marginTop: "15px", cursor: "pointer" }}
      >
  <FontAwesomeIcon icon={faTrash} size='xl' />

  
</a><input style={{maxHeight:"50px"}} type="file" onChange={(e) => handleImageChange(e, colorVariantIndex)} />

<img style={{maxWidth:"148px",maxHeight:"148px"}} src={getProductImage(colorVariant.picturePath)} alt={colorVariant.picturePath}/>
</div>
         

          {colorVariant.stockOptions.map((stockOption, stockOptionIndex) => (
            <div key={stockOptionIndex}>
              <label>
              <span class="field__label" >Size</span>
                <input
                style={{border: "1px solid var(--color-lighter-gray)"}}
                  type="text"
                  name={`colorVariants[${colorVariantIndex}].stockOptions[${stockOptionIndex}].size`}
                  value={stockOption.size}
                  onChange={(e) => handleSizeChange(e, colorVariantIndex, stockOptionIndex)}
                />
              </label>

              <label>
              <span class="field__label" >Stock Quantity</span>
                <input
                 style={{border: "1px solid var(--color-lighter-gray)"}}
                  type="number"
                  name={`colorVariants[${colorVariantIndex}].stockOptions[${stockOptionIndex}].stockQuantity`}
                  value={stockOption.stockQuantity}
                  onChange={(e) => handleStockChange(e, colorVariantIndex, stockOptionIndex)}
                />
              </label>
              <a onClick={() => addStockOption(stockOption.colorVariantId,colorVariantIndex)} style={{ marginLeft: "10px", marginTop: "15px", cursor: "pointer",width:"fit-content" }}>
                <FontAwesomeIcon icon={faAdd} size='xl' />
                </a>
            </div>
          ))}
        </div>
      ))}
      <a onClick={() => addColorVariant()} style={{ marginLeft: "10px", marginTop: "15px", cursor: "pointer",width:"fit-content" }}>
  <FontAwesomeIcon icon={faAdd} size='xl' />
</a>

      {/* Add more input fields for other product information as needed */}

      <button class="button" type="submit">Submit</button>
    </form></div></main>
    </>)}
        </>
    )
}
export default EditProduct;