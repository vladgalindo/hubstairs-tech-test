import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Dashboard} from '../components/dashboard';
import {Music} from '../components/music';
import {Prime} from '../components/prime';
import {Graph} from '../components/graph';
import {NotFound} from '../components/not-found';

export const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/music" component={Music}/>
            <Route path="/prime" component={Prime}/>
            <Route path="/graph" component={Graph}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);
