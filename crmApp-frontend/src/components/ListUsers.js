import React from 'react';


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

   _handleClick(event){
       event.preventDefault();
       this.props.handleClick("CreateUser");
   }

    render(){
        return <div><table className="user">
			<thead>
			{this.props.formState.users.map(element => {
				return(
					<tr key={element.id} onClick={()=>this.handleClick(element)}>
						<td>{element.login}</td>
						<td>{element.nom} {element.prenom}</td>
						<td>{element.role}</td>
					</tr>
				);
			})}
            </thead>
		</table>
			<button onClick={this._handleClick}>Créer utilisateur</button>
        </div>;
    }
}

export default (ListUsers);
