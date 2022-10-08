import React from "react";
import Schedule from "../Schedule";

import { getName } from "../../actions/dashboard";
/* The dashboard home page content component */
class DashboardContent extends React.Component {
  state = {
    firstName: "",
    lastName: "",
  };

  componentDidMount() {
    getName(this, this.props.app);
  }

  render() {
    return (
      <div>
        <div className="greeting">
          <h2>
            Welcome, {this.state.firstName} {this.state.lastName}.
          </h2>
        </div>
        {/* <Schedule type={type} />*/}
      </div>
    );
  }
}

export default DashboardContent;
