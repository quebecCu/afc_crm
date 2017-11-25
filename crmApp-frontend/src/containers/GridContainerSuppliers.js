import React, { Component } from 'react';
import {GridCreationFournisseur} from "../components/form/GridCreationFournisseur";
import {connect} from "react-redux";
import {
	changeGrid, changeLayout, changeViewGrid, createSuppliersFile, requestGrid,
	updateSuppliersFile
} from "../actions/crmGridLayoutSuppliers";
import {GridSupplierFile} from "../components/form/GridSupplierFile";
//import {getChambreCommerce, getReleves} from "../middleware/GridLayoutSaga";

class CreationFournisseur extends Component {
    constructor(props) {
        super(props);
        this._handleStatic = this._handleStatic.bind(this);
        this._handleSubmitCreate = this._handleSubmitCreate.bind(this);
		this._handleSubmitUpdate = this._handleSubmitUpdate.bind(this);
        this._handleSubmitChamp = this._handleSubmitChamp.bind(this);
        this._handleDrag = this._handleDrag.bind(this);
        this._handleNonStatic = this._handleNonStatic.bind(this);
        this._handleChangeInput = this._handleChangeInput.bind(this);

        if(this.props.view === 'newSupplier') {
			this.props.requestGrid();
		}
		//this.props.getChambreCommerce();
        //this.props.getReleves();
    }

	//Rends les champs static
    _handleStatic() {
		let {layouts} = this.props.crmGridSuppliersLayout;
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
		let {layouts} = this.props.crmGridSuppliersLayout;
		let layout = [];
		for (let champ = 0; champ < layouts.lg.length ; champ++) {
			layout.push({i: layouts.lg[champ].i, x: layouts.lg[champ].x, y: layouts.lg[champ].y,
				w: layouts.lg[champ].w, h: layouts.lg[champ].h, minW: layouts.lg[champ].minW, static: false});
		}
		this.props.changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout});
    }

    //On récupère le grid et le layout pour les envoyer au back-end grâce au middleware (Creation du fournisseur)
    _handleSubmitCreate(event) {
       event.preventDefault();
       let {layouts, grid} = this.props.crmGridSuppliersLayout;
       this._handleStatic();
       this.props.createSuppliersFile({layouts, grid});
       console.log("submit file");
    }

    //On récupère le grid et le layout pour les envoyer au back-end grâce au middleware (Modification du client)
	_handleSubmitUpdate(event) {
		event.preventDefault();
		let {layouts, grid} = this.props.crmGridSuppliersLayout;
		this._handleStatic();
		this.props.updateSuppliersFile({layouts, grid});
		console.log("submit file");
	}

	//Change le state : Sauvegarde la valeur des champs
    _handleChangeInput(event) {
    	let {grid} = this.props.crmGridSuppliersLayout;
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
		let {layouts, grid} = this.props.crmGridSuppliersLayout;
        let key = (grid.length+1).toString();
        let x = (grid.length % 4)*3;
        let y = 3;
        if(grid.length % 4 === 0 && grid.length !== 0) {
            y++;
        }
        layouts.lg.push({w: 3, h: 1, x: x, y: y, i: key, minW: 3});


        grid.push({key: key, label: document.getElementById('champId').value, nom: document.getElementById('champNom').value, value: ''});
		document.getElementById('champNom').value = '';
		document.getElementById('champId').value = '';

		this.props.changeGrid(grid);
		this.props.changeLayout({lg: layouts.lg, md: layouts.lg, sm: layouts.lg, xs: layouts.lg, xxs: layouts.lg});
        //dispatch le nouveau champ au back-end
		this._handleNonStatic();
    }

    render() {
		let {grid, layouts, view} = this.props.crmGridSuppliersLayout;
		let {isAdmin} = this.props.crmLogin;
        return (
        	<div>
				{
					this.props.view === 'newSupplier'
					&& <GridCreationFournisseur handleStatic={this._handleStatic} handleSubmit={this._handleSubmitCreate} layouts={layouts}
										handleDrag={this._handleDrag} handleNonStatic={this._handleNonStatic}
										handleSubmitChamp={this._handleSubmitChamp} grid={grid}
										handleChangeInput={this._handleChangeInput} title="Création d'une fiche fournisseur"
										isAdmin={isAdmin} />
				}
				{
					this.props.view === 'supplierFile' && view === 'read'
					&& <GridSupplierFile handleModify={this.props.changeViewGrid}
										 layouts={layouts} grid={grid}/>
				}
				{
					this.props.view === 'supplierFile' && view === 'write'
					&& <GridCreationFournisseur handleStatic={this._handleStatic} handleSubmit={this._handleSubmitUpdate} layouts={layouts}
										   handleDrag={this._handleDrag} handleNonStatic={this._handleNonStatic}
										   handleSubmitChamp={this._handleSubmitChamp} grid={grid}
										   handleChangeInput={this._handleChangeInput} title="Modification d'une fiche fournisseur"
										   isAdmin={isAdmin} />
				}
			</div>
        )
    }
}

function mapStateToProps (state) {

	return{
		crmGridSuppliersLayout: state.crmGridSuppliersLayout,
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
		createSuppliersFile: (file) => {
			dispatch(createSuppliersFile(file));
		},
		changeViewGrid: (newView) => {
			dispatch(changeViewGrid(newView))
		},
		updateSuppliersFile: (file) => {
			dispatch(updateSuppliersFile(file))
		},
//		getReleves: () => {
//			dispatch(getReleves());
//		},
//		getChambreCommerce: () => {
//			dispatch(getChambreCommerce());
//		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (CreationFournisseur)
