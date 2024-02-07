import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {itemDetails} = props
  const {id, name, cuisine, userRating, imageUrl} = itemDetails
  const {rating, ratingColor, totalReviews} = userRating

  return (
    <Link
      to={`/restaurants-list/${id}`}
      className="underline"
      testid="restaurant-item"
    >
      <li className="restaurant-item" data-testid="restaurant-item">
        <img
          src={imageUrl}
          alt="restaurant"
          className="rest-image"
          testid="restaurant-item"
        />
        <div className="rest-details">
          <h1 className="rest-name" test-id="restaurant-item">
            {name}
          </h1>
          <p className="rest-type" testid="restaurant-item">
            {cuisine}
          </p>
          <div className="rating-box">
            <AiFillStar color={ratingColor} />
            <p className="rating" testid="restaurant-item">
              {rating}
            </p>
            <h1
              className="total-ratings"
              testid="restaurant-item"
            >{`(${totalReviews} ratings)`}</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
