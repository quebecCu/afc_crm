import React from 'react';

class DisplayUser extends React.Component{

	constructor(props){
		super(props);
		this.props.getOperations();
		this._getPermission=this._getPermission.bind(this);
	}

	_getPermission(level){
		let label='';
		this.props.formState.operations.map(element=>{
			if(level===element.value){
				label = element.label;
			}
		});
		return label;
	}

	render(){

		return (
		<div className="container">
			<div className="page-header" style={{paddingBottom:20}}>
				<h1>Consultation de l'utilisateur {this.props.user.name} {this.props.user.lastname}</h1></div>
			Rôle : {this.props.user.role}<br />
			Nom : {this.props.user.lastname}<br />
			Prénom : {this.props.user.name}<br />
			Login: {this.props.user.login}<br />
			Adresse e-mail: {this.props.user.mail}<br />
			Permissions : {
				this.props.user.userPerms.map(element=>{
			return(<div>Droit de {this._getPermission(element.level)} sur la table {element.group}</div>);

			})}

			<button onClick={()=>this.props.handleClick("UpdateUser")}>Modifier </button>
			<button>Supprimer</button>

		</div>
		);
	}
}

export default (DisplayUser);
