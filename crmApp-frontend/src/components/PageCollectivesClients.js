import React, {Component} from 'react';
import HistoriqueContainer from "../containers/HistoriqueContainer";
import RechercheComponent from "./RechercheComponent";
import {connect} from 'react-redux';
import {changeFormColl, searchRequestColl, sendingRequestColl} from '../actions/crmRechercheCollective';


class PageCollectivesClients extends Component {
	componentWillMount() {
        this.props.sendingRequestColl();
    }


    render() {
		let { formState, dossiersState } = this.props.crmRechercheCollective;

        return(
                <div className="container-fluid text-center">
                    <h1>Assurances collectives</h1>
                    <h2>Clients</h2>
                    <HistoriqueContainer page="PageCollectivesClients" history={this.props.history} dossiersState={dossiersState}/>
                    <RechercheComponent 
                    onSubmit = {this.props.searchRequestColl}
                	formState = {formState}
                    changeFormColl = {this.props.changeFormColl}   />
                    <button onClick={this.props.handleClick} className="newCustomer">Créer une fiche client</button>
				</div>
        );
    }
}

function mapStateToProps (state) {
	
	return{
		crmRechercheCollective: state.crmRechercheCollective
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {
	
	return{
		searchRequestColl: (formData) => {
			dispatch(searchRequestColl(formData))
		},
		changeFormColl : (newFormState) => {
			dispatch(changeFormColl(newFormState))
		},
		sendingRequestColl : () => {
			dispatch(sendingRequestColl())
		}
		
	}
}


export default connect(mapStateToProps, mapDispatchToProps) (PageCollectivesClients);
