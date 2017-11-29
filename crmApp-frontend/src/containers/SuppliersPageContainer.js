import React, { Component } from 'react';
import HistoriqueContainer from "./HistoriqueContainer";
import { connect  } from 'react-redux';
import {changeFormFour, sendingRequestFour, searchFour} from '../actions/crmRechercheFournisseur';
import PageFournisseurs from "../components/PageFournisseurs";
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";
import CreationClient from "./GridContainer";
import {changeViewDashboard} from "../actions/crmDashboard";
import CreationFournisseur from "./GridContainerSuppliers";


class suppliersPageContainer extends Component {
	constructor(props){
		super(props);
//		this.props.sendingRequestFour();
		this.handleClick = this.handleClick.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
	}
	handleClick(event) {
		event.preventDefault();
		this.props.changeViewSuppliers(event.target.className);
	}

	handleClick2(event) {
		event.preventDefault();
		this.props.changeViewDashboard(event.target.className);
	}


	render() {
		let {view} = this.props.crmSuppliersContainer;
		return(

				<div className="container-fluid text-center">
				{
					view === "" && <PageFournisseurs handleClick={this.handleClick}/>
				}
				{
					view === "newSupplier" && <CreationFournisseur view="newSupplier"/>
				}
				{
					view === "supplierFile" && <CreationFournisseur view="supplierFile"/>
				}
				</div>

		);
	}
}

function mapStateToProps (state) {

	return{
		crmSuppliersContainer: state.crmSuppliersContainer
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

	return{
		 changeViewSuppliers : (newView) => {
             dispatch(changeViewSuppliers(newView))
         },
         changeViewDashboard : (newView) => {
             dispatch(changeViewDashboard(newView))
         }
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (suppliersPageContainer)