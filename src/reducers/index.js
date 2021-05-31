import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import ProductReducer from "./productReducer";
import CatReducer from "./catReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  products: ProductReducer,
  category: CatReducer,
});

export default rootReducer;
