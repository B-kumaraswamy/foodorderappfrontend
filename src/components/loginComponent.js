
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { updateLoginPassword, updateLoginEmail, updateFloatingMessage, updateLoggedIn} from "./action"
import axios from "axios"
import { useDispatch } from "react-redux"
import FloatingMessage from "./floatingComponent"
import Cookie from "js-cookie"
import HeadersComponent from "./headersComponent"
import {Navigate, useNavigate } from "react-router-dom"
import "./loginComponent.css"
function LoginComponent(props) {
  
   const dispatch = useDispatch()
 
   const token = Cookie.get("jwt_token")
   const navigate = useNavigate()
    const {email, password, floatingMessage, updateLoginPassword, updateLoginEmail, updateFloatingMessage, updateLoggedIn} = props
   

      

    const onLogin = async() => {
       
        try {
          
            const url = "https://foodorderappbackend.onrender.com/login"
        const body = {
            email : email,
            password : password
        }
        
        const response = await axios.post(url, {body})
        console.log("login response in the frontend", response.data)

        if(response.data.status === 200) {
            console.log("loggedin successfully")
            Cookie.set("jwt_token", response.data.token)
            dispatch(updateLoggedIn(true))
            dispatch(updateFloatingMessage(response.data.message))
            setTimeout(() => {
                console.log("floatin message in the set timeout login component", floatingMessage)
               
               
            }, 10000);
            
            setTimeout(() => {
                dispatch(updateFloatingMessage(""))
            }, 5000);

           
        }

        dispatch(updateLoginPassword(""))
        dispatch(updateLoginEmail(""))
       
        

        }

        catch(err) {
            console.log("login frontend catch err", err)
            if(err.response.data.status === 401) {
                console.log("inside login component frontend 401 error", err.response.data.message)
                dispatch(updateFloatingMessage(err.response.data.message))
            }

            else if(err.response.data.status === 404) {
                dispatch(updateFloatingMessage(err.response.data.message))
            }

            else if (err.response.data.status === 500){
               
                dispatch(updateFloatingMessage(err.response.data.message))
            }

            else {
                console.log("entering catch err else", err)
            }
        }


    }
    
    
  if(token === undefined) {
    return (
        <div>
             <HeadersComponent/>
        <div className="login-cart">
           
            <label className="login-heading">Email</label>
            <input value = {email} placeholder="Enter valid MailId"  className="login-input"
            onChange={event => updateLoginEmail(event.target.value)}/> <br/> 
            <label className="login-heading">Password</label>
            <input type="password" value={password} placeholder="Enter valid Password"
            className="login-input" onChange={event => updateLoginPassword(event.target.value)}/>  <br/> 
            <span>Not registered yet? <Link to = "/signup">SignUp</Link></span>  <br/>  
            <button onClick={onLogin} className="login-button">Login</button>
            <FloatingMessage message = {floatingMessage}/>



        </div>
        </div>
    )
  }

  else {
    return <Navigate to = "/"/>
  }
}


const mapStatetoProps = (state) => {
    console.log("state in the loginComponent", state)
    const {floatingMessage} =  state.state2
    const {email, password, loggedIn} = state.state3 
console.log("mapStatetoProps floatingMessage login component", floatingMessage)
    
    return {
        email : email,
        password : password,
        floatingMessage : floatingMessage,
        loggedIn : loggedIn
    }
}

export default connect(mapStatetoProps, {updateLoginPassword, updateLoginEmail, updateFloatingMessage, updateLoggedIn})(LoginComponent);