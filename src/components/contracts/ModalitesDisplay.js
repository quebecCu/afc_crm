import React from 'react';
import DisplayOneModalite from './DisplayOneModalite';

class ModalitesDisplay extends React.Component{
	constructor(props){
		super(props);
	}


	render(){
		let moduleToFind = this.props.idModule;
		let modalites = [];
		this.props.formState.modules.forEach(element=>{
			if(element.idModule == moduleToFind){
				modalites = element.modalites;
			}
		});
		return <div className="row">
			{
				modalites.map(element=>{
					let value = "";
					if (this.props.module){
						this.props.module.modalites.forEach(modalite=>{
							if (modalite.idModalite == element.idModalite){
								value = modalite.valeur;
							}
						})
					}
					return <DisplayOneModalite key={element.idModalite} modalite={element} valeur={value}
									idModule={this.props.idModule} formState={this.props.formState} changeForm={this.props.changeForm}/>
				})
			}
		</div>
	}
}

export default (ModalitesDisplay);
