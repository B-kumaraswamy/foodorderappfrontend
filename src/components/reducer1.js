const inititalState = {
  name: "",
  phoneNumber: "",
  email: "",
  password: "",
};

const reducer1 = (state1 = inititalState, action) => {
  switch (action.type) {
    case "name": {
      return {
        ...state1,
        name: action.payload,
      };
    }

    case "phoneNumber": {
      return {
        ...state1,
        phoneNumber: action.payload,
      };
    }

    case "email": {
      return {
        ...state1,
        email: action.payload,
      };
    }

    case "password": {
      return {
        ...state1,
        password: action.payload,
      };
    }

    default: {
      return state1;
    }
  }
};

export default reducer1;
