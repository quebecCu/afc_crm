import React from 'react';
import {changeViewContract} from "../actions/crmContract";
import {connect} from "react-redux";

class ContractsContainer extends React.Component {
	constructor(props){
		super(props);
		this._handleClick = this._handleClick.bind(this);
	}

	_handleClick(event){
		this.props.changeViewContract(event.target.value);
	}

	render(){
		let {view} = this.props.crmContract;
		return <div className="text-center">
			{
				view === "" && <h1>Contrats</h1>
			}
			{
				view === "" && <button onClick={this._handleClick} className="customers" value="">Contrats individuels</button>
			}
			{
				view === "" && <button onClick={this._handleClick} className="suppliers" value="collContract">Contrats collectifs</button>
			}
			{
				view === "collContract" &&
				<h1>SLT</h1>
			}
		</div>;
	}

}

function mapStateToProps(state) {

	return {
		crmContract: state.crmContract,
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {
	return {
		changeViewContract: (newView) => {
			dispatch(changeViewContract(newView));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractsContainer)
