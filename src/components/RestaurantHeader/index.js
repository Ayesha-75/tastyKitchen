import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RestaurantHeader = props => {
  const {sortByOptions, activeOptionId, updateActiveOptionId} = props

  // const {displayText, id} = sortByOptions
  const onChangeSortby = event => {
    updateActiveOptionId(event.target.value)
  }

  return (
    <>
      <div className="text-center">
        <h1 className="home-heading">Popular Restaurants</h1>
        <div className="sorting-cont">
          <p className="home-para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="drop-down-box">
            <BsFilterLeft className="filter-icon" />
            <p className="sort-by">Sort By</p>
            <select
              value={activeOptionId}
              onChange={onChangeSortby}
              className="sort-by-select"
            >
              {sortByOptions.map(each => (
                <option key={each.id}>{each.displayText}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
export default RestaurantHeader
