import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router';
import { getListUser } from "../../actions/crmUserManagement";


class ListUsers extends React.Component{
    constructor(props){
        super(props);
    		this.props.getListUser();
        this._handleClick = this._handleClick.bind(this);
		    this._handleClickOnUser = this._handleClickOnUser.bind(this);
	}


   _handleClick(match, history){
       history.push(match.url + "/create")
   }

   _handleClickOnUser(match, history, id){
   		history.push(match.url + "/" + id)
   }

    render(){
      let {formState} = this.props.crmUserManagement;
  		const { match, history } = this.props;
      return (
        <div className="container-fluid">
          <h1>Gestion des utilisateurs</h1>
          <div className="card mb-3">
            <div className="card-header text-left">
              <i className="fa fa-table"></i> Liste des utilisateurs
            </div>
            <div className="card-body">
              <div className="text-right">
                <button className="btn btn-primary" onClick={this._handleClick.bind(this, match, history)}><i className="fa fa-plus"></i> Créer un utilisateur</button>
              </div>
              <br/>
              <div className="table-responsive">
    						<table id="UsersTable" className="table table-bordered table-hover">
    							<thead className="thead-default">
    							<tr id="thead-tr">
    								<th>Nom d'utilisateur</th>
    								<th>Nom et pr&eacute;nom</th>
    								<th>Description</th>
    							</tr>
    							</thead>
    							<tbody>
                  {formState.users.map(element => {
                    return(
                      <tr className="user" key={element.iduser} onClick={this._handleClickOnUser.bind(this, match, history, element.iduser)}>
                        <td>{element.login}</td>
                        <td>{element.name} {element.prenom}</td>
                        <td>{element.description}</td>
                      </tr>
                    );
                  })}
                  </tbody>
    						</table>
    					</div>
            </div>
          </div>
        </div>
      );			
    }
}

function mapStateToProps (state) {

    return{
      crmUserManagement: state.crmUserManagement,
  		crmNavBar: state.crmNavBar,
  		crmDashboard: state.crmDashboard
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

    return{
			getListUser: () => {
	        	dispatch(getListUser());
			}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
