import React from 'react';
import {BrowserRouter as Router, Route, BrowserRouter, Switch} from 'react-router-dom'
import RestaurantsApp from "../../RestaurantsApp/components/RestaurantsApp";
import PageHeader from "./PageHeader"

const App = () => {
    return (
        <Router history={BrowserRouter}>
            <div>
                <PageHeader/>
                <Switch>
                    <Route exact={true} path={"/"}
                           render={() => (
                               <RestaurantsApp/>
                           )}/>
                    <Route render={() => (
                        <div className="error-page">
                            <h1>404 not found </h1>
                        </div>
                    )}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;