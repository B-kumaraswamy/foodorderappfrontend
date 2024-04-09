import "./cartDisplayComponent.css"
import { updateQuantity, increaseQuantity, decreaseQuantity, updateTotal } from "./action"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"

function CartDisplayComponent(props) {
    const dispatch = useDispatch()
    const {restaurant, dishName, imageUrl, price, _id} = props.result
    const {items, increaseQuantity, decreaseQuantity, updateTotal} = props
    const totalPrice = price*items[_id]
    //dispatch(updateTotal(totalPrice))

    return (
        <li className="cart-li">
            <div className="cart-top">
                <img src= {imageUrl} alt="image1" className="cart-image"/>
                 <p className="cart-rest">{price} * {items[_id]} = {totalPrice}</p>
            </div>

           
            <div className="price">
                <p>{dishName}</p>
            </div>



           
        </li>
    )
}

const mapStatetoProps = (state) => {
    const {items, grandTotal} = state.state7
    console.log("in the cart component", items)
    return {
        items : items,
        grandTotal : grandTotal
       
    }
}

export default connect(mapStatetoProps, {updateQuantity, increaseQuantity, decreaseQuantity, updateTotal})(CartDisplayComponent)