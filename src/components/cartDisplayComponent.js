import "./cartDisplayComponent.css";
import {
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  updateTotal,
} from "./action";
import { connect } from "react-redux";

function CartDisplayComponent(props) {
  const { dishName, imageUrl, price, _id } = props.result;
  const { items } = props;
  const totalPrice = price * items[_id];
  //dispatch(updateTotal(totalPrice))

  return (
    <li className="cart-li">
      <div className="cart-top">
        <img src={imageUrl} alt="image1" className="cart-image" />
        <p className="cart-rest">
          {price} * {items[_id]} = {totalPrice}
        </p>
      </div>

      <div className="price">
        <p>{dishName}</p>
      </div>
    </li>
  );
}

const mapStatetoProps = (state) => {
  const { items, grandTotal } = state.state7;
  return {
    items: items,
    grandTotal: grandTotal,
  };
};

export default connect(mapStatetoProps, {
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  updateTotal,
})(CartDisplayComponent);
