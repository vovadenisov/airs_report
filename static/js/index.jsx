import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { configureStore } from './common/helpers/store';
import { AirportList } from './components/AirportList';
import { AirportReport } from './components/AirportReport';
import '../css/base.css';
import { airportsReport } from './reducers';
import { PageNotFound } from './common/components/PageNotFound'


function renderReign() {
    const containers = document.getElementsByClassName('js-container');
    const reducers = combineReducers({
        router: routerReducer,
        airportsReport: airportsReport,
    });
    const history = createHistory();
    const middleware = routerMiddleware(history);
    const store = configureStore(reducers, {}, [middleware]);
    for (const container of Array.from(containers)) {
        ReactDOM.render(
            <Provider
                store={ store }
            >
                <ConnectedRouter history={ history }>
                    <Switch>
                        <Route exact path='/:id/' component={ AirportReport } />
                        <Route exact path='/' component={ AirportList } />
                        <Route path="*" component={ PageNotFound } />
                    </Switch>
                </ConnectedRouter>
            </Provider>,
            container,
        );
    }
}

renderReign();
