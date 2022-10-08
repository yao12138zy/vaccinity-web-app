import React, { useImperativeHandle } from "react";
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import {getUsers,deleteHistroy,updateLoginForm,addHistory,UpdateHistory,changeChange,changeAdd} from "../../../../actions/vaccine";

import "./style.css";


const styles = theme => ({
  typo:{
    margin:"10px",
  },
  card:{
    border: "solid 2px #032c69",
    margin: "20px",
    minHeight: "80px",
    backgroundColor: "#dbe1ff",
    width: "920px",
  },
  cardTitle:{
    fontWeight: "bold",
    paddingRight:"40px",
    
  },
  cardDetail: {
    padding:"10px"
  },
  historyTable:{
    color: "black",
    backgroundColor: "#dbe1ff",
    width: "140px",
    borderBottom: "1px solid rgb(60 75 130)",
  },
  button:{
    marginLeft: "20px",
    marginTop: "20px",
    marginBottom: "10px",
    position: "relative",
    
  },
  table:{
    marginLeft: "20px",
    backgroundColor: "#dbe1ff",
    border: "solid #583e3e 1px",
  },
  edit_delete_button: {
    marginTop: "10px",
    marginLeft: "10px"
  },
  inputField:{
    marginLeft: "20px",
    marginTop: "20px",
  },
  update:{

  }
})

function parseDate(date) {
  if( date === null ){
    return "Unknown";
  }
  else{
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate()+1);
  }
}
function checkState(token){
  if (token === false){
    return "hidden";
  } 
  else{
    return "visible";
  }
}

class UserTable extends React.Component{
  
  constructor(props) {
    super(props);
    //this.props.history.push("/dashboard/eir");
    this.state = {
      users: [],
      addName: "",
      addDateofVaccination: "",
      updateName:"",
      updateDateofVaccination: "",
      change:false, 
      add: false
    };
    
  }
  
  componentWillMount() {
    getUsers(this);
    
 }
  render(){
      const {input} = this.props;
      const {classes} = this.props;
      //console.log(this.state.users)
      //console.log(currentUser);
    if (!input){
      return (
        <div>
        <Typography className={classes.typo}> Search Result </Typography>
        {this.state.users.map((user) =>(
          <Accordion className={classes.card}>
            <AccordionSummary
              expandIcon= {<ExpandMoreIcon />}
            >
              <Typography className={classes.cardTitle}>Name: {user.firstName + " " + user.lastName}</Typography>
              <Typography className={classes.cardTitle}>Phone Number: {user.phoneNum}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <ul className={classes.cardTable}>
                
                <li className={classes.cardDetail}>username: {user.username}</li>
                <li className={classes.cardDetail}>email: {user.email}</li>
                <li className={classes.cardDetail}>birthdate: {parseDate(new Date(user.birthdate))}</li>
                <li className={classes.cardDetail}>health Card Number: {user.healthCardNum}</li>
                <li className={classes.cardDetail}>Passport Number: {user.passportNum} </li>
              </ul>
              <TableContainer className={classes.table} component={Paper}>
                <Typography className={classes.typo}>Vaccination History</Typography>
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className={classes.historyTable}>Vaccine Name</TableCell>
                      <TableCell className={classes.historyTable} align="center">Date of Taken</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.vaccinationHistory.map((row) => (
                      <TableRow>
                        <TableCell className={classes.historyTable}  align="center">{row.name}</TableCell>
                        <TableCell className={classes.historyTable} align="center">{parseDate(new Date(row.dateofVaccination))}</TableCell>
                  
                       <Box visibility={checkState(this.state.change)}> 
                          <Button 
                            className={classes.edit_delete_button} 
                            variant="contained" 
                            color="primary" 
                            onClick={(e) => UpdateHistory(this,user._id,row._id)}
                          > 
                            Save in this Row
                          </Button>  
                        </Box>

                        <Button 
                          className={classes.edit_delete_button} 
                          variant="contained" 
                          color="primary" 
                          onClick={(e) => deleteHistroy(this,user._id,row._id)}
                        >
                          Delete 
                        </Button>

                      </TableRow>
                    ))}

                     {!this.state.add ? (
                            <Button 
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={(e) => changeAdd(this)}
                          >
                           Add History
                          </Button>
                        ) : (<div className={classes.button}>
                          <TextField 
                          label="Add Vaccine Name"
                          margin="normal"
                          variant="outlined"
                          name = "addName"
                          className= {classes.inputField}
                          onChange = {(e) => updateLoginForm(this, e.target)}
                          
                      />
                        <TextField 
                          label="Add Vaccination Date"
                          margin="normal"
                          variant="outlined"
                          name = "addDateofVaccination"
                          className= {classes.inputField}
                          onChange = {(e) => updateLoginForm(this, e.target)}
                          
                      />
                          <Button 
                            className={classes.button} 
                            variant="contained" 
                            color="primary" 
                            onClick={(e) => addHistory(this,user._id)}
                          > 
                            Add to Table
                        </Button>

                        </div>)}
                              
                       {!this.state.change ? (
                          <Button 
                          className={classes.update} 
                          variant="contained" 
                          color="primary" 
                          onClick={(e) => changeChange(this)}
                        > 
                          Update Info
                        </Button>
                        ) : (<div>
                          <TextField 
                          label="Update Vaccine Name"
                          margin="normal"
                          variant="outlined"
                          name = "updateName"
                          className= {classes.update}
                          onChange = {(e) => updateLoginForm(this, e.target)}
                          
                      />
                        <TextField 
                          label="Update Vaccination Date"
                          margin="normal"
                          variant="outlined"
                          name = "updateDateofVaccination"
                          className= {classes.update}
                          onChange = {(e) => updateLoginForm(this, e.target)}   
                      />
                      </div>)}
                 
                
                  </TableBody>

                </Table>
              </TableContainer>
             
            </AccordionDetails>
          </Accordion>
      ))}
      </div>
      )
    }
    else {
      const filteredUser = this.state.users.filter((user) => {
        if (user.phoneNum.includes(input)){
          return true
        }
        else if ((user.firstName + " " + user.lastName).includes(input)){
          return true
        }
        else{
          return false;
        }
      });
        
      return (
        <div>
        <Typography className={classes.typo}> Search Result </Typography>
        {filteredUser.map((user) =>(
          <Accordion className={classes.card}>
            <AccordionSummary
              expandIcon= {<ExpandMoreIcon />}
            >
              <Typography className={classes.cardTitle}>Name: {user.firstName + " " + user.lastName}</Typography>
              <Typography className={classes.cardTitle}>Phone Number: {user.phoneNum}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <ul className={classes.cardTable}>
                
                <li className={classes.cardDetail}>username: {user.username}</li>
                <li className={classes.cardDetail}>email: {user.email}</li>
                <li className={classes.cardDetail}>birthdate: {parseDate(new Date(user.birthdate))}</li>
                <li className={classes.cardDetail}>health Card Number: {user.healthCardNum}</li>
                <li className={classes.cardDetail}>Passport Number: {user.passportNum} </li>
              </ul>
              <TableContainer className={classes.table} component={Paper}>
                <Typography className={classes.typo}>Vaccination History</Typography>
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className={classes.historyTable}>Vaccine Name</TableCell>
                      <TableCell className={classes.historyTable} align="center">Date of Taken</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.vaccinationHistory.map((row) => (
                      <TableRow>
                        <TableCell className={classes.historyTable}  align="center">{row.name}</TableCell>
                        <TableCell className={classes.historyTable} align="center">{parseDate(new Date(row.dateofVaccination))}</TableCell>
                        <Button className={classes.edit_delete_button} variant="contained" color="primary" onClick={(e) => UpdateHistory(this,user._id,row._id)}> Update </Button>
                        <Button className={classes.edit_delete_button} variant="contained" color="primary" onClick={(e) => deleteHistroy(this,user._id,row._id)}> Delete </Button>
                      </TableRow>
                    ))}
                    
                    <TextField 
                      label="Add/Update Vaccine Name"
                      margin="normal"
                      variant="outlined"
                      name = "name"
                      className= {classes.inputField}
                      onChange = {(e) => updateLoginForm(this, e.target)}
                      
                   />
                    <TextField 
                      label="Add/Update Vaccination Date"
                      margin="normal"
                      variant="outlined"
                      name = "dateofVaccination"
                      className= {classes.inputField}
                      onChange = {(e) => updateLoginForm(this, e.target)}
                      
                   />
                    <Button 
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={(e) => addHistory(this,user._id)}
                  >
                   Add History
                  </Button>
                  <Typography className={classes.typo}>Note: To Update, use the input fields to type in, and press the corresponding Update button! </Typography>
                  </TableBody>

                </Table>
              </TableContainer>
             
            </AccordionDetails>
          </Accordion>
      ))}
      </div>
      )
    }
    

  }
}


export default withStyles(styles)(UserTable);

