import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

// Import react components
import Login from "./react-components/Login";
import Registration from "./react-components/Registration/";
import SearchPage from "./react-components/SearchPage";
import InfoPages from "./react-components/InfoPages";
import ArticlePage from "./react-components/ArticlePage";
import AllArticles from "./react-components/AllArticles";
import MyProfile from "./react-components/MyProfile";
import Dashboard from "./react-components/Dashboard";
import EIR from "./react-components/EIR";
import Appointment from "./react-components/Appointment";
import Date from "./react-components/Appointment/Date";
import Result from "./react-components/Appointment/Result";
import Home from "./react-components/Home";
import EditArticle from "./react-components/EditArticle";
import AddArticle from "./react-components/AddArticle";
import BookingHistory from "./react-components/BookingHistory";

// Import functions
import { readCookie } from "./actions/login";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this);
  }

  // The global state
  state = {
    currentUser: null, // used for login
    isAdmin: false,

    year: "",
    month: "",
    day: "",
    location: "",
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={["/login", "/dashboard/home"]}
            render={({ history }) => (
              <div className="app">
                {!this.state.currentUser ? (
                  <Login history={history} app={this} />
                ) : (
                  <Dashboard history={history} app={this} />
                )}
              </div>
            )}
          />

          <Route
            exact
            path="/register"
            render={({ history }) => (
              <div className="app">
                {!this.state.currentUser ? (
                  <Registration history={history} app={this} />
                ) : (
                  <Dashboard history={history} app={this} />
                )}
              </div>
            )}
          />

          <Route
            exact
            path="/dashboard/myprofile"
            render={({ history }) => (
              <div className="app">
                {!this.state.currentUser ? (
                  <Login history={history} app={this} />
                ) : (
                  <MyProfile history={history} app={this} />
                )}
              </div>
            )}
          />

          <Route
            exact
            path="/dashboard/eir"
            render={({ history }) => (
              <div className="app">
                {!this.state.currentUser ? (
                  <Login history={history} app={this} />
                ) : (
                  <EIR app={this} history={history} />
                )}
              </div>
            )}
          />

          <Route
            exact
            path="/dashboard/bookingHistory"
            render={({ history }) => (
              <div className="app">
                {!this.state.currentUser ? (
                  <Login history={history} app={this} />
                ) : (
                  <BookingHistory history={history} app={this} />
                )}
              </div>
            )}
          />

          <Route exact path="/">
            <Home
              app={this}
              year={this.state.year}
              month={this.state.month}
              day={this.state.day}
              location={this.state.location}
              handleChange={this.handleInputChange}
              isAdmin={this.state.isAdmin}
            />
          </Route>

          <Route path="/InfoPages" component={InfoPages} />
          <Route path="/ArticlePage" component={ArticlePage} />
          <Route path="/EditArticle" component={EditArticle} />
          <Route path="/AddArticle" component={AddArticle} />
          <Route path="/AllArticles" component={AllArticles} />
          <Route exact path="/SearchPage">
            <SearchPage
              year={this.state.year}
              month={this.state.month}
              day={this.state.day}
              location={this.state.location}
              app={this}
            />
          </Route>

          <Route
            exact
            path="/Appointments"
            render={({ history }) => (
              <div className="app">
                {!this.state.currentUser ? (
                  <Login history={history} app={this} />
                ) : (
                  <Appointment history={history} app={this} />
                )}
              </div>
            )}
          />
          <Route
            exact
            path="/Date"
            //test frontend
            //render = {() => (<Date app={this} />)}
            render={({ history }) => (
              <div className="app">
                {!this.state.currentUser ? (
                  <Login history={history} app={this} />
                ) : (
                  <Date history={history} app={this}/>
                )}
              </div>
            )}
          />
          <Route
            exact
            path="/Result"
            //test frontend
            // render = {() => (<Result app={this} />)}
            render={({ history }) => (
              <div className="app">
                {!this.state.currentUser ? (
                  <Login history={history} app={this} />
                ) : (
                  <Result history={history} app={this}/>
                )}
              </div>
            )}
          />

          {/* 404 if URL isn't expected. */}
          <Route render={() => <div>404 Not found</div>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
