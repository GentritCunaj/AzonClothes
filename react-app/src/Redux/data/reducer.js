import * as types from './types';
const guid =  localStorage.getItem("guid");
const initialState = {
    image:null,
    products:[],
    product:null,
    selectedProducts:[],
    shippingDetails:[],
    orders:[],
    order:null,
    searchKeyword: "", 
    filteredProducts: [], 
    allProducts:[],
    allOrders:[],
    loading:false,
    guid:guid || null
    
}

export default function dataReducer(state = initialState, { type, payload }) {
    switch (type) {

        case types.GET_PRODUCTS_DETAILS_REQUEST:
        case types.GET_PRODUCTS_REQUEST:
        case types.ADD_TO_WISHLIST_REQUEST:
        case types.GET_ORDER_REQUEST:
        case types.UPDATE_ORDER_REQUEST:    
            return {...state,loading:true}

        case types.POST_IMAGE_SUCCESS:
            return { ...state, image: payload.data }
        case types.GET_PRODUCTS_SUCCESS:
            return {...state,products:payload,loading:false }

        case types.GET_ALL_ORDERS_SUCCESS:
            return {...state, allOrders:payload.data}
        
        case types.DELETE_CV_SUCCESS:
            let { success } = payload;
           
            if (success === true) {
                return { ...state, product: payload.data };
            }
            break;



        case types.GET_ALL_PRODUCTS_SUCCESS:
            return {...state,allProducts:payload }
        case types.DELETE_PRODUCT_SUCCESS:    
        return {...state,allProducts:payload }
        

        case types.GET_PRODUCTS_DETAILS_SUCCESS:
        case types.EDIT_PRODUCT_SUCCESS:
        
            return {...state,product:payload,loading:false}

        case types.UPDATE_ORDER_SUCCESS:        
        case types.GET_ORDER_SUCCESS :
            return {...state, order:payload.data,loading:false}    

        case types.GET_ORDERS_SUCCESS:
        case types.UPDATE_ORDER_SUCCESS:    
            return {...state, orders:payload.data}
        

        case types.FILTER_PRODUCTS:
            const { filteredProductss } = payload;
            
            return {
                ...state,
                    filteredProducts: filteredProductss, searchKeyword :"",
                
            };
     
        case types.GET_WISHLIST_SUCCESS:
            
            return { ...state, selectedProducts: payload.data,loading:false  }
           
        case types.INITIAL_DATA_LOAD:
            // Set subcKeyWord to null during initial data load or page refresh
            return { ...state, searchKeyword:""}
        case types.ADD_TO_WISHLIST_SUCCESS:
            const {data} = payload;
            localStorage.setItem("guid", payload.guid);
            return { ...state, selectedProducts: data,loading:false,guid:payload.guid }
               
            case types.GET_SHIPPING_SUCCESS:
                return {...state,shippingDetails:payload.data}    
    
                
        case types.CLEAR_DESIGN:
            return {...state,image:null}    
        default:
            return state;
    }
}