import PropTypes from 'prop-types';
import React from 'react';
import {BrowserRouter as Router, Route, BrowserRouter, Switch} from 'react-router-dom'
import Restaurants from "../../Restaurants/components/Restaurants";


export default class RestaurantsApp extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);

        this.state = {
            restaurants: []
        };
    }

    componentDidMount() {
        fetch("/restaurants.json")
            .then(res => {
                return res.json();
            }).then((restaurants) => {
            this.setState({restaurants});
        });
    }

    render() {
        return (
            <Router history={BrowserRouter}>
                <div>
                    <div className="header">
                        <h1>WeEat</h1>
                    </div>
                    <Switch>
                        <Route exact={true} path={"/"}
                               render={() => <Restaurants restaurants={this.state.restaurants}/>}/>
                        <Route render={() => <h1>404 not found </h1>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
