import RestaurantFilter, {RestaurantFilters} from './RestaurantFilter'

export default class RestaurantNameFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = RestaurantFilters.RESTAURANT_NAME;
    }

    isFilterApplied(value) {
        return value !== null && value.length > 0;
    }

    get defaultValue() {
        return "";
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            const lValue = value.toLowerCase();
            restaurants = restaurants.filter((restaurant) => {
                return (restaurant.name.toLowerCase().indexOf(lValue) >= 0);
            });
        }
        return restaurants;
    }
}