import {
	CHANGE_VIEW_CONTRACT,
	CHANGE_FORM_CONTRACT,
	UPDATE_AGA,
	UPDATE_EMPLOYES_AFC,
	UPDATE_LIST_ASSUREURS, SET_LIST_CONTRACTS, CHANGE_SEARCH_CONTRACTS, CHANGE_BIG_LAYOUT, CHANGE_LIL_LAYOUT,
	SET_MODULES, SET_GRID, CHANGE_NEW_FIELD_CONTRACT, SET_TYPES_CONTRACT, CHANGE_UPDATE_FIELD_CONTRACT, SET_FROM_CLIENT,
	SET_CONTRACT, SET_SELECTEDTAUX, SET_SELECTEDREMUNERATION
} from "../actions/crmContract";

let initialState = {
	view: '',
	fromClient: {
		idClient: false,
		name: '',
		sousGroupe: '',
		nombreEmployes: ''
	},
	contractDisplay : {
	   "idcontrat":0,
	   "date_signature":"0000-00-00",
	   "mois_renouvellement":0,
	   "police":"0",
	   "notes":"",
	   "idrepresentant":0,
	   "nomrepresentant":"",
	   "prenomrepresentant":"",
	   "idfournisseur":0,
	   "nomfournisseur":"",
	   "idclient":0,
	   "nomclient":"",
	   "libellechambrecommerce":"",
	   "facultatif":[
	      {
	         "idRow":1,
	         "nom":"",
	         "valeur":"",
	         "description":"",
	         "type":"",
	         "forme":"",
	         "defaut":""
	      },
	      {
	         "idRow":3,
	         "nom":"",
	         "valeur":"",
	         "description":"",
	         "type":"",
	         "forme":"",
	         "defaut":""
	      }
	   ],
	   "remuneration":{
	      "history":[
	         {
	            "annee_dep":0,
	            "annee_fin":0,
	            "vie_dma_pac":null,
	            "ct":null,
	            "lt":"",
	            "amc":"",
	            "dentaire":"",
	            "mg":"",
	            "pae":"",
	            "recu":"",
	            "base":0,
	            "boni":0,
	            "split":null,
	            "bdu":null,
	            "paye":null,
	            "total":null,
	            "dpaye":"",
	            "notes":null,
	            "solde":null,
	            "idconseiller":0,
	            "nomconseiller":"",
	            "prenomconseiller":""
	         }
	      ],
	      "gtotal":0
	   },
	   "historique_taux":[
	      {
	         "annee_dep":0,
	         "annee_fin":0,
	         "nombre_employés":null,
	         "différence":null,
	         "vie":"",
	         "dma":"",
	         "pac":"",
	         "ct":"",
	         "lt":"",
	         "amc_ind":"",
	         "amc_mono":"",
	         "amc_couple":"",
	         "amc_fam":null,
	         "dentaire_ind":null,
	         "dentaire_mono":null,
	         "dentaire_couple":null,
	         "dentaire_fam":null,
	         "mg_ind":null,
	         "mg_mono":null,
	         "mg_couple":null,
	         "mg_fam":null,
	         "pae":null,
	         "prime_mensuelle":null,
	         "prime_annuelle":null
	      },
				{
	         "annee_dep":0,
	         "annee_fin":0,
	         "nombre_employés":null,
	         "différence":null,
	         "vie":"",
	         "dma":"",
	         "pac":"",
	         "ct":"",
	         "lt":"",
	         "amc_ind":"",
	         "amc_mono":"",
	         "amc_couple":"",
	         "amc_fam":null,
	         "dentaire_ind":null,
	         "dentaire_mono":null,
	         "dentaire_couple":null,
	         "dentaire_fam":null,
	         "mg_ind":null,
	         "mg_mono":null,
	         "mg_couple":null,
	         "mg_fam":null,
	         "pae":null,
	         "prime_mensuelle":null,
	         "prime_annuelle":null
	      },
	   ],
	   "souscriptions":[
	      {
	         "libelle":"Assurance Vie - Adhérent et personnes à charge",
	         "id":1,
	         "module_notes":"",
	         "subscriptions":[
	            {
	               "libelle":"Formule",
	               "id":2,
	               "souscription_notes":"",
	               "description":"Formule",
	               "ext":null,
	               "valeur":"1x salaire"
	            },
	            {
	               "libelle":"Maximum SP",
	               "id":3,
	               "souscription_notes":"",
	               "description":"Maximum sans preuve",
	               "ext":null,
	               "valeur":"7500"
	            }
	         ]
	      }
	   ]
	},
	chambre:{},
	selectedTaux: {},
	selectedRemuneration: {},
	listContracts: [],
	searchContracts: {
		numeroPolice: '',
		nomClient: '',
		nomAssureur: '',
		moisRenouvellement: ''
	},
	bigLayout: [],
	lilLayout: [],
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
		intModulesToDisplay:2,
		modulesToDisplay:["4","1"],//Tableau qui gère l'affichage des modules
		AGA: [],
		employesAFC:[],
		listAssureurs:[],
		facultatif:[],
		modules:[],
		historiqueToAdd: {
			annee_dep: undefined,
			annee_fin: undefined,
			diff: undefined,
			vie: undefined,
			dma: undefined,
			pac: undefined,
			ct: undefined,
			lt: undefined,
			amc_ind: undefined,
			amc_mono: undefined,
			amc_couple: undefined,
			amc_fam: undefined,
			dent_ind: undefined,
			dent_mono: undefined,
			dent_couple: undefined,
			dent_fam: undefined,
			mg_ind: undefined,
			mg_mono: undefined,
			mg_couple: undefined,
			mg_fam: undefined,
			pae: undefined,
			prime_ms: undefined,
			prime_an: undefined
		},
		remunerationToAdd: {
			annee_dep: undefined,
			annee_fin: undefined,
			vie_dma_pac:undefined,
			ct:undefined,
			lt:undefined,
			amc:undefined,
			dent:undefined,
			mg:undefined,
			pae:undefined,
			notes:undefined,
			recu:undefined,
			base:undefined,
			boni:undefined,
			total:undefined,
			gtotal:undefined,
			idConseiller:undefined,
			split:undefined,
			bdu:undefined,
			paye:undefined,
			dpaye:undefined,
			solde: undefined
		},
		contrat:{
			idAssureur: '',
			idAGA: '',
			libelleAGA: '',
			idClient: '',
			modulesSupprimes: [],
			modulesInitiaux: [],
			modulesToCreate: [],
			modulesAlreadySelected: [],
			chambreDeCommerce:'',
			numPolice:'',
			dateEmission:'',
			moisRenouv:'',
			notes:'',
			idRepresentant: '',
			historiqueTaux: [{
				annee_dep: undefined,
				annee_fin: undefined,
				diff: undefined,
				vie: undefined,
				dma: undefined,
				pac: undefined,
				ct: undefined,
				lt: undefined,
				amc_ind: undefined,
				amc_mono: undefined,
				amc_couple: undefined,
				amc_fam: undefined,
				dent_ind: undefined,
				dent_mono: undefined,
				dent_couple: undefined,
				dent_fam: undefined,
				mg_ind: undefined,
				mg_mono: undefined,
				mg_couple: undefined,
				mg_fam: undefined,
				pae: undefined,
				prime_ms: undefined,
				prime_an: ''
			}],
		remuneration:[{
			annee_dep: '',
			annee_fin: '',
			vie_dma_pac:'',
			ct:'',
			lt:'',
			amc:'',
			dentaire:'',
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
			solde:''
		}]
		}
	},
	errors: '',
};

export default function reducer (state = initialState, action){
	switch(action.type){
		case CHANGE_VIEW_CONTRACT:
			return {...state, view: action.newView, errors:''};
		case CHANGE_FORM_CONTRACT:
			return {...state, formState:{...state.formState, intModulesToDisplay:action.newForm.intModulesToDisplay, modulesToDisplay:action.newForm.modulesToDisplay, contrat:action.newForm.contrat, facultatif:action.newForm.facultatif}, errors:'' };
		case UPDATE_AGA:
			return {...state, formState:{...state.formState, AGA:action.listAGA}, errors:'' };
		/* ADD AGA */

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
		case SET_FROM_CLIENT:
			return {...state, fromClient: action.fromClient, errors:''};
		case SET_CONTRACT:
			return {...state, contractDisplay: action.contract, errors:''};
		case SET_SELECTEDTAUX:
			return {...state, selectedTaux: action.taux, errors:''};
		case SET_SELECTEDREMUNERATION:
			return {...state, selectedRemuneration: action.remuneration, errors:''};

		default:
			return state;
	}
}
