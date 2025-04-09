import "./restaurantDetailsComponent.css";
import {
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  updateItems,
  updateFloatingMessage,
} from "./action";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
function RestaurantDetailsComponent(props) {
  const dispatch = useDispatch();
  const { dishName, price, imageUrl, _id } = props.result; //from restaurant component
  const { items, updateQuantity, updateItems, updateFloatingMessage } = props; //from store

  const onAddingFoodItem = async () => {
    try {
      if (Object.keys(items).length !== 0) {
        const itemIds = Object.keys(items);

        const url = "https://foodorderappbackend.onrender.com/cart";

        const response = await axios.get(url, { params: itemIds });

        const resultArray = response.data.result[0];
        let cartRestaurantName = resultArray.restaurant;

        if (cartRestaurantName === props.result.restaurant) {
          dispatch(updateQuantity(_id, 1));
        } else {
          dispatch(updateItems());
          dispatch(updateQuantity(_id, 1));
          dispatch(
            updateFloatingMessage(
              "updating the cart with latest dishes selected"
            )
          );
        }
      } else {
        dispatch(updateQuantity(_id, 1));
      }
    } catch (err) {
      console.debug("err in the res details component", err);
    }
  };

  if (items[_id] === undefined || items[_id] === 0) {
    return (
      <li className="li-cart">
        <div className="rest-div">
          <div className="dish-info">
            <p>{dishName}</p>
            <p>{`${price}/-`}</p>
          </div>
          <div className="image-cart">
            <img src={imageUrl} alt="image1" className="res-dish-image" />
            <button onClick={onAddingFoodItem}>Add</button>
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li className="li-cart">
        <div className="rest-div">
          <div className="dish-info">
            <p>{dishName}</p>
            <p>{`${price}/-`}</p>
          </div>
          <div className="image-cart">
            <img src={imageUrl} alt="image1" className="res-dish-image" />

            <button
              className="quantity-btn1"
              onClick={() => dispatch(decreaseQuantity(_id))}
            >
              -
            </button>
            <span className="quantity-value">{items[_id]}</span>
            <button
              className="quantity-btn2"
              onClick={() => dispatch(increaseQuantity(_id))}
            >
              +
            </button>
          </div>
        </div>
      </li>
    );
  }
}

const mapStatetoProps = (state) => {
  const { items } = state.state7;
  //console.log("type of items.quantity in mapStatetoProps ResDetailsComponent", typeof(items))
  return {
    items: items,
  };
};

export default connect(mapStatetoProps, {
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  updateItems,
  updateFloatingMessage,
})(RestaurantDetailsComponent);
