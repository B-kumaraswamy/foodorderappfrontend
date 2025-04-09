const initialState = {
  file: null,
};

const adminReducer = (state4 = initialState, action) => {
  switch (action.type) {
    case "uploadFile": {
      return {
        ...state4,
        file: action.payload,
      };
    }

    default:
      return state4;
  }
};

export default adminReducer;
