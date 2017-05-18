import React from 'react';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import FontIcon from 'material-ui/FontIcon';

import Search from 'material-ui/svg-icons/action/search';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Actions from '../async/Actions';

class ProductHeaderUI extends React.Component {
    constructor(){
        super();
    }
	
	handleInputChange(event){
		if(event.key == 'Enter'){
			const target = event.target;
			const value = target.value;
			const name = target.name;
			
			this.props.search(name);
		}
	}

    render(){
      return (
		<Toolbar style={{backgroundColor:"#eee"}}>
			<ToolbarGroup style={{marginLeft:"0"}} firstChild={true}>
				<Search/>
				<TextField
					name="searchString"
					hintText="検索"
					onKeyPress={this.handleInputChange.bind(this)}
				/> <br/>
			</ToolbarGroup>
			<ToolbarGroup>
				<FloatingActionButton mini={true} onTouchTap={() => this.props.openDialog("ProductCreate")}>
				  <ContentAdd />
				</FloatingActionButton>
			</ToolbarGroup>
		</Toolbar>
      );
    }
}

const mapStateToProps = (state) => {
	return {
		snackbarMessage: state.snackbarmessage,
		snackbarOpen: state.snackbarmessage.length > 0
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		openDialog: (dialog) => {dispatch({type:"OPENDIALOG",payload:{dialog:dialog,id:ownProps.id}})},
		search:
			(string) => {
				dispatch({type:"ADDLOADING"});
				Actions.searchProductAsync(string)
				.then((response) => {
					let data = response.data;
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SET_PRODUCTS",payload:data});
				})
				.catch(() => {
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"検索が失敗してしまいました。"});
				});
			}
	}
}

const ProductHeader = connect(mapStateToProps, mapDispatchToProps)(ProductHeaderUI);
export default ProductHeader;