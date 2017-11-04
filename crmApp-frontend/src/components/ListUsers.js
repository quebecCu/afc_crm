import React from 'react';
import {store} from '../store';
import {push} from 'react-router-redux';


class ListUsers extends React.Component{
    constructor(props){
        super(props);
        this._handleClick = this._handleClick.bind(this);

    }

   /* handleClick(element){
        //Ducoup quand on clique ça affiche la page de l'utilisateur, changer le path? Faire un linkto ?
        store.dispatch(push('/PageAccueil/admin/'+element.id));
        console.log(element.id);


    }*/
//DOIT avoir lesinfos du backend pour l'affichage
   /* componentWillMount(){
        this.rows = (
          <tbody>
          {this.props.users.map(element => {
              return(
                  <tr key={element.id} onClick={()=>this.handleClick(element)}>
                      <td>{element.login}</td>
                      <td>{element.nom} {element.prenom}</td>
                      <td>{element.role}</td>
                  </tr>
              );
          })}
          </tbody>

        );

    }*/

   _handleClick(event){
       event.preventDefault();
       this.props.handleClick("CreateUser");
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

        </table>



            <button onClick={this._handleClick}>Créer utilisateur</button>

        </div>;
    }
}

export default (ListUsers);