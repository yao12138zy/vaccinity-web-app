import React from "react";

// import "./styles.css";

import SideNavBar from "../SideNavBar";
import DashboardHeader from "../DashboardHeader";
import UserEIRTable from "./UserEIRTable";
import MenuBar from "../MenuBar";
import SearchUser from "./SearchUser";
import { getVaccines,getUserInfo, getUsers} from "../../actions/vaccine";

/* Component for the eIR page */
class EIR extends React.Component {
  
  constructor(props) {
    super(props);
    this.props.history.push("/dashboard/eir");
    this.state = {
      vaccineList: [],
      userInfo: null,
      users: []
    };
    
  }
  
  componentWillMount() {
    getVaccines(this);
    getUserInfo(this);
    getUsers(this);
    
 }

  render() {
    const app = this.props.app;
    //console.log(this.state.vaccineList);
    // for users
    if (app.state.isAdmin === false ){
      return (
        <div>
          <MenuBar />
          <SideNavBar app={app}/>
          <DashboardHeader title="Electionic Immunization Record (EIR)" />
          <UserEIRTable  vaccineList = {this.state.vaccineList} userInfo = {this.state.userInfo} />
        </div>
      );
    }
  
  // for admins
    else {
      return(
        <div>
          <MenuBar />
          <SideNavBar app={app}/>
          <DashboardHeader title="Search/Add User's Vaccination Record" />
          <SearchUser vaccineList = {this.state.vaccineList} users = {this.state.users} app={app.state}/> 
        </div>
      );
    }


  }
}

export default EIR;
