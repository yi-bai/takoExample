import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';

import CircularProgress from 'material-ui/CircularProgress';

class LoadingUI extends React.Component {
    constructor(){
        super();
    }

    render(){
		console.debug(this.props);
		if(this.props.loading <= 0) return null;
		  return (
			<CircularProgress/>
		  );
    }
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading
	}
}

const Loading = connect(mapStateToProps)(LoadingUI);
export default Loading;