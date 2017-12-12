import {
	CHANGE_VIEW_CONTRACT,
	CHANGE_FORM_CONTRACT,
	UPDATE_AGA,
	UPDATE_EMPLOYES_AFC,
	UPDATE_LIST_ASSUREURS, SET_LIST_CONTRACTS, CHANGE_SEARCH_CONTRACTS, CHANGE_BIG_LAYOUT, CHANGE_LIL_LAYOUT,
	SET_MODULES, SET_GRID, CHANGE_NEW_FIELD_CONTRACT, SET_TYPES_CONTRACT, CHANGE_UPDATE_FIELD_CONTRACT
} from "../actions/crmContract";

let initialState = {
	view: '',
	listContracts: [],
	searchContracts: {
		numeroPolice: '',
		nomClient: '',
		nomAssureur: '',
		moisRenouvellement: ''
	},
	bigLayout: [
		{i: '1', x: 0, y: 0, w: 5, h: 7, minH: 7, minW:3},
		{i: '2', x: 6, y: 0, w: 5, h: 6, minH: 6, minW:3},
		{i: '3', x: 0, y: 7, w: 5, h: 6, minH: 6, minW:3},
		{i: '4', x: 0, y: 13, w: 10, h: 8, minH: 8, minW:10},
	],
	lilLayout: [
		{i: '1', x: 0, y: 0, w: 2, h: 3, minH: 3, minW:2},
		{i: '2', x: 2, y: 0, w: 2, h: 3, minH: 3, minW:2},
		{i: '3', x: 4, y: 0, w: 2, h: 3, minH: 3, minW:2},
	],
	types: [],
	newField: {
		name: '',
		description: '',
		type: '1'
	},
	updateField: {
		name: '',
		description: '',
		id: ''
	},
	formState: {
		intModulesToDisplay:1,
		modulesToDisplay:[],//Tableau qui gère l'affichage des modules
		AGA: [],
		employesAFC:[],
		listAssureurs:[],
		facultatif:[],
		modules:[],
		contrat:{
			idAssureur: '',
			idAGA: '',
			idClient: '',
			modulesChoisis: [],
			numPolice:'',
			dateEmission:'',
			moisRenouv:'',
			notes:'',
			idRepresentant: '',
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
		case SET_LIST_CONTRACTS:
			return {...state, listContracts: action.contracts, errors:''};
		case CHANGE_SEARCH_CONTRACTS:
			return {...state, searchContracts: action.search, errors: ''};
		case CHANGE_BIG_LAYOUT:
			return {...state, bigLayout: action.layout, errors: ''};
		case CHANGE_LIL_LAYOUT:
			return {...state, lilLayout: action.layout, errors: ''};
		case SET_MODULES:
			return {...state,  formState:{...state.formState, modules:action.modules}, errors: ''};
		case SET_GRID:
			return {...state,  formState:{...state.formState, facultatif:action.grid}, errors: ''};
		case CHANGE_NEW_FIELD_CONTRACT:
			return {...state, newField: action.newField, errors:''};
		case CHANGE_UPDATE_FIELD_CONTRACT:
			return {...state, updateField: action.updateField, errors:''};
		case SET_TYPES_CONTRACT:
			return {...state, types: action.types, errors:''};
		default:
			return state;
	}
}
