import React from 'react';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Actions from '../async/Actions';

class ProductCreateUI extends React.Component {
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
			this.props.createProduct(productInfoChanged);
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
		let actions = [
			<FlatButton
				label="キャンセル"
				primary={true}
				onTouchTap={this.props.onRequestClose}
			/>,
			<FlatButton
				label="追加"
				primary={true}
				onTouchTap={this.doEdit.bind(this)}
			/>,
		];
		return (
			<Dialog
			  title={"商品の登録"}
			  actions={actions}
			  modal={false}
			  open={this.props.open}
			  onRequestClose={this.props.onRequestClose}
			>
				<TextField
					name="productNameInput"
					floatingLabelText="品名"
					floatingLabelFixed={true}
					onChange={this.handleInputChange.bind(this)}
				/> <br/>
				<TextField
					name="productPriceInput"
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
	return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		createProduct:
			(product) =>	{
				dispatch({type:"ADDLOADING"});
				Actions.createProductAsync(product)
				.then((response) => {
					let data = response.data;
					dispatch({type:"SET_PRODUCT",payload:data});
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"商品を追加しました。"});
					dispatch({type:"CLOSEDIALOG",payload:{dialog:"ProductCreate"}});
					return Actions.getProductsAsync();
				})
				.then((response) => {
					let data = response.data;
					dispatch({type:"SET_PRODUCTS",payload:data});
				})
				.catch(() => {
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"追加が失敗してしまいました。"});
					dispatch({type:"CLOSEDIALOG",payload:{dialog:"ProductCreate"}});
				});
			}
	}
}

const ProductCreate = connect(mapStateToProps, mapDispatchToProps)(ProductCreateUI);
export default ProductCreate;