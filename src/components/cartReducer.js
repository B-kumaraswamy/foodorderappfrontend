const initialState = {
  items: {},
  cartList: [],
  grandTotal: 0,
};

const cartReducer = (state7 = initialState, action) => {
  switch (action.type) {
    case "updateQuantity": {
      return {
        // you have to return a state
        ...state7, // so destructure the state you want to return
        items: {
          //one such property which is an object in this state is items
          ...state7.items, // you have to update values in such object. Hence destructure the concerned object
          //id : action.payload.itemId,
          //quantity : action.payload.quantity
          [action.payload.itemId]: action.payload.quantity, //update the values
          /*
                    123 : 1
                    id : 123
                    quantity : 1
                    */
        },
      };
    }

    case "decreaseQuantity": {
      return {
        ...state7,
        items: {
          ...state7.items,
          [action.payload]: state7.items[action.payload] - 1,
        },
      };
    }

    case "increaseQuantity": {
      // console.log("increase quantity in the cart reducer", state7.items[action.payload]+1)
      return {
        ...state7,
        items: {
          ...state7.items,
          //[action.payload] : state7.items[action.payload] + 1
          [action.payload]: 1 + state7.items[action.payload],
        },
      };
    }

    case "updateCartList": {
      return {
        ...state7,
        cartList: action.payload,
      };
    }

    case "updateTotal": {
      return {
        ...state7,
        grandTotal: state7.grandTotal + action.payload,
      };
    }

    case "updateItems": {
      return {
        ...state7,
        items: {},
      };
    }

    default: {
      return state7;
    }
  }
};

export default cartReducer;

/*
const name =  {
    firstname : "john",
    lastname : "cena"
}

console.log(name.firstname)

name["firstname"] = "hello"
name["lastname"] = "seena"
console.log(name["firstname"])

console.log(name)
*/
