import React, { Component } from 'react';
import {changeViewDashboard} from "../actions/crmDashboard";
import {connect} from "react-redux";
import NavBarLink from "../components/NavBarLink";
import {logout} from "../actions/crmLogin";

class NavBar extends Component {


    render() {
        return (
            <div className="navBar">
                <NavBarLink name="Accueil" id="Home" handleClick={this.props.changeViewDashboard} view={this.props.view}/>
                <NavBarLink name="Assurances Individuelles" id="indIns" handleClick={this.props.changeViewDashboard} view={this.props.view}/>
                <NavBarLink name="Assurances Collectives" id="collIns" handleClick={this.props.changeViewDashboard} view={this.props.view}/>
                <NavBarLink name="Placements" id="placements" handleClick={this.props.changeViewDashboard} view={this.props.view}/>
                <NavBarLink name="Fournisseurs" id="suppliers" handleClick={this.props.changeViewDashboard} view={this.props.view}/>
                <NavBarLink name="Gestion des utilisateurs" id="usersManagement" handleClick={this.props.changeViewDashboard} view={this.props.view}/>
                <div  id="logout" onClick={this.props.logout} className="link">Déconnexion</div>
                <NavBarLink name="Retour" id="back" />
            </div>
        );
    }
}

function mapStateToProps (state) {

    return{

    }
}

const  mapDispatchToProps = (dispatch) => {

    return{
        changeViewDashboard: (newView) => {
            dispatch(changeViewDashboard(newView));
        },
        logout: () => {
            dispatch(logout());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);