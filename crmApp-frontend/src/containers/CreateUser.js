import React from 'react';
import {connect} from 'react-redux';
import {FormCreateUser} from '../components/FormCreateUser.js';
import '../style/CreationUser.css';
import {changeFormCreateUser, submitUser} from "../actions/crmCreateUser";

class CreateUser extends React.Component{

    render(){
        let {formState} = this.props.crmCreateUser;
        return <div><h1>Créer utilisateur</h1>
            <FormCreateUser formState={formState}
                            changeForm={this.props.changeForm}
                            submitUser={this.props.submitUser}/>

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CreateUser);
