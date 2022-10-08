import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import SelectTab from "./../SelectTab";
import FirstTab from "./../FirstTab";
import "./styles.css";

function CustomTabs(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const year = props.year;
  const month = props.month;
  const day = props.day;
  const location = props.location;
  const handleInputChange = props.handleChange;
  const home = props.home;
  const isAdmin = props.isAdmin;

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
        <Paper className="tabsection_paper">
          <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
          >
            <Tab className = "Tabs" label={<span className="tab_name">Who and When</span>}>
              {/* tab One */}
            </Tab>
            <Tab className = "Tabs" label={<span className="tab_name">What Vaccination Do You Need?</span>}>
            </Tab>
          </Tabs>

          {selectedTab === 0 &&  <div id="TabHolder"><FirstTab home={home} isAdmin={isAdmin}/></div>|| <SelectTab year={year} month={month} day={day} location={location} home={home} isAdmin={isAdmin}
          handleChange={handleInputChange}/>}
        </Paper>
  );
}




export default CustomTabs;
