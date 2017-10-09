import React from 'react';
import Restaurants from "./Restaurants";
import AddRestaurantForm from './AddRestaurant';
import SearchInput from 'react-search-input'
import Select from 'react-select';
import Slider from 'rc-slider';
import StarsRatingFilter from "../../StarsRating/components/StarsRatingFilter";
import CheckboxFilter from "../../Filters/components/CheckboxFilter"
import Modal from 'react-modal';


const MIN_RESTAURANT_FILTER_LENGTH = 2;
const MAX_DELIVERY_TIME = 120;
const DELIVERY_INTERVAL = 15;

const customStyles = {
    content: {
        top: '70px',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, 0)',
        height: '600px',
        width: '500px',
    }
};


export const MAX_RESTAURANT_RATING = 3;

export default class RestaurantsApp extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            displayedRestaurants: [],
            cuisineTypes: [],
            restaurantFilter: null,
            minRating: null,
            cuisineTypeFilter: null,
            maxSpeed: null,
            is10bisFilter: false,
            isKosherFilter: false,
            addRestModalIsOpen: false,
        };

        this.searchRestaurantUpdated = this.searchRestaurantUpdated.bind(this);
        this.cuisineTypeFiltered = this.cuisineTypeFiltered.bind(this);
        this.maxSpeedFiltered = this.maxSpeedFiltered.bind(this);
        this.minRatingFiltered = this.minRatingFiltered.bind(this);
        this.is10bisFiltered = this.is10bisFiltered.bind(this);
        this.isKosherFiltered = this.isKosherFiltered.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    static get deliveryTimes() {
        let times = [];
        const maxTime = MAX_DELIVERY_TIME;
        const interval = DELIVERY_INTERVAL;
        for (let i = 0; i <= maxTime; i += interval) {
            times.push(i);
        }
        return times;
    }

    componentDidMount() {
        fetch("/restaurants.json")
            .then(res => {
                return res.json();
            }).then((restaurants) => {
            this.setState({
                restaurants,
                displayedRestaurants: restaurants
            });
        });

        fetch("/cuisine_types.json")
            .then(res => {
                return res.json();
            }).then((cuisineTypes) => {
            this.setState({
                cuisineTypes
            });
        });
    }


    openModal() {
        this.setState({addRestModalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({addRestModalIsOpen: false});
    }


    searchRestaurantUpdated(term) {
        this.setState({restaurantFilter: term}, this.filterRestaurants);
    }

    cuisineTypeFiltered(cuisine) {
        this.setState({cuisineTypeFilter: cuisine}, this.filterRestaurants);
    }

    maxSpeedFiltered(time) {
        this.setState({maxSpeed: time}, this.filterRestaurants);
    }

    minRatingFiltered(minRating) {
        this.setState({minRating: minRating}, this.filterRestaurants);
    }

    is10bisFiltered(event) {
        this.setState({is10bisFilter: event.target.checked}, this.filterRestaurants);
    }

    isKosherFiltered(event) {
        this.setState({isKosherFilter: event.target.checked}, this.filterRestaurants);
    }

    filterRestaurants() {
        let restaurants = this.state.restaurants.slice();

        // filter by restaurant name
        if (this.state.restaurantFilter && this.state.restaurantFilter.length >= MIN_RESTAURANT_FILTER_LENGTH) {
            const restaurantFilter = this.state.restaurantFilter.toLowerCase();
            restaurants = restaurants.filter((restaurant) => {
                return (restaurant.name.toLowerCase().indexOf(restaurantFilter) >= 0);
            });
        }

        // filter by cuisine type
        if (this.state.cuisineTypeFilter) {
            const currCuisineId = this.state.cuisineTypeFilter.value;
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.cuisine_types.filter((cuisine) => {
                    return cuisine.id === currCuisineId;
                }).length > 0;
            });
        }

        // filter by max speed
        if (this.state.maxSpeed && this.state.maxSpeed > 0) {
            const currMaxSpeed = this.state.maxSpeed;
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.speed !== null && restaurant.speed <= currMaxSpeed;
            });
        }

        // filter by min rating
        if (this.state.minRating > 0) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.rating >= this.state.minRating;
            });
        }

        // filter by 10bis
        if (this.state.is10bisFilter > 0) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.accepts_10bis;
            });
        }

        // filter by kosher
        if (this.state.isKosherFilter > 0) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.kosher;
            });
        }

        this.setState({displayedRestaurants: restaurants});
    }

    render() {
        const sliderTimes = {};
        RestaurantsApp.deliveryTimes.map((time) => sliderTimes[time] = time);
        return (
            <div className="restaurants-app">
                <div className="top-part">
                    <h1 className="app-header">Eat What You Love</h1>
                    <div className="search-restaurants-wrapper">
                        <a onClick={this.openModal}
                           className="add-restaurant-btn">+</a>
                        <SearchInput className="search-input"
                                     placeholder="Search restaurants"
                                     onChange={this.searchRestaurantUpdated}/>
                    </div>


                    <Modal
                        isOpen={this.state.addRestModalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Add a Restaurant"
                        shouldCloseOnOverlayClick={false}
                    >
                        <AddRestaurantForm
                            cuisines={this.state.cuisineTypes.map((cuisine) => {
                                return {value: cuisine.id, label: cuisine.cuisine};
                            })}
                            onClose={this.closeModal}
                            deliveryTimes={RestaurantsApp.deliveryTimes.map((time) => {
                                return {value: time, label: time}
                            })}
                        />
                    </Modal>

                </div>

                <div className="restaurant-filters">
                    <Select
                        name="cuisine"
                        value={this.state.cuisineTypeFilter}
                        options={this.state.cuisineTypes.map((cuisine) => {
                            return {value: cuisine.id, label: cuisine.cuisine};
                        })}
                        onChange={this.cuisineTypeFiltered}
                        placeholder="Cuisine"
                    />
                    <div className="slider-wrapper">
                        <span>Delivery time limit (minutes)</span>
                        <Slider min={0}
                                max={MAX_DELIVERY_TIME}
                                step={DELIVERY_INTERVAL}
                                marks={sliderTimes}
                                onAfterChange={this.maxSpeedFiltered}/>
                    </div>
                    <div className="stars-rating-filter-wrapper">
                        <StarsRatingFilter
                            minRatingFiltered={this.minRatingFiltered}
                        />
                    </div>
                    <CheckboxFilter
                        onCheckChange={this.is10bisFiltered}
                        isChecked={this.state.is10bisFilter}
                        label={"Only 10bis"}
                        inputName={"is10bis"}
                    />
                    <CheckboxFilter
                        onCheckChange={this.isKosherFiltered}
                        isChecked={this.state.isKosherFilter}
                        label={"Only kosher"}
                        inputName={"isKosher"}
                    />
                </div>
                <div className="restaurants-wrapper">
                    <Restaurants restaurants={this.state.displayedRestaurants}/>
                </div>
                <div className="map-wrapper">
                </div>
            </div>
        );
    }
}
