const initialState = {
  restaurantArray: [],
};

const restaurantReducer = (state6 = initialState, action) => {
  switch (action.type) {
    case "restaurantArray": {
      return {
        ...state6,
        restaurantArray: action.payload,
      };
    }

    default:
      return state6;
  }
};

export default restaurantReducer;
