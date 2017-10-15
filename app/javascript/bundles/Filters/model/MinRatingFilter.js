import RestaurantFilter, {RestaurantFilters} from './RestaurantFilter'

export default class MinRatingFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = RestaurantFilters.MIN_RATING;
    }

    isFilterApplied(value) {
        return value !== null && value > 0;
    }

    get defaultValue() {
        return null;
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.rating >= value;
            });
        }
        return restaurants;
    }
}