import {take, fork} from 'redux-saga/effects';
import {
	REQUEST_GRID_FOUR, changeGrid, changeLayout, CREATE_FOURNISSEUR_FILE, changeViewGrid,
	UPDATE_FOURNISSEUR_FILE /*, GET_RELEVES, updateReleves, GET_CHAMBRE_COMMERCE, updateChambreCommerce*/
} from '../actions/crmGridLayoutSuppliers';
import axios from 'axios';
import {store} from '../store';
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";


let tokenToSend= localStorage.getItem("cookieSession");
if(tokenToSend === undefined)
	tokenToSend="";

let config ={
		headers: {
			"Authorization": tokenToSend
		}
};

//Récupère les champs du back-end
export function * getGridLayout (){
	while(true){

		yield take(REQUEST_GRID_FOUR);

		//communication avec server
		let server = "http://localhost:3002/getSuppliersGrid";

		axios.post(server, {
		},config)
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
/*
//Récupère les valeurs de la liste des relevés
export function * getReleves (){
	while(true){

		yield take(GET_RELEVES);

		//communication avec server
		let server = "http://localhost:3002/getReleves";

		axios.post(server, {
		},config)
			.then(function (response) {
				if(!!response.data.releves ){
					store.dispatch(updateReleves(response.data.releves));
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les valeurs de la liste des chambres de commerce
export function * getChambreCommerce (){
	while(true){

		yield take(GET_CHAMBRE_COMMERCE);

		//communication avec server
		let server = "http://localhost:3002/getChambreCommerce";

		axios.post(server, {
		},config)
			.then(function (response) {
				if(!!response.data.chambreCommerce ){
					store.dispatch(updateChambreCommerce(response.data.chambreCommerce));
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}
*/
//Envoie les champs et leurs positions au back-end (Création d'un client)
export function * sendFile() {
	while(true) {
		let file = yield take(CREATE_CUSTOMER_FILE);
		let {
			grid,
			layouts
		} = file.file;
		console.log("send file");
		let layout = layouts.lg;

		let server = "http://localhost:3002/createSupplier";
		console.log(grid);
		console.log(layout);
		axios.post(server, {
			grid: grid,
			layout: layout,
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('La fiche fournisseur a été créée avec succès');
					store.dispatch(changeViewSuppliers('supplierFile'));
					store.dispatch(changeViewGrid('read'))
				} else {
					alert('Erreur lors de la création de la fiche fournisseur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Envoie les champs et leurs positions au back-end (Modification d'un fournisseur)
export function * updateFile() {
	while(true) {
		let file = yield take(UPDATE_FOURNISSEUR_FILE);
		let {
			grid,
			layouts
		} = file.file;
		console.log("update file");
		let layout = layouts.lg;

		let server = "http://localhost:3002/updateSuppliers";

		axios.post(server, {
			grid: grid,
			layout: layout,
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('La fiche fournisseur a été modifiée avec succès');
					store.dispatch(changeViewSuppliers('supplierFile'));
					store.dispatch(changeViewGrid('read'));
				} else {
					alert('Erreur lors de la modification de la fiche fournisseur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * GridFlow () {
	yield fork (getGridLayout);
	yield fork (sendFile);
	yield fork (updateFile);
//	yield fork (getReleves);
//	yield fork (getChambreCommerce);
}
