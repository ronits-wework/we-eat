import RestaurantFilter, {RestaurantFilters} from './RestaurantFilter'

export default class CuisineTypeFilter extends RestaurantFilter {
    constructor() {
        super();
        this.filterType = RestaurantFilters.CUISINE_TYPE;
    }

    isFilterApplied(value) {
        return value !== null && value.label.length > 0;
    }

    get defaultValue() {
        return null;
    }

    filter(restaurants, value) {
        if (this.isFilterApplied(value)) {
            const currCuisineId = value.value;
            restaurants = restaurants.filter((restaurant) => {
                return restaurant.cuisine_types.filter((cuisine) => {
                    return cuisine.id === currCuisineId;
                }).length > 0;
            });
        }
        return restaurants;
    }
}