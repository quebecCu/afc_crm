import React, { Component } from 'react';
import {GridCreationClient} from "../components/form/GridCreationClient";
import {connect} from "react-redux";
import {
	changeGrid, changeLayout, changeViewGrid, createCustomerFile, requestGrid,
	updateCustomerFile
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
    }


    _handleStatic() {
		let {layouts} = this.props.crmGridLayout;
		let layout = [];
        for (let champ = 0; champ < layouts.lg.length ; champ++) {
			layout.push({i: layouts.lg[champ].i, x: layouts.lg[champ].x, y: layouts.lg[champ].y,
				w: layouts.lg[champ].w, h: layouts.lg[champ].h, minW: layouts.lg[champ].minW, static: true});
        }
		this.props.changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout});
    }

    _handleDrag(newItem) {
		this.props.changeLayout({lg: newItem, md: newItem, sm: newItem, xs: newItem, xxs: newItem});
    }

    _handleNonStatic() {
		let {layouts} = this.props.crmGridLayout;
		let layout = [];
		for (let champ = 0; champ < layouts.lg.length ; champ++) {
			layout.push({i: layouts.lg[champ].i, x: layouts.lg[champ].x, y: layouts.lg[champ].y,
				w: layouts.lg[champ].w, h: layouts.lg[champ].h, minW: layouts.lg[champ].minW, static: false});
		}
		this.props.changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout});
    }

    _handleSubmitCreate(event) {
       event.preventDefault();
       let {layouts, grid} = this.props.crmGridLayout;
       this._handleStatic();
       this.props.createCustomerFile({layouts, grid});
       console.log("submit file");
    }

	_handleSubmitUpdate(event) {
		event.preventDefault();
		let {layouts, grid} = this.props.crmGridLayout;
		this._handleStatic();
		this.props.updateCustomerFile({layouts, grid});
		console.log("submit file");
	}

    _handleChangeInput(event) {
    	let {grid} = this.props.crmGridLayout;
    	for (let champ = 0 ; champ < grid.length ; champ++) {
    		if(event.target.id === grid[champ].label) {
    			grid[champ].value = event.target.value;
			}
		}
		this.props.changeGrid(grid);
	}

    _handleSubmitChamp(event) {
        event.preventDefault();
		let {layouts, grid} = this.props.crmGridLayout;
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
        //dispatch le nbChamp
		this._handleNonStatic();
    }

    render() {
		let {grid, layouts, view} = this.props.crmGridLayout;
        return (
        	<div>
				{
					this.props.view === 'newCustomer'
					&& <GridCreationClient handleStatic={this._handleStatic} handleSubmit={this._handleSubmitCreate} layouts={layouts}
										handleDrag={this._handleDrag} handleNonStatic={this._handleNonStatic}
										handleSubmitChamp={this._handleSubmitChamp} grid={grid}
										handleChangeInput={this._handleChangeInput} title="Création d'une fiche client" />
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
										   handleChangeInput={this._handleChangeInput} title="Modification d'une fiche client" />
				}
			</div>
        )
    }
}

function mapStateToProps (state) {

	return{
		crmGridLayout: state.crmGridLayout
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
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (CreationClient)
