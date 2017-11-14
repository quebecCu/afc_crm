import React from 'react';
import '../style/PageAccueil.css';
import {connect} from "react-redux";
import ListUsers from '../components/ListUsers.js';
import CreateUser from './CreateUser';
import DisplayUser from './DisplayUser';
import {changeViewUserManagement, getListUser, requestUserById} from "../actions/crmUserManagement";

class GestionUser extends React.Component {

	constructor(props) {
		super(props);
		this.props.getListUser();
	}

	render() {
		let {view, formState} = this.props.crmUserManagement;
		return <div id="UserManagement">
			<div className="view text-center">
				{
					view === "" && <ListUsers formState={formState} handleClick={this.props.changeViewUserManagement}
											  displayUser={this.props.requestUserById}/>
				}
				{
					view === "CreateUser" && <CreateUser changeView={this.props.changeViewUserManagement}
														view={view}
														  title="Création d'un utilisateur"/>
				}
				{
					view === "DisplayUser"  && <DisplayUser formState={formState} user={formState.userToDisplay}
															handleClick={this.props.changeViewUserManagement}/>
				}
				{
					view === "UpdateUser" && <CreateUser changeView={this.props.changeViewUserManagement}
														 user={formState.userToDisplay}
														 view={view}
															title="Modification d'un utilisateur"/>
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
        	console.log("request"+id);
        	dispatch(requestUserById(id));
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (GestionUser);
