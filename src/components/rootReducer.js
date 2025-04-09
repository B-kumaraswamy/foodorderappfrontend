import { combineReducers } from "redux";
import reducer1 from "./reducer1";
import reducer2 from "./reducer2";
import loginReducer from "./loginReducer";
import adminReducer from "./adminReducer";
import dishNameReducer from "./dishNameReducer";
import restaurantReducer from "./restaurantReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  state1: reducer1,
  state2: reducer2,
  state3: loginReducer,
  state4: adminReducer,
  state5: dishNameReducer,
  state6: restaurantReducer,
  state7: cartReducer,
});

export default rootReducer;
