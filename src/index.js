import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {BrowserRouter, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import "./styles/js/index";
import combineReducers from "./reducers/index";
import getApi from "./middleware/token/get-api";
import getWithoutToken from "./middleware/without_token/get-api";
import putApi from "./middleware/token/put_api/put-api-with-body";
import putApiWithoutBody from "./middleware/token/put_api/put-api-without-body";
import deleteApi from "./middleware/token/delete/delete-api-without-body";
import deleteApiWithBody from "./middleware/token/delete/delete-api-with-body";
import postApi from "./middleware/token/post-api";
import postWithoutTOKEN from "./middleware/without_token/post-api";
import RouteComponent from './App';
import * as serviceWorker from './serviceWorker';

const createHistory = require("history").createBrowserHistory;

const history = createHistory();
const middleware = routerMiddleware(history);

export default createHistory({forceRefresh: true});

export const store = createStore(
    combineReducers,
    applyMiddleware(
        thunk,
        getApi,
        getWithoutToken,
        putApi,
        putApiWithoutBody,
        deleteApi,
        deleteApiWithBody,
        postApi,
        postWithoutTOKEN,
        middleware
    )
);

const Routing = (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={RouteComponent}/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(Routing, document.getElementById('root'));

serviceWorker.unregister();
