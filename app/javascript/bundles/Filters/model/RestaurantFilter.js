
export const RestaurantFilters = Object.freeze({
    RESTAURANT_NAME: Symbol("restaurantName"),
    MIN_RATING: Symbol("minRating"),
    CUISINE_TYPE: Symbol("cuisineType"),
    MAX_SPEED: Symbol("maxSpeed"),
    IS_10_BIS: Symbol("is10Bis"),
    IS_KOSHER: Symbol("isKosher"),
});

export default class RestaurantFilter {
    constructor() {
        this.filterType = null;
    }

    isFilterApplied(value) {
        return value !== null;
    }

    get defaultValue() {
        return null;
    }

    getFilterType() {
        return this.filterType;
    }

    filter(restaurants) {
        return restaurants;
    }
}