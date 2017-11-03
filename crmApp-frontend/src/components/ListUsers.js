import React from 'react';
import {store} from '../store';
import {push} from 'react-router-redux';


export class ListUsers extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(element){
        //Ducoup quand on clique ça affiche la page de l'utilisateur, changer le path? Faire un linkto ?
        store.dispatch(push('/PageAccueil/admin/'+element.id));
        console.log(element.id);


    }

    componentWillMount(){
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

    }

    render(){
        return this.rows;
    }
}