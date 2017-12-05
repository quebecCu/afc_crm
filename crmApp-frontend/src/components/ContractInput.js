import React from 'react';

class ContractInput extends React.Component{
	constructor(props){
		super(props);
		this._onChangeField=this._onChangeField.bind(this);
		this._checkValues=this._checkValues.bind(this);

	}

	_onChangeField(event){
		let titreChamp = this.props.titreChamp;
		if(this.props.part === "taux"){
			let historiqueTaux = this.props.formState.contrat.historiqueTaux;
			historiqueTaux[titreChamp] = event.target.value;
			this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat,
				historiqueTaux:historiqueTaux}});
			this._checkValues(historiqueTaux[titreChamp]);

		}
		else{
			let remuneration = this.props.formState.contrat.remuneration;
			remuneration[titreChamp] = event.target.value;
			this.props.changeForm({...this.props.formState, contrat:{...this.props.formState.contrat,
				remuneration:remuneration}});
			this._checkValues(remuneration[titreChamp]);
		}


	}

	_checkValues(valeurDuForm){
		if(this.props.unite === "%" && valeurDuForm !== ""){
			if(!/^\d{1,2}\.[0-9]$/.test(valeurDuForm) &&
					!/^\d{1,2}$/.test(valeurDuForm)){
				document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "block";

			}
			else{
				document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "none";
			}
		}
		else{
			if(!/^\d{1,7}\.[0-9]{1,2}$/.test(valeurDuForm) &&
				!/^\d{1,7}$/.test(valeurDuForm)){
				document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "block";

			}
			else{
				document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "none";
			}
		}
		if(valeurDuForm === ""){
			document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "none";

		}

	}





	render(){
		return <div className="form-group row">
				<label className="col-form-label col-sm-3">{this.props.titre + " "}</label>
				<div className="col-sm-8">
					<input type="text" placeholder={this.props.format} className="form-control"
						onChange={this._onChangeField}/>
					<p id={"verif"+this.props.part+this.props.titreChamp}
					   className="help-block text-danger" style={{display:"none"}} >
						Format {this.props.format}
					</p>
				</div>
				<div className="col-sm-1">{this.props.unite}</div>
			</div>
	}

}

export default (ContractInput);
