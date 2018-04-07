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
	            "date_payée_base":"",
	            "montant_payé_base":0,
	            "montant_payé_boni":0,
	            "pourcentage_payable_en_pourcent":null,
	            "montant_dû":null,
	            "montant_payé":null,
	            "rémunération_totale":null,
	            "date_payée":"",
	            "notes":null,
	            "solde":null,
	            "idconseiller":0,
	            "nomconseiller":"",
	            "prenomconseiller":""
	         },
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
	            "date_payée_base":"",
	            "montant_payé_base":null,
	            "montant_payé_boni":null,
	            "pourcentage_payable_en_pourcent":null,
	            "montant_dû":null,
	            "montant_payé":null,
	            "rémunération_totale":null,
	            "date_payée":"",
	            "notes":null,
	            "solde":null,
	            "idconseiller":1,
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
		contrat:{
			idAssureur: '',
			idAGA: '',
			libelleAGA: '',
			idClient: '',
			modulesChoisis: [{
				idModule: "4",
				modalites:[{idValeur:23,idModalite:10,valeur:"0 jours"},
					{idValeur:26,idModalite:12,valeur:"16 semaines"}]

			},
				{idModule:"1",
				modalites:[{idValeur:1,idModalite:5,valeur:"edrg"},
					{idValeur:1,idModalite:4,valeur:23}]}
				],
			chambreDeCommerce:'',	
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
