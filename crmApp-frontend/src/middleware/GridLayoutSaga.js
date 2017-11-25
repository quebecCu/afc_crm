import {take, fork} from 'redux-saga/effects';
import {
	REQUEST_GRID, changeGrid, changeLayout, CREATE_CUSTOMER_FILE, changeViewGrid,
	UPDATE_CUSTOMER_FILE, GET_RELEVES, updateReleves, GET_CHAMBRE_COMMERCE, updateChambreCommerce, CREATE_NEW_FIELD,
	requestGrid, GET_CHAMP_TYPES, updateChampTypes
} from '../actions/crmGridLayout';
import axios from 'axios';
import {store} from '../store';
import {changeViewCollective} from "../actions/crmCollectiveContainer";


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

		yield take(REQUEST_GRID);

		//communication avec server
		let server = "http://localhost:3002/getCustomerGrid";

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

//Récupère les types de champ que l'administrateur peut créer
export function * getChampTypes (){
	while(true){

		yield take(GET_CHAMP_TYPES);

		//communication avec server
		let server = "http://localhost:3002/getChampTypes";

		axios.post(server, {
		},config)
			.then(function (response) {
				if(!!response.data.champTypes){
					store.dispatch(updateChampTypes(response.data.champTypes));
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

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

		let server = "http://localhost:3002/createCustomer";
		console.log(grid);
		console.log(layout);
		axios.post(server, {
			grid: grid,
			layout: layout,
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('La fiche client a été créée avec succès');
					store.dispatch(changeViewCollective('customerFile'));
					store.dispatch(changeViewGrid('read'))
				} else {
					alert('Erreur lors de la création de la fiche client');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Envoie les champs et leurs positions au back-end (Modification d'un client)
export function * updateFile() {
	while(true) {
		let file = yield take(UPDATE_CUSTOMER_FILE);
		let {
			grid,
			layouts
		} = file.file;
		console.log("update file");
		let layout = layouts.lg;

		let server = "http://localhost:3002/updateCustomer";

		axios.post(server, {
			grid: grid,
			layout: layout,
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('La fiche client a été modifiée avec succès');
					store.dispatch(changeViewCollective('customerFile'));
					store.dispatch(changeViewGrid('read'));
				} else {
					alert('Erreur lors de la modification de la fiche client');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Envoie le nouveau champ crée au back-end
export function * createNewField() {
	while(true) {
		let champ = yield take(CREATE_NEW_FIELD);
		let {
			description,
			nom,
			type
		} = champ.newField;
		console.log("create new field");

		let server = "http://localhost:3002/createNewField";

		axios.post(server, {
			description: description,
			nom: nom,
			type: type
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					console.log('Nouveau champ crée avec succès');
					store.dispatch(requestGrid());
				} else {
					alert('Erreur lors de la création d\'un nouveau champ');
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
	yield fork (getReleves);
	yield fork (getChambreCommerce);
	yield fork (createNewField);
	yield fork (getChampTypes);
}
