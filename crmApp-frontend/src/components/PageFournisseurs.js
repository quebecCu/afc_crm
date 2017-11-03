import React, { Component } from 'react';
import HistoriqueContainer from "../containers/HistoriqueContainer";
import { connect  } from 'react-redux';
import {changeFormFour, sendingRequestFour, searchFour} from '../actions/crmRechercheFournisseur';
import SearchCompSuppliers from "./SearchCompSuppliers";

class PageFournisseurs extends Component {
    componentWillMount() {
        this.props.sendingRequestFour();
    }
    render() {
        let { formState, dossiersState, searchList } = this.props.crmRechercheFournisseur;
        return(
            <div>
                <h1>Fournisseurs</h1>
                <HistoriqueContainer page="PageFournisseurs" history={this.props.history} dossiersState={dossiersState}/>
                <SearchCompSuppliers
                    formState = {formState}
                    searchList = {searchList}
                    changeForm = {this.props.changeFormFour}
                    searchFour = {this.props.searchFour}
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