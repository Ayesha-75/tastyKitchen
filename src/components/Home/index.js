import {Component} from 'react'
import Slider from 'react-slick'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
// import {MdOutlineSort} from 'react-icons/md'
// import {BsFilterLeft, BsCaretDownFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
// import Popup from 'reactjs-popup'
// import {Pagination} from '@mui/material'
import Counter from '../Counter'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantItem from '../RestaurantItem'
import RestaurantHeader from '../RestaurantHeader'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// const limit = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    offersList: [],
    restaurantApiStatus: restaurantsApiStatusConstants.initial,
    restaurantsList: [],
    activePage: 1,
    isLoading: false,
    activeOptionId: sortByOptions[1].id,
  }

  componentDidMount() {
    this.getOffersList()
    this.getAllRestaurantsList()
  }

  getAllRestaurantsList = async () => {
    const {activeOptionId, activePage} = this.state
    this.setState({
      restaurantApiStatus: restaurantsApiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const LIMIT = 9
    const offset = (activePage - 1) * LIMIT
    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${activeOptionId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedList = data.restaurants.map(each => ({
        id: each.id,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          totalReviews: each.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsList: updatedList,
        restaurantApiStatus: restaurantsApiStatusConstants.success,
      })
    } else {
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.failure,
      })
    }
  }

  getActivePage = page => {
    this.setState({activePage: page}, this.getAllRestaurantsList)
  }

  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getAllRestaurantsList)
  }

  // onChangeSortby = event => {
  //   updateActiveOptionId(event.target.value)
  // }

  // onHighestSort = () => {
  //   this.setState({sortType: 'Highest'})
  //   this.getAllRestaurantsList('Highest')
  // }

  // onLowestSort = () => {
  //   this.setState({sortType: 'Lowest'})
  //   this.getAllRestaurantsList('Lowest')
  // }

  // onChangePage = (e, value) => {
  //   value === undefined
  //     ? localStorage.setItem('curr_page', 1)
  //     : localStorage.setItem('curr_page', value)
  //   this.setState({currPg: value})
  //   this.getAllRestaurantsList(value)
  // }

  getOffersList = async () => {
    this.setState({
      isLoading: true,
    })
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        offersList: updatedData,
        isLoading: false,
      })
    }
  }

  renderCarouselsView = () => {
    const {offersList} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className="carousel-box">
        <Slider {...settings}>
          {offersList.map(each => (
            <img
              src={each.imageUrl}
              alt="offer"
              key={each.id}
              className="slide-imgs"
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderOffersLoader = () => (
    <div testid="restaurants-offers-loader" className="loader-container">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderResListLoader = () => (
    <div testid="restaurants-list-loader" className="loader-container">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantsList = () => {
    const {restaurantsList, activeOptionId} = this.state
    return (
      <>
        <RestaurantHeader
          activeOptionId={activeOptionId}
          sortByOptions={sortByOptions}
          updateActiveOptionId={this.updateActiveOptionId}
        />
        <hr className="hr-line" />
        <ul className="res-list-items">
          {restaurantsList.map(eachResItem => (
            <RestaurantItem itemDetails={eachResItem} key={eachResItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderRestaurantsView = () => {
    const {restaurantApiStatus} = this.state
    switch (restaurantApiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderRestaurantsList()
      case restaurantsApiStatusConstants.inProgress:
        return this.renderResListLoader()
      default:
        return null
    }
  }

  render() {
    // const page = localStorage.getItem('curr_page')
    // const currPg = page === null ? 1 : parseInt(page)
    const {isLoading} = this.state
    // const lowestSortClass =
    //   sortType === 'Lowest' ? 'sort-option selected' : 'sort-option'
    // const highestSortClass =
    //   sortType === 'Highest' ? 'sort-option selected' : 'sort-option'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="container">
            {isLoading ? this.renderOffersLoader() : this.renderCarouselsView()}
          </div>

          <div testid="restaurant-item" className="restaurants-box">
            {this.renderRestaurantsView()}
          </div>
        </div>
        <div className="pagination" testid="active-page-number">
          <Counter pageChangeFunction={this.getActivePage} />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
