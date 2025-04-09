import "./dishComponent.css";
import { useNavigate } from "react-router-dom";

function DishComponent(props) {
  const navigate = useNavigate();
  const { imageUrl, dishName, category, restaurant } = props.result;

  const getRestaurant = (restaurant) => {
    navigate(`/restaurant/${restaurant}`);
  };

  return (
    <div>
      <li className="dish-list" onClick={() => getRestaurant(restaurant)}>
        <img src={imageUrl} alt="image1" />
        <div className="dish-details">
          <h1 className="dish-heading">{dishName}</h1>
          <p className="dish-category">{category}</p>
        </div>
      </li>
    </div>
  );
}

export default DishComponent;
