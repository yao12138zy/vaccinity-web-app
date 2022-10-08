export const getVaccines = (eir) => {
    const url = "/vaccines";
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            return res.json();
        }
 
    }).then((vaccines) => {
        eir.setState({ vaccineList: vaccines });
        //console.log(vaccines);
    }) 
    .catch((error) => {
      console.log(error);
    });

};
  
export const getUserInfo = (eir) => {
    const id = eir.props.app.state.currentUser;
    const url = `/users/${id}`;
    fetch(url)
    .then((res) => {
        if (res.status === 200){
            return res.json();
        }
        
    }).then((user) => {
        eir.setState({userInfo: user});

    }).catch((error) => {
        console.log(error);
      });  
}
export const getUsers = (eir) => {
    
    const url = '/users';
    fetch(url)
    .then((res) => {
        if (res.status === 200){
            return res.json();
        }
        else {
            alert("Could not get user Info");
        }
    }).then((users) => {
        eir.setState({users: users});
    }).catch((error) => {
        console.log(error);
      });  
}
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;
    loginComp.setState({
      [name]: value,
    });
};

export const searchUser = (eir) => {
    console.log(eir.state.input)
    
    eir.setState({searchUser:eir.state.input})
    console.log(eir.state.searchUser)
};
export const reset = (eir) => {
    eir.setState({searchUser:""})
    eir.setState({input:""})
};
export const changeChange = (eir) => {
    eir.setState({change:true})
    
};
export const changeAdd = (eir) => {
    eir.setState({add:true})
    
};
export const deleteHistroy = ((app,id,vid) =>{
    console.log(vid)
    const url = `/users/${id}/vaccine/${vid}` ;
    const request = new Request(url, {
        method: "delete",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
    })
    fetch(request)
        .then((res) =>{
            if (res.status === 200){
                return res.json()
            }
        }).then(json => {
            if (json){
                const List = app.state.users;
                List.map(each => {
                    if (each._id === json._id){
                        each.vaccinationHistory = json.vaccinationHistory
                    }
                })
                app.setState({users:List})
                alert("You have successively Delete the history!")
            }
            else {
                alert("Delete Failed")
            }
        }).catch((error) => {
            console.log(error);
        })
    
}) 



export const addHistory = (app,id) => {
    const url = `/users/${id}/vaccine`;
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({name:app.state.addName, dateofVaccination: app.state.addDateofVaccination}),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
    fetch(request)
        .then((res) =>{
            if (res.status === 200){
                return res.json()
            }
        }).then(json => {
            if (json){
                const List = app.state.users;
                List.map(each => {
                    if (each._id === json._id){
                        each.vaccinationHistory = json.vaccinationHistory
                    }
                })
                app.setState({users:List})
                app.setState({add:false})
                alert("You have successively add the history!")
            }
            else {
                alert("Added Failed")
            }
        }).catch((error) => {
            console.log(error);
        });  
};

export const UpdateHistory = (app,id,vid) => {
    const url = `/users/${id}/vaccine/${vid}`;
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify({name:app.state.updateName,dateofVaccination:app.state.updateDateofVaccination}),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
    fetch(request)
    .then((res) =>{
        if (res.status === 200){
           return res.json();
        }  
        else {
            alert("Update Failed")
        }
    }).then(json =>{
        if (json){
            const List = app.state.users;
            List.map(each => {
                if (each._id === json._id){
                    each.vaccinationHistory = json.vaccinationHistory
                }
            })
            app.setState({users:List})
            app.setState({change:false});
            alert("You have successively Update the history!")
        }
        else{
            alert("Update Failed")
        }
    }).
    catch((error) => {
        console.log(error);
    });  
}