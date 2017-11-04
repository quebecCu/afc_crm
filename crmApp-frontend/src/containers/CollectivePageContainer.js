import React, { Component } from 'react';
import {connect} from 'react-redux'
import PageCollectives from '../components/PageCollectives';
import PageCollectivesClients from '../components/PageCollectivesClients';
import {changeViewCollective} from "../actions/crmCollectiveContainer";


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
		<div>
			{
				view === "" && <button onClick={this.handleClick} className="customers">Clients</button>
			}
			{
				view === "" && <button onClick={this.handleClick} className="suppliers">Fournisseurs</button>
			}
			{
				view === "customers" && <PageCollectivesClients/>
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
