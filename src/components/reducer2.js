const inititalState = {
  /* errorValues : "",*/
  floatingMessage: "",
  phoneError: "",
  emailError: "",
  passwordError: "",
  nameError: "",
  nav: false,
};

const reducer2 = (state2 = inititalState, action) => {
  switch (action.type) {
    /*case "errorValues": {
            return {
                ...state2,
                errorValues : action.payload
            }
        }*/

    case "floatingMessage": {
      return {
        ...state2,
        floatingMessage: action.payload,
      };
    }

    case "emailError": {
      return {
        ...state2,
        emailError: action.payload,
      };
    }

    case "phoneError": {
      return {
        ...state2,
        phoneError: action.payload,
      };
    }

    case "passwordError": {
      return {
        ...state2,
        passwordError: action.payload,
      };
    }

    case "nameError": {
      return {
        ...state2,
        nameError: action.payload,
      };
    }

    case "setNav": {
      return {
        ...state2,
        nav: action.payload,
      };
    }

    default:
      return state2;
  }
};

export default reducer2;
