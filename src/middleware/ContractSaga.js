import {take, fork} from 'redux-saga/effects';

import {
	changeBigLayout, changeLilLayout, changeNewFieldContract, changeUpdateFieldContract,
	GET_AGA, GET_CONTRACT, GET_CONTRACT_TO_UPDATE, GET_EMPLOYES_AFC, GET_GRID, GET_LIST_ASSUREURS, GET_LIST_CONTRACTS, GET_MODULES,
	GET_TYPES_CONTRACT, SUBMIT_CONTRACT, UPDATE_CONTRACT,
	getEmployesAFC, getGrid, createContract,
	getListAssureurs, setFromClient,
	getModules, getTypesContract, SEND_DELETE_FIELD_CONTRACT, SEND_NEW_FIELD_CONTRACT, SEND_UPDATE_FIELD_CONTRACT,
	setContract, setSelectedTaux, setSelectedRemuneration,
	setGrid, changeFormContract,
	setListContracts, setModules, setTypesContract, UPDATE_POS_LAYOUT,
	updateAGA, updateEmployesAFC, updateListAssureurs,
} from '../actions/crmContract';

import {GET_HISTORY_REQUEST,setHistory} from '../actions/crmHistory';

import axios from 'axios';
import {store} from '../store';
import crmContract from '../reducers/crmContract'
import { history } from '../store.js';
import {sendingRequestColl} from "../actions/crmRechercheCollective";

let tokenToSend = localStorage.getItem("cookieSession");
if (tokenToSend === undefined)
	tokenToSend = "";

let config = {
	headers: {
		"Authorization": tokenToSend
	}
};

export function * getHistoryy(){
	while (true) {
		yield take(GET_HISTORY_REQUEST);

		//communication avec server
		let server = "http://localhost:3002/collectiveContracts/getHistory";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/collectiveContracts/getHistory';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {

					store.dispatch(setHistory(response.data.message));
				} else {
					alert('Erreur lors du chargement des AGAs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * submitContract() {

	while (true) {

		let formState = yield take(SUBMIT_CONTRACT);
		console.log(formState);

		let {
			idClient, idRepresentant,
			idAssureur, idAGA, chambreDeCommerce, numPolice,
			dateEmission, moisRenouv, notes,
			modulesToCreate
		} = formState.contract.contrat;

		let {
			facultatif, historiqueToAdd, remunerationToAdd
		} = formState.contract;

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";
		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		};

		//communication avec server
		var server = "http://localhost:3002/collectiveContracts/create";
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/collectiveContracts/create';

		axios.post(backendUrl, {
			idClient: idClient,
			idRepresentant: idRepresentant,
			idAssureur: idAssureur,
			idAGA: idAGA,
			numPolice: numPolice,
			dateEmission: dateEmission,
			moisRenouv: moisRenouv,
			chambreDeCommerce:chambreDeCommerce,
			notes: notes,
			historiqueTaux: historiqueToAdd,
			remuneration: remunerationToAdd,
			modulesChoisis: modulesToCreate,
			facultatif: facultatif
		}, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('Le contrat a été créé avec succès');
					history.push('/dashboard/collective/contracts');
				}
				else if (response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
					alert('Erreur lors de la création du contrat');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * updateContract() {

	while (true) {

		let formState = yield take(UPDATE_CONTRACT);
		console.log(formState);

		let obligatoire = {
			idContrat: formState.contract.contrat.idContract,
			idRepresentant: formState.contract.contrat.idRepresentant,
			idAssureur: formState.contract.contrat.idAssureur,
			idAGA: formState.contract.contrat.idAGA,
			numPolice: formState.contract.contrat.numPolice,
			date_signature: formState.contract.contrat.dateEmission,
			moisRenouv: formState.contract.contrat.moisRenouv,
			notes: formState.contract.contrat.notes
		};

		let historiqueTaux = formState.contract.contrat.historiqueTaux;
		let historiqueToAdd = formState.contract.historiqueToAdd;
		let remunerations = formState.contract.contrat.remuneration;
		let remunerationToAdd = formState.contract.remunerationToAdd;

		let modulesToUpdate = formState.contract.contrat.modulesInitiaux;
		let modulesToCreate = formState.contract.contrat.modulesToCreate;
		let modulesToDelete = formState.contract.contrat.modulesSupprimes;

		let facultatif = {
			facultatif: formState.contract.facultatif
		};


		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";
		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		};

		//communication avec server
		var server = "http://localhost:3002/";
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/';

		var obligBackendUrl = backendUrl + "collectiveContracts/updateContractObligatoire/" + obligatoire.idContrat;

		var historiqueBackendUrl = backendUrl + "collectiveContracts/updateHistoriqueTaux";
		var historiqueToAddBackendUrl = backendUrl + "collectiveContracts/createHistoriqueTaux";
		var remunerationBackendUrl = backendUrl + "collectiveContracts/updateRenumeration";

		var remunerationToAddBackendUrl = backendUrl + "collectiveContracts/createRemuneration";

		var modulesToUpdateBackendUrl = backendUrl + "collectiveContracts/updateModule";
		var modulesToDeleteBackendUrl = backendUrl + "collectiveContracts/module/";
		var modulesToCreateBackendUrl = backendUrl + "collectiveContracts/ajouterModule";

		axios.post(obligBackendUrl, obligatoire, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					console.log('Infos général du contrat updated avec succès');
					history.push('/dashboard/collective/contracts');
				}
				else if (response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
					alert('Erreur lors de la création du contrat, Information Général');
				}
			})
			.catch(function (error) {
				console.log(error);
			});

			historiqueTaux.forEach(function(historique) {
				historique.idclient = formState.contract.idClient;
				historique.idfournisseur = formState.contract.contrat.idAssureur;
				axios.post(historiqueBackendUrl, historique, config)
					.then(function (response) {
						if (!!response.data.status && response.data.status === "success") {
							console.log('Infos général du contrat updated avec succès');
						}
						else if (response.data.status === "fail") {
							alert(response.data.message);
						}
						else {
							alert('Erreur lors de la création du contrat, Historique Taux année' + historique.annee_dep);
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			});
			if(historiqueToAdd.annee_dep != "" && historiqueToAdd.annee_dep != undefined){
				historiqueToAdd.idclient = formState.contract.idClient;
				historiqueToAdd.idfournisseur = formState.contract.contrat.idAssureur;
			 	axios.post(historiqueToAddBackendUrl, historiqueToAdd, config )
					.then(function (response) {
						if (!!response.data.status && response.data.status === "success") {
							console.log('Remuneration ' + historiqueToAdd.annee_dep + ' updated avec succès');
						}
						else if (response.data.status === "fail") {
							alert(response.data.message);
						}
						else {
							alert('Erreur lors de la création du contrat, Remuneration année ' + historiqueToAdd.annee_dep);
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			}

		 	remunerations.forEach(function(remuneration) {
				remuneration.idclient = formState.contract.idClient;
				remuneration.idfournisseur = formState.contract.contrat.idAssureur;
			 	axios.post(remunerationBackendUrl, remuneration, config )
					.then(function (response) {
						if (!!response.data.status && response.data.status === "success") {
							console.log('Remuneration ' + remuneration.annee_dep + ' updated avec succès');
						}
						else if (response.data.status === "fail") {
							alert(response.data.message);
						}
						else {
							alert('Erreur lors de la création du contrat, Remuneration année ' + remuneration.annee_dep);
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			});
			if(remunerationToAdd.annee_dep != "" && remunerationToAdd.annee_dep != undefined){
				remunerationToAdd.idclient = formState.contract.idClient;
				remunerationToAdd.idfournisseur = formState.contract.contrat.idAssureur;
			 	axios.post(remunerationToAddBackendUrl, remunerationToAdd, config )
					.then(function (response) {
						if (!!response.data.status && response.data.status === "success") {
							console.log('Remuneration ' + remunerationToAdd.annee_dep + ' updated avec succès');
						}
						else if (response.data.status === "fail") {
							alert(response.data.message);
						}
						else {
							alert('Erreur lors de la création du contrat, Remuneration année ' + remunerationToAdd.annee_dep);
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			}

		modulesToDelete.forEach(function(moduleToDelete) {
			let url = modulesToDeleteBackendUrl + moduleToDelete;
			axios.delete(url, config)
				.then(function (response) {
					if (!!response.data.status && response.data.status === "success") {
						console.log('Module ' + moduleToDelete + ' successfully delete');
					}
					else if (response.data.status === "fail") {
						alert(response.data.message);
					}
					else {
						alert('Erreur lors de la modification des modules, Module #' + moduleToDelete);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		});


		modulesToUpdate.forEach(function(moduleToUpdate) {
			axios.post(modulesToUpdateBackendUrl, moduleToUpdate,  config)
				.then(function (response) {
					if (!!response.data.status && response.data.status === "success") {
						console.log('Module ' + moduleToUpdate.idModule + ' successfully updated');
					}
					else if (response.data.status === "fail") {
						alert(response.data.message);
					}
					else {
						alert('Erreur lors de la modification des modules, Module #' + moduleToUpdate.idModule);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		});

		modulesToCreate.forEach(function(moduleToCreate) {
			moduleToCreate.idContrat = formState.contract.contrat.idContract;
			axios.post(modulesToCreateBackendUrl, moduleToCreate, config)
				.then(function (response) {
					if (!!response.data.status && response.data.status === "success") {
						console.log('Module successfully created');
					}
					else if (response.data.status === "fail") {
						alert(response.data.message);
					}
					else {
						alert('Erreur lors de l\'ajout du module ');
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		});


	}
}

export function* requestAGA() {
	while (true) {
		yield take(GET_AGA);

		//communication avec server
		let server = "http://localhost:3002/clients/aga";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/clients/aga';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateAGA(response.data.message));
					store.dispatch(getEmployesAFC());
				} else {
					alert('Erreur lors du chargement des AGAs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestlistContracts() {
	while (true) {
		yield take(GET_LIST_CONTRACTS);

		//communication avec server
		let server = "http://localhost:3002/collectiveContracts";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/collectiveContracts';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(setListContracts(response.data.message));
				} else {
					alert('Erreur lors du chargement des contracts');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestAFC() {
	while (true) {
		yield take(GET_EMPLOYES_AFC);

		//communication avec server
		let server = "http://localhost:3002/collectiveContracts/employesafc";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/collectiveContracts/employesafc';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateEmployesAFC(response.data.message));
					store.dispatch(getListAssureurs());
				} else {
					alert('Erreur lors du chargement des employes');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestFourniseurs() {
	while (true) {
		yield take(GET_LIST_ASSUREURS);

		//communication avec server
		let server = "http://localhost:3002/providers";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/providers';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateListAssureurs(response.data.message));
					store.dispatch(getModules());
				} else {
					alert('Erreur lors du chargement des fournisseurs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestModules() {
	while (true) {
		yield take(GET_MODULES);
		let server = "http://localhost:3002/collectiveContracts/modules";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/collectiveContracts/modules';
		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(setModules(response.data.message));
				} else {
					alert('Erreur lors du chargement des modules');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestGrid() {
	while (true) {
		let user = yield take(GET_GRID);
		let facDisplay = user.update;
		let server = "http://localhost:3002/attributesManagement/contract";

		//communication avec server
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/attributesManagement/contract';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					let grids = response.data.message;

					if(!!facDisplay) {
						let facultatif = [];
						grids.attributes.forEach(champ => {
							let duplicate = false;
							facDisplay.forEach(champ2 => {
								if(champ2.idRow === champ.idattrcontratcoll) {
									duplicate = true;
									facultatif.push({
										...champ,
										value: champ2.valeur
									});
								}
							});
							if(!duplicate) {
								facultatif.push({
									...champ,
									value: ''
								});
							}
						});
						store.dispatch(setGrid(facultatif));
					}
					else {
						let grid = grids.attributes.map(champ => {
							return {...champ, value: ''};
						});
						store.dispatch(setGrid(grid));
					}
					let bigLayout = grids.menus.map(menu => {
						return {
							i: menu.idcontratcollmenu.toString(),
							x: menu.posx,
							y: menu.posy,
							w: menu.width,
							h: menu.height,
							minW: menu.minwidth,
							static: true
						};
					});
					store.dispatch(changeBigLayout(bigLayout));

					let lilLayout = grids.attributes.map(champ => {
						return {
							i: champ.idattrcontratcoll.toString(),
							x: champ.posx,
							y: champ.posy,
							w: champ.width,
							h: champ.height,
							minW: champ.minwidth,
							static: true
						};
					});
					store.dispatch(changeLilLayout(lilLayout));
					store.dispatch(sendingRequestColl());
					store.dispatch(getTypesContract());
				} else {
					alert('Erreur lors du chargement des grids');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestGridUpdate() {
	while (true) {
		let user = yield take(GET_GRID);
		let facDisplay = user.update;
		let server = "http://localhost:3002/attributesManagement/contract";

		//communication avec server
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/attributesManagement/contract';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					let grids = response.data.message;

					if(!!facDisplay) {
						let facultatif = [];
						grids.attributes.forEach(champ => {
							let duplicate = false;
							facDisplay.forEach(champ2 => {
								if(champ2.idRow === champ.idattrcontratcoll) {
									duplicate = true;
									facultatif.push({
										...champ,
										value: champ2.valeur
									});
								}
							});
							if(!duplicate) {
								facultatif.push({
									...champ,
									value: ''
								});
							}
						});
						store.dispatch(setGrid(facultatif));
					}
					else {
						let grid = grids.attributes.map(champ => {
							return {...champ, value: ''};
						});
						store.dispatch(setGrid(grid));
					}
					let bigLayout = grids.menus.map(menu => {
						return {
							i: menu.idcontratcollmenu.toString(),
							x: menu.posx,
							y: menu.posy,
							w: menu.width,
							h: menu.height,
							minW: menu.minwidth,
							static: true
						};
					});
					store.dispatch(changeBigLayout(bigLayout));

					let lilLayout = grids.attributes.map(champ => {
						return {
							i: champ.idattrcontratcoll.toString(),
							x: champ.posx,
							y: champ.posy,
							w: champ.width,
							h: champ.height,
							minW: champ.minwidth,
							static: true
						};
					});
					store.dispatch(changeLilLayout(lilLayout));
					store.dispatch(sendingRequestColl());
					store.dispatch(getTypesContract());
				} else {
					alert('Erreur lors du chargement des grids');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestUpdateGridLayout() {
	while (true) {
		let layouts = yield take(UPDATE_POS_LAYOUT);
		let layout = layouts.layout;
		let menus = layouts.menus;

		let server = "http://localhost:3002/attributesManagement/update/contract/display";

		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/update/contract/display';

		axios.post(backendUrl, {
			layout: layout,
			menus: menus
		}, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					console.log("update du layout is a success")
				} else {
					alert('Erreur lors de l\'update du layout');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestTypes() {
	while (true) {
		yield take(GET_TYPES_CONTRACT);
		let server = "http://localhost:3002/attributesManagement/types";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/attributesManagement/types';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(setTypesContract(response.data.message));
				} else {
					alert('Erreur lors de la récupération des types');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestSendNewField() {
	while (true) {
		let field = yield take(SEND_NEW_FIELD_CONTRACT);
		let {
			form,
			posx,
			posy
		} = field.newField;

		let server = "http://localhost:3002/attributesManagement/create/contract";

		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/attributesManagement/create/contract';

		axios.post(backendUrl, {
			description: form.description,
			label: form.name,
			idtype: form.type,
			forme: null,
			valeur_defaut: null,
			ext: null,
			posx: posx,
			posy: posy,
			height: 1,
			minwidth: 3,
			width: 3
		}, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(changeNewFieldContract(
						{
							description: '',
							name: '',
							type: "1"
						}
					));
					store.dispatch(getGrid());
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

export function* requestSendUpdateField() {
	while (true) {
		let field = yield take(SEND_UPDATE_FIELD_CONTRACT);
		let {
			description,
			name,
			id
		} = field.updateField;

		//communication avec server
		let server = "http://localhost:3002/attributesManagement/update/contract";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/attributesManagement/update/contract';


		axios.post(backendUrl, {
			id: id,
			label: name,
			description: description,
			forme: null,
			valeur_defaut: null,
			ext: null
		}, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert("La modification du champ est un succès");
					store.dispatch(changeUpdateFieldContract({
						name: '',
						description: '',
						id: ''
					}));
					store.dispatch(getGrid());
				}
				else if (response.data.status === "fail") {
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
export function* requestSendDeleteField() {
	while (true) {
		let field = yield take(SEND_DELETE_FIELD_CONTRACT);
		let id = field.id;

		//communication avec server
		let server = "http://localhost:3002/attributesManagement/contract/" + id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/attributesManagement/contract/'+id;

		axios.delete(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(getGrid());
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

export function* requestGetContract() {
	while (true) {
		let contract = yield take(GET_CONTRACT);
		let id = contract.idContract;

		//communication avec server
		let server = "http://localhost:3002/collectiveContracts/" + id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/collectiveContracts/'+id;

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(setContract(response.data.message));
					store.dispatch(setSelectedTaux(response.data.message.historique_taux[0]));
					store.dispatch(setSelectedRemuneration(response.data.message.remuneration.history[0]));
					store.dispatch(getGrid());


			/* Ajouter l'accès au contrat dans la table history */
			let idUser= localStorage.getItem('idUser');

			//communication avec server
			let server2 = "http://localhost:3002/collectiveContracts/ajouterDansHistory/";
			let backendUrl2 = window.location.host;
			backendUrl2 = backendUrl2 === 'localhost:3000' ? server2 : "http://localhost:3002/collectiveContracts/ajouterDansHistory/";


			axios.post(backendUrl2, {
				idUser: idUser,
				idContrat: id
			},
			config)
				.then(function (response) {
					if (!!response.data.status && response.data.status === "success") {
						console.log("L'accès au contrat a été ajouté! ");
					}
					else if (response.data.status === "fail") {
						alert(response.data.message);
					}
					else {
						alert('Erreur lors de lajout dans la table history');
					}
				})
				.catch(function (error) {
					console.log(error);
				});
				/* Fin de l'ajout dans history */

				}
				else {
					alert('Erreur lors de la récupération du contrat');
				}
			})
			.catch(function (error) {
				console.log(error);
			});

	}
}

export function* requestGetContractToUpdate() {
	while (true) {
		let contrat = yield take(GET_CONTRACT_TO_UPDATE);
		let id = contrat.idContract;

		//communication avec server
		let server = "http://localhost:3002/collectiveContracts/" + id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/collectiveContracts/'+id;

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					let contract = response.data.message;
					let facDisplay = contract.facultatif;

					let modulesChoisis = contract.souscriptions;
					let modulesToUpdate = [];
					let intModulesToDisplay = modulesChoisis.length;
					let modulesAlreadySelected = [];

					let modulesToDisplay = [];
					modulesChoisis.forEach((element, index) => {
						modulesToDisplay.push(element.id.toString());
						modulesAlreadySelected.push(element.iddomaine);
						let modalitesToUpdate = [];
						element.subscriptions.forEach(subs => {
							/*let subsToPush={
								idModalite:subs.id,
								souscription_notes:subs.souscription_notes,
								valeur:subs.valeur,
								idValeur: ''//aller chercher dans le backend :(
							};*/
							modalitesToUpdate.push({
								idModalite: subs.id,
								souscription_notes: subs.souscription_notes,
								valeur: subs.valeur,
								idValeur: subs.idvaleur
							});
						});
						//let toPush={idModule:element.id, module_notes:element.module_notes, modalites:modalitesToUpdate};
						modulesToUpdate.push({
							idModule: element.id,
							idDomaine: element.iddomaine,
							module_notes: element.module_notes,
							modalites: modalitesToUpdate
						});
					});


					let toUpdate = {
						idAssureur: contract.idfournisseur,
						idAGA: contract.idchambrecommerce,//LOOOOP,
						idContract: contract.idcontrat,
						idClient: contract.idClient,
						idRepresentant: contract.idrepresentant,
						modulesSupprimes: [],
						modulesInitiaux: modulesToUpdate,
						modulesToCreate: [],
						modulesAlreadySelected: modulesAlreadySelected,
						numPolice: contract.police,
						dateEmission: contract.date_signature,
						moisRenouv: contract.mois_renouvellement,
						notes: contract.notes,

						historiqueTaux: contract.historique_taux,
						remuneration: contract.remuneration.history
					};
					store.dispatch(setFromClient({
						idClient: contract.idclient,
						name: contract.nomclient,
						update: true
					}));
					store.dispatch(changeFormContract({
						intModulesToDisplay: intModulesToDisplay,
						modulesToDisplay: modulesToDisplay,
						contrat: toUpdate
					}));
					store.dispatch(getGrid(facDisplay));
				} else {
					alert('Erreur lors de la récupération du contrat');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* ContractsFlow() {
	yield fork(requestlistContracts);
	yield fork(requestAGA);
	yield fork(requestAFC);
	yield fork(requestFourniseurs);
	yield fork(requestModules);
	yield fork(requestGrid);
	yield fork(requestUpdateGridLayout);
	yield fork(requestTypes);
	yield fork(requestSendNewField);
	yield fork(requestSendUpdateField);
	yield fork(requestSendDeleteField);
	yield fork(requestGetContract);
	yield fork(requestGetContractToUpdate);
	yield fork(submitContract);
	yield fork(updateContract);
	yield fork(getHistoryy);
}
