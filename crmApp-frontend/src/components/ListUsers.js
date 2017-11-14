import React from 'react';


class ListUsers extends React.Component{
    constructor(props){
        super(props);
        this._handleClick = this._handleClick.bind(this);
		this._handleClickOnUser = this._handleClickOnUser.bind(this);


	}


   _handleClick(event){
       event.preventDefault();
       this.props.handleClick("CreateUser");
   }

   _handleClickOnUser(id){
		this.props.displayUser(id);
		this.props.handleClick("DisplayUser");
   }

    render(){
        return <div><table className="user">
			<thead>
			{this.props.formState.users.map(element => {
				return(
					<tr key={element.iduser} onClick={()=>this._handleClickOnUser(element.iduser)}>
						<td>{element.login}</td>
						<td>{element.name} {element.prenom}</td>
						<td>{element.description}</td>
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
