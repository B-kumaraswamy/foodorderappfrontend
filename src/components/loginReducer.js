const initialState = {
  email: "",
  password: "",
  loggedIn: false,
};

const loginReducer = (state3 = initialState, action) => {
  switch (action.type) {
    case "LoginEmail": {
      return {
        ...state3,
        email: action.payload,
      };
    }

    case "LoginPassword": {
      return {
        ...state3,
        password: action.payload,
      };
    }

    case "loggedIn": {
      return {
        ...state3,
        loggedIn: action.payload,
      };
    }

    default:
      return state3;
  }
};

export default loginReducer;
