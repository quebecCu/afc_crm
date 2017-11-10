import React from 'react';

export class DisplayOnePermission extends React.Component{

    constructor(props){
        super(props);
        this._handleClick=this._handleClick.bind(this);
    }


    componentDidMount(){
        //on cherche quel role on veut, ici Utilisateur_All codé en dur, voir avec Vincent après
        this.props.changeForm({...this.props.formState , userPerms : this.props.formState.defaultPerms[0].droits});
        this.props.formState.operations.map(element =>{
            if(this.props.level === element.value){
                document.getElementById(element.label + this.props.id).checked = true;
            }
        })
    }

    _handleClick(event){
        let position;
        for(let i = 0; i < this.props.formState.userPerms.length; i++){
            if(this.props.formState.userPerms[i].entite === this.props.entite) {
                position = i;
            }
        }
        this.props.updateUserPerms(position,  parseInt(event.target.value));
    }


    render(){
        return (
            <div>Droit de
                <form>
                {this.props.formState.operations.map(element => {
                    return (<div key={element.label + element.id}><input type="radio" name="droit" value={element.value} id={element.label + this.props.id} onClick={this._handleClick}/> {element.label}<br /></div>);
                })
                }
                </form>
                sur la table {this.props.entite}</div>
        )
    }
}