import React, { Component } from 'react';
import HistoriqueContainer from "../containers/HistoriqueContainer";
import { connect  } from 'react-redux';
import {changeFormFour, sendingRequestFour, searchFour} from '../actions/crmRechercheFournisseur';
import SearchCompSuppliers from "./SearchCompSuppliers";

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
		var content = document.getElementById("PageFournisseursTable");
var pri = document.getElementById("ifmcontentstoprint").contentWindow;
pri.document.open();
pri.document.write(content.innerHTML);
pri.document.close();
pri.focus();
pri.print();
        
        
	}

    componentWillMount() {
        this.props.sendingRequestFour();
    }
    render() {
        let { formState, dossiersState, searchList } = this.props.crmRechercheFournisseur;
        <iframe id="ifmcontentstoprint" style="height: 0px; width: 0px; position: absolute"></iframe>
        return(
           
            <div className="container-fluid text-center">
                <h1>Fournisseurs</h1>
              
                <HistoriqueContainer page="PageFournisseurs" dossiersState={dossiersState}/>
                <SearchCompSuppliers
                    formState = {formState}
                    searchList = {searchList}
                    changeForm = {this.props.changeFormFour}
                    searchFour = {this.props.searchFour}/>
                   <button  value="print" id="print" onClick={this._print}>
				   <a className="glyphicon glyphicon-print"> </a> Imprimer la liste </button>
                    <button onClick={this._convert} className="newSupplier">Convertir en PDF</button>
                    <button onClick={this.props.handleClick} className="newSupplier">Créer un nouveau fournisseur</button>

            
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

export default connect(mapStateToProps, mapDispatchToProps) (PageFournisseurs)
