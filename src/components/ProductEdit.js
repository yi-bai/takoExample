import React from 'react';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Actions from '../async/Actions';

class ProductEditUI extends React.Component {
    constructor(){
        super();
		this.state = {};
    }
	
	doEdit(){
		console.debug(this.state);
        let productName = this.state.productNameInput;
        let productPrice = this.state.productPriceInput;
		let productDescription = this.state.productDescriptionInput;
		let productImage = this.state.productImageInput;
		
		let productInfoChanged = {};
		if(productName) { productInfoChanged['product_name'] = productName; }
		if(productPrice) { productInfoChanged['product_price'] = productPrice; }
		if(productDescription) { productInfoChanged['product_description'] = productDescription; }
		if(productImage) { productInfoChanged['product_image'] = productImage; }
		
		console.debug(productInfoChanged);
		
        if(Object.keys(productInfoChanged).length){
			productInfoChanged['id'] = this.props.product.id;
			this.props.updateProduct(productInfoChanged);
		}
		
		this.state = {};
	}
	
	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		
		this.setState({[name]: value});
		console.debug(this.state);
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
				label="提出"
				primary={true}
				onTouchTap={this.doEdit.bind(this)}
			/>,
		];
		if(Object.keys(product).length === 0) return null;
		return (
			<Dialog
			  title={product.product_name+"を編集"}
			  actions={actions}
			  modal={false}
			  open={this.props.open}
			  onRequestClose={this.props.onRequestClose}
			>
				<TextField
					name="productNameInput"
					hintText={product.product_name}
					floatingLabelText="品名"
					floatingLabelFixed={true}
					onChange={this.handleInputChange.bind(this)}
				/> <br/>
				<TextField
					name="productPriceInput"
					hintText={product.product_price}
					floatingLabelText="価格"
					floatingLabelFixed={true}
					onChange={this.handleInputChange.bind(this)}
				/> <br/>
				<TextField
					name="productImageInput"
					hintText={"URLをここに貼り付けてください"}
					floatingLabelText="プロフィール画像URL"
					floatingLabelFixed={true}
					onChange={this.handleInputChange.bind(this)}
					multiLine={true}
					rows={2}
					rowsMax={4}
				/>
				{'productImageInput' in this.state ? <img style={{height:"30px"}} src={this.state.productImageInput}/> : null}
				<br/>
				<TextField
					name="productDescriptionInput"
					hintText={""}
					floatingLabelText="紹介"
					floatingLabelFixed={true}
					onChange={this.handleInputChange.bind(this)}
					multiLine={true}
					rows={2}
					rowsMax={4}
				/>

				<br/>
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
		updateProduct:
			(product) =>	{
				dispatch({type:"ADDLOADING"});
				Actions.updateProductAsync(product)
				.then((response) => {
					let data = response.data;
					dispatch({type:"SET_PRODUCT",payload:data});
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"商品のデータが編集しました。"});
					dispatch({type:"CLOSEDIALOG",payload:{dialog:"ProductEdit"}});
					return Actions.getProductsAsync();
				})
				.then((response) => {
					let data = response.data;
					dispatch({type:"SET_PRODUCTS", payload:data});
				})
				.catch(() => {
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"更新が失敗してしまいました。"});
					dispatch({type:"CLOSEDIALOG",payload:{dialog:"ProductEdit"}});
				});
			}
	}
}

const ProductEdit = connect(mapStateToProps, mapDispatchToProps)(ProductEditUI);
export default ProductEdit;