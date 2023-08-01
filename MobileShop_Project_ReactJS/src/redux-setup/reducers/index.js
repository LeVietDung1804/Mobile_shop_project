import { combineReducers } from "redux";
import cart_reducer from "./cart_reducer";

export default combineReducers({
    Cart: cart_reducer
});