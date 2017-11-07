import React from 'react';
import '../style/PageAccueil.css';
import {ListUsers} from '../components/ListUsers.js';
import {store} from '../store';
import {push} from 'react-router-redux';

export class gestionUser extends React.Component{

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


    render(){
        return <div><table className="user">
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

        </div>;

    }
}
