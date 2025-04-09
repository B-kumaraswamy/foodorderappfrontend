export const updateName = (name) => {
  return {
    type: "name",
    payload: name,
  };
};

export const updatePhoneNumber = (phoneNumber) => {
  return {
    type: "phoneNumber",
    payload: phoneNumber,
  };
};

export const updateEmail = (email) => {
  return {
    type: "email",
    payload: email,
  };
};

export const updatePassword = (password) => {
  return {
    type: "password",
    payload: password,
  };
};

export const updateErrorValues = (error) => {
  return {
    type: "errorValues",
    payload: error,
  };
};

export const updateNav = (value) => {
  return {
    type: "setNav",
    payload: value,
  };
};

export const updateFloatingMessage = (message) => {
  return {
    type: "floatingMessage",
    payload: message,
  };
};

export const updatePhoneError = (message) => {
  return {
    type: "phoneError",
    payload: message,
  };
};

export const updateEmailError = (message) => {
  return {
    type: "emailError",
    payload: message,
  };
};

export const updatePasswordError = (message) => {
  return {
    type: "passwordError",
    payload: message,
  };
};

export const updateNameError = (message) => {
  return {
    type: "nameError",
    payload: message,
  };
};

export const updateLoginEmail = (email) => {
  return {
    type: "LoginEmail",
    payload: email,
  };
};

export const updateLoginPassword = (password) => {
  return {
    type: "LoginPassword",
    payload: password,
  };
};

export const uploadFile = (file) => {
  return {
    type: "uploadFile",
    payload: file,
  };
};

export const updateLoggedIn = (status) => {
  return {
    type: "loggedIn",
    payload: status,
  };
};

export const updateDishArray = (resultArray) => {
  return {
    type: "resDishArray",
    payload: resultArray,
  };
};

export const updateInputValue = (value) => {
  return {
    type: "inputValue",
    payload: value,
  };
};

export const updateRestaurantArray = (restaurantArray) => {
  return {
    type: "restaurantArray",
    payload: restaurantArray,
  };
};

export const updateQuantity = (itemId, quantity) => {
  return {
    type: "updateQuantity",
    payload: {
      itemId,
      quantity,
    },
  };
};

export const decreaseQuantity = (itemId) => {
  return {
    type: "decreaseQuantity",
    payload: itemId,
  };
};

export const increaseQuantity = (itemId) => {
  return {
    type: "increaseQuantity",
    payload: itemId,
  };
};

export const updateCartList = (cart) => {
  return {
    type: "updateCartList",
    payload: cart,
  };
};

export const updateTotal = (total) => {
  return {
    type: "updateTotal",
    payload: total,
  };
};

export const updateItems = () => {
  return {
    type: "updateItems",
  };
};

/*
In the context provided, passing only the itemId as an argument to the increaseQuantity and decreaseQuantity actions makes sense if you want to specifically target the quantity of a particular item identified by its unique itemId.

When the user interacts with the UI to increase or decrease the quantity of an item, they usually do so by clicking buttons or performing some action associated with a specific item. In this scenario, the itemId is sufficient to identify which item's quantity needs to be updated.

By passing only the itemId, you keep the actions simple and decoupled from the specific implementation details of the quantity state. It allows for better abstraction and reusability, as the same action creators can be used across different components or scenarios where only the itemId is needed to perform the quantity update.
*/
