// Functions to help with dashboard actions

// A functon to update the info form state
export const updateForm = (infoFormComp, field) => {
  const value = field.value;
  const name = field.name;

  infoFormComp.setState({
    [name]: value,
  });
};

// A function to close the old password incorrect message on the login page
export const closeOldErrorMessage = (passwordComp) => {
  passwordComp.setState({ oldError: false });
};

// A function to close the retype password not match message on the login page
export const closeRetypeErrorMessage = (passwordComp) => {
  passwordComp.setState({ retypeError: false });
};

// A function to get name on Dashboard's home page
export const getName = (dashboardContentComp, app) => {
  const id = app.state.currentUser;
  const url = (!app.state.isAdmin ? "/users/" : "/admins/") + id;

  // Send the request with fetch()
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("_id " + id + " not found");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      dashboardContentComp.setState({
        firstName: json.firstName,
        lastName: json.lastName,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to get information on My Profile page
export const getUserInfo = (infoFormComp, app) => {
  const id = app.state.currentUser;
  const url = "/users/" + id;

  // Send the request with fetch()
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("_id " + id + " not found");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      const birthdate = new Date(json.birthdate);
      infoFormComp.setState({
        username: json.username,
        email: json.email,
        firstName: json.firstName,
        lastName: json.lastName,
        birthYear: birthdate.getFullYear(),
        birthMonth: birthdate.getMonth(),
        birthDay: birthdate.getDate(),
        gender: json.gender,
        phoneNum: json.phoneNum,
        healthCardNum: json.healthCardNum,
        passportNum: json.passportNum,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to get admin information on My Profile page
export const getAdminInfo = (infoFormComp, app) => {
  const id = app.state.currentUser;
  const url = "/admins/" + id;

  // Send the request with fetch()
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("_id " + id + " not found");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      const birthdate = new Date(json.birthdate);
      infoFormComp.setState({
        username: json.username,
        email: json.email,
        firstName: json.firstName,
        lastName: json.lastName,
        birthYear: birthdate.getFullYear(),
        birthMonth: birthdate.getMonth() + 1,
        birthDay: birthdate.getDate(),
        gender: json.gender,
        licenceNum: json.licenceNum,
        organization: json.organization,
        phoneNum: json.phoneNum,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to update infomation on My Profile page
export const updateUserInfo = (infoFormComp, app) => {
  const id = app.state.currentUser;
  const url = "/users/" + id;
  const updatedInfo = {
    username: infoFormComp.state.username,
    email: infoFormComp.state.email,
    firstName: infoFormComp.state.firstName,
    lastName: infoFormComp.state.lastName,
    birthdate:
      infoFormComp.state.birthYear +
      "-" +
      infoFormComp.state.birthMonth +
      "-" +
      infoFormComp.state.birthDay,
    gender: infoFormComp.state.gender,
    phoneNum: infoFormComp.state.phoneNum,
    healthCardNum: infoFormComp.state.healthCardNum,
    passportNum: infoFormComp.state.passportNum,
  };

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "put",
    body: JSON.stringify(updatedInfo),
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
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to update infomation on My Profile page
export const updateAdminInfo = (infoFormComp, app) => {
  const id = app.state.currentUser;
  const url = "/admins/" + id;

  const updatedInfo = {
    username: infoFormComp.state.username,
    email: infoFormComp.state.email,
    firstName: infoFormComp.state.firstName,
    lastName: infoFormComp.state.lastName,
    birthdate:
      infoFormComp.state.birthYear +
      "-" +
      infoFormComp.state.birthMonth +
      "-" +
      infoFormComp.state.birthDay,
    gender: infoFormComp.state.gender,
    licenceNum: infoFormComp.state.licenceNum,
    organization: infoFormComp.state.organization,
    phoneNum: infoFormComp.state.phoneNum,
  };

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "put",
    body: JSON.stringify(updatedInfo),
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
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to update password on My Profile page
export const updatePassword = (passwordComp, app) => {
  const id = app.state.currentUser;
  const isAdmin = app.state.isAdmin;
  const url = (!isAdmin ? "/users/" : "/admins/") + id + "/password";

  if (passwordComp.state.passwordNew !== passwordComp.state.passwordNew2) {
    passwordComp.setState({ retypeError: true });
    return;
  }

  const updatedInfo = {
    username: passwordComp.state.username,
    passwordOld: passwordComp.state.passwordOld,
    passwordNew: passwordComp.state.passwordNew,
  };

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "put",
    body: JSON.stringify(updatedInfo),
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
      } else {
        passwordComp.setState({ oldError: true });
      }
    })
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to delete the account
export const deleteAccount = (app) => {};
