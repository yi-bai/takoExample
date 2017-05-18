import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';

import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import FlatButton from 'material-ui/FlatButton';

import Actions from '../async/Actions';

class ProductRowUI extends React.Component {
    constructor(){
        super();
    }

    render(){
      return (
		<TableRow>
			<TableRowColumn>{this.props.product.product_name}</TableRowColumn>
			<TableRowColumn>{this.props.product.product_price}</TableRowColumn>
			<TableRowColumn>{this.props.product.product_update_time}</TableRowColumn>
			<TableRowColumn>{this.props.product.product_create_time}</TableRowColumn>
			<TableRowColumn>
				<Link to={'/products/'+this.props.product.id}>
					<FlatButton label="詳細" primary={true} />
				</Link>
			</TableRowColumn>
			<TableRowColumn><FlatButton onClick={this.props.editProduct} label="編集" primary={true} /></TableRowColumn>
			<TableRowColumn><FlatButton onClick={this.props.deleteProduct} label="削除" secondary={true} /></TableRowColumn>
		</TableRow>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
	return {
		product: state.products[ownProps.index]
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		openDialog: (dialog) => {dispatch({type:"OPENDIALOG",payload:{dialog:dialog,id:ownProps.id}})},
		editProduct:
			() => {
				dispatch({type:"ADDLOADING"});
				Actions.getProductAsync(ownProps.id)
				.then((response) => {
					let data = response.data;
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SET_PRODUCT",payload:data});
					dispatch({type:"OPENDIALOG",payload:{dialog:"ProductEdit",id:ownProps.id}});
				});
			},
		deleteProduct:
			() => {
				dispatch({type:"ADDLOADING"});
				Actions.getProductAsync(ownProps.id)
				.then((response) => {
					let data = response.data;
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SET_PRODUCT",payload:data});
					dispatch({type:"OPENDIALOG",payload:{dialog:"ProductDelete",id:ownProps.id}});
				});
			}
	}
}

const ProductRow = connect(mapStateToProps, mapDispatchToProps)(ProductRowUI);
export default ProductRow;