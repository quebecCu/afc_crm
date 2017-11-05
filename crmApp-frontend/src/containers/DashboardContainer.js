import React, { Component } from 'react';
import {connect} from "react-redux";
import AccueilPageContainer from "./AccueilPageContainer";
import NavBar from "./NavBar";
import PageFournisseurs from "./PageFournisseurs";
import GestionUser from './GestionUser';
import '../style/Dashboard.css'
import CollectivePageContainer from "./CollectivePageContainer";

class DashboardContainer extends Component {

    render() {
        let {view} = this.props.crmDashboard;
        return (
            <div id="Dashboard" className="container-fluid">
                <div className="row">
                    <NavBar view={view} className=" col"/>
                    <div className="view col">
                        {
                            view === "Home" && <AccueilPageContainer />
                        }
                        {
                            view === "collIns" && <CollectivePageContainer />
                        }
                        {
                            view === "suppliers" && <PageFournisseurs />
                        }
                        {
                            view === "usersManagement" && <GestionUser />
                        }
                    </div>
                </div>
            </div>
        );
    }
}






function mapStateToProps (state) {

    return{
        crmDashboard: state.crmDashboard
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

    return{
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (DashboardContainer)