import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

// Importing the icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ReceiptIcon from "@material-ui/icons/Receipt";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EventIcon from "@material-ui/icons/Event";

import "./styles.css";

/* Component for the side navigation bar in the dashboard */
class SideNavBar extends React.Component {
  render() {
    const isAdmin = this.props.app.state.isAdmin;

    const userNavBar = [
      { name: "Dashboard", link: "/dashboard/home", icon: <DashboardIcon /> },
      {
        name: "My Profile",
        link: "/dashboard/myprofile",
        icon: <PersonIcon />,
      },
      {
        name: "Immunization Record",
        link: "/dashboard/eir",
        icon: <ReceiptIcon />,
      },
   
      {
        name: "Appointments",
        link: "/dashboard/bookingHistory",
        icon: <EventIcon />,
      },
    ];
    const adminNavBar = [
      { name: "Dashboard", link: "/dashboard/home", icon: <DashboardIcon /> },
      {
        name: "My Profile",
        link: "/dashboard/myprofile",
        icon: <PersonIcon />,
      },
      {
        name: "Immunization Record",
        link: "/dashboard/eir",
        icon: <ReceiptIcon />,
      },
    
      {
        name: "My Appointments",
        link: "/dashboard/bookingHistory",
        icon: <EventIcon />,
      },
    ];

    return (
      <div className="sideNavBar">
        <List component="nav" aria-label="">
          {(!isAdmin ? userNavBar : adminNavBar).map((tab) => (
            <ListItem button component={Link} to={tab.link}>
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default SideNavBar;
