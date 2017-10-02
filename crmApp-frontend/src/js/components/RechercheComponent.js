import React, { Component } from 'react';
import '../../style/RechercheComponent.css';

export class RechercheComponent extends Component {
    render() {
        return(
            <form action="" id="recherche" style={{display: 'flex', justifyContent: 'flex-start', textAlign: 'left'}}>
                <input type="text" placeholder="Nom entreprise"/>
                <input type="text" placeholder="Nom employé"/>
                <input type="text" placeholder="N° police"/>
                <input type="text" placeholder="Mois renouvellement"/>
                <input type="text" placeholder="Assureur"/>
                <select>
                    <option value="actif">Actif</option>
                    <option value="annulé">Annulé</option>
                </select>
                <div>
                    <input type="checkbox" id="prospects" name="prospects" value="prospects"/>
                    <label for="prospects">Prospects</label>
                </div>
                <input type="submit" value="Rechercher" />
            </form>
        );
    }
}