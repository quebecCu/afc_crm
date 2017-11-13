import React from 'react';
import '../style/PageAccueil.css';
import {connect} from "react-redux";
import ListUsers from '../components/ListUsers.js';
import CreateUser from './CreateUser';
import {changeViewUserManagement, getListUser} from "../actions/crmUserManagement";

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
					view === "" && <ListUsers formState={formState} handleClick={this.props.changeViewUserManagement}/>
				}
				{
					view === "CreateUser" && <CreateUser/>
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
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (GestionUser);
