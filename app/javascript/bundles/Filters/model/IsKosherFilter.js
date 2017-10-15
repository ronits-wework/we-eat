import RestaurantFilter, {RestaurantFilters} from './RestaurantFilter'

export default class IsKosherFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = RestaurantFilters.IS_KOSHER;
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
                return restaurant.kosher;
            });
        }
        return restaurants;
    }
}