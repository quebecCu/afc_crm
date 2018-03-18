import React, { Component } from 'react';
import SupplierListContainer from "./SupplierListContainer";
import { connect  } from 'react-redux';
import {changeFormFour, sendingRequestFour, searchFour} from '../../actions/crmRechercheFournisseur';
import SearchCompSuppliers from "./SearchCompSuppliers";
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom';

import jsPDF from 'jspdf'
import { autoTable } from 'jspdf-autotable';

class PageFournisseurs extends Component {

    _convert(event) {

        var doc = new jsPDF('p', 'pt','a4');

        var res = doc.autoTableHtmlToJson(document.getElementById("PageFournisseursTable"), false);

        doc.autoTable(res.columns, res.data, {

            margin: {horizontal:5,top: 25},
            styles: {overflow: 'linebreak'},
            addPageContent: function(data) {
                doc.text("Liste des fournisseurs:", 5, 20);
            }
          } );

        doc.save('liste-fournisseurs.pdf');
    }
    _print(event) {
  		var divToPrint = document.getElementById('PageFournisseursTable');
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
  		newWin.document.write("<h3> Liste des fournisseurs: </h3>");
  		newWin.document.write(htmlToPrint);
  		newWin.print();
  		newWin.close();
	}

    componentWillMount() {
        this.props.sendingRequestFour();
    }
    render() {
      const { match } = this.props;
      let { formState, dossiersState, searchList } = this.props.crmRechercheFournisseur;
      <iframe id="ifmcontentstoprint" style="height: 0px; width: 0px; position: absolute"></iframe>
      return(
          <div className="container-fluid">
            <h1 className="text-center">Assurances collectives</h1>
            <div className="card mb-3">
							<div className="card-header text-left">
				      	<i className="fa fa-table"></i> Liste des fournisseurs
							</div>
							<div className="card-body">
								<div className="row">
									<div className="col-sm-12 col-md-4">
											<Link
												className="btn btn-primary"
												to={match.url + "/create"}>
												<i className="fa fa-plus" aria-hidden="true"></i> Créer fournisseur
											</Link>
											<button value="toPdf" id="toPdf" onClick={this._convert} className="btn btn-danger">
												Convertir la liste en PDF
											</button>
											<button value="print" id="print" onClick={this._print} className="btn btn-success">
												Imprimer la liste
											</button>
									</div>
									<div className="col-sm-12 col-md-8">
                    <SearchCompSuppliers
                        formState = {formState}
                        searchList = {searchList}
                        changeForm = {this.props.changeFormFour}
                        searchFour = {this.props.searchFour}/>
									</div>
								</div>
								<br/>
								<SupplierListContainer dossiersState={dossiersState}/>
							</div>
						</div>
          </div>
      );
    }
}



function mapStateToProps (state) {
    return{
        crmRechercheFournisseur: state.crmRechercheFournisseur
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

    return{
        changeFormFour: (newFormState) => {
            dispatch(changeFormFour(newFormState))
        },
        sendingRequestFour: () => {
            dispatch(sendingRequestFour())
        },
        searchFour: (newSearchList) => {
            dispatch(searchFour(newSearchList))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PageFournisseurs))
