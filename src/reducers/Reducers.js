import {combineReducers} from 'redux';

const userInfoReducer = (state = null, action) => {
	console.debug(action);
	switch(action.type){
		case 'SET_USER':
			return action.payload;
	}
	return state;
}

const productsReducer = (state = [], action) => {
	switch(action.type){
		case 'SET_PRODUCTS':
			return action.payload;
	}
	return state;
}

const productReducer = (state = {}, action) => {
	switch(action.type){
		case 'SET_PRODUCT':
			return action.payload;
		case 'CLEAR_PRODUCT':
			return {};
	}
	return state;
}

const loadingReducer = (state = 0, action) => {
	switch(action.type){
		case 'ADDLOADING':
			return state + 1;
		case 'MINUSLOADING':
			state = state - 1;
			if(state < 0) state = 0;
			return state;
	}
	return state;
}

const dialogReducer = (state = null, action) => {
	switch(action.type){
		case 'OPENDIALOG':
			return action.payload.dialog;
		case 'CLOSEDIALOG':
			return null;
	}
	return state;
}

const snackbarReducer = (state = "", action) => {
	switch(action.type){
		case 'SHOWSNACKBAR':
			return action.payload;
	}
	return state;
}

const reducer = combineReducers({
	userinfo: userInfoReducer,
	products: productsReducer,
	product: productReducer,
	loading: loadingReducer,
	dialog: dialogReducer,
	snackbarmessage: snackbarReducer
});
export default reducer;