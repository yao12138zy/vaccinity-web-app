import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from "moment";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';



import "./styles.css";
/// Get timeslot from server, it's hardcoded for now
    // code below requires server call
    //const rows = function getTimeSlot(){}

function createData(time, doctor1, doctor2) {
    return [time, doctor1, doctor2];
  }
  
const rows = [
    createData('10:00 - 11:00', 'A', 'A'),
    createData('11:00 - 12:00', 'A', 'N'),
    createData('14:00 - 15:00', 'N', 'A'),
    createData('15:00 - 16:00', 'N', 'N')
];

const days = [
    moment().add(1,'days').format('MM/DD'),
    moment().add(2,'days').format('MM/DD'),
    moment().add(3,'days').format('MM/DD')
]

class TimeSlot extends React.Component{
    state = {
        cell_needs_update: [0,0],
        isAvailable:false,
        selected_time: '',
        doc_name:'',
        //username: 'xd',
        //phone_number: '123',
        open: false,
        open_available: false,
        open_unavailable: false,
        //phoneNumber input textFieldValue: '' 
        username: this.props.location.username,
        phone_number: this.props.location.phone_number
    }

    handleCellClick(docIndex, index)
    {
    
        if(rows[index][docIndex] === 'A'){
            this.setState({ cell_needs_update: [index, docIndex], 
                            selected_time: rows[index][0], 
                            doc_name: docIndex===1 ? 'A': 'B',
                            open_available:true
                          });

            
        }else{
            this.setState({ isAvailable:false,
                            open_unavailable:true})
        }
    }

    //user wants to change contact phone number
    handleNoClick = () =>{
        //const new_phone_number = prompt('Please enter your phone number you want to use for this appointment.')
        this.setState({ //phone_number : new_phone_number,
                        isAvailable:true,  
                        open: true })
    }

    // below two is for user choose to change phone number
    handleClickOpen = () => {
      this.setState({open:true});
    };
  
    handleClose = () => {
      this.setState({ open:false,
                      isAvailable:true});
    };
    //this one is for cancel button
    handleClose_cancel = () => {
      this.setState({ open:false,
                      isAvailable: false});
    }

    //below is for user select unavailable time
    handleClickOpen_unavailable = () => {
      this.setState({open_unavailable:true});
    };
  
    handleCloseOpen_unavailable = () => {
      this.setState({open_unavailable:false});
    };

    //this is setting new phone number
    handleTextFieldChange = (e) => {
      this.setState({phone_number: e.target.value})
    }

    handleCloseOpen_available_cancel = () => {
      this.setState({ open_available:false,
                      isAvailable: false})
    }

    handleCloseOpen_available_stay = () => {
      this.setState({ open_available:false,
                      isAvailable:true})
    }

    handleCloseOpen_available_diff= () => {
      this.setState({ open_available: false,
                      open:true})
    }
    
    // code below requires server call
    // componentDidMount(){
    //     //if the cell is available, change it to unavailable after a user books it.
    //     if(rows[this.state.cell_needs_update[0]][this.state.cell_needs_update[1]] ==='A'){
    //          //send server a request to change that time slot to unavailable.
    //     }
    // }
    
render(){    
    const selected  = this.props.location.selected;
return (
    <div className='bg center'>
        <h1 className='table_text'>
            Below is the table for available time on {days[selected]}, click the time slot you want to book.
            </h1> 
        <TableContainer className='table_container' component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Available Time</TableCell>
                <TableCell align="right">Doctor A&nbsp;(Male)</TableCell>
                <TableCell align="right">Doctor B&nbsp;(Female)</TableCell>
            </TableRow>
            </TableHead>
            
            <TableBody>
            {rows.map((row,index) => (
                
                <TableRow key={row[0]}> 
                <TableCell component="th" scope="row">
                    {row[0]}, {days[selected]}
                </TableCell>
                {/* 1 means doctor 1 */}
                    <TableCell align="right" onClick={()=> this.handleCellClick(1,index)}>
                        {row[1]==='A' 
                        ? <Button variant="contained"><EventAvailableIcon></EventAvailableIcon></Button> 
                        : <Button variant="contained"><EventBusyIcon></EventBusyIcon></Button>}
                        </TableCell>  

                    <TableCell align="right" onClick={()=> this.handleCellClick(2,index)}>{row[2]==='A' 
                    ? <Button variant="contained"><EventAvailableIcon></EventAvailableIcon> </Button>
                    : <Button variant="contained"><EventBusyIcon></EventBusyIcon></Button>}
                    </TableCell>
                
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        {/* below is the dialog alert pop up for available time selected. */}
        <Dialog
        open={this.state.open_available}
        onClose={this.handleCloseOpen_available_cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Contact infomation confirm required"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Should we use the phone number that stored in your profile for this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseOpen_available_stay} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={this.handleCloseOpen_available_diff} color="primary" autoFocus>
            No, I want to use a different phone number.
          </Button>
        </DialogActions>
      </Dialog>
        {/* end of dialog pop up */}
        
        {/* below is the dialog pop up screen for phone number confirmation after available time selected*/}
        <Dialog open={this.state.open} onClose={this.handleClose_cancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter new phone number.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your phone number you want to use for this appointment.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone Number"
            value = {this.state.textFieldValue}
            onChange={this.handleTextFieldChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ this.handleClose_cancel } color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose}  color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* end of dialog pop up */}

      {/* below is the dialog alert pop up for unavailable time selected. */}
      <Dialog
        open={this.state.open_unavailable}
        onClose={this.handleCloseOpen_unavailable}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Unavailable time selected"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sorry, this time is not available.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseOpen_unavailable} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* end of dialog alert */}


        <div className='table_button'>
          {
            this.state.isAvailable  
            ? <Link className='table_button-link' to={{pathname: "/Result", 
            selected: selected, 
            time: this.state.selected_time, 
            username: this.state.username, 
            phone_number: this.state.phone_number,
            doc_name: this.state.doc_name}}>
            <Button className='valid_button' variant="contained" >Done</Button>
            </Link> 
            :
            <Link className='table_button-link' to='/'  onClick={ (event) => event.preventDefault()}>
            <Button className='invalid_button' variant="contained" disabled>You should choose a valid time.</Button>
            </Link>
          
          }  
        </div>

        {/* back to date */}
        <div className='left_top'>
        <Link className='back_button-link' to='/Date'>
            <Button className='back_button' variant='contained'>Back</Button>
          </Link>
        </div>
        
        </div>
)
}
}

  
export default TimeSlot;