import React from 'react';

class ContractInput extends React.Component{
	constructor(props){
		super(props);
		this._onChangeField=this._onChangeField.bind(this);
		this._checkValues=this._checkValues.bind(this);
		this._getFieldValue=this._getFieldValue.bind(this);

	}

	_getFieldValue(){
		//check les values des champs dans le cas où on est sur un update
		let titreChamp = this.props.titreChamp;
		if(this.props.part === "taux"){
			let historiqueTaux = this.props.formState.contrat.historiqueTaux;
			let value = historiqueTaux[titreChamp];
			return value;
		}
		else{
			let remuneration = this.props.formState.contrat.remuneration;
			let value = remuneration[titreChamp];
			return value;
		}
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
		else if(this.props.unite === "$" && valeurDuForm !== ""){
			if(!/^\d{1,7}\.[0-9]{1,2}$/.test(valeurDuForm) &&
				!/^\d{1,7}$/.test(valeurDuForm)){
				document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "block";

			}
			else{
				document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "none";
			}
		}
		else{
			if(this.props.format === "AAAA-MM-JJ" && valeurDuForm !== ""){
				if(!/^((?:19|20)\d{2})-(0?\d|1[012])-(0?\d|[12]\d|3[01])$/.test(valeurDuForm )){
					document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "block";

				}
				else{
					document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "none";

				}
			}
		}
		if(valeurDuForm === ""){
			document.getElementById("verif"+this.props.part+this.props.titreChamp).style.display = "none";

		}
	}





	render(){
		let value = this._getFieldValue();
		return <div className="form-group row">
				<label className="col-form-label col-3">{this.props.titre + " "}</label>
				<div className="col-8">
					<div className="tooltipp" style={{cursor:"pointer", position: 'absolute', right: '2px', top: 0}}>
						<span className="fa fa-info"/>
						<span className="tooltipptext">{this.props.description}</span>
					</div>
					<input type="text" placeholder={this.props.format} className="form-control"
						onChange={this._onChangeField} id={"input"+this.props.titreChamp+this.props.part}
						value={value}/>
					<p id={"verif"+this.props.part+this.props.titreChamp}
					   className="help-block text-danger" style={{display:"none"}} >
						Format {this.props.format}
					</p>
				</div>
				<div className="col-1" style={{paddingLeft:'5px'}}>{this.props.unite}</div>
			</div>
	}

}

export default (ContractInput);