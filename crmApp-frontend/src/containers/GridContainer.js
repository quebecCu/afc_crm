import React, { Component } from 'react';
import {GridCreationClient} from "../components/form/GridCreationClient";
import {connect} from "react-redux";
import {
	changeGrid, changeLayout, changeViewGrid, createCustomerFile, createNewField, requestGrid,
	updateCustomerFile, getReleves, getChambreCommerce, getChampTypes, getActivites, getEtats, getProvenances,
	changeRequiredFields
} from "../actions/crmGridLayout";
import {GridCustomerFile} from "../components/form/GridCustomerFile";

class CreationClient extends Component {
    constructor(props) {
        super(props);
        this._handleStatic = this._handleStatic.bind(this);
        this._handleSubmitCreate = this._handleSubmitCreate.bind(this);
		this._handleSubmitUpdate = this._handleSubmitUpdate.bind(this);
        this._handleSubmitChamp = this._handleSubmitChamp.bind(this);
        this._handleDrag = this._handleDrag.bind(this);
        this._handleNonStatic = this._handleNonStatic.bind(this);
        this._handleChangeInput = this._handleChangeInput.bind(this);

        if(this.props.view === 'newCustomer') {
			this.props.requestGrid();
		}
		/*this.props.getChambreCommerce();
        this.props.getReleves();
		this.props.getChampTypes();
		this.props.getActivites();
        this.props.getEtats();
        this.props.getProvenances();*/
    }

	//Rends les champs static
    _handleStatic() {
		let {layouts} = this.props.crmGridLayout;
		let layout = [];
        for (let champ = 0; champ < layouts.lg.length ; champ++) {
			layout.push({i: layouts.lg[champ].i, x: layouts.lg[champ].x, y: layouts.lg[champ].y,
				w: layouts.lg[champ].w, h: layouts.lg[champ].h, minW: layouts.lg[champ].minW, static: true});
        }
		this.props.changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout});
    }

    //Change le state: sauvegarde la position des champs
    _handleDrag(newItem) {
		this.props.changeLayout({lg: newItem, md: newItem, sm: newItem, xs: newItem, xxs: newItem});
    }

    //Rends les champs non-static, on peut les déplacer
    _handleNonStatic() {
		let {layouts} = this.props.crmGridLayout;
		let layout = [];
		for (let champ = 0; champ < layouts.lg.length ; champ++) {
			layout.push({i: layouts.lg[champ].i, x: layouts.lg[champ].x, y: layouts.lg[champ].y,
				w: layouts.lg[champ].w, h: layouts.lg[champ].h, minW: layouts.lg[champ].minW, static: false});
		}
		this.props.changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout});
    }

    //On récupère le grid et le layout pour les envoyer au back-end grâce au middleware (Creation du client)
    _handleSubmitCreate(event) {
       event.preventDefault();
       let {layouts, grid, requiredFields} = this.props.crmGridLayout;
       this._handleStatic();
       this.props.createCustomerFile({layouts, grid, requiredFields});
       console.log("submit file");
    }

    //On récupère le grid et le layout pour les envoyer au back-end grâce au middleware (Modification du client)
	_handleSubmitUpdate(event) {
		event.preventDefault();
		let {layouts, grid, requiredFields} = this.props.crmGridLayout;
		this._handleStatic();
		this.props.updateCustomerFile({layouts, grid, requiredFields});
		console.log("submit file");
	}

	//Change le state : Sauvegarde la valeur des champs
    _handleChangeInput(event) {
    	let {grid} = this.props.crmGridLayout;
    	for (let champ = 0 ; champ < grid.length ; champ++) {
    		if(event.target.id === grid[champ].label) {
    			grid[champ].value = event.target.value;
			}
		}
		this.props.changeGrid(grid);
	}

	//On crée un nouveau champ !
    _handleSubmitChamp(event) {
        event.preventDefault();
		/*let {layouts, grid} = this.props.crmGridLayout;
        let key = (grid.length+1).toString();
        let x = (grid.length % 4)*3;
        let y = 3;
        if(grid.length % 4 === 0 && grid.length !== 0) {
            y++;
        }
        layouts.lg.push({w: 3, h: 1, x: x, y: y, i: key, minW: 3});*/


        //grid.push({key: key, label: document.getElementById('champDescription').value, nom: document.getElementById('champNom').value, value: ''});
		let description = document.getElementById('champDescription').value;
		let nom = document.getElementById('champNom').value;
		let type = document.getElementById('champType').value;
		document.getElementById('champNom').value = '';
		document.getElementById('champDescription').value = '';
		document.getElementById('champType').value = '';
		//this.props.changeGrid(grid);
		//this.props.changeLayout({lg: layouts.lg, md: layouts.lg, sm: layouts.lg, xs: layouts.lg, xxs: layouts.lg});
        this.props.createNewField({description: description, nom: nom, type: type});
		//this._handleNonStatic();
    }

    render() {
		let {grid, layouts, view, releves,
			chambreCommerce, champTypes, activites,
			etats, provenances, requiredFields} = this.props.crmGridLayout;
		let {isAdmin} = this.props.crmLogin;
        return (
        	<div>
				{
					this.props.view === 'newCustomer'
					&& <GridCreationClient handleStatic={this._handleStatic} handleSubmit={this._handleSubmitCreate} layouts={layouts}
										handleDrag={this._handleDrag} handleNonStatic={this._handleNonStatic}
										handleSubmitChamp={this._handleSubmitChamp} grid={grid}
										handleChangeInput={this._handleChangeInput} title="Création d'une fiche client"
										isAdmin={isAdmin} releves={releves}
										champTypes={champTypes} chambreCommerce={chambreCommerce}
										activites={activites} etats={etats} provenances={provenances}
										changeRequiredFields={this.props.changeRequiredFields} requiredFields={requiredFields}/>
				}
				{
					this.props.view === 'customerFile' && view === 'read'
					&& <GridCustomerFile handleModify={this.props.changeViewGrid}
										 layouts={layouts} grid={grid}/>
				}
				{
					this.props.view === 'customerFile' && view === 'write'
					&& <GridCreationClient handleStatic={this._handleStatic} handleSubmit={this._handleSubmitUpdate} layouts={layouts}
										   handleDrag={this._handleDrag} handleNonStatic={this._handleNonStatic}
										   handleSubmitChamp={this._handleSubmitChamp} grid={grid}
										   handleChangeInput={this._handleChangeInput} title="Modification d'une fiche client"
										   isAdmin={isAdmin} releves={releves}
										   champTypes={champTypes} chambreCommerce={chambreCommerce}
										   activites={activites} etats={etats} provenances={provenances}
										   changeRequiredFields={this.props.changeRequiredFields} requiredFields={requiredFields}/>
				}
			</div>
        )
    }
}

function mapStateToProps (state) {

	return{
		crmGridLayout: state.crmGridLayout,
		crmLogin: state.crmLogin
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {
	return{
		changeLayout: (newLayout) => {
			dispatch(changeLayout(newLayout));
		},
		changeGrid: (newGrid) => {
			dispatch(changeGrid(newGrid));
		},
		requestGrid: () => {
			dispatch(requestGrid());
		},
		createCustomerFile: (file) => {
			dispatch(createCustomerFile(file));
		},
		changeViewGrid: (newView) => {
			dispatch(changeViewGrid(newView))
		},
		updateCustomerFile: (file) => {
			dispatch(updateCustomerFile(file))
		},
		getReleves: () => {
			dispatch(getReleves());
		},
		getChambreCommerce: () => {
			dispatch(getChambreCommerce());
		},
		createNewField: (newField) => {
			dispatch(createNewField(newField));
		},
		getChampTypes: () => {
			dispatch(getChampTypes());
		},
		getActivites: () => {
			dispatch(getActivites());
		},
		getEtats: () => {
			dispatch(getEtats());
		},
		getProvenances: () => {
			dispatch(getProvenances());
		},
		changeRequiredFields: (newRequiredFields) => {
			dispatch(changeRequiredFields(newRequiredFields));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (CreationClient)
