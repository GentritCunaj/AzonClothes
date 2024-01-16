import { combineReducers } from "redux";
import dataReducer from "./data/reducer";
import authReducer from "./auth/reducer";



export const rootReducer = combineReducers({
   auth:authReducer,
    data: dataReducer

});
