import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  updateForm,
  closeOldErrorMessage,
  closeRetypeErrorMessage,
  updatePassword,
  getUserInfo,
  getAdminInfo,
} from "../../../actions/dashboard";

import "../styles.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/* Component for the update password form in My Profile page */
class PasswordChangeForm extends React.Component {
  // password form state
  state = {
    username: "",
    passwordOld: "",
    passwordNew: "",
    passwordNew2: "",
    oldError: false,
    retypeError: false,
  };

  componentDidMount() {
    const app = this.props.app;
    if (!app.state.isAdmin) {
      getUserInfo(this, app);
    } else {
      getAdminInfo(this, app);
    }
  }

  render() {
    return (
      <div>
        <Grid className="form" container spacing={1}>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="passwordOld"
                label="Old Password"
                type="password"
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="passwordNew"
                label="New Password"
                type="password"
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="passwordNew2"
                label="Retype Password"
                type="password"
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>

          <Grid className="row" container item spacing={3}>
            <Grid item xs={6} justify="center">
              <Button
                id="updateButton"
                className="ProfileButton"
                color="primary"
                variant="contained"
                onClick={() => updatePassword(this, this.props.app)}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          open={this.state.oldError}
          autoHideDuration={1000}
          onClose={() => closeOldErrorMessage(this)}
        >
          <Alert onClose={() => closeOldErrorMessage(this)} severity="error">
            The old password is incorrect
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.retypeError}
          autoHideDuration={1000}
          onClose={() => closeRetypeErrorMessage(this)}
        >
          <Alert onClose={() => closeRetypeErrorMessage(this)} severity="error">
            New passwords do not match
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default PasswordChangeForm;
