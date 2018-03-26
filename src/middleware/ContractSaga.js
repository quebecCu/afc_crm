import {take, fork} from 'redux-saga/effects';

import {
	changeBigLayout, changeLilLayout, changeNewFieldContract, changeUpdateFieldContract,
	GET_AGA, GET_CONTRACT, GET_CONTRACT_TO_UPDATE, GET_EMPLOYES_AFC, GET_GRID, GET_LIST_ASSUREURS, GET_LIST_CONTRACTS, GET_MODULES,
	GET_TYPES_CONTRACT, SUBMIT_CONTRACT,
	getEmployesAFC, getGrid, createContract,
	getListAssureurs,
	getModules, getTypesContract, SEND_DELETE_FIELD_CONTRACT, SEND_NEW_FIELD_CONTRACT, SEND_UPDATE_FIELD_CONTRACT,
	setContract, setSelectedTaux, setSelectedRemuneration,
	setGrid, changeFormContract,
	setListContracts, setModules, setTypesContract, UPDATE_POS_LAYOUT,
	updateAGA, updateEmployesAFC, updateListAssureurs,
} from '../actions/crmContract';

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

export function * submitContract() {

	while (true) {

		let formState = yield take(SUBMIT_CONTRACT);
		console.log(formState);

		let {
			idClient, idRepresentant,
			idAssureur, idAGA, chambreDeCommerce, numPolice,
			dateEmission, moisRenouv, notes,
			historiqueTaux, remuneration,
			modulesChoisis
		} = formState.contract.contrat;

		let {
			facultatif
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
			historiqueTaux: historiqueTaux,
			remuneration: remuneration,
			modulesChoisis: modulesChoisis,
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

export function* requestAGA() {
	while (true) {
		yield take(GET_AGA);

		//communication avec server
		let server = "http://localhost:3002/clients/aga";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/users/getRoles';

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
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/users/getRoles';

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
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/users/getRoles';

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
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/users/getRoles';

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
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://afr-crm2.herokuapp.com/attributesManagementupdate/contract';


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
				} else {
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
					let modulesToDisplay = [];
					modulesChoisis.forEach((element, index) => {
						modulesToDisplay.push(element.id.toString());
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
							module_notes: element.module_notes,
							modalites: modalitesToUpdate
						});
					});


					let toUpdate = {
						idAssureur: contract.idfournisseur,
						idAGA: contract.idchambrecommerce,//LOOOOP,
						idContract: contract.idcontrat,
						idClient: contract.idClient,
						modulesChoisis: modulesToUpdate,
						modulesInitiaux: modulesToUpdate,
						numPolice: contract.police,
						dateEmission: contract.date_signature,
						moisRenouv: contract.mois_renouvellement,
						notes: contract.notes,
						historiqueTaux: { //Aller chercher la bonne année?
							diff: '',
							annee_dep: '',
							annee_fin: '',
							vie: '',
							dma: '',
							pac: '',
							ct: '',
							lt: '',
							amc_ind: '',
							amc_mono: '',
							amc_couple: '',
							amc_fam: '',
							dent_ind: '',
							dent_mono: '',
							dent_couple: '',
							dent_fam: '',
							mg_ind: '',
							mg_mono: '',
							mg_couple: '',
							mg_fam: '',
							pae: '',
							prime_ms: '',
							prime_an: ''
						},
						remuneration: { //idem avec année depart et annee fin ?
							vie: '',
							ct: '',
							lt: '',
							amc: '',
							dent: '',
							mg: '',
							pae: '',
							notes: '',
							recu: '',
							base: '',
							boni: '',
							total: '',
							gtotal: '',
							idConseiller: '',
							split: '',
							bdu: '',
							paye: '',
							dpaye: '',
							solde: ''
						}
					};

					let dateDep = parseInt(contract.date_signature[0] + contract.date_signature[1] + contract.date_signature[2] + contract.date_signature[3], 10);
					contract.remuneration.history.forEach(element => {
						if (parseInt(element.annee_dep, 10) === dateDep) {
							toUpdate.remuneration.vie = element.vie;
							toUpdate.remuneration.ct = element.ct;
							toUpdate.remuneration.lt = element.lt;
							toUpdate.remuneration.dent = element.dentaire;
							toUpdate.remuneration.mg = element.mg;
							toUpdate.remuneration.pae = element.pae;
							toUpdate.remuneration.notes = element.notes;
							toUpdate.remuneration.recu = element.date_payée_base;
							toUpdate.remuneration.base = element.montant_payé_base;
							toUpdate.remuneration.boni = element.montant_payé_boni;
							toUpdate.remuneration.split = element.pourcentage_payable_en_pourcent;
							toUpdate.remuneration.total = element.rémunération_totale;
							toUpdate.remuneration.idConseiller = element.idconseiller;
							toUpdate.remuneration.bdu = element.montant_dû;
							toUpdate.remuneration.paye = element.montant_payé;
							toUpdate.remuneration.dpaye = element.date_payée;

						}
					});

					contract.historique_taux.forEach(element => {
						if (parseInt(element.annee_dep, 10) === dateDep) {
							toUpdate.historiqueTaux.diff = element.différence;
							toUpdate.historiqueTaux.anneedep = element.annee_dep;
							toUpdate.historiqueTaux.anneefin = element.annee_fin;
							toUpdate.historiqueTaux.vie = element.vie;
							toUpdate.historiqueTaux.dma = element.dma;
							toUpdate.historiqueTaux.pac = element.pac;
							toUpdate.historiqueTaux.ct = element.ct;
							toUpdate.historiqueTaux.lt = element.lt;
							toUpdate.historiqueTaux.amc_ind = element.amc_ind;
							toUpdate.historiqueTaux.amc_mono = element.amc_mono;
							toUpdate.historiqueTaux.amc_couple = element.amc_couple;
							toUpdate.historiqueTaux.amc_fam = element.amc_fam;
							toUpdate.historiqueTaux.dent_ind = element.dentaire_ind;
							toUpdate.historiqueTaux.dent_mono = element.dentaire_mono;
							toUpdate.historiqueTaux.dent_couple = element.dentaire_couple;
							toUpdate.historiqueTaux.dent_fam = element.dentaire_fam;
							toUpdate.historiqueTaux.mg_ind = element.mg_ind;
							toUpdate.historiqueTaux.mg_mono = element.mg_mono;
							toUpdate.historiqueTaux.mg_couple = element.mg_couple;
							toUpdate.historiqueTaux.mg_fam = element.mg_fam;
							toUpdate.historiqueTaux.pae = element.pae;
							toUpdate.historiqueTaux.prime_ms = element.prime_mensuelle;
							toUpdate.historiqueTaux.prime_an = element.prime_annuelle;
						}
					});
					console.log(toUpdate);
					store.dispatch(changeFormContract({
						intModulesToDisplay: intModulesToDisplay,
						modulesToDisplay: modulesToDisplay,
						contrat: toUpdate
					}));
					store.dispatch(getGrid());
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
}
