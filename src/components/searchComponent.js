import HeadersComponent from "./headersComponent";
import axios from "axios";
import Cookie from "js-cookie";
import "./searchComponent.css";
import { connect } from "react-redux";
import {
  updateDishArray,
  updateFloatingMessage,
  updateInputValue,
} from "./action";
import { useDispatch } from "react-redux";
import DishComponent from "./dishComponent";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import FloatingMessage from "./floatingComponent";
function SearchComponent(props) {
  const token = Cookie.get("jwt_token");

  const {
    dishArray,
    inputValue,
    updateDishArray,
    updateInputValue,
    floatingMessage,
  } = props;
  const dispatch = useDispatch();
  const { dishName } = useParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState(false);

  const handleChange = useCallback(
    (value) => {
      dispatch(updateInputValue(value));

      const handleSearch = async (name) => {
        dispatch(updateDishArray([]));
        dispatch(updateFloatingMessage(""));
        if (name.trim() !== "") {
          try {
            const url = `https://foodorderappbackend.onrender.com/search/${name}`;
            const response = await axios.get(url);

            if (response.data.status === 200) {
              dispatch(updateDishArray(response.data.message));
            }
          } catch (err) {
            if (err.response.data.status === 404) {
              setTimeout(() => {
                dispatch(updateFloatingMessage(err.response.data.message));
              }, 1000);
            } else {
              console.debug(err);
            }
          }
        }
      };
      handleSearch(value);
    },
    [dispatch, updateDishArray, updateInputValue]
  );

  useEffect(() => {
    if (dishName) {
      handleChange(dishName);
    }
  }, [dishName, handleChange]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      //dispatch(updateInputValue(""))

      setUrl(true);
    } else {
      dispatch(updateInputValue(inputValue));
    }
  }, [inputValue, dispatch, updateInputValue]);

  useEffect(() => {
    if (url === true && inputValue.trim() === "") {
      navigate("/");

      setUrl(false);
    }
  }, [inputValue, url, navigate, updateInputValue, dispatch]);

  const renderContent = () => {
    if (inputValue === "" && token !== undefined) {
      return (
        <div>
          <HeadersComponent />
          <div className="body">
            <div className="search">
              <input
                type="search"
                placeholder="Search for Dishes"
                value={inputValue}
                className="search-width"
                onChange={(event) => handleChange(event.target.value)}
              />
            </div>
            <h3>Popular Cuisines</h3>
            <div className="cuisines-list">
              <div className="cuisine-item">
                <Link to="/dish/dessert">
                  <div>
                    <img
                      alt="image1"
                      className="cuisine-image"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8NIiQ3p-TNS6be9ty2Mmh9NAmaS9CPLajLg&usqp=CA"
                    />
                    <p className="dish-name">Dessert</p>
                  </div>
                </Link>
              </div>
              <div className="cuisine-item">
                <Link to="/dish/biryani">
                  <div>
                    <img
                      alt="image2"
                      className="cuisine-image"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL64QU2oeAYPk289-33qxDbTyU6m0R6o13TQ&usqp=CAU"
                    />
                    <p className="dish-name">Biryani</p>
                  </div>
                </Link>
              </div>
              <div className="cuisine-item">
                <Link to="/dish/milkshake">
                  <div>
                    <img
                      alt="image3"
                      className="cuisine-image"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAH-OEPw1P3LaoAWvx7I1vyclxopJ1Cjq08w&usqp=CAU"
                    />
                    <p className="dish-name">Milkshake</p>
                  </div>
                </Link>
              </div>
              <div className="cuisine-item">
                <Link to="/dish/cake">
                  <div>
                    <img
                      alt="image4"
                      className="cuisine-image"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSldf-LgnL3a-zE3oNCHE0eu0NXvaatfB57KQ&usqp=CAU"
                    />
                    <p className="dish-name">Cake</p>
                  </div>
                </Link>
              </div>
              <div className="cuisine-item">
                <Link to="/dish/rolls">
                  <div>
                    <img
                      alt="image5"
                      className="cuisine-image"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrOqbiPAvURqZILlHRYd3YXuFHQi2Iu1A_w&usqp=CAU"
                    />
                    <p className="dish-name">Rolls</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (token === undefined) {
      return <Navigate to="/login" />;
    } else {
      return (
        <div>
          <HeadersComponent />
          <div className="body">
            <div className="search">
              <input
                type="search"
                placeholder="Search for Dishes"
                value={inputValue}
                className="search-width"
                onChange={(event) => handleChange(event.target.value)}
              />
            </div>
            <ul>
              {dishArray.map((eachDish) => (
                <DishComponent key={eachDish._id} result={eachDish} />
              ))}
            </ul>
            <FloatingMessage message={floatingMessage} />
          </div>
        </div>
      );
    }
  };

  return renderContent();
}

const mapStatetoProps = (state) => {
  const { dishArray, inputValue } = state.state5;
  const { floatingMessage } = state.state2;
  return {
    dishArray: dishArray,
    inputValue: inputValue,
    floatingMessage: floatingMessage,
  };
};

export default connect(mapStatetoProps, {
  updateDishArray,
  updateInputValue,
  updateFloatingMessage,
})(SearchComponent);

/*
In the provided code, useCallback is used to memoize the handleChange function. Let's break down what useCallback does and why it's used in this context:

Preventing unnecessary function recreations: When a component renders, all of its functions are recreated. If these functions are used as dependencies in useEffect or other hooks, it can lead to unnecessary re-execution of those hooks, which can impact performance. By using useCallback, we can memoize the function so that it's only recreated if its dependencies change.

Dependency management: In the useCallback hook, the second argument is an array of dependencies. These dependencies are used to determine when the function should be recreated. If any of the dependencies change, the function will be recreated. In this case, the dependencies are dispatch, home, and updateInputValue.

Stability for useEffect: In the useEffect hook, we use the handleChange function as a dependency. By memoizing handleChange with useCallback, we ensure that the reference to the function remains stable between renders. This prevents the useEffect hook from re-running unnecessarily when handleChange changes.

So, in summary, useCallback ensures that the handleChange function is only recreated if its dependencies change, providing stability for hooks like useEffect and preventing unnecessary re-renders.



I see your concern. Placing API calls inside the useCallback hook might not be the best practice in all cases. The reason I included it there in my previous explanation was to ensure that the handleChange function is stable and memoized, as useCallback is primarily used to memoize functions and prevent unnecessary re-renders.

However, placing API calls inside the useCallback hook might not be suitable if you want to ensure that the API call happens only when certain dependencies change. In such cases, it's better to separate the API call logic from the callback function.

Here's how you could refactor your code to separate the API call from the handleChange function:

const handleChange = useCallback((value) => {
    dispatch(updateInputValue(value));
}, [dispatch]);

const handleSearch = useCallback(async (name) => {
    dispatch(updateDishArray([]));
    if (name.trim() !== "") {
        try {
            const url = `https://foodorderappbackend.onrender.com/search/${name}`;
            const response = await axios.get(url);
            dispatch(updateDishArray(response.data.message));
        } catch (err) {
            console.log(err);
        }
    }
}, [dispatch, updateDishArray]);

useEffect(() => {
    if (dishName) {
        console.log("inside dishName useeffect", dishName);
        handleSearch(dishName);
    }
}, [dishName, handleSearch]);

*/
