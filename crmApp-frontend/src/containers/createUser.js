import React from 'react';
import {connect} from 'react-redux';
import {FormCreateUser} from '../components/FormCreateUser.js';
import '../style/CreationUser.css';
import {changeFormCreateUser, submitUser} from "../actions/crmCreateUser";

class createUser extends React.Component{

    constructor(props){
        super(props);

    }



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
        submitUser : (newUser) => {
            dispatch(submitUser(newUser))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (createUser);
