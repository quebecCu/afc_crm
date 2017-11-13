import React from 'react';
import '../style/PageAccueil.css';
import {connect} from "react-redux";
import ListUsers from '../components/ListUsers.js';
import CreateUser from './CreateUser';
import {changeViewUserManagement} from "../actions/crmUserManagement";

class GestionUser extends React.Component {

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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (GestionUser);
