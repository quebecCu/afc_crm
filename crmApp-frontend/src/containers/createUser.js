import React from 'react';
import {connect} from 'react-redux';
import {FormCreateUser} from '../components/FormCreateUser.js';
import '../style/CreationUser.css';
import {changeFormCreateUser} from "../actions/crmCreateUser";

class createUser extends React.Component{

    constructor(props){
        super(props);
        this.onChangeRole = this.onChangeRole.bind(this);
    }

    onChangeRole(event){
        this.props.changeForm({...this.props.formState , role: event.target.value});
    }

    render(){

        return <div><h1>Créer utilisateur</h1>
            <FormCreateUser onChangeRole={this.onChangeRole} />

        </div>;
    }
}

function mapStateToProps (state) {

    return{
        crmCreateUser: state.crmLogin
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

    return{

        changeForm : (newFormState) => {
            dispatch(changeFormCreateUser(newFormState))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (createUser);
