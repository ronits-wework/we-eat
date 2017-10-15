import RestaurantFilter, {RestaurantFilters} from './RestaurantFilter'

export default class MaxSpeedFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = RestaurantFilters.MAX_SPEED;
    }

    isFilterApplied(value) {
        return value !== null && value > 0;
    }

    get defaultValue() {
        return 0;
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            const currMaxSpeed = value;
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.speed !== null && restaurant.speed <= currMaxSpeed;
            });
        }
        return restaurants;
    }
}