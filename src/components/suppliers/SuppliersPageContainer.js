import React, { Component } from 'react';
import { connect  } from 'react-redux';
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import PageFournisseurs from "./PageFournisseurs";
import CreationFournisseur from "./GridContainerSuppliers";
import SupplierPage from "./SupplierPage";
import {requestGridFour} from "../../actions/crmGridLayoutSuppliers";
import DossiersComponent from "../DossiersComponent";
import ErrorPage from "../ErrorPage";


class suppliersPageContainer extends Component {
	constructor(props){
		super(props);
		this.props.requestGridFour();
	}


	render() {
		const { match } = this.props;
		return(
			<Switch>
				<Route exact path={match.url} component={PageFournisseurs}/>
				<Route path={match.url + "/create"} component={CreationFournisseur}/>
				<Route path={match.url + "/:idSupplier"} component={SupplierPage}/>
				<Route component={ErrorPage}/>
			</Switch>
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
		requestGridFour: () => {
			dispatch(requestGridFour());
		}
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (suppliersPageContainer))
