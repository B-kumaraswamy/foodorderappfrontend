import HeadersComponent from "./headersComponent"
import axios from "axios"
//import Cookie from "js-cookie"
import "./searchComponent.css"
import { connect } from "react-redux"
import { updateDishArray, updateInputValue } from "./action"
import { useDispatch } from "react-redux"
import DishComponent from "./dishComponent"
import { useParams } from "react-router-dom"
import {  useEffect } from "react"
function SearchComponent(props) {
    //const token = Cookie.get("jwt_token")
    const {dishArray,inputValue, updateDishArray, updateInputValue} = props
    const dispatch = useDispatch()
    const {dishName} = useParams()

        const home = async(name) => {
            dispatch(updateDishArray([]))
            if(name.trim() !== "") {
                console.log("inside home function", name)
                try {
              
                   
                    const url = `http://localhost:8080/search/${name}`
                   /*const headers = {
                        "Authorization" : `Bearer ${token}`
                    }*/
        
                    const response = await axios.get(url)
                    console.log("response in the search frontend", response.data)
                    dispatch(updateDishArray(response.data.message))
                   
                    }
        
                    catch(err) {
                        console.log(err)
                    }
                    
            }
        }

      
        
      
    const handleChange = (value) => {
        dispatch(updateInputValue(value))
        home(value)
    }
    
    useEffect(() => {
        if (dishName) {
            console.log("inside dishName useeffect", dishName)
            handleChange(dishName)}
    }, [dishName])



   if(inputValue === "") {
    return (
        <div>
            <HeadersComponent/>
          <div className="body">
            <div className="search">
           <input type="search" placeholder="Search for Dishes" 
           value = {inputValue}
          onChange={event => handleChange(event.target.value)}
           /> 
        </div>
           <h3>Popular Cuisines</h3>
           
           <div className="cuisines-list">
               
                <div className="cuisine-item" >
                        <a href = "/dish/dessert"   >
                            <div>
                            <img alt = "image1" className = "cuisine-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8NIiQ3p-TNS6be9ty2Mmh9NAmaS9CPLajLg&usqp=CA"/>
                            <p className="dish-name">Dessert</p>
                            </div>
                        </a>
                </div>

                <div className="cuisine-item">
                        <a  href = "/dish/biryani">
                            <div>
                            <img alt = "image2"  className = "cuisine-image"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL64QU2oeAYPk289-33qxDbTyU6m0R6o13TQ&usqp=CAU"/>
                            <p className="dish-name">Biryani</p>
                            </div>
                        </a>
                    </div>

                    <div className="cuisine-item">
                        <a  href = "/dish/milkshake">
                            <div>
                            <img alt = "image3" className = "cuisine-image"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAH-OEPw1P3LaoAWvx7I1vyclxopJ1Cjq08w&usqp=CAU"/>
                            <p className="dish-name">Milkshake</p>
                            </div>
                        </a>
                    </div>

                    <div className="cuisine-item">
                        <a  href = "/dish/cake">
                            <div>
                            <img alt = "image4" className = "cuisine-image"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSldf-LgnL3a-zE3oNCHE0eu0NXvaatfB57KQ&usqp=CAU"/>
                            <p className="dish-name">Cake</p>
                            </div>
                        </a>
                    </div>

                    <div className="cuisine-item">
                        <a  href = "/dish/rolls">
                            <div>
                            <img alt = "image5" className = "cuisine-image"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrOqbiPAvURqZILlHRYd3YXuFHQi2Iu1A_w&usqp=CAU" />
                            <p className="dish-name">Rolls</p>
                            </div>
                        </a>
                    </div>
           </div>
           </div> 
       
       
           
       
        </div>
    )
   }

   return (
    <div>
        <HeadersComponent/>
      <div className="body">
        <div className="search">
       <input type="search" placeholder="Search for Dishes" 
       value = {inputValue}
      onChange={event => handleChange(event.target.value)}
       /> 
    </div>
      
       
     <ul>{dishArray.map(eachDish => <DishComponent key = {eachDish._id} result = {eachDish}/>)}</ul>
       </div> 
   
   
       
   
    </div>
)
}

const mapStatetoProps = (state) => {
    const {dishArray, inputValue} = state.state5 

    return {
        dishArray : dishArray,
        inputValue : inputValue
    }
}

export default connect(mapStatetoProps, {updateDishArray, updateInputValue})(SearchComponent)




/*
Instead of using anchor element, we can use button too like shown below. 
   <div className="cuisine-item">
                        <button onClick= {() => handleChange("Biryani")}>
                            <div>
                            <img alt = "image2"  className = "cuisine-image"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL64QU2oeAYPk289-33qxDbTyU6m0R6o13TQ&usqp=CAU"/>
                            <p className="dish-name">Biryani</p>
                            </div>
                        </button>
                    </div>

In HTML, href="#" in an anchor (<a>) element is a common pattern used to create a clickable element that doesn't navigate anywhere. The # symbol typically represents the top of the current page or document when used in an anchor's href attribute.

When a user clicks on a link with href="#", it essentially triggers a jump to the top of the current page. This behavior is often used in scenarios where you want to create a clickable element for JavaScript interactions or styling purposes without actually linking to another page or location.

<a href="#" onclick="alert('Hello!')">Click me</a>

In this example, clicking on the "Click me" link will trigger an alert dialog box with the message "Hello!" but won't cause the page to navigate anywhere because href="#".



In the provided code, useCallback is used to memoize the handleChange function. Let's break down what useCallback does and why it's used in this context:

Preventing unnecessary function recreations: When a component renders, all of its functions are recreated. If these functions are used as dependencies in useEffect or other hooks, it can lead to unnecessary re-execution of those hooks, which can impact performance. By using useCallback, we can memoize the function so that it's only recreated if its dependencies change.

Dependency management: In the useCallback hook, the second argument is an array of dependencies. These dependencies are used to determine when the function should be recreated. If any of the dependencies change, the function will be recreated. In this case, the dependencies are dispatch, home, and updateInputValue.

Stability for useEffect: In the useEffect hook, we use the handleChange function as a dependency. By memoizing handleChange with useCallback, we ensure that the reference to the function remains stable between renders. This prevents the useEffect hook from re-running unnecessarily when handleChange changes.

So, in summary, useCallback ensures that the handleChange function is only recreated if its dependencies change, providing stability for hooks like useEffect and preventing unnecessary re-renders.

*/