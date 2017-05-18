import React from 'react';
import { connect } from 'react-redux';

import Actions from '../async/Actions';

import ProductHeader from './ProductHeader';
import ProductRow from './ProductRow';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class ProductListUI extends React.Component {
    constructor(){
        super();
    }
	
	componentDidMount(){
		this.props.getProductList();
	}

    render(){
	  let trProducts = this.props.products.map((product, index) =>
		<ProductRow index={index} id={product.id}/>
		);
		
      return (
		<div>
			<ProductHeader/>
			<Table>
				<TableBody>
					{trProducts}
				</TableBody>
			</Table>
		</div>
      );
    }
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getProductList:
			() =>	{
				dispatch({type:"ADDLOADING"});
				Actions.getProductsAsync()
				.then((response) => {
					let data = response.data;
					dispatch({type:"SET_PRODUCTS",payload:data});
					dispatch({type:"MINUSLOADING"});
				})
				.catch(() => {
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"製品の獲得が失敗してしまいました。"});
				});
			},
	}
}

const ProductList = connect(mapStateToProps, mapDispatchToProps)(ProductListUI);
export default ProductList;