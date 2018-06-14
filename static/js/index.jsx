import React from 'react';
import ReactDOM from 'react-dom';

import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { configureStore } from './common/helpers/store';
import { airportsReport } from './reducers';
import { Base } from './components/Base.jsx';
import '../css/bootstrap.min.css';
import '../css/base.css';


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
                    <Base />
                </ConnectedRouter>
            </Provider>,
            container,
        );
    }
}

renderReign();
