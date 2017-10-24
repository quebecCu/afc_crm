import React, { Component } from 'react';
import HistoriqueContainer from "../containers/HistoriqueContainer";
import RechercheComponent from "./RechercheComponent";
import {ButtonsComponent} from "./ButtonsComponent";

class PageCollectivesClients extends Component {
	constructor(props) {
		super(props);
	}
    render() {
        return(
                <div>
                    <h1>Assurances collectives</h1>
                    <h2>Clients</h2>
                    <HistoriqueContainer page="PageCollectivesClients" history={this.props.history}/>
                    <RechercheComponent/>
                    <ButtonsComponent page="PageCollectivesClients" />
                </div>
        );
    }
}
export default (PageCollectivesClients);