import { combineReducers } from "redux";
import loginReducer from "./login";
import accountReducer from "./account";

const allReducers = combineReducers({
    loginReducer,
    accountReducer
})

export default allReducers;