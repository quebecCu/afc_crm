import React from 'react';
import DisplayOneModalite from './DisplayOneModalite';

class ModalitesDisplay extends React.Component{
	constructor(props){
		super(props);

	}




	componentDidUpdate(){
		/*this.state.modalites.forEach(element=>{
			console.log("valeur"+element.idModalite+this.props.idModule);
			document.getElementById("vale
			ur"+element.idModalite+this.props.idModule).style.display = "none";
		});*/
	}

	//loop dans formState.modules pour trouver les bonnes modalités

	render(){
		this.props.formState.modules.forEach(element=>{
			if(element.idModule===parseInt(this.props.idModule, 10)){
				this.state = {modalites: element.modalites};
				//this.state.modalites = element.modalites;
			}
		});
		return <div className="d-flex flex-wrap justify-content-around">
			{
				this.state.modalites.map(element=>{
					return <DisplayOneModalite key={element.idModalite} modalite={element} modalites={this.state.modalites}
											   view={this.props.view}
												idModule={this.props.idModule} formState={this.props.formState}
											   changeForm={this.props.changeForm}/>
				})
			}
		</div>
	}
}

export default (ModalitesDisplay);
