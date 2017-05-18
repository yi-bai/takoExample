import React from 'react';
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar';

import UserInfo from './UserInfo.js';
import Loading from './Loading.js';

class RabobaiHeaderUI extends React.Component {
    constructor(){
        super();
        this.state = {};
    }

    render(){
	  let userInfo = (
		<UserInfo />
	  )
	  
	  let loading = (
		<Loading />
	)
	  
      return (
		<AppBar
			title="ラボバイ"
			style={{backgroundColor:'#fafafa'}}
			titleStyle={{color:'#616161'}}
			iconStyleRight={{marginRight:"20px"}} 
			iconElementRight={userInfo}
			iconElementLeft={loading}
		/>
      );
    }
}

const RabobaiHeader = connect()(RabobaiHeaderUI);
export default RabobaiHeader;