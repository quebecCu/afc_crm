import React from 'react';
import '../style/FicheClient.css';

export class TitreValeur extends React.Component{
    constructor(props){
        super(props);
        this.isGonnaRender = this.isGonnaRender.bind(this);
    }



    isGonnaRender(){
        //let nomClasse
        if(this.props.titre == null && this.props.valeur !== null){
            //nomClasse = "titre";
            return <div className="titre">{this.props.valeur}</div>;
        }
        else if (this.props.valeur !== "" && this.props.valeur !== null){//A voir s'il faut que ce soit une chaîne ville ou null
           // nomClasse = "titreValeur";
            return  <div className="titreValeur"><p className="titre">{this.props.titre}: </p> <p className="valeur">{this.props.valeur}</p></div>;
        }
        else{
            return ;
        }
    }

    render(){
        return <div>{this.isGonnaRender()}</div>;
    }
}
