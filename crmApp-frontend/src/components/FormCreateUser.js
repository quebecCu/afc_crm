import React from 'react';

export class FormCreateUser extends React.Component {

	constructor(props) {
		super(props);
		this.whatToRender = this.whatToRender.bind(this);
		this.onChangeRole = this.onChangeRole.bind(this);
		this.onChangeNom = this.onChangeNom.bind(this);
		this.onChangePrenom = this.onChangePrenom.bind(this);
		this.onChangeLogin = this.onChangeLogin.bind(this);
		this.onChangeMdp = this.onChangeMdp.bind(this);
		this.onChangeMail = this.onChangeMail.bind(this);
	}

	onChangeRole(event) {
		let role = event.target.value;
		//quand on change le rôle, les permissions par défaut du rôle sélectionné s'attribuent aux userPerms
		let idRole;//id du role sélectionné dans la table des permissions par défaut
		for (let i = 0; i < this.props.formState.defaultPerms.length; i++) {
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

	onChangePrenom(event) {
		this.props.changeForm({...this.props.formState, prenom: event.target.value});
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
		let mdp;
		if(this.props.view === "CreateUser"){
			mdp=(<div className="form-group row">
				<label className="col-sm-3 col-form-label">Mot de passe provisoire : </label>
				<div className="col-sm-9">
					<input
						type="textField"
						className="form-control"
						placeholder="Mot de passe provisoire que l'utilisateur changera"
						onChange={this.onChangeMdp}
						value={this.props.formState.mdpProv}/>
				</div>
			</div>)
		}
		return <div>
			<div className="form-group row"><label className="col-sm-3 col-form-label">Nom : </label>
				<div className="col-sm-3"><input
					type="textField"
					className="form-control"
					placeholder="Nom"
					onChange={this.onChangeNom}
					value={this.props.formState.nom}/>
				</div>
				<label className="col-sm-2 col-form-label">Prénom : </label>
				<div className="col-sm-4"><input
					type="textField"
					className="form-control"
					placeholder="Prénom"
					onChange={this.onChangePrenom}
					value={this.props.formState.prenom}/>
				</div>
			</div>
			<br/>
			<div className="form-group row">
				<label className="col-sm-3 col-form-label">Login : </label>
				<div className="col-sm-9">
					<input
						type="textField"
						className="form-control"
						placeholder="Login"
						onChange={this.onChangeLogin}
						value={this.props.formState.login}/>
				</div>
			</div>
			<br/>
			{
				mdp
			}
			<br/>
			<div className="form-group row">
				<label className="col-sm-3 col-form-label">Adresse e-mail : </label>
				<div className="col-sm-9">
					<input
						type="textField"
						className="form-control"
						placeholder="adressemail@email.ca"
						onChange={this.onChangeMail}
						value={this.props.formState.mail}/>
				</div>
			</div>
			<br/>
		</div>;
	}

	render() {
		let fields = this.whatToRender();
		return <div>
			<form className="container">
				<div className="form-group row">
					<label className="col-sm-3 col-form-label">Rôle :</label>
					<div className="col-sm-9">
						<select
							name="role"
							className="form-control"
							onChange={this.onChangeRole}>
							<option disabled selected value> -- select an option -- </option>
							{
								this.props.formState.roles.map((element) => {
										if(this.props.formState.role === element.description){
											return (<option
												key={element.description}
												value={element.description}
												selected>
												{
													element.description
												}
											</option>);
										}
										else
									{
										return (
											<option
												key={element.description}
												value={element.description}>
												{
													element.description
												}
											</option>
										);
									}
								})}
						</select>
					</div>
				</div>
				{fields}
			</form>
		</div>;
	}
}
