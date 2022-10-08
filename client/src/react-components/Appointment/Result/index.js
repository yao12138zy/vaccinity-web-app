import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
    getNameAndPhoneNum,
    getBookings
  } from "../../../actions/booking";

import LoginButton from "../../LoginButton";
import Logo from "../../Logo";
import Notification from "../../Notification";
import MenuBar from "../../MenuBar";

import "./styles.css";


//later, we need to push these appointments to server.
//server call here.

function createData(firstName,lastName,selected_date,selected_time,phoneNum) {
    return [firstName, lastName, selected_date,selected_time,phoneNum];
  }


export default class Result extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            data: [],
            
        }
    }

    componentWillMount(){
        getNameAndPhoneNum(this,this.props.app);
        getBookings(this,this.props.app);
        this.setState({rowData:[]})
    }
    render(){
       
                    
        const rowData= [] //use to map the table
        rowData.length = 0 //reset the array
        console.log('result', this.state)
        
        for(let i=0;i<this.state.data.length;i++){
            if(this.state.data[i].temp_phoneNum ==='New Phone Number'){ //no change to phone number, use default phone number
                
                    rowData.push(createData(
                        this.state.firstName, 
                        this.state.lastName, 
                        this.state.data[i].date,
                        this.state.data[i].time,
                        this.state.phoneNum))
                  
            }else{
                rowData.push(createData(
                    this.state.firstName, 
                    this.state.lastName, 
                    this.state.data[i].date,
                    this.state.data[i].time,
                    this.state.data[i].temp_phoneNum))
            }
                

    }
        return(
           
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
                <span className='result_text_container'>
                    <h1 className='result_text'>
                        Below is the booking confirmation.
                    </h1> 
                </span>
            
            <Paper className='tableContainer'>
                <TableContainer  component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Booking Date</TableCell>
                        <TableCell align="right">Booking Time</TableCell>
                        <TableCell align="right">Phone Number</TableCell>
                    </TableRow>
                    </TableHead>
                    
                    <TableBody>
                    {rowData.map((row) => (
                        
                        <TableRow key={row[0]}> 
                        <TableCell component="th" scope="row" align="right">
                            {row[0]}
                        </TableCell>
                            <TableCell align="right">
                            {row[1]}
                            </TableCell>  

                            <TableCell align="right">
                            {row[2]}
                            </TableCell>

                            <TableCell align="right">
                            {row[3]}
                            </TableCell>

                            <TableCell align="right">
                            {row[4]}
                            </TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </Paper>

        {/* back to home page */}
        <div className='back_date_button_container'>
        <Link className='back_button-link' to='/Date' >
            <Button className='back_home_button' variant="contained" >Book another!</Button>
        </Link>
        </div>

        <div className='back_dashboard_button_container'>
        <Link className='back_button-link' to='/dashboard/home' >
            <Button className='back_home_button' variant="contained" >Back to Dashboard</Button>
        </Link>
        </div>
        
        

        </Paper>
        )
    }
}