import React, { Component } from 'react';
import {changeViewDashboard} from "../actions/crmDashboard";
import {connect} from "react-redux";
import NavBarLink from "../components/NavBarLink";
import {logout} from "../actions/crmLogin";
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import {changeViewUserManagement} from "../actions/crmUserManagement";
import '../style/NavBar.css';

class NavBar extends Component {


    render() {
        return (
            <div>
                {/*<div className="navBar">
                    <NavBarLink name="Accueil" id="Home" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                    <NavBarLink name="Assurances Individuelles" id="indIns" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                    <NavBarLink name="Assurances Collectives" id="collIns" handleClick={this.props.changeViewDashboard} view={this.props.view} resetView={this.props.changeViewCollective}/>
                    <NavBarLink name="Placements" id="placements" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                    <NavBarLink name="Fournisseurs" id="suppliers" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                    <NavBarLink name="Gestion des utilisateurs" id="usersManagement" handleClick={this.props.changeViewDashboard} view={this.props.view} resetView={this.props.changeViewUserManagement}/>
                    <div  id="logout" onClick={this.props.logout} className="link">Déconnexion</div>
                    <NavBarLink name="Retour" id="back" />
                </div>*/}
                <div className="nav-side-menu">
                    <div className="brand">AFC inc.</div>
                    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                    <div className="menu-list">
                        <ul id="menu-content" className="menu-content collapse out">
                            <li>
                                <NavBarLink name="Accueil" id="Home" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                            </li>
                            <li>
                                <NavBarLink name="Assurances Individuelles" id="indIns" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                            </li>
                            {/*<li data-toggle="collapse" data-target="#products" className="collapsed active">
                                <a href="#"><i className="fa fa-gift fa-lg"></i> Assurances Collectives <span className="arrow"></span></a>
                            </li>
                            <ul className="sub-menu collapse" id="products">
                                <li><a href="#">Clients</a></li>
                                <li><a href="#">Fournisseurs</a></li>
                            </ul>*/}
                            <li>
                                <NavBarLink name="Assurances Collectives" id="collIns" handleClick={this.props.changeViewDashboard} view={this.props.view} resetView={this.props.changeViewCollective}/>
                            </li>
                            <li>
                                <NavBarLink name="Placements" id="placements" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                            </li>
                            <li>
                                <NavBarLink name="Fournisseurs" id="suppliers" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                            </li>
                            <li>
                                <NavBarLink name="Gestion des utilisateurs" id="usersManagement" handleClick={this.props.changeViewDashboard} view={this.props.view} resetView={this.props.changeViewUserManagement}/>

                            </li>
                            <li>
                                <div  id="logout" onClick={this.props.logout} className="link">Déconnexion</div>
                            </li>
                            <li>
                                <NavBarLink name="Retour" id="back" />
                            </li>
                        </ul>
                    </div>
                </div>
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
        },
        changeViewCollective: (newView) => {
            dispatch(changeViewCollective(newView));
        },
        changeViewUserManagement: (newView) => {
            dispatch(changeViewUserManagement(newView));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);