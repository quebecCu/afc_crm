import React, { Component } from 'react';
import {GridCreationClient} from "../components/form/GridCreationClient";
import {connect} from "react-redux";
import {changeGrid, changeLayout, createCustomerFile, requestGrid} from "../actions/crmGridLayout";

class CreationClient extends Component {
    constructor(props) {
        super(props);
        this.handleStatic = this.handleStatic.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitChamp = this.handleSubmitChamp.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleNonStatic = this.handleNonStatic.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);

		this.props.requestGrid();
    }


    handleStatic() {
		let {layouts} = this.props.crmGridLayout;
		let layout = [];
        for (let champ = 0; champ < layouts.lg.length ; champ++) {
			layout.push({i: layouts.lg[champ].i, x: layouts.lg[champ].x, y: layouts.lg[champ].y,
				w: layouts.lg[champ].w, h: layouts.lg[champ].h, minW: layouts.lg[champ].minW, static: true});
        }
		this.props.changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout});
    }

    handleDrag(newItem) {
		this.props.changeLayout({lg: newItem, md: newItem, sm: newItem, xs: newItem, xxs: newItem});
    }

    handleNonStatic() {
		let {layouts} = this.props.crmGridLayout;
		let layout = [];
		for (let champ = 0; champ < layouts.lg.length ; champ++) {
			layout.push({i: layouts.lg[champ].i, x: layouts.lg[champ].x, y: layouts.lg[champ].y,
				w: layouts.lg[champ].w, h: layouts.lg[champ].h, minW: layouts.lg[champ].minW, static: false});
		}
		this.props.changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout});
    }

    handleSubmit(event) {
       event.preventDefault();
       let {layouts, grid} = this.props.crmGridLayout;
       this.props.createCustomerFile({layouts, grid});
    }

    handleChangeInput(event) {
    	let {grid} = this.props.crmGridLayout;
    	for (let champ = 0 ; champ < grid.length ; champ++) {
    		if(event.target.id === grid[champ].label) {
    			grid[champ].value = event.target.value;
			}
		}
		this.props.changeGrid(grid);
	}

    handleSubmitChamp(event) {
        event.preventDefault();
		let {layouts, grid} = this.props.crmGridLayout;
        let key = (grid.length+1).toString();
        let x = (grid.length % 4)*3;
        let y = 3;
        if(grid.length % 4 === 0 && grid.length !== 0) {
            y++;
        }
        layouts.lg.push({w: 3, h: 1, x: x, y: y, i: key, minW: 3, moved: false, static:false});


        grid.push({key: key, label: document.getElementById('champId').value, nom: document.getElementById('champNom').value});
		document.getElementById('champNom').value = '';
		document.getElementById('champId').value = '';

		this.props.changeGrid(grid);
		this.props.changeLayout({lg: layouts.lg, md: layouts.lg, sm: layouts.lg, xs: layouts.lg, xxs: layouts.lg});
        //dispatch le nbChamp
		this.handleNonStatic();
    }

    render() {
		let {grid, layouts} = this.props.crmGridLayout;
        return (
            <GridCreationClient handleStatic={this.handleStatic} handleSubmit={this.handleSubmit} layouts={layouts}
                                handleDrag={this.handleDrag} handleNonStatic={this.handleNonStatic}
                                handleSubmitChamp={this.handleSubmitChamp} grid={grid}
								handleChangeInput={this.handleChangeInput}/>
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
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (CreationClient)
