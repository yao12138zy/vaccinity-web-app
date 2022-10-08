import React from "react";

import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import MenuBar from "../MenuBar";
import {
  updateLoginForm,
  redirectToRegister,
  closeErrorMessage,
  login,
} from "../../actions/login";

import "./style.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/login");
  }

  // login form state
  state = {
    username: "",
    password: "",
    isAdmin: false,
    errorMessage: false,
  };

  render() {
    const { app } = this.props;

    return (
      <div>
        <MenuBar />
        <CardMedia
          className="LoginBackground"
          image="/static/images/LoginBackground.png"
        >
          <form className="LoginForm">
            <h2>Login</h2>

            <TextField
              className="loginInput"
              name="username"
              label="Username"
              onChange={(e) => updateLoginForm(this, e.target)}
              color="secondary"
            />

            <TextField
              className="loginInput"
              name="password"
              label="Password"
              type="password"
              color="secondary"
              onChange={(e) => updateLoginForm(this, e.target)}
            />

            <TextField
              error={!this.state.typeToken}
              select
              className="loginInput"
              name="isAdmin"
              label="Account Type"
              defaultValue={false}
              color="secondary"
              onChange={(e) => updateLoginForm(this, e.target)}
            >
              <MenuItem value={false}>General User</MenuItem>
              <MenuItem value={true}>Health Professional</MenuItem>
            </TextField>

            <Button
              className="login_done_button"
              variant="contained"
              color="primary"
              onClick={() => login(this, app)}
            >
              Log In
            </Button>

            <Button
              variant="contained"
              color="secondary"
              className="go_register_button"
              onClick={() => redirectToRegister(this.props.history)}
            >
              Register
            </Button>
          </form>

          <Snackbar
            open={this.state.errorMessage}
            autoHideDuration={1000}
            onClose={() => closeErrorMessage(this)}
          >
            <Alert onClose={() => closeErrorMessage(this)} severity="error">
              Username or password incorrect
            </Alert>
          </Snackbar>
        </CardMedia>
      </div>
    );
  }
}

export default Login;
