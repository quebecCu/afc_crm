import React, { Component } from 'react';
import '../style/LoadingAnimation.css';

class LoadingAnimation extends Component {

	render() {
		return (
			<div className="spinner">
				<div className="bounce1"/>
				<div className="bounce2"/>
				<div className="bounce3"/>
			</div>
		);
	}
}

export default LoadingAnimation;
