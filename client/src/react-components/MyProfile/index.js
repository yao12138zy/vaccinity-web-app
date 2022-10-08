import React from "react";

import MenuBar from "../MenuBar";
import SideNavBar from "./../SideNavBar";
import DashboardHeader from "./../DashboardHeader";
import UserInfoForm from "./UserInfoForm";
import AdminInfoForm from "./AdminInfoForm";
import PasswordChangeForm from "./PasswordChangeForm";

import "./styles.css";

/* Component for the My Profile page */
class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/dashboard/myprofile");
  }

  render() {
    const { app } = this.props;
    const isAdmin = app.state.isAdmin;

    return (
      <div>
        <MenuBar />
        <SideNavBar app={app} />
        <div>
          <DashboardHeader title="My Profile" />
          {!isAdmin ? <UserInfoForm app={app} /> : <AdminInfoForm app={app} />}
          <DashboardHeader title="Change Password" />
          <PasswordChangeForm app={app} />
        </div>
      </div>
    );
  }
}
export default MyProfile;
