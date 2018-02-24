import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {Route,Link,Switch} from 'react-router-dom'
import ErrorPage from "../ErrorPage";
import CreationFournisseur from "./GridContainerSuppliers";
import SupplierFile from "./SupplierFile";

class SupplierPage extends Component {

	render() {
		const { match } = this.props;
		return (
			<Switch>
				<Route exact path={match.url} render={(props) => (
					<SupplierFile {...props} idSupplier={match.params.idSupplier} />
				)}/>
				<Route path={match.url + "/update"} render={(props) => (
				  <CreationFournisseur {...props} idSupplier={match.params.idSupplier} />
					)}/>
				<Route
					component={ErrorPage}/>
			</Switch>
		);
	}
}

export default withRouter(SupplierPage);
