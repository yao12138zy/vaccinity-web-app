import React from "react";
import { uid } from "react-uid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DoneIcon from '@material-ui/icons/Done';

import { withStyles } from "@material-ui/core/styles";

import {getVaccines} from "../../../actions/vaccine";
import "./styles.css";

const columns = [
  "Vaccine's Name", 
  "Description",
  "Complete Vaccination or Not",
  "Date of Vaccination Taken",
  "Vaccines Validity Year (if needs specification)",
];
const styles = theme => ({
  
    headerCell: {
      backgroundColor: "#cabf9b",
      color: "rgb(11 7 23 / 87%)",
      fontWeight: "bold",
      textAlign: "center",
      minWidth: "100px",
    },
    table: {
      border: "solid 2px #6a2ebb",
      maxWidth: "950px",
      position: "absolute",
      left: "22%",
      float: "right"
    },
    bodyCell:{
      height:"50px",
      borderBottom: "1px solid rgb(162 18 18)",
      backgroundColor: "beige"

    }
  
})


function parseDate(date) {
  if( date === null ){
    return "Unknown";
  }
  else{
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }
}

function checkComplete(vaccine,userInfo) {
  if (!userInfo){
    return;
  }
  const result = userInfo.vaccinationHistory.filter((each) => each.name === vaccine.name )
  if (result.length !==0 ){
    return (<div><DoneIcon /></div>)

  }
  
}

function getDate(vaccine,userInfo) {
  if (!userInfo){
    return;
  }
  const result = userInfo.vaccinationHistory.filter((each) => each.name === vaccine.name )
  if (result.length !==0 ){
    return parseDate(new Date(result[0].dateofVaccination))

  }
}


class EIRTable extends React.Component {
  constructor(props) {
    super(props);
   
  }
  
  render() {
    const vaccineList = this.props.vaccineList;
    const userInfo = this.props.userInfo;
    const {classes} = this.props;

    return (
      <div>
        <TableContainer className={classes.table}  component={Paper}>
          <Table stickyHeader aria-label="Vaccination Recommandation" size="small">
            <TableHead >
              <TableRow >
                {columns.map((column) => (
                  <TableCell className={classes.headerCell}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="Body">
              {vaccineList.map((entry) => (
                <TableRow className = "BodyRow">
                  <TableCell align='center' className={classes.bodyCell}> {entry.name} </TableCell>
                  <TableCell align='center' className={classes.bodyCell}> {entry.info} </TableCell> 
                  <TableCell align='center'className={classes.bodyCell}> {checkComplete(entry,userInfo)} </TableCell> 
                  <TableCell align='center'className={classes.bodyCell}> {getDate(entry,userInfo)} </TableCell> 
                  <TableCell align='center'className={classes.bodyCell}> {entry.effectiveTime} </TableCell>

                  
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
        
      </div>
    );
  

  }
}

export default withStyles(styles)(EIRTable);
