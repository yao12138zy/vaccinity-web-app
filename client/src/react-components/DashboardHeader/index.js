import React from "react";

/* The Dashboard Header Component */
class DashboardHeader extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <div className="dashboardHeader">
        <h1>{title}</h1>
      </div>
    );
  }
}

export default DashboardHeader;
