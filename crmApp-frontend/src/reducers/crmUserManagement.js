import {
	CHANGE_VIEW_UM
} from '../actions/crmUserManagement';

//pour le register e mail
let initialState = {
	view: '',
	formState: {
		users: [
			{
			id: 0,
			login: "AProulx",
			nom: "Proulx",
			prenom: "Alain",
			role: "admin",
			droits: ["lecture", "ecriture"]
			},
			{
				id: 1,
				login: "MChantal",
				nom: "Mercier",
				prenom: "Chantal",
				role: "stagiaire",
				droits: ["lecture"]
			},
			{
				id: 2,
				login: "PVlad",
				nom: "Poutine",
				prenom: "Vladimir",
				role: "admin",
				droits: ["lecture", "ecriture"]
			}],
	},
	errors: '',
};

export default function reducer(state = initialState, action) {

	switch (action.type) {
		case CHANGE_VIEW_UM:
			return {...state, view: action.newView, error: ''};
		default:
			return state
	}

}
