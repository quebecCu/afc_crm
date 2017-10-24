import React from 'react';
import {connect} from 'react-redux';
import {FormCreateUser} from '../components/FormCreateUser.js';
import '../style/CreationUser.css';
import {changeFormCreateUser} from "../actions/crmCreateUser";

class createUser extends React.Component{

    constructor(props){
        super(props);

    }



    render(){
        let {formState} = this.props.crmCreateUser;
        return <div><h1>Créer utilisateur</h1>
            <FormCreateUser formState={formState}
                             changeForm={this.props.changeForm}/>

        </div>;
    }
}

function mapStateToProps (state) {
    console.log("mapstatetoprops");
    return{
        crmCreateUser: state.crmCreateUser
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
