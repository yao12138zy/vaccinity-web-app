import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./style.css";
class Schedule extends React.Component{

  render(){
    //Server call to get user type and schedule, hardcoded for now
    const list = [
      {date: Date(2020,8,1,12,10),doctor:"Dr.Zhu",id:1},
      {date: Date(2020,9,1,12,10),doctor:"Dr.Amber",id:2},
      {date: Date(2020,10,1,12,10),doctor:"Dr.Tracy",id:3},
    ]
    const patientList = [
      {date: Date(2020,8,1,12,10),patient:"Frank",id:4},
      {date: Date(2020,9,1,12,10),patient:"Christie",id:5},
      {date: Date(2020,10,1,12,10),patient:"Henry",id:6},
    ]
    const type = this.props.type;
    if (type==="user"){
      return(
        <div>

          <h4> Upcoming Appointment</h4>
          <TableContainer component={Paper} className="ScheduleTable">
            <Table className="Schedule">
              <TableHead>
                <TableRow>
                  <TableCell> Time </TableCell>
                  <TableCell align="right">Doctor's Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">{row.doctor}</TableCell>

                  </TableRow>
                ))}
            </TableBody>


            </Table>
          </TableContainer>


        </div>

      )
    }
    else if (type==="admin"){
      return(
        <div>
          <h4> Upcoming Appointment</h4>
          <TableContainer component={Paper} className="ScheduleTable">
            <Table className="Schedule">
              <TableHead>
                <TableRow>
                  <TableCell> Time </TableCell>
                  <TableCell align="right">Patient's Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">{row.patient}</TableCell>

                  </TableRow>
                ))}
            </TableBody>


            </Table>
          </TableContainer>


        </div>

      )

    }
    else {
      return (
        <div>
          <h4> No Schedule for Unlogin user</h4>
        </div>
      )
    }


    }





}
export default Schedule;
