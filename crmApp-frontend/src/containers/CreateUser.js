import React from 'react';
import {connect} from 'react-redux';
import {FormCreateUser} from '../components/FormCreateUser.js';
import '../style/CreationUser.css';

import {changeFormCreateUser, submitUser, getRoles, getOperations, getDefaultPerms, updateUserPerms, updateUser} from "../actions/crmCreateUser";
import CreateUserPermissions from './CreateUserPermissions';


class CreateUser extends React.Component{

    constructor(props){
        super(props);
        this.props.getOperations();
        this.props.getDefaultPerms();
        this.props.getRoles();
        this.handleClick = this.handleClick.bind(this);
		if(this.props.view === "UpdateUser"){
			let newRole = JSON.parse(JSON.stringify(this.props.user.role));
			let newName = JSON.parse(JSON.stringify(this.props.user.lastname));
			let newLastName = JSON.parse(JSON.stringify(this.props.user.name));
			let newLogin = JSON.parse(JSON.stringify(this.props.user.login));
			let newMail = JSON.parse(JSON.stringify(this.props.user.mail));
			let newUserPerms = JSON.parse(JSON.stringify(this.props.user.userPerms));
			let userID=JSON.parse(JSON.stringify(this.props.user.id));
			this.props.changeForm({
				id:userID,
				role: newRole,
				nom: newName,
				prenom:newLastName,
				login: newLogin,
				mail: newMail,
				userPerms: newUserPerms,
				roles:[],
				operations:[],
				mdpProv:''
			});
		}
		else{
			this.props.changeForm({...this.props.formState,
				role: '',
				nom: '',
				prenom:'',
				login: '',
				mail: '',
				mdpProv: '',
				userPerms: [],
				roles:[],
				operations:[],
			});
		}

    }



	handleClick(event){
		let {formState} = this.props.crmCreateUser;
		if(this.props.view === "CreateUser"){
			console.log('formstate'+formState);
			this.props.submitUser(formState);
		}
		else{//Cas où on est en modification de l'utilisateur
    		this.props.updateUser(formState);
		}
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
			<button onClick={this.handleClick}>{this.props.button}</button>
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
        },
		updateUser: (updatedUser) =>{
			dispatch(updateUser(updatedUser));
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CreateUser);
