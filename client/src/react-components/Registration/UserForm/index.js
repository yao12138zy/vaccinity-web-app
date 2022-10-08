import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// Importing actions/required methods
import { updateForm, registerUser } from "./../../../actions/register";

import "./../styles.css";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
  }

  // Registration form state
  state = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    gender: "",
    phoneNum: "",
    healthCardNum: "",
  };

  render() {
    const { app } = this.props;

    return (
      <div>
        <Grid className="registrationForm" container spacing={0}>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="username"
                label="Username"
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
                name="password"
                label="Password"
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
                name="email"
                label="Email"
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
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
                name="birthdate"
                label="Birthdate"
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                name="gender"
                label="Gender"
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phoneNum"
                label="Phone Number"
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
                name="healthCardNum"
                label="Health Card Number"
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid item>
              <Button
                id="regButton"
                onClick={() => registerUser(this, app)}
                variant="outlined"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default UserForm;
