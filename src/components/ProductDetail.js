import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';

import Actions from '../async/Actions';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class ProductDetailUI extends React.Component {
    constructor(){
        super();
    }
	
	componentDidMount(){
		this.props.getProduct();
	}
	
	componentWillUnmount(){
		this.props.clearProduct();
	}

    render(){
	  let detail = null;
	  if('id' in this.props.product){
		  let product = this.props.product;
		  detail = (
			<Card>
				<CardMedia
					overlay={<CardTitle title={product.product_name} subtitle={product.id} />}
				>
					<img src={product.product_image} />
				</CardMedia>
				<CardTitle title={product.product_price+'円'} subtitle={'アップロード時間： '+product.product_create_time} />
				<CardText>
					{product.product_description}
				</CardText>
				<CardActions>
					<FlatButton
						label="編集"
						primary={true}
						onTouchTap={() => this.props.openDialog("ProductEdit")}
					/>
					<FlatButton
						label="削除"
						secondary={true}
						onTouchTap={() => this.props.openDialog("ProductDelete")}
					/>
				</CardActions>
			</Card>
		  );
	  }
      return (
		<div style={{width:"300px"}}>
			<Link to="/">
				<FlatButton label="戻る" primary={true}　onTouchTap={this.props.backToList} />
			</Link>
			{detail}
		</div>
      );
    }
}

const mapStateToProps = (state) => {
	return {
		product: state.product
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	console.debug(ownProps);
	return {
		getProduct:
			() =>	{
				dispatch({type:"ADDLOADING"});
				dispatch({type:"SET_PRODUCT",payload:{}});
				Actions.getProductAsync(ownProps.params.id)
				.then((response) => {
					let data = response.data;
					dispatch({type:"SET_PRODUCT",payload:data});
					dispatch({type:"MINUSLOADING"});
				})
				.catch(() => {
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"失敗してしまいました。"});
				});
			},
		openDialog: (dialog) => {dispatch({type:"OPENDIALOG",payload:{dialog:dialog,id:ownProps.params.id}})},
		clearProduct: () => dispatch({type:"CLEAR_PRODUCT"})
	}
}

const ProductDetail = connect(mapStateToProps, mapDispatchToProps)(ProductDetailUI);
export default ProductDetail;