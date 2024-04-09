import Cookie from "js-cookie"
import { connect, useDispatch } from "react-redux"
import {uploadFile} from "./action"
import axios from "axios"
import { UseDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
// import Cookie from "js-cookie"

function AdminComponent(props) {
    // const navigate = useNavigate()
    
    const {file, uploadFile, loggedIn} = props
    const dispatch = useDispatch()
   // you can write common api for the authorization of a component here. Loophole without writing such api is..... here the user will come to know he/she is unauthorized upon submitting the file and not while he/she is trying to access admin component. So write common api for all the components you want to authorize, and put necessary code (here onUploadFile) in if... else navigate to home or login. 
    
    const onUploadFile = async() => {
       try {
        const token = Cookie.get("jwt_token");
        console.log("token in admin component", token);
        const formData = new FormData();
        formData.append("file", file)

        const url = "https://foodorderappbackend.onrender.com/products/bulk"
        
        const headers = {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "multipart/form-data"
        }

        const response = await axios.post(url, formData, {headers})

        console.log("respone in the admin frontend", response.data)
        dispatch(uploadFile(null))
        
       }

       catch(err) {
        console.log("admin frontend catch", err.errors)
       }
        
    }

    return(
        <div>
            <input accept=".csv" type="file" onChange={event => uploadFile(event.target.files[0])}/>
            <button onClick={onUploadFile}>UploadFile</button> <br/> <br/>

            <a href = {`${process.env.PUBLIC_URL}/foodSample.csv`} download = "foodSample.csv"><button>Download Sample File</button></a>


        </div>
    )
}

const mapStatetoProps =(state) => {
    const {file} = state.state4 
    const {loggedIn} = state.state3

    return {
        file : file,
        loggedIn : loggedIn
    }
}


export default connect(mapStatetoProps, {uploadFile})(AdminComponent)