import React from 'react';

export class FormCreateUser extends React.Component {

	constructor(props) {
		super(props);
		this.whatToRender = this.whatToRender.bind(this);
		this.onChangeRole = this.onChangeRole.bind(this);
		this.onChangeNom = this.onChangeNom.bind(this);
		this.onChangeLogin = this.onChangeLogin.bind(this);
		this.onChangeMdp = this.onChangeMdp.bind(this);
		this.onChangeMail = this.onChangeMail.bind(this);
	}

	onChangeRole(event) {
		let role = event.target.value;
		//quand on change le rôle, les permissions par défaut du rôle sélectionné s'attribuent aux userPerms
		let idRole;//id du role sélectionné dans la table des permissions par défaut
		for (let i = 0; i < this.props.formState.defaultPerms.length; i++) {
			console.log("les default perms? " + this.props.formState.defaultPerms[i].role)
			if (role === this.props.formState.defaultPerms[i].role) {
				idRole = i;
			}
		}
		let defaultPerms = JSON.parse(JSON.stringify(this.props.formState.defaultPerms[idRole].droits));
		this.props.changeForm({...this.props.formState, role: role, userPerms: defaultPerms});
	}

	onChangeNom(event) {
		this.props.changeForm({...this.props.formState, nom: event.target.value});
	}

	onChangeLogin(event) {
		this.props.changeForm({...this.props.formState, login: event.target.value});
	}

	onChangeMdp(event) {
		this.props.changeForm({...this.props.formState, mdpProv: event.target.value});
	}

	onChangeMail(event) {
		this.props.changeForm({...this.props.formState, mail: event.target.value});
	}


	whatToRender() {

		return <div>
			<span className="titre">Nom, prénom :</span>
			<input
				type="textField"
				onChange={this.onChangeNom}
				value={this.props.formState.nom}/>
			<br/>
			<span className="titre">Login :</span>
			<input
				type="textField"
				onChange={this.onChangeLogin}
				value={this.props.formState.login}/>
			<br/>
			<span className="titre">Mot de passe provisoire :</span>
			<input
				type="textField"
				onChange={this.onChangeMdp}
				value={this.props.formState.mdpProv}/>
			<br/>
			<span className="titre">Mail :</span>
			<input
				type="textField"
				onChange={this.onChangeMail}
				value={this.props.formState.mail}/>
			<br/>
		</div>;
	}

	render() {
		let fields = this.whatToRender();
		return <div>
			<form>
				<span className="titre">Rôle :</span>
				<select
					name="role"
					onChange={this.onChangeRole}>
					{
						this.props.formState.roles.map((element) => {
							return (
								<option
									key={element.description}
									value={element.description}>
									{
										element.description
									}
								</option>
							);
						})}
				</select>
				{fields}
			</form>
		</div>;
	}
}
