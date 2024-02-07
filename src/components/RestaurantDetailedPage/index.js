import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import FoodItems from '../FoodItems'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetailedPage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantDetails: {},
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items.map(e => ({
          id: e.id,
          cost: e.cost,
          foodType: e.food_type,
          imageUrl: e.image_url,
          name: e.name,
          rating: e.rating,
        })),
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }

      this.setState({
        restaurantDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div testid="restaurant-details-loader" className="loader-container">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantDetails = () => {
    const {restaurantDetails} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantDetails
    const {foodItems} = restaurantDetails
    return (
      <>
        <div className="rest-banner-box" alt="foodItem">
          <div className="rest-image-details">
            <img src={imageUrl} alt="restaurant" className="rest-d-image" />
            <div className="rest-d-details">
              <h1 className="rest-d-name">{name}</h1>
              <p className="rest-d-cuisine">{cuisine}</p>
              <p className="rest-d-location">{location}</p>
              <div className="rest-d-rating-costfortwo-box">
                <div className="rest-review-rating-box">
                  <div className="rest-d-rating-box">
                    <AiFillStar color="#ffffff" />
                    <p className="rest-d-rating">{rating}</p>
                  </div>
                  <p className="rest-d-reviews-count">
                    {reviewsCount}+ Ratings
                  </p>
                </div>
                <h1 className="rest-d-separation-pipe">|</h1>
                <div className="rest-d-costfortwo-box">
                  <p className="rest-d-costfortwo-amount">
                    <BiRupee /> {costForTwo}
                  </p>
                  <p className="rest-d-costfortwo-text">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(eachItem => (
            <FoodItems
              foodItemDetails={eachItem}
              restaurantName={name}
              key={eachItem.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderRestauarantDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="rest-details-container">
          <div className="rest-details-responsive-box">
            {this.renderRestauarantDetailsView()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetailedPage
