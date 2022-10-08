import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import {
  updateForm,
  getUserInfo,
  updateUserInfo,
} from "../../../actions/dashboard";

import "../styles.css";

/* Component for the user information form in My Profile page */
class UserInfoForm extends React.Component {
  // User information form state
  state = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    birthdate: "",
    gender: "",
    phoneNum: "",
    healthCardNum: "",
    passportNum: "",
  };

  componentDidMount() {
    getUserInfo(this, this.props.app);
  }

  render() {
    return (
      <div>
        <Grid className="form" container spacing={1}>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="username"
                label="Username"
                value={this.state.username}
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
                value={this.state.email}
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
                value={this.state.firstName}
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
                value={this.state.lastName}
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="birthYear"
                label="Birth Year"
                value={this.state.birthYear}
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="birthMonth"
                label="Birth Month"
                value={this.state.birthMonth}
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="birthDay"
                label="Birth Day"
                value={this.state.birthDay}
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                name="gender"
                label="Gender"
                value={this.state.gender}
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
                value={this.state.phoneNum}
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
                value={this.state.healthCardNum}
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
                name="passportNumber"
                label="Passport Number"
                value={this.state.passportNum}
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>
          {/* <Grid className="row" container item spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address1"
                label="Address Line 1"
                value={this.state.address1}
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
                name="address2"
                label="Address Line 2"
                value={this.state.address2}
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="city"
                label="City"
                value={this.state.city}
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="state"
                label="Province"
                value={this.state.state}
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                name="country"
                label="Country"
                value={this.state.country}
                margin="dense"
                size="small"
                onChange={(e) => updateForm(this, e.target)}
              >
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                <MenuItem value="United States">United States</MenuItem>
              </TextField>
            </Grid>
          </Grid> */}

          <Grid className="row" container item spacing={3}>
            <Grid item xs={6} justify="center">
              <Button
                id="updateButton"
                className="ProfileButton"
                color="primary"
                variant="contained"
                onClick={() => updateUserInfo(this, this.props.app)}
              >
                Update Information
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default UserInfoForm;
