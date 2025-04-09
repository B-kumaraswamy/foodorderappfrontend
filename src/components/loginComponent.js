import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateLoginPassword,
  updateLoginEmail,
  updateFloatingMessage,
  updateLoggedIn,
  updateInputValue,
  updateNav,
} from "./action";
import axios from "axios";
import { useDispatch } from "react-redux";
import FloatingMessage from "./floatingComponent";
import Cookie from "js-cookie";
import HeadersComponent from "./headersComponent";
import { Navigate } from "react-router-dom";
import "./loginComponent.css";

function LoginComponent(props) {
  const dispatch = useDispatch();

  const token = Cookie.get("jwt_token");

  const {
    email,
    password,
    floatingMessage,
    nav,
    updateLoginPassword,
    updateLoginEmail,
    updateFloatingMessage,
    updateLoggedIn,
    updateInputValue,
    updateNav,
  } = props;

  const onLogin = async () => {
    try {
      const url = "https://foodorderappbackend.onrender.com/login";
      const body = {
        email: email,
        password: password,
      };

      const response = await axios.post(url, { body });

      if (response.data.status === 200) {
        dispatch(updateLoggedIn(true));
        dispatch(updateFloatingMessage(response.data.message));

        setTimeout(() => {
          dispatch(updateNav(true));
          dispatch(updateInputValue(""));
          Cookie.set("jwt_token", response.data.token);
          dispatch(updateFloatingMessage(""));
        }, 1000);
      }

      dispatch(updateLoginPassword(""));
      dispatch(updateLoginEmail(""));
    } catch (err) {
      if (err.response.data.status === 401) {
        dispatch(updateFloatingMessage(err.response.data.message));
      } else if (err.response.data.status === 404) {
        dispatch(updateFloatingMessage(err.response.data.message));
      } else if (err.response.data.status === 500) {
        dispatch(updateFloatingMessage(err.response.data.message));
      } else {
        console.debug("entering catch err else", err);
      }

      setTimeout(() => {
        dispatch(updateFloatingMessage(""));
      }, 1000);
    }
  };

  if (token === undefined) {
    return (
      <div>
        <HeadersComponent />
        <div className="login-cart">
          <label className="login-heading">Email</label>
          <input
            value={email}
            placeholder="Enter valid Mail Id"
            className="login-input"
            onChange={(event) => updateLoginEmail(event.target.value)}
          />{" "}
          <br />
          <label className="login-heading">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter valid Password"
            className="login-input"
            onChange={(event) => updateLoginPassword(event.target.value)}
          />{" "}
          <br />
          <span>
            Not registered yet? <Link to="/signup">SignUp</Link>
          </span>{" "}
          <br />
          <button onClick={onLogin} className="login-button">
            Login
          </button>
          <FloatingMessage message={floatingMessage} />
        </div>
      </div>
    );
  } else if (nav === true) {
    return (
      <div>
        <FloatingMessage message={floatingMessage} />
        <Navigate to="/" />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}

const mapStatetoProps = (state) => {
  const { floatingMessage, nav } = state.state2;
  const { email, password, loggedIn } = state.state3;

  return {
    email: email,
    password: password,
    floatingMessage: floatingMessage,
    loggedIn: loggedIn,
    nav: nav,
  };
};

export default connect(mapStatetoProps, {
  updateLoginPassword,
  updateLoginEmail,
  updateFloatingMessage,
  updateLoggedIn,
  updateInputValue,
  updateNav,
})(LoginComponent);
