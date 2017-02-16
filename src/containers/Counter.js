import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { countUp, countDown } from '../actions';

class Counter extends Component {
	render() {
		return (
			<div>
				<h2>{this.props.count}</h2>
				<button onClick={() => this.props.countUp(this.props.count)}> + </button>
				<button onClick={() => this.props.countDown(this.props.count)}> - </button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		count: state.count
	}
}

function mapDispatchToProps(dispatch){

	return bindActionCreators({ 
		countUp: countUp,
		countDown: countDown
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)