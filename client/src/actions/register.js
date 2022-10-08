// Functions to help with registration

// Update the state in respective registration form
export const updateForm = (formComp, field) => {
  const value = field.value;
  const name = field.name;

  formComp.setState({
    [name]: value,
  });
  console.log(value);
};

// A function to redirect user to the login page
export const redirectToLogin = (history) => {
  history.push("/login");
};

// A function to send a POST request to register a user
export const registerUser = (formComp, app) => {
  // User information to send
  const user = formComp.state;

  // Create our request constructor with all the parameters we need
  const request = new Request("/users/register", {
    method: "post",
    body: JSON.stringify(user),
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
        // Automatically log in after successful registration
        app.setState({
          currentUser: json.currentUser,
          isAdmin: false,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to send a POST request to register an admin
export const registerAdmin = (formComp, app) => {
  // Admin information to send
  const admin = formComp.state;

  // Create our request constructor with all the parameters we need
  const request = new Request("/admins/register", {
    method: "post",
    body: JSON.stringify(admin),
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
        // Automatically log in after successful registration
        app.setState({
          currentUser: json.currentUser,
          isAdmin: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
