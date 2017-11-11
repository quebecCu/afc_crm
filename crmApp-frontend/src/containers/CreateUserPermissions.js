import React from 'react';
import {DisplayOnePermission} from '../components/DisplayOnePermission';

class CreateUserPermissions extends React.Component{


    constructor(props) {
		super(props);
		this.toReturn = '';
	}

    render(){
        let permUser = JSON.parse(JSON.stringify(this.props.formState.userPerms));
        this.toReturn = permUser.map(element => {
            return(
                <DisplayOnePermission key={element.id} id={element.id} entite={element.entite} level={element.level}
									  formState={this.props.formState} changeForm={this.props.changeForm}
									  updateUserPerms={this.props.updateUserPerms}/>
            )});
        return (<div><span className="titre">Permissions :</span><br />
           {
               this.toReturn
           }</div>) ;
    }
}

export default CreateUserPermissions;
