import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Actions from '../async/Actions';

class ProductDeleteUI extends React.Component {
    constructor(){
        super();
    }
	
    render(){
		let product = this.props.product;
		let actions = [
			<FlatButton
				label="キャンセル"
				primary={true}
				onTouchTap={this.props.onRequestClose}
			/>,
			<FlatButton
				label="削除"
				primary={true}
				onTouchTap={() => this.props.deleteProduct(product.id)}
			/>,
		];
		if(Object.keys(product).length === 0) return null;
		return (
			<Dialog
			  actions={actions}
			  modal={false}
			  open={this.props.open}
			  onRequestClose={this.props.onRequestClose}
			>
				{product.product_name}を削除しますか？
			</Dialog>
		);
    }
}

const mapStateToProps = (state) => {
	return {
		product: state.product
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		deleteProduct:
			(id) =>	{
				dispatch({type:"ADDLOADING"});
				Actions.deleteProductAsync(id)
				.then((response) => {
					let data = response.data;
					dispatch({type:"CLEAR_PRODUCT"});
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"商品の削除が完了しました。"});
					dispatch({type:"CLOSEDIALOG",payload:{dialog:"ProductDelete"}});
					document.location.href = "/#/";
					return Actions.getProductsAsync();
				})
				.then((response) => {
					let data = response.data;
					dispatch({type:"SET_PRODUCTS", payload:data});
				})
				.catch(() => {
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"商品の削除が失敗してしまいました。"});
					dispatch({type:"CLOSEDIALOG",payload:{dialog:"ProductDelete"}});
				});
			}
	}
}

const ProductDelete = connect(mapStateToProps, mapDispatchToProps)(ProductDeleteUI);
export default ProductDelete;