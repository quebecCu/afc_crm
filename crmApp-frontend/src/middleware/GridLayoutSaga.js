import {take, fork} from 'redux-saga/effects';
import {REQUEST_GRID, changeGrid, changeLayout, CREATE_CUSTOMER_FILE} from '../actions/crmGridLayout';
import axios from 'axios';
import {store} from '../store';

export function * getGridLayout (){
	while(true){

		yield take(REQUEST_GRID);

		//communication avec server
		let server = "http://localhost:3002/getCustomerGrid";

		axios.post(server, {
		})
			.then(function (response) {
				if(!!response.data.grid ){
					store.dispatch(changeGrid(response.data.grid));
					let layout = [];
					let y = 0;
					for (let i=0 ; i < response.data.grid.length ; i++){
						let key = (i+1).toString();
						let x = (i % 4)*3;
						if(i % 4 === 0 && i !== 0) {
							y++;
						}
						layout.push({i: key, x: x, y: y, w: 3, h: 1, minW: 3})
					}
					store.dispatch(changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}));
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * sendFile() {
	let file = yield take(CREATE_CUSTOMER_FILE);
	let {
		grid,
		layouts
	} = file.file;

	let layout = layouts.lg;

	let server = "http://localhost:3002/createCustomer";

	axios.post(server, {
		grid: grid,
		layout: layout,
	})
		.then(function (response) {
			if(!!response.data.status && response.data.status === "success"){
				alert ('La fiche client a été créée avec succès');
				//store.dispatch(push("/PageAccueil/admin"));
			} else {
				alert ('Erreur lors de la création de la fiche client');
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function * GridFlow () {
	yield fork (getGridLayout);
	yield fork (sendFile);
}
