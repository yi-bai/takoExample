import React from 'react';
import {connect} from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Snackbar from 'material-ui/Snackbar';

//all dialogs goes here
import ProductEdit from './ProductEdit';
import ProductCreate from './ProductCreate';
import ProductDelete from './ProductDelete';
import UserInfoDetail from './UserInfoDetail';
import UserInfoEdit from './UserInfoEdit';

class RabobaiDialogUI extends React.Component {
    constructor(){
        super();
    }

    render(){
      return (
		<div>
			<ProductEdit
				open={this.props.dialogopen=='ProductEdit'}
				onRequestClose={() => this.props.closeDialog('ProductEdit')}
			/>
			<ProductCreate
				open={this.props.dialogopen=='ProductCreate'}
				onRequestClose={() => this.props.closeDialog('ProductCreate')}
			/>
			<ProductDelete
				open={this.props.dialogopen=='ProductDelete'}
				onRequestClose={() => this.props.closeDialog('ProductDelete')}
			/>
			<UserInfoDetail
				open={this.props.dialogopen=='UserInfoDetail'}
				onRequestClose={() => this.props.closeDialog('UserInfoDetail')}
			/>
			<UserInfoEdit
				open={this.props.dialogopen=='UserInfoEdit'}
				onRequestClose={() => this.props.closeDialog('UserInfoEdit')}
			/>
		</div>
      );
    }
}

const mapStateToProps = (state) => {
	return {
		dialogopen: state.dialog //fake
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	console.debug(ownProps);
	return {
		closeDialog:
			(dialog) =>
				{dispatch({type:"CLOSEDIALOG",payload:{dialog:dialog}})}
	}
}

const RabobaiDialog = connect(mapStateToProps, mapDispatchToProps)(RabobaiDialogUI);
export default RabobaiDialog;