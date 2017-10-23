import React, { Component } from 'react';
import { HistoriqueContainer } from "../containers/HistoriqueContainer";
import  RechercheComponent  from "./RechercheComponent";
import { connect  } from 'react-redux';
/// TODO
import {searchRequestFour, changeFormFour} from '../actions/crmRechercheFournisseur';

class PageFournisseurs extends Component {
    render() {
        let { formState, changeForm } = this.props.crmRechercheFournisseur;

        return(

            <div>
                <h1>Fournisseurs</h1>
                <HistoriqueContainer page="PageFournisseurs" history={this.props.history}/>
                <RechercheComponent
                    onSubmit = {this.props.searchRequestFour}
                    formState = {formState}
                    changeForm = {this.props.changeFormFour}/>
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
        searchRequestFour: (formData) => {
            dispatch(searchRequestFour(formData))
        },
        changeFormFour : (newFormState) => {
            dispatch(changeFormFour(newFormState))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PageFournisseurs)