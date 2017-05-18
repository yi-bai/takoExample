import React from 'react';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

class UserInfoDetailUI extends React.Component {
    constructor(){
        super();
    }
	
    render(){
		let userInfo = this.props.userinfo;
		//console.debug(userInfo);
		if(userInfo == null) return null;
		return (
			<Dialog
				title="プロファイル"
				modal={false}
				open={this.props.open}
				onRequestClose={this.props.onRequestClose}
			>
			<Table><TableBody>
			<TableRow>
				<TableRowColumn>登録時間</TableRowColumn>
				<TableRowColumn>{userInfo.user_create_time}</TableRowColumn>
			</TableRow>
			<TableRow>
				<TableRowColumn>ご誕生日</TableRowColumn>
				<TableRowColumn>{userInfo.user_birth_time}</TableRowColumn>
			</TableRow>
			<TableRow>
				<TableRowColumn>ログイン時間</TableRowColumn>
				<TableRowColumn>{userInfo.user_last_login_time}</TableRowColumn>
			</TableRow>
			</TableBody></Table>
			</Dialog>
		);
    }
}

const mapStateToProps = (state) => {
	return {
		userinfo: state.userinfo
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const UserInfoDetail = connect(mapStateToProps, mapDispatchToProps)(UserInfoDetailUI);
export default UserInfoDetail;