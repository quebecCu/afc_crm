import React from 'react';
import {CreateUserPermissions} from './CreateUserPermissions';

export class FormCreateUser extends React.Component{

    constructor(props){
        super(props);
        this.whatToRender = this.whatToRender.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangeMdp =this.onChangeMdp.bind(this);
        this.onChangeMail=this.onChangeMail.bind(this);
        this.onChangePermissionsUser =this.onChangePermissionsUser.bind(this);

    }

    onChangeRole(event){
        console.log(...this.props);
        this.props.changeForm({...this.props.formState , role: event.target.value, permissionsUser: []});
        console.log(this.props);

    }
    onChangeNom(event){
        this.props.changeForm({...this.props.formState , nom: event.target.value});
    }
    onChangeLogin(event){
        this.props.changeForm({...this.props.formState , login: event.target.value});
    }
    onChangeMdp(event) {
        this.props.changeForm({...this.props.formState, mdpProv: event.target.value});
    }
    onChangeMail(event){
        this.props.changeForm({...this.props.formState, mail: event.target.value});
    }

    onChangePermissionsUser(event){
       /* event.preventDefault();
        let buttonId=event.target.id;
        event.target.setAttribute("disabled", "");
        console.log(buttonId);
        this.props.formState.permissionsUser.push(this.props.formState.permissionsDefault[0].perm[buttonId]);

        this.props.changeForm({...this.props.formState, permissionsUser: this.props.formState.permissionsUser});

    */
       let buttonId=event.target.id;
       if(event.target.checked){
           console.log("alllllllo?");
           this.props.formState.permissionsUser.push(this.props.formState.permissionsDefault[0].perm[buttonId]);
            console.log(this.props.formState.permissionsUser);
           this.props.changeForm({...this.props.formState, permissionsUser: this.props.formState.permissionsUser});

       }
       else {
           // check la position de l'élément idDroit dans permissionsUser
           let idToRemove;
           for(let i = 0; i < this.props.formState.permissionsUser.length ; i++){
               if(this.props.formState.permissionsDefault[0].perm[buttonId] === this.props.formState.permissionsUser[i])
                idToRemove=i;
           }
           this.props.formState.permissionsUser.splice(idToRemove, 1);
           this.props.changeForm({...this.props.formState, permissionsUser: this.props.formState.permissionsUser});

       }


    }






    whatToRender(){

        if(this.props.formState.role === "employe"){
          return <div>
              <span className="titre">Nom, prénom :</span> <input type="textField" onChange={this.onChangeNom} value={this.props.formState.nom}/><br />
              <span className="titre">Login :</span> <input type="textField" onChange={this.onChangeLogin} value={this.props.formState.login}/><br />
              <span className="titre">Mot de passe provisoire :</span> <input type="textField" onChange={this.onChangeMdp} value={this.props.formState.mdpProv}/><br />
              <span className="titre">Mail :</span><input type="textField" onChange={this.onChangeMail} value={this.props.formState.mail} /><br />
              <span className="titre">Permissions :</span><br />
              <CreateUserPermissions role={this.props.formState.role} formState={this.props.formState} onChangePermissionsUser={this.onChangePermissionsUser}/>
          </div> ;
        }
        //Si c'est un visiteur il va falloir rechercher dans les fournisseurs // les clients l'entreprise
        //à laquelle associer l'utilisateur
        else if(this.props.formState.role ==="visiteurClient" || this.props.formState.role ==="visiteurFournisseur"){
            return <div>
                <span className="titre">Nom compagnie :</span> <input type="textField" onChange={this.onChangeNom} value={this.props.formState.nom}/><br />
                <span className="titre">Login :</span> <input type="textField" onChange={this.onChangeLogin} value={this.props.formState.login}/><br />
                <span className="titre">Mot de passe provisoire :</span> <input type="textField" onChange={this.onChangeMdp} value={this.props.formState.mdpProv}/><br />
                <span className="titre">Mail :</span><input type="textField" onChange={this.onChangeMail} value={this.props.formState.mail} /><br />
                <span className="titre">Permissions :</span><br />
                <CreateUserPermissions role={this.props.formState.role} formState={this.props.formState} onChangePermissionsUser={this.onChangePermissionsUser}/>
            </div>;
        }
    }

    render(){
        let test = this.whatToRender();
        return  <form><span className="titre">Rôle :</span> <select name="role" onChange={this.onChangeRole}>
            <option value="employe">Employé</option>
            <option value="visiteurClient">Visiteur client</option>
            <option value="visiteurFournisseur">Visiteur fournisseur</option>
        </select>
            {test}

        </form>;
    }
}