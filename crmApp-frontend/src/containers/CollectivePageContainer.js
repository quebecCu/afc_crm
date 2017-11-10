import React, { Component } from 'react';
import {connect} from 'react-redux'
import PageCollectivesClients from '../components/PageCollectivesClients';
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import {CreationClient} from "./CreationClient";

class CollectivePageContainer extends Component   {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}



	handleClick(event) {
		event.preventDefault();
		this.props.changeViewCollective(event.target.className);
	}

	render() {
        let {view} = this.props.crmCollectiveContainer;
		return(
		<div className="text-center">
			{
				view === "" && <h1>Assurances collectives</h1>
			}
			{
				view === "" && <button onClick={this.handleClick} className="customers">Clients</button>
			}
			{
				view === "" && <button onClick={this.handleClick} className="suppliers">Fournisseurs</button>
			}
			{
				view === "customers" && <PageCollectivesClients handleClick={this.handleClick}/>
			}
			{
				view === "newCustomer" && <CreationClient/>
			}
		</div>

		);
	}
}

function mapStateToProps (state) {

    return{
        crmCollectiveContainer: state.crmCollectiveContainer
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {
    return{
        changeViewCollective : (newView) => {
            dispatch(changeViewCollective(newView))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (CollectivePageContainer)
