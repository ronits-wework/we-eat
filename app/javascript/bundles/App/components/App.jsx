import React from 'react';
import {BrowserRouter as Router, Route, BrowserRouter, Switch} from 'react-router-dom'
import RestaurantsApp from "../../RestaurantsApp/components/RestaurantsApp";


export default class App extends React.Component {

    /**
     * @param props - Comes from your rails view.
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={BrowserRouter}>
                <div>
                    <Switch>
                        <Route exact={true} path={"/"}
                               render={() => (
                                   <RestaurantsApp />
                               )}/>
                        <Route render={() => <h1>404 not found </h1>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
