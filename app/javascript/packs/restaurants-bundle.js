import ReactOnRails from 'react-on-rails';

import Restaurants from '../bundles/RestaurantsApp/components/Restaurants';
import RestaurantsApp from '../bundles/RestaurantsApp/components/RestaurantsApp';

// This is how react_on_rails can see the Restaurants in the browser.
ReactOnRails.register({
    RestaurantsApp,
    Restaurants
});
