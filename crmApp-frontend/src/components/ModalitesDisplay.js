import React from 'react';
import DisplayOneModalite from './DisplayOneModalite';

class ModalitesDisplay extends React.Component{
	constructor(props){
		super(props);

	}

	componentDidMount(){
		/*this.state.modalites.forEach(element=>{
			console.log("valeur"+element.idModalite+this.props.idModule);
			document.getElementById("valeur"+element.idModalite+this.props.idModule).style.display = "none";
		});*/
	}

	componentDidUpdate(){
		/*this.state.modalites.forEach(element=>{
			console.log("valeur"+element.idModalite+this.props.idModule);
			document.getElementById("valeur"+element.idModalite+this.props.idModule).style.display = "none";
		});*/
	}

	//loop dans formState.modules pour trouver les bonnes modalités

	render(){
		this.props.formState.modules.forEach(element=>{
			if(element.idModule===parseInt(this.props.idModule)){
				this.state = {modalites: element.modalites};
				//this.state.modalites = element.modalites;
			}
		});
		return <div className="d-flex flex-row">
			{
				this.state.modalites.map(element=>{
					return <DisplayOneModalite key={element.idModalite} modalite={element} modalites={this.state.modalites}
												idModule={this.props.idModule} formState={this.props.formState}
											   changeForm={this.props.changeForm}/>
				})
			}

		</div>
	}
}

export default (ModalitesDisplay);
