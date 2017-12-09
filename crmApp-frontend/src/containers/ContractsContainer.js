import React from 'react';
import {changeSearchContracts, changeViewContract, getListContracts} from "../actions/crmContract";
import CreateContractContainer from './CreateContractContainer';
import {connect} from "react-redux";
import ListContractsComponent from "../components/ListContractsComponent";

class ContractsContainer extends React.Component {
	constructor(props){
		super(props);
		this._handleClick = this._handleClick.bind(this);
		this.props.getListContracts();
	}

	_handleClick(event){
		this.props.changeViewContract(event.target.value);
	}

	render(){
		let {view, listContracts, searchContracts} = this.props.crmContract;
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
				<ListContractsComponent handleClick={this._handleClick}
										listContracts={listContracts}
										searchContracts={searchContracts}
										changeSearchContracts={this.props.changeSearchContracts}
				/>
			}
			{
				view === "create" && <CreateContractContainer />
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
		},
		getListContracts: () => {
			dispatch(getListContracts());
		},
		changeSearchContracts: (search) => {
			dispatch(changeSearchContracts(search))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractsContainer)
