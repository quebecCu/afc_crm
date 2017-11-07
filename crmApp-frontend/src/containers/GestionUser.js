import React from 'react';
import '../style/PageAccueil.css';
import {connect} from "react-redux";
import ListUsers from '../components/ListUsers.js';
import CreateUser from './CreateUser';
import {changeViewUserManagement} from "../actions/crmUserManagement";
import {store} from '../store';
import {push} from 'react-router-redux';

class GestionUser extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            users:[
                {
                    id: 0,
                    login: "AProulx",
                    nom:"Proulx",
                    prenom:"Alain",
                    role:"admin",
                    droits:["lecture","ecriture"]
                },
                {
                    id: 1,
                    login: "MChantal",
                    nom:"Mercier",
                    prenom:"Chantal",
                    role:"stagiaire",
                    droits:["lecture"]
                },
                {
                    id: 2,
                    login: "PVlad",
                    nom:"Poutine",
                    prenom:"Vladimir",
                    role:"admin",
                    droits:["lecture","ecriture"]
                }

            ]
        }

    }


    render() {
        let {view} = this.props.crmUserManagement;
        return <div id="UserManagement">
            <div className="view text-center">
                {
                    view === "" && <ListUsers handleClick={this.props.changeViewUserManagement}/>
                }
                {
                    view === "CreateUser" && <CreateUser />
                }
            </div>
        </div>

    }
    /*(<div><table className="user">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Nom prénom</th>
                    <th>Rôle</th>
                </tr>
            </thead>
            <ListUsers users={this.state.users}/>

        </table>



        <button onClick={(e) => store.dispatch(push("/PageAccueil/admin/createUser"))}>Créer utilisateur</button>

        </div>);

    }*/
}

function mapStateToProps (state) {

    return{
        crmUserManagement: state.crmUserManagement
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

    return{
        changeViewUserManagement: (newView) => {
            dispatch(changeViewUserManagement(newView));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (GestionUser);
