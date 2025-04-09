import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { updateRestaurantArray } from "./action";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import RestaurantDetailsComponent from "./restaurantDetailsComponent";
import HeadersComponent from "./headersComponent";
import "./restaurantDetailsComponent.css";

function RestaurantComponent(props) {
  const { restaurantName } = useParams();
  const { updateRestaurantArray, restaurantArray } = props;
  const dispatch = useDispatch();

  try {
    useEffect(() => {
      const getRestaurant = async () => {
        dispatch(updateRestaurantArray([]));
        const url = `https://foodorderappbackend.onrender.com/restaurant/${restaurantName}`;
        const response = await axios.get(url);

        const res = response.data.result;
        dispatch(updateRestaurantArray(res));
      };

      getRestaurant();
    }, [restaurantName, dispatch, updateRestaurantArray]);
  } catch (err) {
    console.debug("catch error in the restaurant compo", err);
  }

  return (
    <div>
      <HeadersComponent />
      <h1 style={{ textAlign: "center" }}>{restaurantName}</h1>
      <ul>
        {restaurantArray.map((each, index) => (
          <RestaurantDetailsComponent key={index} result={each} />
        ))}
      </ul>
      <Link to="/cart">
        <button className="gotoCartBtn">Go to Cart</button>
      </Link>
    </div>
  );
}

const mapStatetoProps = (state) => {
  const { restaurantArray } = state.state6;

  return {
    restaurantArray: restaurantArray,
  };
};

export default connect(mapStatetoProps, { updateRestaurantArray })(
  RestaurantComponent
);
