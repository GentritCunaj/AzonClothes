import * as types from './types';
const token1 = localStorage.getItem("azontoken");
const initialState = {
    userLogin: {
        loading: false, error: false, message: ""
    },
    user:null,
    userId:null,
    users:[],
    token: token1,
    isAuthenticated: false,
}

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        
        case types.LOGIN_CLIENT_REQUEST:
            return {
                ...state, userLogin: { loading: true, error: false }
            }
        case types.LOGIN_CLIENT_SUCCESS:
            localStorage.setItem("azontoken", payload.token);
            return {
                ...state, userLogin: { loading: false, error: false, message: payload.message }, token: payload.token,isAuthenticated:true
            }
        case types.GET_USERS_SUCCESS:
        case types.SET_USER_ROLE_SUCCESS:
        case types.DELETE_USER_SUCCESS:
            return {
                ...state,users:payload.data
            }    

        case types.GET_USER_SUCCESS:
            return {
                ...state,userId:payload.data
            }
        case types.LOGIN_CLIENT_ERROR:
            return {
                ...state, userLogin: {
                    loading: false, error: true
                }
            }
        
        case types.AUTH_LOGOUT:
            localStorage.removeItem("azontoken");
            return {...state,
            userLogin: { loading: false, error: false, message: "" },
            userLogout: { message: "Logout Successfully" },
            token:null,
            isAuthenticated:false
            
        }    

        case types.GET_INFO_SUCCESS:
            return {
                ...state,user:payload.data
            }

        case types.UPDATE_INFO_SUCCESS:
            return {
                ...state,user:payload.data
            }
                    
            
        default:
            return state;
    }
}