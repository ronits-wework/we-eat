import React from 'react';
import {BrowserRouter as Router, Route, BrowserRouter, Switch} from 'react-router-dom'
import RestaurantsApp from "../../RestaurantsApp/components/RestaurantsApp";
import PageHeader from "./PageHeader"

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
                    <PageHeader />
                    <Switch>
                        <Route exact={true} path={"/"}
                               render={() => (
                                   <RestaurantsApp />
                               )}/>
                        <Route render={() => (
                            <div className="error-page">
                                <h1>404 not found </h1>
                            </div>
                        )}/>
  /Sw               </Switch>
                </div>
            </Router>
        );
    }
}
