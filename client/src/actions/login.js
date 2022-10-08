// Functions to help with login actions

// A function to check if a user/admin is logged in on the session cookie
export const readCookie = (app) => {
  const url = "/check-session";

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json && json.currentUser) {
        app.setState({ currentUser: json.currentUser });
       
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
  const value = field.value;
  const name = field.name;

  loginComp.setState({
    [name]: value,
  });
};

// A function to redirect user to the registration page
export const redirectToRegister = (history) => {
  history.push("/register");
};

// A function to close the error message on the login page
export const closeErrorMessage = (loginComp) => {
  loginComp.setState({ errorMessage: false });
};

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
  // Set the correct url depending the login type
  const url = loginComp.state.isAdmin ? "/admins/login" : "/users/login";

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(loginComp.state),
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
      if (json.currentUser !== undefined) {
        app.setState({
          currentUser: json.currentUser,
          isAdmin: loginComp.state.isAdmin,
        });
      }
    })
    .catch((error) => {
      loginComp.setState({ errorMessage: true });
      console.log(error);
    });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
  const url = "/users/logout";

  fetch(url)
    .then((res) => {
      app.setState({
        currentUser: null, 
        message: { type: "", body: "" },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
