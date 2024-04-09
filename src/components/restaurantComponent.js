import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { updateRestaurantArray } from "./action"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import axios from "axios"
import RestaurantDetailsComponent from "./restaurantDetailsComponent"
import HeadersComponent from "./headersComponent"


function RestaurantComponent(props) {
    const {restaurantName} = useParams()
    const {updateRestaurantArray, restaurantArray} = props
    const dispatch = useDispatch()
   
    try {

        useEffect(() => {
            const getRestaurant = async() => {
                dispatch(updateRestaurantArray([]))
                const url = `https://foodorderappbackend.onrender.com/restaurant/${restaurantName}`
                const response = await axios.get(url)
    
                console.log("response in restaurant", response.data)
                const res = response.data.result
                console.log("res in restaurant component", res)
                dispatch(updateRestaurantArray(res))
            }
    
            getRestaurant()
        }, [restaurantName, dispatch, updateRestaurantArray])
    }

    catch(err) {
        console.log("catch error in the restaurant compo", err)
    }



    return (
        <div>
            <HeadersComponent/>
        <h1 style={{textAlign : "center"}}>{restaurantName}</h1>
        <ul>{restaurantArray.map(each => (<RestaurantDetailsComponent result = {each}/>))}</ul>
        </div>
    )
}

const mapStatetoProps = (state) => {
    console.log("inside restaurant compo mapStatetoProps",  state)
       const {restaurantArray} = state.state6 
    
       console.log("inside restaurant compo mapStatetoProps", restaurantArray)
       return {
          restaurantArray : restaurantArray
       }
    }
    


export default connect(mapStatetoProps, {updateRestaurantArray})(RestaurantComponent)




