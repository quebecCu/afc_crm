import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router';
import {requestUserById, deleteUser} from "../../actions/crmUserManagement";
import {getOperations} from "../../actions/crmCreateUser";

class DisplayUser extends React.Component{

	constructor(props){
		super(props);
		this.props.requestUserById(this.props.idUser);
		this.props.getOperations();
		this._getPermission=this._getPermission.bind(this);
		this._handleClickDelete=this._handleClickDelete.bind(this);
	}

	_getPermission(level){
		let label='';
		this.props.crmUserManagement.formState.operations.forEach(element=>{
			if(level===element.value){
				label = element.label;
			}
		});
		return label;
	}

	_handleClickDelete(id){
		this.props.deleteUser(id);
	}
	
	_handleModify(match, history, event) {
		history.push(match.url + "/update");
	}
	
	renderStaticAttribute(attributeName, attributeValue, width, key) {
		const inputStyle = {
			padding: '6px 12px',
		}
    return (
			<div key={key} className="form-group row">
				<label htmlFor="staticEmail" className={"col-form-label  " + (width === 6 ? "col-sm-6" : "col-sm-2")}><strong>{attributeName}:</strong> </label>
				<div className={(width === 6 ? "col-sm-6" : "col-sm-10")}>
					<input style={inputStyle} type="text" readOnly className="form-control-plaintext" id="aga" value={attributeValue}/>
				</div>
			</div>
    );
  }

	render(){
		let user = this.props.crmUserManagement.formState.userToDisplay;
		const { match, history } = this.props;
		return (
			<div className="container-fluid">
				<h1 className="text-center">Gestion des utilisateurs</h1>
				<div className="card mb-3">
					<div className="card-header">
		      	<i className="fa fa-file-o"></i> Fiche utilisateur
					</div>
					<div className="card-body">
						<div className="text-right">
							<button className="btn btn-primary" onClick={this._handleModify.bind(this, match, history)}><i className="fa fa-cog"></i> Modifier </button>
							<button className="btn btn-danger" onClick={this._handleClickDelete.bind(this, user.id)}>Supprimer</button>
						</div>
						<hr/>
						<div className="row">
							<div className="col-xs-12 col-sm-6">
								{this.renderStaticAttribute("Nom",user.lastname,6)}
							</div>
							<div className="col-xs-12 col-sm-6">
								{this.renderStaticAttribute("Prénom",user.name,6)}
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12 col-sm-6">
								{this.renderStaticAttribute("Rôle",user.role,6)}
							</div>
							<div className="col-xs-12 col-sm-6">
								{this.renderStaticAttribute("Nom d'utilisateur",user.login,6)}
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12 col-sm-6">
								{this.renderStaticAttribute("Adresse e-mail",user.mail,6)}
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12 col-sm-6">
								{this.renderStaticAttribute("Permissions", "",6)}
							</div>
						</div>
						<ul>
							{

								user.userPerms.map(element=>{
									return(<div className="form-group" style={{textAlign:"left"}} key={element.id}><li><span className="valeur">Droit de {this._getPermission(element.level)} sur la partie {element.group}</span></li></div>);

								})}
						</ul>
					</div>
				</div>
			</div>
		);
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
		requestUserById: (id) => {
        	dispatch(requestUserById(id));
		},
		getOperations: () => {
        	dispatch(getOperations());
		},
		deleteUser: (id) =>{
        	dispatch(deleteUser(id));
		}
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayUser));
