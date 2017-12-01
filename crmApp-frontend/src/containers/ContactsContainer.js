import React, { Component } from 'react';
import { connect  } from 'react-redux';
import {addArrayContacts, changeFormState, getPostesContacts} from "../actions/crmContacts";
import ContactsComponent from "../components/form/ContactsComponent";

class ContactsContainer extends Component   {
	constructor(props) {
		super(props);
		this.props.getPostesContact();
		this.props.addArrayContacts([
			{
				prenom: '',
				nom: '',
				idposte: 1,
				titre: 'Mr',
				num_tel_principal: '',
				ext_tel_principal: '',
				mail: '',
				estdecideur: false
			}
		]);
	}

	render() {
		let {postes, arrayContacts} = this.props.crmContacts;
		return(
			<div>
				<h3>Contacts</h3>
				{
					arrayContacts.map((contact, index) => {
						return <ContactsComponent postes={postes}
												  key={index}
												  formState={contact}
												  contacts={arrayContacts}
												  idContact={index}
												  addContact={this.props.addArrayContacts}
												  changeForm={this.props.changeFormState}/>
					})
				}
			</div>
		)
	}
}

// les fonctions redux
//valeurs
function mapStateToProps (state) {

	return{
		crmContacts: state.crmContacts,
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

	return{
		getPostesContact: () => {
			dispatch(getPostesContacts());
		},
		changeFormState: (newFormState) => {
			dispatch(changeFormState(newFormState))
		},
		addArrayContacts: (newArray) => {
			dispatch(addArrayContacts(newArray))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ContactsContainer)
