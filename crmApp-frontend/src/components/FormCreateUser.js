import React from 'react';

export class FormCreateUser extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return  <form><span className="titre">Rôle :</span> <select name="role" onChange={this.props.onChangeRole}>
            <option value="employe">Employé</option>
            <option value="visiteurClient">Visiteur client</option>
            <option value="visiteurFournisseur">Visiteur fournisseur</option>
        </select>

        </form>;
    }
}