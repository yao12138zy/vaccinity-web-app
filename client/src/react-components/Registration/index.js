import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import UserForm from "./UserForm";
import AdminForm from "./AdminForm";

import "./styles.css";
import MenuBar from "../MenuBar";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/register");
  }

  // Registration form state
  state = {
    adminForm: false,
  };

  setUserForm = () => {
    this.setState({
      adminForm: false,
    });
  };

  setAdminForm = () => {
    this.setState({
      adminForm: true,
    });
  };

  render() {
    const { app } = this.props;

    return (
      <div>
        <MenuBar />

        <div id="headers">
          <h2>Sign up for Vaccinity</h2>
          <h4>Make vaccination an ease</h4>
        </div>
        <div id="buttons">
          <Button onClick={this.setUserForm} variant="outlined">
            General User
          </Button>
          <Button onClick={this.setAdminForm} variant="outlined">
            Health Professional
          </Button>
        </div>
        {!this.state.adminForm ? (
          <UserForm app={app}></UserForm>
        ) : (
          <AdminForm app={app}></AdminForm>
        )}
        <p>
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    );
  }
}

export default Registration;
