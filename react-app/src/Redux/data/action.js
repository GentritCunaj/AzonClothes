import * as types from './types';
import axios from "axios";
const token1 = localStorage.getItem("azontoken");

const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

const bearer = {
    headers : {

    }
}  
  
  if (token1) {
    config.headers.Authorization = "Bearer " + token1;
    bearer.headers.Authorization = "Bearer " + token1;
  }

  
export const GetImage = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_IMAGE_REQUEST });
        const res = await axios.get(
            "https://localhost:7247/Home"
        );

        console.log(res);
        dispatch({
            type: types.GET_IMAGE_SUCCESS,
            payload: res
        });
        return res;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.GET_IMAGE_ERROR,
            
        })
        return error;
    }
}

export const PostImage = (res) => ({
    type:types.POST_IMAGE_SUCCESS,
    payload:res
})


export const clearDesign = () => {
    return (dispatch) => {
        dispatch({type:types.CLEAR_DESIGN})
    }

}


export const PostProduct = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.POST_PRODUCT_REQUEST });
        const res = await axios.post(
            "https://localhost:7247/Products",data,
            config
        );

        console.log(res);
        dispatch({
            type: types.POST_PRODUCT_SUCCESS,
            payload: res
        });
        return res.data.data;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.POST_PRODUCT_ERROR,

        })
        return error;
    }
}


export const DeleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.DELETE_PRODUCT_REQUEST });
        const res = await axios.delete(
            `https://localhost:7247/Products/${id}`
        );
    
      
        dispatch({
            type: types.DELETE_PRODUCT_SUCCESS,
            payload:res.data.data
    });
    return res.data;
    } catch(error){
        console.log(error)
        dispatch({
            type: types.DELETE_PRODUCT_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}


export const GetSingleProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_PRODUCTS_DETAILS_REQUEST });
        const res = await axios.get(
            `https://localhost:7247/Products/${id}`
        );
    
        console.log(res);
        dispatch({
            type: types.GET_PRODUCTS_DETAILS_SUCCESS,
            payload:res.data.data
    });
    return res.data.data;
    } catch(error){
        console.log(error)
        dispatch({
            type: types.GET_PRODUCTS_DETAILS_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const GetAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_ALL_PRODUCTS_REQUEST });
        const res = await axios.get(
            "https://localhost:7247/Products/all"
        );
    
        console.log(res);
        dispatch({
            type: types.GET_ALL_PRODUCTS_SUCCESS,
            payload:res.data.data
    });
    return res.data;
    } catch(error){
        console.log(error)
        dispatch({
            type: types.GET_ALL_PRODUCTS_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}



export const GetProducts = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_PRODUCTS_REQUEST });
        const res = await axios.get(
            "https://localhost:7247/Products"
        );
    
        console.log(res);
        dispatch({
            type: types.GET_PRODUCTS_SUCCESS,
            payload:res.data.data
    });
    return res.data;
    } catch(error){
        console.log(error)
        dispatch({
            type: types.GET_PRODUCTS_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const EditProductById = (id,data) => async (dispatch) => {
    try {
        dispatch({ type: types.EDIT_PRODUCT_REQUEST });
        const res = await axios.put(
            `https://localhost:7247/Products/edit/${id}`,data,
            config
        );
    
        console.log(res);
        dispatch({
            type: types.EDIT_PRODUCT_SUCCESS,
            payload:res.data.data
    });
    return res.data;
    } catch(error){
        console.log(error)
        dispatch({
            type: types.EDIT_PRODUCT_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const DeleteCV = (id) => async (dispatch) => {
    try {

        dispatch({type:types.DELETE_CV_REQUEST});
        const res = await axios.delete(
            `https://localhost:7247/Products/cv/${id}`,
            {
                headers: {
                  Authorization: "Bearer " + token1
              }}
            
        );
    
       
        dispatch({
            type: types.DELETE_CV_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.DELETE_CV_ERROR,
            // payload:{
            //     message:error.data.message
            // }
        })
        
    }
}



export const DeleteWishlist = (data) => async (dispatch) => {
    try {

        dispatch({type:types.ADD_TO_WISHLIST_REQUEST});
        const res = await axios.delete(
            `https://localhost:7247/WishList/${data.id}`,
            {
                headers: {
                  Authorization: `Bearer ${token1}`,
                  "Content-Type": "application/json",
                },
                params: { guid: data.guid }, // Use params to include data in the URL
              }
        );
    
        console.log(res);
        dispatch({
            type: types.ADD_TO_WISHLIST_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.ADD_TO_WISHLIST_ERROR,
            // payload:{
            //     message:error.data.message
            // }
        })
        
    }
}


export const AddToWishlist = (data) => async (dispatch) => {
    try {

        dispatch({type:types.ADD_TO_WISHLIST_REQUEST});
        const res = await axios.post(
            `https://localhost:7247/WishList`,data,
            bearer
            
        );
    
        console.log(res);
        dispatch({
            type: types.ADD_TO_WISHLIST_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data,
                guid:res.data.guid
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.ADD_TO_WISHLIST_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const GetWishlist = (data) => async (dispatch) => {
    try {

        dispatch({type:types.GET_WISHLIST_REQUEST});
        const res = await axios.post(
            "https://localhost:7247/WishList/getWishlist",
            {
                guid: data.guid,  // Directly pass the guid
            },
           config
        );

    
        console.log(res);
        dispatch({
            type: types.GET_WISHLIST_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
            
    });
    
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.GET_WISHLIST_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const GetShippingDetails = (data) => async (dispatch) => {
    try {

        dispatch({type:types.GET_SHIPPING_REQUEST});
        const res = await axios.post(
            "https://localhost:7247/Shipping/getShipping",
            {
                guid: data.guid,  // Directly pass the guid
            },
           config
            
        );
    
        console.log(res);
        dispatch({
            type: types.GET_SHIPPING_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.GET_SHIPPING_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}



export const AddShippingDetails = (data) => async (dispatch) => {
    try {

        dispatch({type:types.ADD_SHIPPING_REQUEST});
        const res = await axios.post(
            "https://localhost:7247/Shipping",data,
            bearer
            
        );
    
        console.log(res);
        dispatch({
            type: types.ADD_SHIPPING_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.ADD_SHIPPING_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}


export const refresh = () => {
    return (dispatch) => {
        dispatch({type:types.INITIAL_DATA_LOAD})
    }
}

export const filterProducts = (searchKeyword) => {
    return (dispatch, getState) => {
        const allProducts = getState().data.products;

        const filteredProductss = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        console.log(filteredProductss,"action");
        dispatch({ type: types.FILTER_PRODUCTS, payload: { filteredProductss} });
         
    };
};

export const UpdateOrderStatus = (data) => async (dispatch) => {
    try {

        dispatch({type:types.UPDATE_ORDER_REQUEST});
        const res = await axios.post(
            "https://localhost:7247/Order/updateStatus",data,
            bearer
        );
    
        console.log(res);
        dispatch({
            type: types.UPDATE_ORDER_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.UPDATE_ORDER_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const GetOrderDetails = () => async (dispatch) => {
    try {

        dispatch({type:types.GET_ORDERS_REQUEST});
        const res = await axios.get(
            "https://localhost:7247/Order",
            bearer
            
        );
    
        console.log(res);
        dispatch({
            type: types.GET_ORDERS_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.GET_ORDERS_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const GetAllOrders = () => async (dispatch) => {
    try {

        dispatch({type:types.GET_ALL_ORDERS_REQUEST});
        const res = await axios.get(
            "https://localhost:7247/Order/allOrders",
           bearer
        );
    
        console.log(res);
        dispatch({
            type: types.GET_ALL_ORDERS_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.GET_ALL_ORDERS_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const GetOrderDetailsById = (id) => async (dispatch) => {
    try {

        dispatch({type:types.GET_ORDER_REQUEST});
        const res = await axios.get(
            `https://localhost:7247/Order/${id}`,
            bearer
            
        );
    
        console.log(res);
        dispatch({
            type: types.GET_ORDER_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.GET_ORDER_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const CancelOrdersById = (data) => async (dispatch) => {
    try {

        dispatch({type:types.GET_CANCELLED_ORDER_REQUEST});
        const res = await axios.post(
            `https://localhost:7247/Order/cancel`,data,
            bearer
            
        );
    
        console.log(res);
        dispatch({
            type: types.GET_CANCELLED_ORDER_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    return res.data;
    }
   
    catch(error){
        console.log(error)
        dispatch({
            type: types.GET_CANCELLED_ORDER_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}
