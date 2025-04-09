import Cookie from "js-cookie";
import { connect, useDispatch } from "react-redux";
import { uploadFile, updateFloatingMessage } from "./action";
import axios from "axios";
import "./headersComponent.css";
import HeadersComponent from "./headersComponent";

import FloatingMessage from "./floatingComponent";

// import Cookie from "js-cookie"

function AdminComponent(props) {
  // const navigate = useNavigate()
  const token = Cookie.get("jwt_token");
  const { file, uploadFile, floatingMessage, updateFloatingMessage } = props;
  const dispatch = useDispatch();

  // you can write common api for the authorization of a component here. Loophole without writing such api is..... here the user will come to know he/she is unauthorized upon submitting the file and not while he/she is trying to access admin component. So write common api for all the components you want to authorize, and put necessary code (here onUploadFile) in if... else navigate to home or login.

  const onUploadFile = async () => {
    dispatch(updateFloatingMessage(""));
    try {
      const formData = new FormData();
      formData.append("file", file);

      const url = "http://localhost:8080/products/bulk";

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(url, formData, { headers });

      dispatch(uploadFile(null));
    } catch (err) {
      dispatch(updateFloatingMessage("You are not an Admin"));
    }
  };

  return (
    <div>
      <HeadersComponent />

      <div className="admin-cart">
        <input
          accept=".csv"
          type="file"
          onChange={(event) => uploadFile(event.target.files[0])}
        />
        <button onClick={onUploadFile} className="uploadBtn">
          UploadFile
        </button>{" "}
        <br /> <br />
        <a
          href={`${process.env.PUBLIC_URL}/foodSample.csv`}
          download="foodSample.csv"
          className="admin-a"
        >
          <button className="downloadBtn">Download Sample File</button>
        </a>
      </div>

      <FloatingMessage message={floatingMessage} />
    </div>
  );
}

const mapStatetoProps = (state) => {
  const { file } = state.state4;
  const { floatingMessage } = state.state2;

  return {
    file: file,
    floatingMessage: floatingMessage,
  };
};

export default connect(mapStatetoProps, { uploadFile, updateFloatingMessage })(
  AdminComponent
);
