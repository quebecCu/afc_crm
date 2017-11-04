import React, { Component } from 'react';
import '../style/RechercheComponent.css';

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


    _reset(e) {
        e.preventDefault();

        let form = document.getElementById("formFournisseurs").elements;

        for(let input in form) {
            if (form.hasOwnProperty(input) && form[input].value !== 'Reset') {
                form[input].value = '';
            }
        }
        let table, tr, i;
        table = document.getElementById("PageFournisseursTable");
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "";
        }
    }
    _changeNombreEmployes (event){
        this._emitChange({...this.props.formState , nombreEmployes: event.target.value});

        let filter, table, tr, td, i;
        filter = event.target.value.toUpperCase();
        table = document.getElementById("PageFournisseursTable");
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    _changeNomContact (event){
        this._emitChange({...this.props.formState , nomContact: event.target.value});

        let filter, table, tr, td, i;
        filter = event.target.value.toUpperCase();
        table = document.getElementById("PageFournisseursTable");
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    _changeNomEntreprise (event){
        this._emitChange({...this.props.formState , nomEntreprise: event.target.value});

        let filter, table, tr, td, i;
        filter = event.target.value.toUpperCase();
        table = document.getElementById("PageFournisseursTable");
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    _changeCode(event){
        this._emitChange({...this.props.formState , code: event.target.value});

        let filter, table, tr, td, i;
        filter = event.target.value.toUpperCase();
        table = document.getElementById("PageFournisseursTable");
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[3];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    _emitChange (newFormState){
        this.props.changeForm(newFormState);
    }

    render() {

        return(
            <form action="" id="formFournisseurs">
                <div id="rechercheFournisseur">
                    <input type="text" placeholder="Nom entreprise" onChange={this._changeNomEntreprise} value={this.props.formState.nomEntreprise} />
                    <input type="text" placeholder="Nombre d'employés" onChange={this._changeNombreEmployes}  value={this.props.formState.nombreEmployes} />
                    <input type="text" placeholder="Nom d'un contact" onChange={this._changeNomContact} value={this.props.formState.nomContact}/>
                    <input type="text" placeholder="Code" onChange={this._changeCode} value={this.props.formState.code} />
                    <input type="reset" value="Reset"  onClick= {this._reset}/>
                </div>
            </form>
        );
    }
}

export default SearchCompSuppliers;
