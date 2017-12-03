import React, { Component } from 'react';
import { connect  } from 'react-redux';
import {addArrayContacts, changeFormState, deleteContact, getContacts, getPostesContacts} from "../actions/crmContacts";
import ContactsComponent from "../components/form/ContactsComponent";

class ContactsContainer extends Component   {
	constructor(props) {
		super(props);
		this.props.getPostesContact();
		if(this.props.crmCollectiveContainer.view === 'newCustomer') {
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
		else {
			this.props.getContacts(this.props.crmGridLayout.idToDisplay);
		}
	}

	render() {
		let {postes, arrayContacts, delcontacts} = this.props.crmContacts;
		return(
			<div>
				<h3>Contacts</h3>
				{
					arrayContacts.map((contact, index) => {
						return <ContactsComponent postes={postes}
												  key={index}
												  formState={contact}
												  contacts={arrayContacts}
												  delcontacts={delcontacts}
												  idContact={index}
												  addContact={this.props.addArrayContacts}
												  changeForm={this.props.changeFormState}
												  deleteContact={this.props.deleteContact}
						/>
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
		crmCollectiveContainer: state.crmCollectiveContainer,
		crmGridLayout: state.crmGridLayout
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

	return{
		getPostesContact: () => {
			dispatch(getPostesContacts());
		},
		changeFormState: (newFormState) => {
			dispatch(changeFormState(newFormState));
		},
		addArrayContacts: (newArray) => {
			dispatch(addArrayContacts(newArray));
		},
		getContacts: (idClient) => {
			dispatch(getContacts(idClient));
		},
		deleteContact: (newFormState, deletedContacts) => {
			dispatch(deleteContact(newFormState, deletedContacts));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ContactsContainer)
