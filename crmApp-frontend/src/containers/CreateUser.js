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
        console.log("view?"+this.props.view);
		if(this.props.view === "UpdateUser"){
			console.log("role ta race"+this.props.user.role);
			let newRole = JSON.parse(JSON.stringify(this.props.user.role));
			let newName = JSON.parse(JSON.stringify(this.props.user.lastname));
			let newLastName = JSON.parse(JSON.stringify(this.props.user.name));
			let newLogin = JSON.parse(JSON.stringify(this.props.user.login));
			let newMail = JSON.parse(JSON.stringify(this.props.user.mail));
			let newUserPerms = JSON.parse(JSON.stringify(this.props.user.userPerms));
			this.props.changeForm({...this.props.formState,
				role: newRole,
				nom: newName,
				prenom:newLastName,
				login: newLogin,
				mail: newMail,
				userPerms: newUserPerms,
				roles:[],
				operations:[],
			});
			console.log(this.props.formState);
		}

    }



	handleClick(event){
		this.props.submitUser(this.props.formState);
		this.props.changeView("");
	}

    render() {
        let {formState} = this.props.crmCreateUser;
        return <div><div className="page-header" style={{paddingBottom:20}}><h1>{this.props.title}</h1></div>
            <FormCreateUser formState={formState}
							view={this.props.view}
							user={this.props.user}
                            changeForm={this.props.changeForm}
                            submitUser={this.props.submitUser}/>
            <CreateUserPermissions formState={formState}
								   view={this.props.view}
								   user={this.props.user}
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
