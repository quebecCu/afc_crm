import React from 'react';
import {DisplayOnePermission} from '../components/DisplayOnePermission';

class CreateUserPermissions extends React.Component {


	constructor(props) {
		super(props);
		//this.showPermissions=this.showPermissions.bind(this);
		this.toReturn = '';
	}


	/*constructor(props){
		super(props);
		this.showPermissions=this.showPermissions.bind(this);
		this.handleClickOKButton = this.handleClickOKButton.bind(this);
		this.handleClickXButton = this.handleClickXButton.bind(this);

	}

	handleClickOKButton(event){//L'id du bouton est en fait l'ID de la "permission"
		event.preventDefault();
		let buttonId=event.target.id;
		console.log(buttonId);
		//ca modifie le state permissionsUser qui est vide au début
		//Pour l'instant le "employe" est en dur, faudra voir avec le sequelize
		this.props.formState.permissionsUser.push(this.props.formState.permissionsDefault[0].perm[buttonId]);

	}

	handleClickXButton(event){
		event.preventDefault();
		let buttonId=event.target.id;
	}

	showPermissions(role){
		this.toReturn = '';
		switch(role){
			case "employe":
				//trouver ici dans la table des droits par défaut, les droits de 'employe'
				let permDefEmploye;
				for(let i=0; i < this.props.formState.permissionsDefault.length; i++) {
					if (this.props.formState.permissionsDefault[i].role === "employe")
						permDefEmploye = this.props.formState.permissionsDefault[i].perm
				}

				//affiche les droits par défaut au début puis les droits modifiés après, while??
				this.toReturn = permDefEmploye.map(element => {
					return(
						<span>Droit de {element.droit} sur la table {element.table}
							<input id={element.idDroit} type="checkbox" name="droits" value={element.idDroit} onChange={this.props.onChangePermissionsUser}/><br />
						</span>
					)});
				return this.toReturn;
			case "visiteurClient": case "visiteurFournisseur":
				let permDefault;
				for(let i=0; i < this.props.formState.permissionsDefault.length; i++) {
					console.log(this.props.formState.permissionsDefault[i])
					console.log("ROOOOOOLE " + this.props.formState.role);
					if (this.props.formState.permissionsDefault[i].role === this.props.formState.role) {
						console.log(i);
						console.log("CA MATCHE??" + this.props.formState.permissionsDefault[i].perm[0].table);
						permDefault = this.props.formState.permissionsDefault[i].perm;
						console.log("PERMDEF1 : " + permDefault[0]);
					}
				}
				console.log(permDefault[0]);
				this.toReturn=(<span>Droit de {permDefault[0].droit} sur la table {permDefault[0].table}</span>);
				return this.toReturn;
			default:
				return this.toReturn;
		}
	}


	render(){
		return <div>{this.showPermissions(this.props.role)}</div>;
	}*/


	/*componentDidMount() {
		//Ici il faudrait aller chercher les permissions par défaut pour le rôle donné
		//On se concentre sur juste un employé pr l'instant
		let permDefEmploye;
		console.log("lestatebordel:"+this.props.formState.defaultPerms);
		for(let i=0; i < this.props.formState.defaultPerms.length; i++) {
			if (this.props.formState.defaultPerms[i].role === "Utilisateur_All")
				permDefEmploye = this.props.formState.defaultPerms[i].droits
		}
		//On itère dans chaque permission par défaut et on crée une div d'affichage d'une perm
		console.log(typeof permDefEmploye);
		this.toReturn = permDefEmploye.map(element => {
			return(
				<DisplayOnePermission key={element.id} id={element.id} entite={element.entite} level={element.level} formState={this.props.formState} changeForm={this.props.changeForm}/>
			)});
		return this.toReturn;
	}*/

	render() {
		let permDefEmploye = [];
		console.log("lestatebordel:" + this.props.formState.defaultPerms);
		for (let i = 0; i < this.props.formState.defaultPerms.length; i++) {
			if (this.props.formState.defaultPerms[i].role === "Utilisateur_All")
				permDefEmploye = this.props.formState.defaultPerms[i].droits

		}

		//On itère dans chaque permission par défaut et on crée une div d'affichage d'une perm
		console.log("permdefemploye" + permDefEmploye);
		this.toReturn = permDefEmploye.map(element => {
			return (
				<DisplayOnePermission key={element.id} id={element.id} entite={element.entite} level={element.level}
									  formState={this.props.formState} changeForm={this.props.changeForm}
									  updateUserPerms={this.props.updateUserPerms}/>
			)
		});
		return (<div><span className="titre">Permissions :</span><br/>
			{
				this.toReturn
			}</div>);
	}
}

export default CreateUserPermissions;
