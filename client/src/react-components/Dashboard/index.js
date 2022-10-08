import React from "react";

// import "./styles.css";
import SideNavBar from "../SideNavBar";
import DashboardHeader from "../DashboardHeader";
import DashboardContent from "../DashboardContent";
import MenuBar from "../MenuBar";

/* Component for the dashboard home page */
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/dashboard/home");
  }

  render() {
    const { app } = this.props;
    return (
      <div>
        <MenuBar />
        <SideNavBar app={app} />
        <DashboardHeader title="Dashboard Home" />
        <DashboardContent app={app} />
      </div>
    );
  }
}

export default Dashboard;
