import SignUp from "./components/signup";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./components/store";
import { Provider } from "react-redux";

import LoginComponent from "./components/loginComponent";
import SearchComponent from "./components/searchComponent";
import AdminComponent from "./components/adminComponent";
import RestaurantComponent from "./components/restaurantComponent";
import CartComponent from "./components/cartComponent";
import NotFoundComponent from "./components/notFoundComponent";

function FoodOrderApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SearchComponent />} />
          <Route exact path="/dish/:dishName" element={<SearchComponent />} />
          <Route exact path="/admin" element={<AdminComponent />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<LoginComponent />} />
          <Route
            exact
            path="/restaurant/:restaurantName"
            element={<RestaurantComponent />}
          />
          <Route exact path="/cart" element={<CartComponent />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default FoodOrderApp;
