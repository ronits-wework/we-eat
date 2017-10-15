import RestaurantFilter, {RestaurantFilters} from './RestaurantFilter'

export default class Is10BisFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = RestaurantFilters.IS_10_BIS;
    }

    isFilterApplied(value) {
        return (value === true);
    }

    get defaultValue() {
        return false;
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.accepts_10bis;
            });
        }
        return restaurants;
    }
}