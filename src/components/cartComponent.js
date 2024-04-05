import { connect } from "react-redux"
import HeadersComponent from "./headersComponent"
import axios from "axios"
import { useEffect } from "react"
import { updateCartList } from "./action"
import { useDispatch } from "react-redux"
import CartDisplayComponent from "./cartDisplayComponent"
function CartComponent(props) {
    const {items, cartList, updateCartList} = props 
    console.log("items in the cart component", items)
    const dispatch = useDispatch()

    useEffect(() => {
        const getCart = async() => {
            dispatch(updateCartList([]))
            try {
                const itemIds = Object.keys(items)
                
                console.log("itemIds in the cart component", itemIds)

                const url = "http://localhost:8080/cart"
        
                const response = await axios.get(url, {params : itemIds})
                console.log("response in the cart component", response.data)
                dispatch(updateCartList(response.data.result))

            
            }

            catch(err) {
                console.log("err in the cart component", err)
            }
        }

        getCart()
    }, [items])

  if(cartList.length === 0) {
    return (
       <div>
            <HeadersComponent/>
            <h1>empty cart</h1>
       </div>
    )
  }

  else { 
    return (
        <div>
            <HeadersComponent/>
            <ul>{cartList.map(each => (<CartDisplayComponent key = {each._id} result = {each}/>))}</ul>
        </div>
    )
  }
}

const mapStatetoProps = (state) => {
    const {items, cartList} = state.state7
    console.log("in the cart component", items)
    return {
        items : items,
        cartList : cartList
    }
}

export default connect(mapStatetoProps, {updateCartList})(CartComponent)