import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import { connect, Provider } from 'react-redux'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RabobaiHeader from './components/RabobaiHeader';
import RabobaiFooter from './components/RabobaiFooter';
import RabobaiDialog from './components/RabobaiDialog';
import RabobaiSnackbar from './components/RabobaiSnackbar';

import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

import reducer from './reducers/Reducers';

const store = createStore(reducer, applyMiddleware(promiseMiddleware))
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
	<MuiThemeProvider>
	<Provider store={store}>
	<div>
		<RabobaiHeader/>
		<Router history={hashHistory}>
			<Route path="/" component={ProductList} />
			<Route path="/products/:id" component={ProductDetail} />
		</Router>
		<RabobaiFooter/>
		<RabobaiDialog/>
		<RabobaiSnackbar/>
	</div>
	</Provider>
	</MuiThemeProvider>,
	rootEl
)

render()