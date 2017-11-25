import React from 'react';
import '../style/PageAccueil.css';
import {connect} from "react-redux";
import ListUsers from '../components/ListUsers.js';
import CreateUser from './CreateUser';
import DisplayUser from './DisplayUser';
import {changeViewUserManagement, getListUser, requestUserById, deleteUser} from "../actions/crmUserManagement";
import {getOperations} from "../actions/crmCreateUser";

class GestionUser extends React.Component {

	constructor(props) {
		super(props);
		this.props.getListUser();
	}
	

	render() {
		let {view, formState} = this.props.crmUserManagement;
		return <div id="UserManagement" >
		
		<div className="view text-center" >
					<h1>Liste des utilisateurs: </h1>
				{
					view === "" && <ListUsers formState={formState} handleClick={this.props.changeViewUserManagement}
											  displayUser={this.props.requestUserById}/>
				}
				{
					view === "CreateUser" && <CreateUser changeView={this.props.changeViewUserManagement}
														view={view}
														  title="Création d'un utilisateur"
														button="Créer l'utilisateur"/>
				}
				{
					view === "DisplayUser"  && <DisplayUser formState={formState} user={formState.userToDisplay}
															changeView={this.props.changeViewUserManagement}
															getOperations={this.props.getOperations}
															deleteUser={this.props.deleteUser}/>
				}
				{
					view === "UpdateUser" && <CreateUser changeView={this.props.changeViewUserManagement}
														 updateUser={this.props.updateUser}
														 user={formState.userToDisplay}
														 formState={formState}
														 view={view}
															title="Modification d'un utilisateur"
															button="Modifier l'utilisateur"/>
				}
			</div>
		</div>
	}
}

function mapStateToProps (state) {

    return{
        crmUserManagement: state.crmUserManagement
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

    return{
        changeViewUserManagement: (newView) => {
            dispatch(changeViewUserManagement(newView));
        },
		getListUser: () => {
        	dispatch(getListUser());
		},
		requestUserById: (id) => {
        	dispatch(requestUserById(id));
		},
		getOperations: () => {
        	dispatch(getOperations());
		},
		deleteUser: (id) =>{
        	dispatch(deleteUser(id));
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (GestionUser);
