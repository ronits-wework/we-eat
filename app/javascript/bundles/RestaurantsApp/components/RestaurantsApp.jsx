import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Switch } from 'react-router-dom'
import Restaurants from "../../Restaurants/components/Restaurants";

export default class RestaurantsApp extends React.Component {

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


    render() {
        return (
            <Router history={BrowserRouter}>
                <div>
                    <div className="header">
                        <h1>WeEat</h1>
                    </div>
                    <Switch>
                        <Route exact={true} path={"/"} render={() => <Restaurants {...this.props} />}/>
                        <Route render={() => <h1>404 not found </h1>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
