import "./cartDisplayComponent.css"
import { updateQuantity, increaseQuantity, decreaseQuantity } from "./action"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"

function CartDisplayComponent(props) {
    const dispatch = useDispatch()
    const {restaurant, dishName, imageUrl, price, _id} = props.result
    const {items, increaseQuantity, decreaseQuantity} = props
    return (
        <li className="cart-li">
            <div className="cart-top">
                <img src= {imageUrl} alt="image1" className="cart-image"/>
                 <p className="cart-rest">{restaurant}</p>
            </div>

            <div className="dish-box">
                <p className="cart-dish">{dishName}</p>
                <div className="quantity-control">
                    <button className="button1" onClick={() => dispatch(decreaseQuantity(_id))}>-</button>
                    <button className="quantity">{items[_id]}</button>
                    <button className="button2" onClick={() => dispatch(increaseQuantity(_id))}>+</button>
                </div>
            
            </div>

            <div className="price">
                <p>{price} * {items[_id]}</p>
            </div>

           
        </li>
    )
}

const mapStatetoProps = (state) => {
    const {items} = state.state7
    console.log("in the cart component", items)
    return {
        items : items,
       
    }
}

export default connect(mapStatetoProps, {updateQuantity, increaseQuantity, decreaseQuantity})(CartDisplayComponent)