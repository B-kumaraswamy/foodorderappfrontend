import { Link } from "react-router-dom"
import "./headersComponent.css"
import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { updateInputValue } from "./action"

function HeadersComponent(props) {
        const {updateInputValue} = props
        const dispatch = useDispatch()
    return (
        <div className="headers">
           
                <Link className = "header" to= "/" onClick={() => dispatch(updateInputValue(""))}>Home</Link> &nbsp;  &nbsp;
          
          
                <Link className = "header" to= "/login">Login</Link>
            

                <Link to = "/cart" className = "header">Cart</Link>
        </div>
)}



export default connect(null, {updateInputValue})(HeadersComponent)