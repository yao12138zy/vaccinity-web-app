import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import MenuBar from "../MenuBar";
import SideNavBar from "../SideNavBar";
import DashboardHeader from "../DashboardHeader";
import {
    getBookings,
    deleteBookings
  } from "../../actions/booking";
  import { Link } from "react-router-dom";
  import Button from "@material-ui/core/Button";
  import AddBox from '@material-ui/icons/AddBox';
  import ArrowUpward from '@material-ui/icons/ArrowUpward';
  import Check from '@material-ui/icons/Check';
  import ChevronLeft from '@material-ui/icons/ChevronLeft';
  import ChevronRight from '@material-ui/icons/ChevronRight';
  import Clear from '@material-ui/icons/Clear';
  import CancelIcon from '@material-ui/icons/Cancel';
  import DeleteOutline from '@material-ui/icons/DeleteOutline';
  import Edit from '@material-ui/icons/Edit';
  import FilterList from '@material-ui/icons/FilterList';
  import FirstPage from '@material-ui/icons/FirstPage';
  import LastPage from '@material-ui/icons/LastPage';
  import Remove from '@material-ui/icons/Remove';
  import SaveAlt from '@material-ui/icons/SaveAlt';
  import Search from '@material-ui/icons/Search';
  import ViewColumn from '@material-ui/icons/ViewColumn';
  
  import "./styles.css"


  const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <CancelIcon {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };



//const userDbID = "5f3389349304ce57e62eb403"
export default class BookingHistory extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/dashboard/bookingHistory");
        this.state = {
            columns: [
                { title: 'Date', field: 'date' },
                { title: 'Time', field: 'time' }, //, type: 'date' 
                { title: 'Phone Number',field: 'phoneNum',},
              ],
              data: [], //upcoming data
              past_data: [],
              
        };
      }
    

//     //get booking using userDbId, res should be something like this
//      [
//     {
//         "_id": "5f3381b7e5966f4a32cd6d05",
//         "date": "2",
//         "time": "3",
//         "phoneNum": "4",
//         "temp_phoneNum": "",
//     }
//      ]
        componentWillMount(){
            //getBookings(this,this.props.app)
            getBookings(this,this.props.app)
        }

        
        //stupid promise won't finish before the delete, need async
        onRowDelete_combined = async (oldData) => {
            await this.onRowDelete_promise(oldData)
            // do something else here after firstFunction completes
            deleteBookings(this.props.app,oldData._id);
          }
        
        
        onRowDelete_promise = (oldData) =>{
            new Promise((resolve) => {
                setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                });
                }, 600);
            });
        }

    render(){
        const { app } = this.props;
    return (
        <div>
        
            <MenuBar />
            <SideNavBar app={app}/>
            <DashboardHeader title="My Appointment" />
            
            <Link to="/Appointments" >
              <Button> Book An Appointment Now? </Button>
            </Link>

            <MaterialTable
                icons={tableIcons}
                options={{actionsColumnIndex: -1}}
                localization={{
                    body: {
                        deleteTooltip: "Cancel the booking",
                        editRow: {
                            deleteText: "Are you sure you want to cancel the booking?",
                        }
                    }
                    
                }}
                style={{maxWidth:'800px', marginLeft:'300px'}}
                title={"Upcoming Bookings"}
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    // onRowAdd: (newData) =>
                    //   new Promise((resolve) => {
                    //     setTimeout(() => {
                    //       resolve();
                    //       setState((prevState) => {
                    //         const data = [...prevState.data];
                    //         data.push(newData);
                    //         return { ...prevState, data };
                    //       });
                    //     }, 600);
                    //   }),
                    // onRowUpdate: (newData, oldData) =>
                    //   new Promise((resolve) => {
                    //     setTimeout(() => {
                    //       resolve();
                    //       if (oldData) {
                    //         setState((prevState) => {
                    //           const data = [...prevState.data];
                    //           data[data.indexOf(oldData)] = newData;
                    //           return { ...prevState, data };
                    //         });
                    //       }
                    //     }, 600);
                    //   }),
                    onRowDelete: (oldData) => this.onRowDelete_combined(oldData)
                    
                }}
                />

                <MaterialTable
                icons={tableIcons}
                options={{actionsColumnIndex: -1}}
                style={{maxWidth:'800px', marginLeft:'300px', marginTop:'100px'}}
                title={"Past Bookings"}
                columns={this.state.columns}
                data={this.state.past_data}
                actions={[
                    {
                      icon: () => <DeleteOutline />,
                      tooltip: "You can't delete it.",
                      disabled: true
                    }
                  ]}
                

                />
                    </div>
                    );
  }
}