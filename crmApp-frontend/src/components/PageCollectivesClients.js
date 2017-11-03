import React, { Component } from 'react';
import HistoriqueContainer from "../containers/HistoriqueContainer";
import RechercheComponent from "./RechercheComponent";
import {ButtonsComponent} from "./ButtonsComponent";
import PageCollectives from '../components/PageCollectives';
import { connect  } from 'react-redux';
import {searchRequestColl, changeFormColl, sendingRequestColl} from '../actions/crmRechercheCollective';



class PageCollectivesClients extends Component {
	constructor(props) {
		super(props);
        sendingRequestColl();

	}
	
    render() {
		let { formState, changeForm } = this.props.crmRechercheCollective;

        return(
                <div>
                    <h1>Assurances collectives</h1>
                    <h2>Clients</h2>
                    <HistoriqueContainer page="PageCollectivesClients" history={this.props.history} />
                    <RechercheComponent 
                    onSubmit = {this.props.searchRequestColl}
                	formState = {formState}
                    changeFormColl = {this.props.changeFormColl}   />
                    <ButtonsComponent page="PageCollectivesClients" />
                    	
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
