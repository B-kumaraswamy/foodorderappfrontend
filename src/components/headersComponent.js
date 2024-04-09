import { Link } from "react-router-dom"
import "./headersComponent.css"
import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import {  updateInputValue } from "./action"
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom"
function HeadersComponent(props) {
        const {updateInputValue} = props
        const dispatch = useDispatch()
       const navigate = useNavigate()
       

        const onLogout = () => {
               
                Cookie.remove("jwt_token")
                navigate("/login")
               
        }

      

    

    return (
        <div className="headers">
           
                <Link className = "header" to= "/" onClick={() => dispatch(updateInputValue(""))}>Home</Link> &nbsp;  &nbsp;
          
          
                <Link className = "header" to= "/login"  >Login</Link>
            

                <Link to = "/cart" className = "header">Cart</Link>

              
                <Link  className = "header" onClick={onLogout}>Logout</Link>
               
        </div>
)}



export default connect(null, {updateInputValue})(HeadersComponent)