import React from 'react';
import {connect} from 'react-redux';
import {FormCreateUser} from '../components/FormCreateUser.js';
import '../style/CreationUser.css';

import {changeFormCreateUser, submitUser, getRoles, getOperations, getDefaultPerms, updateUserPerms} from "../actions/crmCreateUser";
import CreateUserPermissions from './CreateUserPermissions';


class CreateUser extends React.Component{

    constructor(props){
        super(props);
        this.props.getOperations();
        this.props.getDefaultPerms();
        this.props.getRoles();
        this.handleClick = this.handleClick.bind(this);
    }

	handleClick(event){
		this.props.submitUser(this.props.formState);
	}

    render() {
        let {formState} = this.props.crmCreateUser;
        return <div><div className="page-header" style={{paddingBottom:20}}><h1>Création d'un utilisateur</h1></div>
            <FormCreateUser formState={formState}
                            changeForm={this.props.changeForm}
                            submitUser={this.props.submitUser}/>
            <CreateUserPermissions formState={formState}
                                   changeForm={this.props.changeForm}
								   updateUserPerms={this.props.updateUserPerms}/>
			<button onClick={this.handleClick}>Créer l'utilisateur</button>
        </div>;
    }
}

function mapStateToProps (state) {
    return{
        crmCreateUser: state.crmCreateUser
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

    return{

        changeForm : (newFormState) => {
            dispatch(changeFormCreateUser(newFormState))
        },
        submitUser : (formData) => {
            dispatch(submitUser(formData))
        },
        getOperations: () =>{
            dispatch(getOperations())
        },
        getDefaultPerms: () => {
            dispatch(getDefaultPerms())
        },
        updateUserPerms: (position, newValue) =>{
            dispatch(updateUserPerms(position, newValue))
        },
        getRoles : () => {
            dispatch(getRoles())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CreateUser);
