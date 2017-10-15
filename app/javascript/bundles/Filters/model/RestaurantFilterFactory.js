import {RestaurantFilters} from './RestaurantFilter';
import RestaurantNameFilter from './RestaurantNameFilter';
import MinRatingFilter from './MinRatingFilter';
import CuisineTypeFilter from './CuisineTypeFilter';
import MaxSpeedFilter from './MaxSpeedFilter';
import Is10BisFilter from './Is10BisFilter';
import IsKosherFilter from './IsKosherFilter';

export default function RestaurantFilterFactory(filterType) {
    switch(filterType) {
        case RestaurantFilters.RESTAURANT_NAME:
            return new RestaurantNameFilter();
            break;
        case RestaurantFilters.MIN_RATING:
            return new MinRatingFilter();
            break;
        case RestaurantFilters.CUISINE_TYPE:
            return new CuisineTypeFilter();
            break;
        case RestaurantFilters.MAX_SPEED:
            return new MaxSpeedFilter();
            break;
        case RestaurantFilters.IS_10_BIS:
            return new Is10BisFilter();
            break;
        case RestaurantFilters.IS_KOSHER:
            return new IsKosherFilter();
            break;
    }
}
