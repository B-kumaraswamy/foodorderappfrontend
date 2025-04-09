import {
  updateEmail,
  updateName,
  updatePassword,
  updatePhoneNumber,
  updateErrorValues,
  updateFloatingMessage,
  updateEmailError,
  updatePasswordError,
  updatePhoneError,
  updateNameError,
} from "./action";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import React from "react";
import axios from "axios";
import FloatingMessage from "./floatingComponent";
import { useNavigate } from "react-router-dom";
import "./loginComponent.css";
import HeadersComponent from "./headersComponent";

function SignUp(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    name,
    phoneNumber,
    email,
    password,
    floatingMessage,
    /*errorValues,*/ phoneError,
    passwordError,
    emailError,
    nameError,
    updateName,
    updateEmail,
    updatePassword,
    updatePhoneNumber,
    /*updateErrorValues,*/ updateFloatingMessage,
    updateEmailError,
    updatePasswordError,
    updatePhoneError,
    updateNameError,
  } = props;

  const onSignup = async () => {
    try {
      dispatch(updateFloatingMessage("")); // if not for this line, message won't change and
      //useEffect in floatingComponent won't render because useEffect renders upon change in dependency
      // i.e. message here. So, if you don't update floatingMessage here, message won't get updated,
      // no change in dependency (i.e. message here) and floatingComponent returns null.
      // So, it's important to update the floatingMessage to empty string.
      dispatch(updateNameError(""));
      dispatch(updateEmailError(""));
      dispatch(updatePasswordError(""));
      dispatch(updatePhoneError(""));

      const url = "https://foodorderappbackend.onrender.com/signup";
      const body = {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      };

      const response = await axios.post(url, { body });

      if (response.data.status === 200) {
        dispatch(updateFloatingMessage(response.data.message));
        navigate("/login");
      }

      dispatch(updateName(""));
      dispatch(updateEmail(""));
      dispatch(updatePassword(""));
      dispatch(updatePhoneNumber(""));
    } catch (err) {
      if (err.response.data.message === "duplicates") {
        dispatch(updateFloatingMessage(err.response.data.error));
      }
      if (err.response.data.message === "Validation error") {
        const errorMessage = err.response.data.errors;
        errorMessage.map((eachErr) => {
          const eachErrList = eachErr.split(":");

          if (eachErrList[0] === "name") {
            dispatch(updateNameError(eachErrList[1]));
          } else if (eachErrList[0] === "phoneNumber") {
            dispatch(updatePhoneError(eachErrList[1]));
          } else if (eachErrList[0] === "email") {
            dispatch(updateEmailError(eachErrList[1]));
          } else {
            // checking (eachErrList[0] === "password")
            dispatch(updatePasswordError(eachErrList[1]));
          }

          return null;
        });
        // Join the array of error messages into a single string
        //const errorMessage = err.response.data.errors.join(', ');
        // Dispatch the single error message
        //dispatch(updateErrorValues(errorMessage));
      }
    }
  };

  return (
    <div>
      <HeadersComponent />
      <div className="login-cart">
        <label className="login-heading">Name</label>
        <input
          className="login-input"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(event) => updateName(event.target.value)}
        />
        <p className="error">{nameError}</p>

        <label className="login-heading">Phone Number</label>
        <input
          className="login-input"
          placeholder="Enter your Phone Number"
          value={phoneNumber}
          onChange={(event) => updatePhoneNumber(event.target.value)}
        />
        <p className="error">{phoneError}</p>

        <label className="login-heading">Email</label>
        <input
          className="login-input"
          placeholder="Enter your Email"
          value={email}
          onChange={(event) => updateEmail(event.target.value)}
        />
        <p className="error">{emailError}</p>

        <label className="login-heading">Password</label>
        <input
          className="login-input"
          placeholder="Enter Valid Password"
          type="password"
          value={password}
          onChange={(event) => updatePassword(event.target.value)}
          onKeyDown={(event) => {
            if (event.keyCode === 13) onSignup();
          }}
        />
        <p className="error">{passwordError}</p>

        <button className="login-button" onClick={onSignup}>
          Sign Up
        </button>

        <FloatingMessage message={floatingMessage} />
      </div>
    </div>
  );
}
/*
 <p>{errorValues}</p> (above FloatingMessage in jsx)
*/
const mapStatetoProps = (state) => {
  const { state1, state2 } = state;

  return {
    name: state1.name,
    phoneNumber: state1.phoneNumber,
    email: state1.email,
    password: state1.password,
    // errorValues : state2.errorValues,
    floatingMessage: state2.floatingMessage,
    phoneError: state2.phoneError,
    emailError: state2.emailError,
    passwordError: state2.passwordError,
    nameError: state2.nameError,
  };
};

export default connect(mapStatetoProps, {
  updateName,
  updatePhoneNumber,
  updateEmail,
  updatePassword,
  updateErrorValues,
  updateFloatingMessage,
  updateEmailError,
  updatePasswordError,
  updatePhoneError,
  updateNameError,
})(SignUp);
