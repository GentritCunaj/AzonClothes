import * as types from './types';
import axios from "axios";
const token = localStorage.getItem("azontoken");
;
export const Login = (email,password) => async (dispatch) => {
    try {
        dispatch({ type: types.LOGIN_CLIENT_REQUEST });
        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/Auth/loginCustomer`, {email,password}
        );

        console.log(res);
        dispatch({
            type: types.LOGIN_CLIENT_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                token: res.data.data
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.LOGIN_CLIENT_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}

export const UpdateInfo = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_INFO_REQUEST });
        const res = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/Auth/info`, data,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        console.log(res);
        dispatch({
            type: types.UPDATE_INFO_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.UPDATE_INFO_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}

export const ChangeRole = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.SET_USER_ROLE_REQUEST });
        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/Auth/userRole`, 
            new URLSearchParams({ email: data.email }),
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        );

        console.log(res);
        dispatch({
            type: types.SET_USER_ROLE_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.SET_USER_ROLE_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}



export const DeleteUser = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.DELETE_USER_REQUEST });
        const res = await axios.delete(
            `${process.env.REACT_APP_BASE_URL}/Auth`,{
                data:{email:data.email},
    
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        );

        console.log(data);
        dispatch({
            type: types.DELETE_USER_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.DELETE_USER_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}

export const GetUserById = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_USER_REQUEST });
        const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/Auth/userInfo/${id}`
        );

        dispatch({
            type: types.GET_USER_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.GET_USER_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}

export const GetInfo = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_INFO_REQUEST });
        const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/Auth/info`, 
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        console.log(res);
        dispatch({
            type: types.GET_INFO_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.GET_INFO_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}

export const GetAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_USERS_REQUEST });
        const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/Auth/allUsers`, 
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        console.log(res);
        dispatch({
            type: types.GET_USERS_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.GET_USERS_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}



export const RegisterCustomer = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.REGISTER_CLIENT_REQUEST });
        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/Auth/Register`, data
        );

        console.log(res);
        dispatch({
            type: types.REGISTER_CLIENT_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.REGISTER_CLIENT_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}



export const authLogout = () => async (dispatch) => {
    try {
      dispatch({
        type: types.AUTH_LOGOUT,
      });
      console.log("oke")
    } catch (error) {
      console.log(error);
    }
  };