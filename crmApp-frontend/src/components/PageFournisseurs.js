import React, { Component } from 'react';
import HistoriqueContainer from "../containers/HistoriqueContainer";
import { connect  } from 'react-redux';
/// TODO
import {searchRequestFour, changeFormFour, sendingRequestFour} from '../actions/crmRechercheFournisseur';
import SearchCompSuppliers from "./SearchCompSuppliers";

class PageFournisseurs extends Component {
    componentWillMount() {
        this.props.sendingRequestFour();
    }
    render() {
        let { formState, dossiersState } = this.props.crmRechercheFournisseur;
        console.log(dossiersState);
        return(
            <div>
                <h1>Fournisseurs</h1>
                <HistoriqueContainer page="PageFournisseurs" history={this.props.history} dossiersState={dossiersState}/>
                <SearchCompSuppliers
                    onSubmit = {this.props.searchRequestFour}
                    formState = {formState}
                    changeForm = {this.props.changeFormFour}
                    />

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
        changeFormFour: (newFormState) => {
            dispatch(changeFormFour(newFormState))
        },
        sendingRequestFour: () => {
            dispatch(sendingRequestFour())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PageFournisseurs)