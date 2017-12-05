import {
	CHANGE_VIEW_CONTRACT,
	CHANGE_FORM_CONTRACT,
	UPDATE_AGA,
	UPDATE_EMPLOYES_AFC,
	UPDATE_LIST_ASSUREURS
} from "../actions/crmContract";

let initialState = {
	view: '',
	formState: {
		intModulesToDisplay:1,
		modulesToDisplay:[],//Tableau qui gère l'affichage des modules
		AGA: [],
		employesAFC:[],
		listAssureurs:[],
		modules:[
			{
				nom: "Assurance vie",
				idModule: 0,
				modalites: [
					{
						nom: "classe",
						idModalite: 0,
						description: "",
						type: "select",
						valeurs: [
							{idValeur: 0, label: "Autres"}
							]
					},
					{
						nom: "Vie conj",
						idModalite: 1,
						description: "conjoint",
						type: "select",
						valeurs: [
							{idValeur: 0, label: "5000$"},
							{idValeur: 1, label: "10000$"},
							{idValeur:2, label:"15000$"},
							{idValeur:5, label:"Autres"}]
					},
				]
			},
			{
				nom: "Assurance invalidité longue durée",
				idModule: 1,
				modalites: [
					{
						nom: "classe",
						idModalite: 0,
						description: "",
						type: "select",
						valeurs: [
							{idValeur: 0, label: "employes"},
							{idValeur: 4, label: "cadres"},
							{idValeur:1, label:"Autres"}
							]
					},
					{
						nom: "Vie enfant",
						idModalite: 3,
						description: "enfant",
						type: "select",
						valeurs: [
							{idValeur: 0, label: "5000$"},
							{idValeur: 6, label: "10000$"},
							{idValeur:2, label:"15000$"},
							{idValeur:1, label:"Autres"}]
					},
				]
			}

		],
		contrat:{
			idAssureur: '',
			idAGA: '',
			modulesChoisis: [],
			numPolice:'',
			dateEmission:'',
			moisRenouv:'',
			notes:'',
			historiqueTaux: {
				diff: '',
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
		remuneration:{
			vie:'',
			ct:'',
			lt:'',
			amc:'',
			dent:'',
			mg:'',
			pae:'',
			notes:'',
			recu:'',
			base:'',
			boni:'',
			total:'',
			gtotal:'',
			idConseiller:'',
			split:'',
			bdu:'',
			paye:'',
			dpaye:'',
			}

		}
	},
	errors: '',
};

export default function reducer (state = initialState, action){
	switch(action.type){
		case CHANGE_VIEW_CONTRACT:
			return {...state, view: action.newView, errors:''};
		case CHANGE_FORM_CONTRACT:
			return {...state, formState: action.newForm, errors:'' };
		case UPDATE_AGA:
			return {...state, formState:{...state.formState, AGA:action.listAGA}, errors:'' };
		case UPDATE_EMPLOYES_AFC:
			return {...state, formState:{...state.formState, employesAFC:action.listEmployes}, errors:'' };
		case UPDATE_LIST_ASSUREURS:
			return {...state, formState:{...state.formState, listAssureurs:action.listAssureurs}, errors:'' };
		default:
			return state;
	}
}
