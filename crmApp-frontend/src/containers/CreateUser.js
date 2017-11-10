import React from 'react';
import {connect} from 'react-redux';
import {FormCreateUser} from '../components/FormCreateUser.js';
import '../style/CreationUser.css';
import {changeFormCreateUser, submitUser, getOperations, getDefaultPerms, updateUserPerms} from "../actions/crmCreateUser";
import CreateUserPermissions from './CreateUserPermissions';


class CreateUser extends React.Component{

    constructor(props){
        super(props);
        this.props.getOperations();
        this.props.getDefaultPerms();


    }


    render(){
        let {formState} = this.props.crmCreateUser;
        return <div><h1>Créer utilisateur</h1>
            <FormCreateUser formState={formState}
                            changeForm={this.props.changeForm}
                            submitUser={this.props.submitUser}/>
            <CreateUserPermissions formState={formState}
                                   changeForm={this.props.changeForm}
                                    updateUserPerms={this.props.updateUserPerms}/>


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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CreateUser);
