import React, { Component } from 'react';
import {connect} from "react-redux";
import AccueilPageContainer from "./AccueilPageContainer";
import NavBar from "./NavBar";
import PageCollectives from "../components/PageCollectives";
import PageFournisseurs from "../components/PageFournisseurs";
import '../style/Dashboard.css'

class DashboardContainer extends Component {

    render() {
        let {view} = this.props.crmDashboard;
        return (
            <div id="Dashboard">
                <NavBar view={view}/>
                <div className="view">
                    {
                        view === "Home" && <AccueilPageContainer />
                    }
                    {
                        view === "collIns" && <PageCollectives />
                    }
                    {
                        view === "suppliers" && <PageFournisseurs />
                    }
                    {
                        view === "usersManagement" && <gestionUser />
                    }
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