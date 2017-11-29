import React from 'react';

class ModalitesDisplay extends React.Component{
	constructor(props){
		super(props);
	}


	//loop dans formState.modules pour trouver les bonnes modalités

	render(){
		let modalites = [];
		this.props.formState.modules.forEach(element=>{
			if(element.idModule===parseInt(this.props.idModule)){
				modalites = element.modalites;
			}
			console.log(modalites);
		});
		return <div className="d-flex flex-row">
			{
				modalites.map(element=>{
					return <h3 className="p2" key={element.idModalite}>{element.nom}</h3>
				})
			}

		</div>
	}
}

export default (ModalitesDisplay);
