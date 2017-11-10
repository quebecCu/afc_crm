import React from 'react';

export class FormCreateUser extends React.Component{

    constructor(props){
        super(props);
        this.whatToRender = this.whatToRender.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangeMdp =this.onChangeMdp.bind(this);
        this.onChangeMail=this.onChangeMail.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.submitUser(this.props.formState);
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

    whatToRender() {

        if(this.props.formState.role === "Employe") {
          return <div>
              <span className="titre">Nom, prénom :</span> <input type="textField" onChange={this.onChangeNom} value={this.props.formState.nom}/><br />
              <span className="titre">Login :</span> <input type="textField" onChange={this.onChangeLogin} value={this.props.formState.login}/><br />
              <span className="titre">Mot de passe provisoire :</span> <input type="textField" onChange={this.onChangeMdp} value={this.props.formState.mdpProv}/><br />
              <span className="titre">Mail :</span><input type="textField" onChange={this.onChangeMail} value={this.props.formState.mail} /><br />
          </div> ;
        }
        //Si c'est un visiteur il va falloir rechercher dans les fournisseurs // les clients l'entreprise
        //à laquelle associer l'utilisateur
        else if(this.props.formState.role ==="Visiteur Client" || this.props.formState.role ==="Visiteur Fournisseur") {
            return <div>
                <span className="titre">Nom compagnie :</span> <input type="textField" onChange={this.onChangeNom} value={this.props.formState.nom}/><br />
                <span className="titre">Login :</span> <input type="textField" onChange={this.onChangeLogin} value={this.props.formState.login}/><br />
                <span className="titre">Mot de passe provisoire :</span> <input type="textField" onChange={this.onChangeMdp} value={this.props.formState.mdpProv}/><br />
                <span className="titre">Mail :</span><input type="textField" onChange={this.onChangeMail} value={this.props.formState.mail} /><br />

            </div>;
        }
    }

    render() {
        let test = this.whatToRender();
        return  <div><form><span className="titre">Rôle :</span> <select name="role" onChange={this.onChangeRole}>
            {this.props.formState.roles.map(element => {
                return(
                    <option key={element.description} value={element.description}>{element.description}</option>
                );
            })}
        </select>
            {test}
        </form>
            <button onClick={this.handleClick}>Créer l'utilisateur</button></div>;
    }
}
