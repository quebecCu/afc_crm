import React, { Component } from 'react';
import {connect} from "react-redux";
import AccueilPageContainer from "./AccueilPageContainer";
import NavBar from "./NavBar";
import PageFournisseurs from "./PageFournisseurs";
import ErrorPage from "../components/ErrorPage";
import GestionUser from './GestionUser';
import '../style/Dashboard.css'
import CollectivePageContainer from "./CollectivePageContainer";
import Page1 from './Page';

class DashboardContainer extends Component {

    render() {
        let {view} = this.props.crmDashboard;
        let {isAdmin} = this.props.crmLogin;

        if(this.props.crmDashboard.view === "customer") {
        	console.log("YO MAN");
		}
        return (
            <div id="Dashboard">

                    <NavBar view={view}/>
                    <div className="view container" id="main">
                        {
							this.props.crmDashboard.view === "Home" && <AccueilPageContainer />
                        }
                        {
							this.props.crmDashboard.view === "collIns" && <CollectivePageContainer />
                        }
                        {
							this.props.crmDashboard.view === "suppliers" && <PageFournisseurs />
                        }
                        {
							this.props.crmDashboard.view === "usersManagement" && isAdmin === true && <GestionUser />
                        }
                        {
							this.props.crmDashboard.view === "customer" && <Page1 />
						}
                        {
							this.props.crmDashboard.view === "indIns" && <ErrorPage />
						}
                        {
							this.props.crmDashboard.view === "placements" && <ErrorPage />
						}

                    </div>

            </div>
        );

		/*{
			this.props.crmDashboard.view === "ErrorPage" && <ErrorPage />
		}*/
    }
}






function mapStateToProps (state) {

    return{
        crmDashboard: state.crmDashboard,
        crmLogin: state.crmLogin
    }
}

//fonctions
const  mapDispatchToProps = (dispatch) => {
    return{
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (DashboardContainer)
