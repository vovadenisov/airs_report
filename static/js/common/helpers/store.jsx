import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';

export const configureStore = (reducers, initialState = {}, middlewareList = []) => {
    const defaultMiddlewareList = [apiMiddleware];
    let enhancer;
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancer = compose(
            applyMiddleware(...middlewareList, ...defaultMiddlewareList),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        );
    } else {
        enhancer = compose(
            applyMiddleware(...middlewareList, ...defaultMiddlewareList),
        );
    }

    return createStore(reducers, initialState, enhancer);
};
