import React from "react";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuBar from "../../MenuBar";
import SideNavBar from "../../SideNavBar";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";
import UserInfo from "./UsersTable";
import {updateLoginForm,searchUser,reset} from "../../../actions/vaccine";

import "./style.css"

const styles = theme => ({
  root: {
    width: "800px",
    position: "absolute",
    left: "25%"
  },
  button:{
    margin:"10px",
    fontWeight: "bold",
    left: "50px",
    top: "10px"
  },
  inputField:{
    
    width: "350px",
    border: "solid 2px blue"
    
  },

  resultTable:{
    marginTop: "20px"
  }
  

})


class SearchUser extends React.Component{
  state = {
    selectedUser: "",
    select: false,
    input: "",

  }
  
  render(){
    const {vaccineList,users,app} = this.props;
    const options = []; 
    const {classes} = this.props;
    users.map((option) => {
      options.push(option.firstName);
      options.push(option.lastName);
      
    })
    users.map((option) => {
      options.push(option.phoneNum);
    })
    
    return(
     <div className={classes.root}>
      
     
          <TextField 
            label="Search by Phone Number or Name"
            margin="normal"
            variant="outlined"
            name = "input"
            value ={this.state.input}
            className= {classes.inputField}
            onChange = {(e) => updateLoginForm(this, e.target)}
            
          />
        
      
      <Button 
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => searchUser(this)}
      >
        Search 
      </Button>
      <Button 
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => reset(this,vaccineList,users)}
      >
        Reset 
      </Button>
        
      <div className = {classes.resultTable}>
        <UserInfo input={this.state.searchUser}  />
      </div>
      
      
           


     </div>
    )

  }
}


export default withStyles(styles)(SearchUser);

