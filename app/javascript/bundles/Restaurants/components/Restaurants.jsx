import PropTypes from 'prop-types';
import React from 'react';

export default class Restaurants extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

        // How to set initial state in ES6 class syntax
        // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
        //this.state = { restaurants: this.props.restaurants };
    }

    // updateName = (name) => {
    //     this.setState({ name });
    // };
    static propTypes = {
        restaurants: PropTypes.array.isRequired,
    };

    render() {
        const restaurantList = this.props.restaurants.map((restaurant) => {
            return (
                <tr key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.address}</td>
                    <td>{restaurant.rating}</td>
                    <td>{restaurant.speed}</td>
                    <td>{restaurant.accepts_10bis}</td>
                </tr>
            )
        });
        return (
            <div>
                <h1>
                    Restaurants
                </h1>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Rating</th>
                        <th>Speed</th>
                        <th>Accepts 10bis</th>
                    </tr>
                    </thead>
                    <tbody>{restaurantList}</tbody>

                </table>
            </div>
        );
    }
}
