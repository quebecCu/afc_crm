import React from 'react';

export class FormCreateUser extends React.Component{

    constructor(props){
        super(props);
        this.whatToRender = this.whatToRender.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeNom = this.onChangeNom.bind(this);
    }

    onChangeRole(event){
        console.log("LES PROPS ROLE::::");
        console.log(...this.props);
        this.props.changeForm({...this.props.formState , role: event.target.value});
        console.log(this.props);

    }
    onChangeNom(event){
        console.log("LES PROPS NOM::::");
        console.log(...this.props);
        this.props.changeForm({...this.props.formState , nom: event.target.value});
    }

    whatToRender(){
        console.log("jnrjnerf");
        console.log(this.props.formState.role);
        if(this.props.formState.role === "employe"){
            console.log("allo");
          return <div>
                  <span className="titre">Nom :</span> <input type="textField" onChange={this.onChangeNom} value={this.props.formState.nom}/>
                lololol
          </div> ;
        }
        //Si c'est un visiteur il va falloir rechercher dans les fournisseurs // les clients l'entreprise
        //à laquelle associer l'utilisateur
        else if(this.props.formState.role ==="visiteurClient" || this.props.formState.role ==="visiteurFournisseur"){
            return <h1>visiteurrrrr</h1>;
        }
    }

    render(){
        let test = this.whatToRender();
        console.log(test);
        return  <form><span className="titre">Rôle :</span> <select name="role" onChange={this.onChangeRole}>
            <option value="employe">Employé</option>
            <option value="visiteurClient">Visiteur client</option>
            <option value="visiteurFournisseur">Visiteur fournisseur</option>
        </select>
            {test}

        </form>;
    }
}