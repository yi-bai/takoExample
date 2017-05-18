import React from 'react';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Actions from '../async/Actions';

class UserInfoEditUI extends React.Component {
    constructor(){
        super();
    }
	
	doEdit(){
		//console.debug(this.state);
        let userName = this.state.userNameInput;
        let userProfile = this.state.userProfileInput;
		
		//TODO: add password
		
		let userInfoChanged = {};
		if(userName) { userInfoChanged['user_name'] = userName; }
		if(userProfile) { userInfoChanged['user_profile'] = userProfile; }
		
		//console.debug(userInfoChanged);
		
        if(Object.keys(userInfoChanged).length) this.props.updateUserInfo(userInfoChanged);
	}
	
	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		
		this.setState({[name]: value});
		//console.debug(this.state);
	}

    render(){
			let userInfo = this.props.userinfo;
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
			if(this.props.userinfo == null) return null;
		  return (
				<Dialog
				  title="設定"
				  actions={actions}
				  modal={false}
				  open={this.props.open}
				  onRequestClose={this.props.onRequestClose}
				>
				    <TextField
						name="userNameInput"
						hintText={userInfo.user_name}
						floatingLabelText="ユーザー名"
						floatingLabelFixed={true}
						onChange={this.handleInputChange.bind(this)}
					/> <br/>
				    <TextField
						name="userProfileInput"
						hintText={userInfo.user_profile}
						floatingLabelText="プロフィール画像URL"
						floatingLabelFixed={true}
						onChange={this.handleInputChange.bind(this)}
						fullWidth={true}
					/> <br/>
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
	return {
		updateUserInfo:
			(userinfo) =>	{
				dispatch({type:"ADDLOADING"});
				Actions.updateUserAsync(userinfo)
				.then((response) => {
					let data = response.data;
					console.debug(data);
					dispatch({type:"SET_USER",payload:data});
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"プロファイルを更新しました。"});
					dispatch({type:"CLOSEDIALOG",payload:{dialog:"UserInfoEdit"}});
				})
				.catch((response) => {
						dispatch({type:"MINUSLOADING"});
						dispatch({type:"SHOWSNACKBAR",payload:"更新が失敗してしまいました。"});
				});
			}
				/*Actions.updateUserAsync(userinfo,
					(data) => {
						dispatch({type:"SET_USER",payload:data});
						dispatch({type:"MINUSLOADING"});
						dispatch({type:"SHOWSNACKBAR",payload:"プロファイルを更新しました。"});
						dispatch({type:"CLOSEDIALOG",payload:{dialog:"UserInfoEdit"}});
					},
					(data) => {
						dispatch({type:"MINUSLOADING"});
						dispatch({type:"SHOWSNACKBAR",payload:"更新が失敗してしまいました。"});
					}
				);*/
	}
}

const UserInfoEdit = connect(mapStateToProps, mapDispatchToProps)(UserInfoEditUI);
export default UserInfoEdit;