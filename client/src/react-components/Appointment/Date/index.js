import React from 'react';
import { Link } from "react-router-dom";
import moment from "moment";
import MomentUtils from '@date-io/moment';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CancelIcon from '@material-ui/icons/Cancel';

import {
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import LoginButton from "../../LoginButton";
import Logo from "../../Logo";
import Notification from "../../Notification";
import MenuBar from "../../MenuBar";

import Collapse from '@material-ui/core/Collapse';

import {
  getBookings,
  postBookings,
  getNameAndPhoneNum
} from "../../../actions/booking";
import "./styles.css";

//min date is tmr
const min_day = moment().add(1, 'days')
//max date for datepicker (next 3 days)
const max_day = moment().add(3,'days')

//position for snackbar
const vertical = 'top'
const horizontal = 'center'


class Date extends React.Component {
    constructor(props) {
        super(props);
        //this.props.history.push("/Date");

        this.state = {
          selected_date: null,
          selected_date_string: '',
          selected_time: '',
          valid_date: false,
          available_time: true,
          isAvailable:false,
          open: false,
          open_available: false,
          open_selected:false,
          checked: false,
          disable_datepicker:false,
          //stupidest way to track buttons click
          selected_button: [false,false,false,false,false,false],
          //data from server
          data: [],
          disable_button: [false,false,false,false,false,false],
          //below is for getNameAndPhoneNum
          lastName: '',
          firstName: '',
          phoneNum: '',
          temp_phoneNum: 'New Phone Number' //default not changed. Stupid mongoose won't allow empty string
        };
      }
    
    handleDateChange = (date) => {
      this.setState( { selected_date: date,
                       selected_date_string: date.format("MM/DD/YYYY")  });
      //make sure the selected date is valid for next step
      if(!date){
        this.setState( {valid_date: false})
      }
      else if(date.isBetween(moment(),max_day)){
        this.setState( {valid_date: true})
      }else{
        this.setState( {valid_date: false})
      }
    };


    handleClick = (e) => {
      this.setState({ selected_time: e.target.name, 
                      open_available:true});

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


    //this is setting new phone number
    handleTextFieldChange = (e) => {
      this.setState({ temp_phoneNum: e.target.value})

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
                      open:true,})
    }

    //below is for user select a selected time
    handleClickOpen_selected = () => {
      this.setState({open_selected:true});
    };
  
    // handleCloseOpen_selected = () => {
    //   this.setState({open_selected:false});
    // };
    handleCloseOpen_selected = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({open_selected: false});
    };


    //for Collapse
    handleChange = () => {
      this.setState({checked: !this.state.checked});

      var new_disable_button = new Array(6).fill(false);
      for(var i = 0; i < this.state.data.length; i++){

        if(this.state.selected_date.format("MM/DD/YYYY").includes(this.state.data[i].date)){
        
        switch (this.state.data[i].time) {
          case "9-10":
            new_disable_button[0] = true
            break;
          case "10-11":
            new_disable_button[1] = true
            break;
          case "11-12":
            new_disable_button[2] = true
            break;
          case "2-3":
            new_disable_button[3] = true
            break;
          case "3-4":
            new_disable_button[4] = true
            break;
          case "4-5":
            new_disable_button[5] = true
        }
      this.setState({ disable_button:new_disable_button})}}

      if(!this.state.checked){
        this.setState({disable_datepicker:true})
      }else{
        const default_selected_button = new Array(6).fill(false)
        this.setState({ disable_datepicker:false,
                        selected_button: default_selected_button,
                        selected_time:''})
      }
    }

    //for select button, the most stupid way ever
    //using a toggle button might be better, but the color and other options are not available
    handleButtonClick = (e, buttonID) => {
      //get a copy
      let new_selected_button = this.state.selected_button.slice()
      
      if(new_selected_button.indexOf(true) === buttonID){ //the button is selected
        this.setState({ selected_button: new_selected_button,
          selected_time: e.currentTarget.value, 
          open_available: false,
          open_selected: true
          })
        return
      }

      if(new_selected_button.includes(true)){ //if any button is selected already, rmove the state and assign this button to be selected
        new_selected_button = new Array(6).fill(false);
        new_selected_button[buttonID]= true;
      }
      else{
        new_selected_button[buttonID]= true
      }
      
      this.setState({ selected_button: new_selected_button,
                      selected_time: e.currentTarget.value, 
                      open_available: true
                      })
    }


    //post request
    handlePost = () => {
      postBookings(this,this.props.app)
    }

    componentWillMount(){
      getBookings(this,this.props.app)
      getNameAndPhoneNum(this, this.props.app)

  }

    render(){

      //console.log("history", this.props.history)
      console.log(this.state)

    return (
      <Paper className='result_bg-image center'>
            <span className="LogoContainer">
                    <Logo />
                </span>
                <span className="LoginButtonContainer">
                    <LoginButton  app={this.props.app}/>
                </span>
                <span className="NotificationContainer">
                    <Notification number={0} />
                </span>
                <MenuBar />

          <div className="articleSection_grid" >      
          <Typography
            variant={'contained'}
            className='Date_text'
            style={{marginTop:'50px'}}
                >
            <h3> Select the date you want to book an appointment below.</h3> 
            <h4 style={{color: 'lightcoral'}}> Note: We only accpet appointments in the next three days. </h4>
          </Typography>
          </div>
            
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container justify="space-around" className='datePicker'>
            <KeyboardDatePicker
              disableToolbar
              disabled={this.state.disable_datepicker}
              variant="inline"
              format="MM/DD/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Select your desired date"
              value={this.state.selected_date}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              minDate={min_day}
              maxDate={max_day}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <div className='date_confirm date_button-link'>
          <Button 
            variant="contained"  
            size='large'
            color='secondary'
            onClick={this.handleChange}
            disabled={!this.state.valid_date}
            style={{display: this.state.checked ? "None" : "Block"}}>
              Get Available Time Now!
          </Button>

          <Button 
            variant="contained"  
            size='large'
            color='secondary'
            onClick={this.handleChange}
            disabled={!this.state.valid_date}
            style={{display: this.state.checked ? "Block" : "None"}}>
              Hide time slots and pick another date.
          </Button>
        
          </div>


        <div className='time_slot'>
        <Collapse in={this.state.checked} >
          <Grid container justify="center" alignItems="center" spacing={10} >
            <Grid item xs style={{marginTop:'3px'}}>
              <Button 
              variant="contained"  
              size='large' 
              endIcon={this.state.disable_button[0] ? <CancelIcon /> : <AccessTimeIcon />} 
              disabled={this.state.disable_button[0]}
              className='time_slot_button' 
              style={this.state.selected_button[0] ? {backgroundColor: '#FFB6C1'} :{backgroundColor: "#87cefa"}}
              onClick={e => this.handleButtonClick(e, 0)}
              value='9-10'
              >
                9-10 
              </Button>
            </Grid>
            <Grid item xs style={{marginTop:'3px'}}>
              <Button 
              variant="contained"  
              size='large' 
              endIcon={this.state.disable_button[1] ? <CancelIcon /> : <AccessTimeIcon />} 
              disabled={this.state.disable_button[1]}
              className='time_slot_button' 
              style={this.state.selected_button[1] ? {backgroundColor: '#FFB6C1'} :{backgroundColor: "#87cefa"}}
              onClick={e => this.handleButtonClick(e, 1)}
              value='10-11'
              >
                10-11
              </Button>
            </Grid>
            <Grid item xs style={{marginTop:'3px'}}>
              <Button
              variant="contained" 
              size='large' 
              endIcon={this.state.disable_button[2] ? <CancelIcon /> : <AccessTimeIcon />} 
              disabled={this.state.disable_button[2]}
              className='time_slot_button' 
              style={this.state.selected_button[2] ? {backgroundColor: '#FFB6C1'} :{backgroundColor: "#87cefa"}}
              onClick={e => this.handleButtonClick(e, 2)}
              value='11-12'>
                11-12
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="center" alignItems="center" spacing={10}>
            <Grid item xs style={{marginBottom:'3px'}}>
              <Button 
              variant="contained" 
              size='large' endIcon={<CancelIcon />} 
              endIcon={this.state.disable_button[3] ? <CancelIcon /> : <AccessTimeIcon />} 
              disabled={this.state.disable_button[3]}
              className='time_slot_button' 
              style={this.state.selected_button[3] ? {backgroundColor: '#FFB6C1'} :{backgroundColor: "#87cefa"}}
              onClick={e => this.handleButtonClick(e, 3)}
              value='2-3'>
                2-3
              </Button>
            </Grid>
            <Grid item xs style={{marginBottom:'3px'}}>
              <Button 
              variant="contained" 
              size='large' 
              endIcon={this.state.disable_button[4] ? <CancelIcon /> : <AccessTimeIcon />} 
              disabled={this.state.disable_button[4]}
              className='time_slot_button' 
              style={this.state.selected_button[4] ? {backgroundColor: '#FFB6C1'} :{backgroundColor: "#87cefa"}}
              onClick={e => this.handleButtonClick(e, 4)}
              value='3-4'>
                3-4
              </Button>
            </Grid>
            <Grid item xs style={{marginBottom:'3px'}}>
              <Button 
              variant="contained"  
              size='large' 
              endIcon={this.state.disable_button[5] ? <CancelIcon /> : <AccessTimeIcon />} 
              disabled={this.state.disable_button[5]}
              className='time_slot_button' 
              style={this.state.selected_button[5] ? {backgroundColor: '#FFB6C1'} :{backgroundColor: "#87cefa"}}
              onClick={e => this.handleButtonClick(e, 5)}
              value='4-5'
              >
                4-5
              </Button>
            </Grid>
          </Grid>
          </Collapse>
        </div>

        
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
            Should we use the phone number that stored in your profile for this appointment?(The default phone number will be used.)
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
            label="Phone Number"
            value = {this.state.temp_phoneNum}
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

      {/* below is the dialog alert pop up for clicking a selected time slot. */}
      {/* <Dialog
        open={this.state.open_selected}
        onClose={this.handleCloseOpen_selected}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Same time selected"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have already selected this time.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseOpen_selected} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog> */}
      {/* end of dialog alert */}
      {/* end of dialog pop up */}

      <Snackbar open={this.state.open_selected} autoHideDuration={6000} onClose={this.handleCloseOpen_selected} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
        <MuiAlert onClose={this.handleCloseOpen_selected} severity="warning">
          You have already selected this time.
        </MuiAlert>
      </Snackbar>



         
          <div className='button_container' style={this.state.checked ? {display:'block'} : {display:'none'}}>
                {
                  this.state.valid_date && !(this.state.selected_time ==='')
                  ?<Link className='date_button-link ' to={{pathname: "/Result", 
                  }}>
                  <Button 
                    className = 'valid_button' 
                    color='primary' 
                    variant="contained"
                    onClick={this.handlePost}
                    >Next
                    </Button>
                  </Link>
                  :<Link className='date_button-link ' to='/'  onClick={ (event) => event.preventDefault()}>
                  <Button className='invalid_button' variant='contained'  disabled>You should choose a valid time.</Button>
                  </Link> 
                
                }
                </div>
        </Paper>

    )}
}
export default Date;