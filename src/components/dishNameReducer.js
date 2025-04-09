const initialState = {
  dishArray: [],
  inputValue: "",
};

const dishNameReducer = (state5 = initialState, action) => {
  switch (action.type) {
    case "resDishArray": {
      return {
        ...state5,
        dishArray: action.payload,
      };
    }

    case "inputValue": {
      return {
        ...state5,
        inputValue: action.payload,
      };
    }

    default:
      return state5;
  }
};

export default dishNameReducer;
