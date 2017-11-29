import React, { Component } from 'react';
import {GridCreationClient} from "../components/form/GridCreationCustomer/GridCreationClient";
import {connect} from "react-redux";
import {
	changeGrid, changeLayout, changeViewGrid, createCustomerFile, createNewField, requestGrid,
	updateCustomerFile,
	changeRequiredFields, updatePositions, updateField, changeNewField, deleteField, changeUpdateField
} from "../actions/crmGridLayout";
import {changeLoading} from "../actions/crmDashboard";

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
        this._handleModifyField = this._handleModifyField.bind(this);
		window.scrollTo(0,0);
        if(this.props.view === 'newCustomer') {
			this.props.requestGrid();
		}
		else {
			let {idToDisplay} = this.props.crmGridLayout;
			this.props.requestGrid(idToDisplay);
		}
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
		this.props.updatePositions({newItem});
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
       let {grid, requiredFields} = this.props.crmGridLayout;
       this._handleStatic();
       this.props.createCustomerFile({grid, requiredFields});
       console.log("submit file");
    }

    //On récupère le grid et le layout pour les envoyer au back-end grâce au middleware (Modification du client)
	_handleSubmitUpdate(event) {
		event.preventDefault();
		let {grid, requiredFields, idToDisplay} = this.props.crmGridLayout;
		this._handleStatic();
		this.props.updateCustomerFile({grid, requiredFields, idToDisplay});
		console.log("submit file");
	}

	//Change le state : Sauvegarde la valeur des champs
    _handleChangeInput(event) {
    	let {grid} = this.props.crmGridLayout;
    	for (let champ = 0 ; champ < grid.length ; champ++) {
    		if(parseInt(event.target.id) === grid[champ].idattrentreprise) {
				grid[champ]= {...grid[champ] , value: event.target.value}
			}
		}
		this.props.changeGrid(grid);
	}

	//On crée un nouveau champ !
    _handleSubmitChamp(event) {
        event.preventDefault();
		let {grid, formNewField} = this.props.crmGridLayout;
        let x = (grid.length % 4)*3;
        let y = Math.floor(grid.length/4);

		document.getElementById('champNom').value = '';
		document.getElementById('champDescription').value = '';
		document.getElementById('champType').value = '';
        this.props.createNewField({form: formNewField, posx: x, posy: y});
    }

    _handleModifyField(event) {
    	event.preventDefault();
    	let {formUpdateField} = this.props.crmGridLayout;
    	this.props.updateField(formUpdateField);
	}

    render() {
		let {grid, layouts, releves,
			champTypes, activites,
			etats, provenances, requiredFields,
			formNewField, formUpdateField} = this.props.crmGridLayout;
		let {isAdmin} = this.props.crmLogin;
		let {loading} = this.props.crmDashboard;
        return (
        	<div>
				{
					this.props.view === 'newCustomer'
					&& <GridCreationClient handleStatic={this._handleStatic} handleSubmit={this._handleSubmitCreate} layouts={layouts}
										   handleDrag={this._handleDrag} handleNonStatic={this._handleNonStatic}
										   handleSubmitChamp={this._handleSubmitChamp} grid={grid}
										   handleChangeInput={this._handleChangeInput} title="Création d'une fiche client"
										   isAdmin={isAdmin} releves={releves}
										   champTypes={champTypes}
										   activites={activites} etats={etats} provenances={provenances}
										   changeRequiredFields={this.props.changeRequiredFields} requiredFields={requiredFields}
										   handleModifyField={this._handleModifyField} changeNewField={this.props.changeNewField}
										   formNewField={formNewField} deleteField={this.props.deleteField}
										   formUpdateField={formUpdateField} changeUpdateField={this.props.changeUpdateField}
										   changeLoading={this.props.changeLoading} loading={loading}/>
				}
				{
					this.props.view === 'customerFile'
					&& <GridCreationClient handleStatic={this._handleStatic} handleSubmit={this._handleSubmitUpdate} layouts={layouts}
										   handleDrag={this._handleDrag} handleNonStatic={this._handleNonStatic}
										   handleSubmitChamp={this._handleSubmitChamp} grid={grid}
										   handleChangeInput={this._handleChangeInput} title="Modification d'une fiche client"
										   isAdmin={isAdmin} releves={releves}
										   champTypes={champTypes}
										   activites={activites} etats={etats} provenances={provenances}
										   changeRequiredFields={this.props.changeRequiredFields} requiredFields={requiredFields}
										   handleModifyField={this._handleModifyField} changeNewField={this.props.changeNewField}
										   formNewField={formNewField} deleteField={this.props.deleteField}
										   formUpdateField={formUpdateField} changeUpdateField={this.props.changeUpdateField}
										   changeLoading={this.props.changeLoading} loading={loading}/>
				}
			</div>
        )
    }
}

function mapStateToProps (state) {

	return{
		crmGridLayout: state.crmGridLayout,
		crmLogin: state.crmLogin,
		crmDashboard: state.crmDashboard
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
		requestGrid: (id) => {
			dispatch(requestGrid(id));
		},
		createCustomerFile: (file) => {
			dispatch(createCustomerFile(file));
		},
		updateCustomerFile: (file) => {
			dispatch(updateCustomerFile(file))
		},
		createNewField: (newField) => {
			dispatch(createNewField(newField));
		},
		changeRequiredFields: (newRequiredFields) => {
			dispatch(changeRequiredFields(newRequiredFields));
		},
		updatePositions: (positions) => {
			dispatch(updatePositions(positions));
		},
		updateField: (field) => {
			dispatch(updateField(field))
		},
		changeNewField: (newField) => {
			dispatch(changeNewField(newField));
		},
		deleteField: (field) => {
			dispatch(deleteField(field));
		},
		changeUpdateField: (newUpdateField) => {
			dispatch(changeUpdateField(newUpdateField));
		},
		changeLoading: (newLoading) => {
			dispatch(changeLoading(newLoading));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (CreationClient)
