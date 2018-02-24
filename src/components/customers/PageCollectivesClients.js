import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom';
import RechercheComponent from "./RechercheComponent";
import {connect} from 'react-redux';
import {
	changeFormColl, searchRequestColl,
	sendingRequestColl
} from '../../actions/crmRechercheCollective';
import ClientListContainer from "./ClientListContainer";
import {changeLoading} from "../../actions/crmDashboard";
import LoadingAnimation from "../LoadingAnimation";
import jsPDF from 'jspdf'
import { autoTable } from 'jspdf-autotable';


class PageCollectivesClients extends Component {

	constructor(props) {
		super(props);
		this._print = this._print.bind(this);
		this.props.sendingRequestColl();
	}

	_print(event) {
		var divToPrint = document.getElementById('print-content');
		var htmlToPrint = '' +
			'<style type="text/css">' +
			'table {' +
			'border-collapse: collapse;' +
			'}' +
			'table, th, td {'+
				'border: 1px solid black;'+
			'}'+
			'</style>';
		htmlToPrint += divToPrint.outerHTML;
		var newWin = window.open("");
		newWin.document.write("<h3> Liste des clients: </h3>");
		newWin.document.write(htmlToPrint);
		newWin.print();
		newWin.close();
	}

	_convert(event) {

		var doc = new jsPDF('p', 'pt', 'a4');
		var res = doc.autoTableHtmlToJson(document.getElementById("PageCollectivesClientsTable"), false);

		doc.autoTable(res.columns, res.data, {

			margin: { horizontal: 5, top: 25 },
			styles: { overflow: 'linebreak' },
			addPageContent: function (data) {
				doc.text("Liste des clients:", 5, 20);
			}
		});

		doc.save('liste-clients.pdf');
	}

	render() {
		let {formState, dossiersState} = this.props.crmRechercheCollective;
		let {loading} = this.props.crmDashboard;
		const { match } = this.props;
		return (
			<div className="container-fluid">
				<h1>Assurances collectives</h1>
				{
					loading && <LoadingAnimation/>

				}
				{
					!loading &&
					<div>
						<div className="card mb-3">
							<div className="card-header text-left">
				      	<i className="fa fa-table"></i> Liste des clients
							</div>
							<div className="card-body">
								<div className="row">
									<div className="col-sm-12 col-md-4">
											<Link
												className="btn btn-primary"
												to={match.url + "/create"}>
												<i className="fa fa-plus" aria-hidden="true"></i> Créer client
											</Link>
											<button value="toPdf" id="toPdf" onClick={this._convert} className="btn btn-danger">
												Convertir la liste en PDF
											</button>
											<button value="print" id="print" onClick={this._print} className="btn btn-success">
												Imprimer la liste
											</button>
									</div>
									<div className="col-sm-12 col-md-8">
										<RechercheComponent
											onSubmit={this.props.searchRequestColl}
											formState={formState}
											changeFormColl={this.props.changeFormColl}/>
									</div>
								</div>
								<br/>
								<ClientListContainer dossiersState={dossiersState} changeLoading={this.props.changeLoading}
													 handleClick={this.props.handleClick}/>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {

	return {
		crmRechercheCollective: state.crmRechercheCollective,
		crmDashboard: state.crmDashboard
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {

	return {
		searchRequestColl: (formData) => {
			dispatch(searchRequestColl(formData))
		},
		changeFormColl: (newFormState) => {
			dispatch(changeFormColl(newFormState))
		},
		sendingRequestColl: () => {
			dispatch(sendingRequestColl())
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading))
		}
	}
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageCollectivesClients));
