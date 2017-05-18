import React from 'react';
import {connect} from 'react-redux';

import Snackbar from 'material-ui/Snackbar';

class ProductDetailUI extends React.Component {
    constructor(){
        super();
    }

    render(){
      return (
		<Snackbar
			open={this.props.snackbarOpen}
			message={this.props.snackbarMessage}
			autoHideDuration={2000}
			onRequestClose={this.props.closeSnackbar}
		/>
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
		closeSnackbar:
			() => dispatch({type:"SHOWSNACKBAR",payload:""})
	}
}

const ProductDetail = connect(mapStateToProps, mapDispatchToProps)(ProductDetailUI);
export default ProductDetail;