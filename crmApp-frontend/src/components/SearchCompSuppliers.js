import React, { Component } from 'react';
import '../style/RechercheFournisseur.css';

class SearchCompSuppliers extends Component {

	constructor(props) {
		super(props);

		this._changeNomEntreprise = this._changeNomEntreprise.bind(this);
		this._changeNomContact = this._changeNomContact.bind(this);
		this._changeCode = this._changeCode.bind(this);
		this._changeNombreEmployes = this._changeNombreEmployes.bind(this);
		this._emitChange = this._emitChange.bind(this);
		this._reset = this._reset.bind(this);
	}


	_reset() {
//		e.preventDefault();
		let newFormState={
				 nomEntreprise:'',
			        nombreEmployes: '',
			        nomContact: '',
			        code: ''
		};
		let form = document.getElementById("formFournisseurs").elements;
		this.props.changeForm(newFormState);
		for(let input in form) {
			if (form.hasOwnProperty(input) && form[input].value !== 'Reset') {
				form[input].value = '';
			}
		}
		this._filtre();
	}
	
	 componentDidMount() {
		 this._reset();
	    }

	_filtre (){
		var inputAssuranceName,inputEmployesNumber,inputContactName,inputCode, table, tr, td0, td1, td2, td3, i;

		inputAssuranceName = document.getElementById("AssuranceName").value.toUpperCase();
		inputEmployesNumber = document.getElementById("EmployesNumber").value.toUpperCase();
		inputContactName = document.getElementById("ContactName").value.toUpperCase();
		inputCode = document.getElementById("Code").value.toUpperCase();

		table = document.getElementById("PageFournisseursTable");
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td0 = tr[i].getElementsByTagName("td")[0];
			td1 = tr[i].getElementsByTagName("td")[1];
			td2 = tr[i].getElementsByTagName("td")[2];
			td3 = tr[i].getElementsByTagName("td")[3];
			if (td0 || td1 || td2 || td3) {
				if (td3.innerHTML.toUpperCase().indexOf(inputCode) > -1 && td0.innerHTML.toUpperCase().indexOf(inputAssuranceName) > -1
						&& td2.innerHTML.toUpperCase().indexOf(inputContactName) > -1 && td1.innerHTML.toUpperCase().indexOf(inputEmployesNumber) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}
		}
	}

	_changeNombreEmployes (event){
		this._emitChange({...this.props.formState , nombreEmployes: event.target.value});
		this._filtre();
	}
	_changeNomContact (event){
		this._emitChange({...this.props.formState , nomContact: event.target.value});
		this._filtre();
	}
	_changeNomEntreprise (event){
		this._emitChange({...this.props.formState , nomEntreprise: event.target.value});
		this._filtre();
	}
	_changeCode(event){
		this._emitChange({...this.props.formState , code: event.target.value});
		this._filtre();
	}
	_emitChange (newFormState){
		this.props.changeForm(newFormState);
	}

	render() {

		return(
				<form action="" id="formFournisseurs">
				<div id="rechercheFournisseur">
				<input type="text" id="AssuranceName" placeholder="Nom entreprise" onChange={this._changeNomEntreprise} value={this.props.formState.nomEntreprise} />
				<input type="text" id="EmployesNumber" placeholder="Nombre d'employés" onChange={this._changeNombreEmployes}  value={this.props.formState.nombreEmployes} />
				<input type="text" id="ContactName" placeholder="Nom d'un contact" onChange={this._changeNomContact} value={this.props.formState.nomContact}/>
				<input type="text" id="Code" placeholder="Code" onChange={this._changeCode} value={this.props.formState.code} />
				<input type="reset" value="Reset"  onClick= {this._reset}/>
				</div>
				</form>
		);
	}
}

export default SearchCompSuppliers;
