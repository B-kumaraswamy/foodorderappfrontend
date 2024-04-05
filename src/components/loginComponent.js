
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { updateLoginPassword, updateLoginEmail, updateFloatingMessage, updateLoggedIn} from "./action"
import axios from "axios"
import { useDispatch } from "react-redux"
import FloatingMessage from "./floatingComponent"
import Cookie from "js-cookie"
import HeadersComponent from "./headersComponent"
import { useNavigate } from "react-router-dom"
function LoginComponent(props) {
    console.log("at line 9")
   const dispatch = useDispatch()
   console.log("at line 11")
   const navigate = useNavigate()
    const {email, password, floatingMessage, loggedIn, updateLoginPassword, updateLoginEmail, updateFloatingMessage, updateLoggedIn} = props
    
    const onLogin = async() => {

        try {
            console.log("at line 15")
            
            dispatch(updateFloatingMessage(""))
            console.log("at line 18")
            const url = "http://localhost:8080/login"
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
            
            navigate("/")

        }

        dispatch(updateLoginPassword(""))
        dispatch(updateLoginEmail(""))

        

        }

        catch(err) {
            console.log("login frontend catch err", err)
            if(err.response.data.status === 401) {
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
    
    
    return (
        <div>
            <HeadersComponent/>
            <label>Email</label>
            <input value = {email} placeholder="Enter valid MailId" 
            onChange={event => updateLoginEmail(event.target.value)}/> <br/>  <br/>
            <label>Password</label>
            <input type="password" value={password} placeholder="Enter valid Password"
            onChange={event => updateLoginPassword(event.target.value)}/>  <br/>  <br/>
            <span>Not registered yet? <Link to = "/signup">SignUp</Link></span>  <br/>  <br/>
            <button onClick={onLogin}>Login</button>
            <FloatingMessage message = {floatingMessage}/>



        </div>
    )
}


const mapStatetoProps = (state) => {
    console.log("state in the loginComponent", state)
    const {floatingMessage} =  state.state2
    const {email, password, loggedIn} = state.state3 

    
    return {
        email : email,
        password : password,
        floatingMessage : floatingMessage,
        loggedIn : loggedIn
    }
}

export default connect(mapStatetoProps, {updateLoginPassword, updateLoginEmail, updateFloatingMessage, updateLoggedIn})(LoginComponent);