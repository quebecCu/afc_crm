import React from 'react';

class DisplayUser extends React.Component{

	constructor(props){
		super(props);
	}

	render(){

		return <div><button onClick={()=>this.props.handleClick("UpdateUser")}>Modifier </button></div>;
	}
}

export default (DisplayUser);
