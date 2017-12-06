import {take, fork} from 'redux-saga/effects';
import {
	REQUEST_GRID_FOUR, CREATE_FOURNISSEUR_FILE,
	UPDATE_FOURNISSEUR_FILE, changeGridFour, changeLayoutFour, UPDATE_POSITIONS_SUP, changeNewFieldSup,
	CREATE_NEW_FIELD_SUP, getChampTypesSup, GET_CHAMP_TYPES_SUP, updateChampTypesSup, DELETE_FIELD_SUP, requestGridFour,
	UPDATE_FIELD_SUP, changeUpdateFieldSup, GET_SUPPLIER, changeRequiredSup, DELETE_SUPPLIER, getGridModifySup,
	GET_GRID_MODIFY_SUP
} from '../actions/crmGridLayoutSuppliers';
import axios from 'axios';
import {store} from '../store';
import {getContactsSup} from "../actions/crmContacts";
import {changeViewSuppliers} from "../actions/crmSuppliersContainer";
import {changeLoading} from "../actions/crmDashboard";

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
		let server = "http://localhost:3002/attributesManagement/provider";
		axios.get(server,config)
			.then(function (response) {

				if(!!response.data.message && response.data.status === "success"){
					let grid = response.data.message.map( champ => {
						return {...champ, value: ''};
					});
					store.dispatch(changeGridFour(grid));
					let layout = response.data.message.map(champ => {
						return {
							i: champ.idattrfournisseur.toString(),
							x: champ.posx,
							y: champ.posy,
							w: champ.width,
							h: champ.height,
							minW: champ.minwidth,
							static: true
						};
					});
					store.dispatch(changeLayoutFour({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}));
					store.dispatch(getChampTypesSup());
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Envoie les champs au back-end (Création d'un fournisseur)
export function * sendFile() {
	while(true) {
		let file = yield take(CREATE_FOURNISSEUR_FILE);
		let {
			grid,
			requiredFields,
			arrayContacts
		} = file.file;
		let facultatif = grid.map(champ => {
			return {id: champ.idattrfournisseur, value: champ.value}
		});
		let server = "http://localhost:3002/providers/create";

		axios.post(server, {
			nom: requiredFields.nomEntreprise,
			tel_princ: requiredFields.telephone,
			ext_tel_princ: requiredFields.extension,
			rue: requiredFields.rue,
			ville: requiredFields.ville,
			province: requiredFields.province,
			codepostal: requiredFields.codePostal,
			code: requiredFields.code,
			facultatif: facultatif,
			newcontacts: arrayContacts
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('La fiche fournisseur a été créée avec succès');
					//store.dispatch(changeViewCollective('customerFile'));
					//store.dispatch(changeViewGrid('read'))
				}
				else if(response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
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
	/*while(true) {
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
				} else {
					alert('Erreur lors de la modification de la fiche fournisseur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}*/
}

//on envoie la position des champs
export function * updatePositions() {
	while(true) {
		let positions = yield take(UPDATE_POSITIONS_SUP);
		let {
			newItem,
		} = positions.positions;
		let server = "http://localhost:3002/attributesManagement/update/provider/display";
		axios.post(server, {
			layout: newItem,
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

//Envoie le nouveau champ crée au back-end
export function * createNewField() {
	while(true) {
		let champ = yield take(CREATE_NEW_FIELD_SUP);
		let {
			form,
			posx,
			posy
		} = champ.newField;

		let server = "http://localhost:3002/attributesManagement/create/provider";

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
					store.dispatch(changeNewFieldSup(
						{
							description: '',
							label: '',
							type: "1"
						}
					));
					store.dispatch(requestGridFour());
					alert('Nouveau champ crée avec succès');
				} else {
					alert('Erreur lors de la création d\'un nouveau champ');
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
		let field = yield take(UPDATE_FIELD_SUP);
		let {
			descField,
			nameField,
			id
		} = field.field;
		let server = "http://localhost:3002/attributesManagement/update/provider";

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
					store.dispatch(changeUpdateFieldSup({
						nameField: '',
						descField: ''
					}));
					store.dispatch(requestGridFour());
				}
				else if(response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
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
		let field = yield take(DELETE_FIELD_SUP);
		let id = field.field;

		let server = "http://localhost:3002/attributesManagement/provider/"+id;

		axios.delete(server,config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(requestGridFour());
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

//Récupère les types de champ que l'administrateur peut créer
export function * requestChampTypes (){
	while(true){

		 yield take(GET_CHAMP_TYPES_SUP);
		//communication avec server
		let server = "http://localhost:3002/attributesManagement/types";

		axios.get(server,config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateChampTypesSup(response.data.message));
					store.dispatch(changeLoading(false));
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestSupplier() {

	while (true) {

		let supplierReq = yield take(GET_SUPPLIER);
		let id = supplierReq.id;

		let server = "http://localhost:3002/providers/" + id;

		axios.get(server, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					let supplier = response.data.message;
					let requiredFields = {
						id: id,
						nomEntreprise: supplier.nom,
						rue: supplier.rue,
						ville: supplier.ville,
						province: supplier.province,
						codePostal: supplier.codepostal,
						telephone: supplier.tel_principal,
						extension: supplier.ext_tel_principal,
						code: supplier.code
					};
					let facultatif = response.data.message.facultatif;
					store.dispatch(changeRequiredSup(requiredFields));
					store.dispatch(getContactsSup(id));
					store.dispatch(getGridModifySup(facultatif));
					store.dispatch(changeViewSuppliers("supplierFile"));
				} else {
					alert('Erreur lors du chargement du fournisseur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les champs du back-end
export function * getGridLayoutModify (){
	while(true){

		let data = yield take(GET_GRID_MODIFY_SUP);
		let facultatif = data.data;
		//communication avec server
		let server = "http://localhost:3002/attributesManagement/provider";
		axios.get(server,config)
			.then(function (response) {

				if(!!response.data.message && response.data.status === "success"){
					let grid = response.data.message.map( (champ, index) => {
						return {...champ, value: facultatif[index].valeur};
					});
					store.dispatch(changeGridFour(grid));
					let layout = response.data.message.map(champ => {
						return {
							i: champ.idattrfournisseur.toString(),
							x: champ.posx,
							y: champ.posy,
							w: champ.width,
							h: champ.height,
							minW: champ.minwidth,
							static: true
						};
					});
					store.dispatch(changeLayoutFour({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}));
					store.dispatch(getChampTypesSup());
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export function * GridFlowSup () {
	yield fork (getGridLayout);
	yield fork (sendFile);
	yield fork (updateFile);
	yield fork (updatePositions);
	yield fork (createNewField);
	yield fork (requestChampTypes);
	yield fork (sendDeleteField);
	yield fork (sendUpdateField);
	yield fork (requestSupplier);
	yield fork (getGridLayoutModify);
}
