import { connect } from "react-redux";
import HeadersComponent from "./headersComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  updateCartList,
  updateFloatingMessage,
  updateInputValue,
  updateItems,
} from "./action";
import { useDispatch } from "react-redux";
import CartDisplayComponent from "./cartDisplayComponent";
import "./cartDisplayComponent.css";
import { useNavigate, Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import FloatingMessage from "./floatingComponent";
import ClipLoader from "react-spinners/ClipLoader";
//npm install react-spinners

function CartComponent(props) {
  const {
    items,
    cartList,
    floatingMessage,
    updateCartList,
    updateFloatingMessage,
    updateInputValue,
  } = props;
  //const restaurantName = cartList[0].restaurant
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const token = Cookie.get("jwt_token");
  const navigate = useNavigate();

  const onCheckout = () => {
    dispatch(updateInputValue(""));
    dispatch(updateFloatingMessage("Your order has been placed successfully"));

    setTimeout(() => {
      dispatch(updateFloatingMessage(""));
      //dispatch(updateCartList([]))
      dispatch(updateItems());
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    const getCart = async () => {
      dispatch(updateCartList([]));

      try {
        const itemIds = Object.keys(items).filter(
          (eachKey) => items[eachKey] !== 0
        );
        // const itemIds = Object.keys(items) also works since items contains dishes added atleast once.
        //sending the req to the api which has the dishes with quantity atleast 1
        // This code filters out the keys from the items object that have non-zero values, and itemIds will contain only those keys.

        const url = "http://localhost:8080/cart";

        const response = await axios.get(url, { params: itemIds });

        dispatch(updateCartList(response.data.result));
        setLoading(false);
      } catch (err) {
        console.debug("err in the cart component", err);
      }
    };

    getCart();
  }, [items, dispatch, updateCartList]);

  const totalArray = cartList.map((each) => items[each._id] * each.price); // gets total price of each item i.e. quantity*price. For ex: biryani quantity 2 * 500 each = 1000/-
  const grandTotal = totalArray.reduce(
    (total, eachTotal) => total + eachTotal,
    0
  );

  //

  if (loading) {
    <div className="spinner-container">
      <ClipLoader color={"#f6089b"} />
    </div>;
  } else if (cartList.length === 0 && token !== undefined) {
    return (
      <div>
        <HeadersComponent />
        <img
          alt="image1"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvYzlSqthCQMsDHH9hcDYVjCUPwGm_KuXhTw&s"
          className="emptycart-image"
        />
        <h3 className="emptycart-heading">Your cart is empty</h3>
      </div>
    );
  } else if (token === undefined) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <HeadersComponent />
        <h3 className="res-name">{cartList[0].restaurant}</h3>
        <ul>
          {cartList.map((each) => (
            <CartDisplayComponent key={each._id} result={each} />
          ))}
        </ul>

        <div className="grand-total">
          <h2>Grand Total : {grandTotal}/-</h2>
        </div>

        <div>
          <button className="checkout" onClick={onCheckout}>
            Checkout
          </button>
          <FloatingMessage message={floatingMessage} />
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  const { items, cartList, grandTotal } = state.state7;
  const { floatingMessage } = state.state2;

  return {
    items: items,
    cartList: cartList,
    grandTotal: grandTotal,
    floatingMessage: floatingMessage,
  };
};

export default connect(mapStatetoProps, {
  updateCartList,
  updateFloatingMessage,
  updateInputValue,
  updateItems,
})(CartComponent);

/*
 <button className="checkout" onClick={}>Checkout</button>

 https://assets-v2.lottiefiles.com/a/45a131e0-1179-11ee-bbe2-2b1378a6aea4/znMpLKVhYd.png
*/
