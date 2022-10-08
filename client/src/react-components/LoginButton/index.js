import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logout } from "../../actions/login";
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class LoginButton extends React.Component {
  constructor(props) {
    super(props);

  };

  render() {
    const app = this.props.app;

    if (!app.state.currentUser) {
      return (
        <div>
          <Link to="/login">
            <Button id='LoginButton'
              startIcon={<AccountCircleIcon />}
            >
              Log in
            </Button>
          </Link>
        </div>
      );
    }
    else {
      return (
        <div>
          <Link to="/">
            <Button
              onClick={() => logout(app)}
              startIcon={<AccountCircleIcon />}
            >
              Log out
          </Button>
          </Link>
        </div>
      );
    }

  }
}
