// Functions to help with bookings.
// It contains get, post, and delete requests.

//get name and phone number from server
export const getNameAndPhoneNum = (bookingResult, app) => {
  const id = app.state.currentUser;
  const request = new Request(`/users/${id}`)
  
  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
        bookingResult.setState({
          firstName: json.firstName,
          lastName: json.lastName,
          phoneNum: json.phoneNum});

        })
    .catch((error) => {
      console.log(error);
    });
};

// Get User's booking 
// bookingInfo will act like "this" in Appointment/Date
export const getBookings = (booking,app) => {
  const id = app.state.currentUser;
  
    // Create our request constructor with all the parameters we need
    const request = new Request(`/users/${id}/bookings`)

    fetch(request)
        .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        })
        .then((json) => {
          
          if(booking.state.past_data){ //if it's bookinghistory

            var new_past_data = []
            var new_upcoming_data = []
            const today = new Date()

            json.forEach((json) =>{ 
                var booking_date = new Date(json.date)

                //past
                if(booking_date < today){
                    new_past_data.push(json)
                    if(!json.temp_phoneNum==="New Phone Number"){
                      //set phone number to be the same as temp since user wants to change it
                      new_past_data[new_past_data.length-1].phoneNum = new_past_data[new_past_data.length-1].temp_phoneNum
                    }
                }else{
                    new_upcoming_data.push(json)
                    if(!json.temp_phoneNum==="New Phone Number"){
                      //set phone number to be the same as temp since user wants to change it
                      new_upcoming_data[new_upcoming_data.length-1].phoneNum = new_upcoming_data[new_upcoming_data.length-1].temp_phoneNum
                    }
                }
            })

            booking.setState({past_data:new_past_data, data: new_upcoming_data})
          }
          else{ //for /Result
            booking.setState({
              data: json
            });
          }
          
        })
      .catch((error) => {
        console.log(error);
      });
}
// Post User's booking
// bookingInfo will act like "this" in Appointment/Date
export const postBookings = (booking,app) => {
    const id = app.state.currentUser;
    const infoToSend = {
      date: booking.state.selected_date_string,
      time: booking.state.selected_time,
      phoneNum: booking.state.phoneNum,
      temp_phoneNum: booking.state.temp_phoneNum //'N'if user does not want to change
    }
    
  
    // Create our request constructor with all the parameters we need
    const request = new Request(`/users/${id}/bookings`, {
      method: "post",
      body: JSON.stringify(infoToSend), 
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    // Send the request with fetch()
    fetch(request)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

// Delete User's booking
// this one only happens in dashboard/BookingHistory
// when a user wants to cancel his appointment. It get bookings by calling getbookings first
// bookingId is the wanted_booking's id which is contained in getbookings.
export const deleteBookings = (app,bookingId) => {
    const id = app.state.currentUser;
    const booking_Id = bookingId;
  
    // Create our request constructor with all the parameters we need
    const request = new Request(`/users/${id}/bookings/${booking_Id}`, {
      method: "delete",
    });
    // Send the request with fetch()
    fetch(request)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
