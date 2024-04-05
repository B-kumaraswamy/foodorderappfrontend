import "./restaurantDetailsComponent.css"
import { updateQuantity, increaseQuantity, decreaseQuantity } from "./action"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"
function RestaurantDetailsComponent(props) {
    const dispatch = useDispatch()
    console.log("props in the RestaurantDetailsComponent", props)
    const {dishName, price, imageUrl, _id} = props.result
    const {items, updateQuantity} = props


const onAddingFoodItem = () => {
        dispatch(updateQuantity(_id, 1))
}



   if( items[_id] === undefined || items[_id] === 0)  {
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

        
    )
   }

   else {
    
    return (
        <li className="li-cart">
        <div className="rest-div">
            <div className="dish-info">
                <p>{dishName}</p>
                <p>{`${price}/-`}</p>
            </div>
            <div className="image-cart">
                <img src={imageUrl} alt="image1" className="res-dish-image" />
             
                    <button className="quantity-btn1" onClick={() => dispatch(decreaseQuantity(_id))}>-</button>
                    <span className="quantity-value">{items[_id]}</span>
                    <button className="quantity-btn2" onClick={() => dispatch(increaseQuantity(_id))}>+</button> 

                   
            
            </div>
        </div>
    </li>
    )
   }
}

const mapStatetoProps = (state) => {
    console.log("state in the mapStatetoProps ResDetailsComponent", state)
    const {items} = state.state7 
//console.log("type of items.quantity in mapStatetoProps ResDetailsComponent", typeof(items))
    return {
        items : items
    }
}

export default connect(mapStatetoProps, {updateQuantity, increaseQuantity, decreaseQuantity})(RestaurantDetailsComponent)