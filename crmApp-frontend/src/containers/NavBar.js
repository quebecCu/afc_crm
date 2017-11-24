import React, { Component } from 'react';
import {changeViewDashboard} from "../actions/crmDashboard";
import {connect} from "react-redux";
import NavBarLink from "../components/NavBarLink";
import {logout} from "../actions/crmLogin";
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import {changeViewUserManagement, requestUserById} from "../actions/crmUserManagement";
import '../style/NavBar.css';
import {addSubUserNav} from "../actions/crmNavBar";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this._deleteSubUser = this._deleteSubUser.bind(this);
	}

	_deleteSubUser(idUser) {
		let links = this.props.crmNavBar.linksSubUser.filter(link => {
			return link.idUser !== idUser;
		});
		this.props.addSubUserNav(links);
	}

    render() {
        return (
            <div>
                <div className="nav-side-menu">
                    <div className="brand">AFC inc.</div>
                    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content" />
                    <div className="menu-list">
                        <ul id="menu-content" className="menu-content collapse out">
                            <li>
                                <NavBarLink name="Accueil" id="Home" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                            </li>
                            <li>
                                <NavBarLink name="Assurances Individuelles" id="indIns" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                            </li>
                            <li>
                                <NavBarLink name="Assurances Collectives" id="collIns" handleClick={this.props.changeViewDashboard} view={this.props.view} resetView={this.props.changeViewCollective} reset=""/>
                            </li>
                            <li>
                                <NavBarLink name="Placements" id="placements" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                            </li>
                            <li>
                                <NavBarLink name="Fournisseurs" id="suppliers" handleClick={this.props.changeViewDashboard} view={this.props.view} />
                            </li>

                            {
    							this.props.crmLogin.isAdmin === true
								&& this.props.crmNavBar.displaySubUser === false
								&& <li ><NavBarLink name="Gestion des utilisateurs" id="usersManagement" handleClick={this.props.changeViewDashboard} view={this.props.view} resetView={this.props.changeViewUserManagement} reset=""/></li>
                            }


								{
									this.props.crmLogin.isAdmin === true
									&& this.props.crmNavBar.displaySubUser === true
									&& <li><NavBarLink name="Gestion des utilisateurs" id="usersManagement" handleClick={this.props.changeViewDashboard} view={this.props.view} resetView={this.props.changeViewUserManagement} reset=""/></li>
								}


								{
									this.props.crmLogin.isAdmin === true
									&& this.props.crmNavBar.displaySubUser === true
									&& this.props.crmNavBar.linksSubUser.map(link => {
										return <ul id="subUser"><li><NavBarLink name={link.name} id="usersManagement" handleClick={this.props.changeViewDashboard}
																				view={this.props.view} resetView={this.props.changeViewUserManagement}
																				reset={link.view} displayUser={this.props.requestUserById}
																				idUser={link.idUser} menu="subMenu" deleteSub={this._deleteSubUser}/></li></ul>
									})
								}

                            <li>
                                <div  id="logout" onClick={this.props.logout} className="link text-center">Déconnexion</div>
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
    		crmLogin: state.crmLogin,
			crmNavBar: state.crmNavBar
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
        },
		requestUserById: (id) => {
			dispatch(requestUserById(id));
		},
		addSubUserNav: (newSubUser) => {
        	dispatch(addSubUserNav(newSubUser));
		}
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);
