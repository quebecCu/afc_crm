import {take, fork} from 'redux-saga/effects';
import {
	REQUEST_GRID, changeGrid, changeLayout, CREATE_CUSTOMER_FILE, changeViewGrid,
	UPDATE_CUSTOMER_FILE, GET_RELEVES, updateReleves, GET_CHAMBRE_COMMERCE, updateChambreCommerce, CREATE_NEW_FIELD,
	requestGrid, GET_CHAMP_TYPES, updateChampTypes, GET_ACTIVITES, updateActivites, GET_ETATS, GET_PROVENANCES,
	UPDATE_POSITIONS, updateEtats, updateProvenances, getReleves, getChambreCommerce, getChampTypes, getEtats,
	getActivites, getProvenances, UPDATE_FIELD, DELETE_FIELD, changeUpdateField, changeNewField
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
		let server = "http://localhost:3002/attributesManagement/customer";

		axios.get(server,config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(changeGrid(response.data.message));
					let layout = response.data.message.map(champ => {
						return {
							i: champ.idattrentreprise.toString(),
							x: champ.posx,
							y: champ.posy,
							w: champ.width,
							h: champ.height,
							minW: champ.minwidth,
							static: true
						};
					});
					store.dispatch(changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}));
					store.dispatch(getReleves());
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les valeurs de la liste des relevés
export function * requestReleves (){
	while(true){

		yield take(GET_RELEVES);

		//communication avec server
		let server = "http://localhost:3002/clients/statementSendingModes";

		axios.get(server, config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateReleves(response.data.message));
					store.dispatch(getChambreCommerce())
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les valeurs de la liste des chambres de commerce
export function * requestChambreCommerce (){
	while(true){

		yield take(GET_CHAMBRE_COMMERCE);
		//communication avec server
		let server = "http://localhost:3002/clients/aga";

		axios.get(server,config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateChambreCommerce(response.data.message));
					store.dispatch(getChampTypes());
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les types de champ que l'administrateur peut créer
export function * requestChampTypes (){
	while(true){

		yield take(GET_CHAMP_TYPES);

		//communication avec server
		let server = "http://localhost:3002/attributesManagement/types";

		axios.get(server,config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateChampTypes(response.data.message));
					store.dispatch(getActivites());
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les activites
export function * requestActivites (){
	while(true){

		yield take(GET_ACTIVITES);

		//communication avec server
		let server = "http://localhost:3002/clients/activities";

		axios.get(server, config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateActivites(response.data.message));
					store.dispatch(getEtats());
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les etats
export function * requestEtats (){
	while(true){

		yield take(GET_ETATS);

		//communication avec server
		let server = "http://localhost:3002/clients/states";

		axios.get(server,config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateEtats(response.data.message));
					store.dispatch(getProvenances());
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les provenances
export function * requestProvenances (){
	while(true){

		yield take(GET_PROVENANCES);

		//communication avec server
		let server = "http://localhost:3002/clients/provenances";

		axios.get(server, config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateProvenances(response.data.message));
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Envoie les champs au back-end (Création d'un client)
export function * sendFile() {
	while(true) {
		let file = yield take(CREATE_CUSTOMER_FILE);
		let {
			grid,
			requiredFields
		} = file.file;
		console.log("send file");

		let server = "http://localhost:3002/createCustomer";
		console.log(grid);
		axios.post(server, {
			grid: grid,
			requiredFields: requiredFields
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

//Envoie les champs au back-end (Modification d'un client)
export function * updateFile() {
	while(true) {
		let file = yield take(UPDATE_CUSTOMER_FILE);
		let {
			grid,
			requiredFields
		} = file.file;
		console.log("update file");

		let server = "http://localhost:3002/updateCustomer";

		axios.post(server, {
			grid: grid,
			requiredFields: requiredFields
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
			form,
			posx,
			posy
		} = champ.newField;
		console.log("create new field");

		let server = "http://localhost:3002/attributesManagement/create/customer";

		axios.post(server, {
			description: form.description,
			label: form.label,
			idtype: form.type,
			forme: null,
			valeur_defaut: null,
			ext: null,
			posx: posx,
			posy: posy,
			height: 1,
			minwidth: 3,
			width: 3

		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('Nouveau champ crée avec succès');
					store.dispatch(changeNewField(
						{
							description: '',
							label: '',
							type: "1"
						}
					));
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

//on envoie la position des champs
export function * updatePositions() {
	while(true) {
		let positions = yield take(UPDATE_POSITIONS);
		let {
			layouts,
		} = positions.positions;
		let layout = layouts.lg;

		let server = "http://localhost:3002/attributesManagement/update/customer/display";

		axios.post(server, {
			layout: layout,
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
				} else {
					alert('Erreur lors de la modification des positions');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//on envoie les infos d'un champ à modifier
export function * sendUpdateField() {
	while(true) {
		let field = yield take(UPDATE_FIELD);
		let {
			descField,
			nameField,
			id
		} = field.field;
		let server = "http://localhost:3002/attributesManagement/update/customer";

		axios.post(server, {
			id: id,
			label: nameField,
			description: descField,
			forme: null,
			valeur_defaut: null,
			ext: null
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert("La modification du champ est un succès");
					store.dispatch(changeUpdateField({
						nameField: '',
						descField: ''
					}));
					store.dispatch(requestGrid());
				} else {
					alert('Erreur lors de la modification des positions');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//on supprime un champ
export function * sendDeleteField() {
	while(true) {
		let field = yield take(DELETE_FIELD);
		let id = field.field;

		let server = "http://localhost:3002/attributesManagement/customer/"+id;

		axios.delete(server,config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(requestGrid());
					alert("Champ supprimé avec succès");
				} else {
					alert('Erreur lors de la supression d\'un champ');
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
	yield fork (requestReleves);
	yield fork (requestChambreCommerce);
	yield fork (createNewField);
	yield fork (requestChampTypes);
	yield fork (requestActivites);
	yield fork (requestEtats);
	yield fork (requestProvenances);
	yield fork (updatePositions);
	yield fork (sendUpdateField);
	yield fork (sendDeleteField);
}
