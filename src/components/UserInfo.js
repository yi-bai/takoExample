import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';

import Avatar from 'material-ui/Avatar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class UserInfoUI extends React.Component {
    constructor(){
        super();
    }
	
	componentDidMount(){
		this.props.getUserInfo();
	}

    render(){
			let userInfo = this.props.userInfo;
			if(userInfo == null) return null;
		  return (
			<div>
				<Avatar src={userInfo.user_profile} />
				<IconMenu
				  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
				  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				  targetOrigin={{horizontal: 'right', vertical: 'top'}}
				>
					<MenuItem
						onTouchTap={()=>this.props.openDialog("UserInfoDetail")}
						primaryText={userInfo.user_name +'プロファイルを見る'}
					/>
					<Divider />
					<MenuItem
						onTouchTap={()=>this.props.openDialog("UserInfoEdit")}
						primaryText="設定"
					/>
					<a href="/login/logout">
					<MenuItem
						onTouchTap={this.props.logout}
						primaryText="ログアウト"
					/>
					</a>
				</IconMenu>
			</div>
		  );
    }
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userinfo
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getUserInfo:
			() =>	{
				dispatch({type:"ADDLOADING"});
				Actions.getUserAsync()
				.then((response) => {
					let data = response.data;
					dispatch({type:"SET_USER",payload:data});
					dispatch({type:"MINUSLOADING"});
				})
				.catch((response) => {
					dispatch({type:"MINUSLOADING"});
					dispatch({type:"SHOWSNACKBAR",payload:"ユーザーの資料が失敗してしまいました。"});
				});
			},
		openDialog:
			(dialog) =>
				{ dispatch({type:"OPENDIALOG", payload:{dialog:dialog}}) },
		logout :
			() =>
				{ dispatch({type:"LOGOUT"}) }
	}
}

const UserInfo = connect(mapStateToProps, mapDispatchToProps)(UserInfoUI);
export default UserInfo;