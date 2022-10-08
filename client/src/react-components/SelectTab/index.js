import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';
import "./styles.css";

class SelectTab extends React.Component {
  render() {

    const year = this.props.year;
    const month = this.props.month;
    const day = this.props.day;
    const location = this.props.location;
    const home = this.props.home;
    const isAdmin = this.props.isAdmin;

    const handleChange = this.props.handleChange;

  return (
    <div>

    <p> Please input date of birth and/or location to find out what vaccination you need: </p>
    <Grid container justify="center"> 
        <Grid item xs={2} className="select_leftgrid">
        <FormControl variant="outlined" >
            <InputLabel htmlFor="year_id">Year</InputLabel>
                <Select
                  native
                  value={year}
                  onChange={handleChange}
                  label="year"
                  inputProps={{
                  name: 'year',
                  id: 'year_id',
                  }}
              >
                  <option  value="" />
                  <option value={2005}>2005</option>
                  <option value={2004}>2004</option>
                  <option value={2003}>2003</option>
                  <option value={2002}>2002</option>
                  <option value={2001}>2001</option>
                  <option value={2000}>2000</option>
                  <option value={1999}>1999</option>
                  <option value={1998}>1998</option>
                  <option value={1997}>1997</option>
                  <option value={1996}>1996</option>
                  <option value={1995}>1995</option>
                  <option value={1994}>1994</option>
                  <option value={1993}>1993</option>
                  <option value={1992}>1992</option>
                  <option value={1991}>1991</option>
                  <option value={1990}>1990</option>
                </Select>
        </FormControl>
        </Grid>

        <Grid item xs={2} className="select_innergrid">
        <FormControl variant="outlined">
            <InputLabel htmlFor="month_id">Month</InputLabel>
            <Select
              native
              value={month}
              onChange={handleChange}
              label="month"
              inputProps={{
                  name: 'month',
                  id: 'month_id',
              }}
              >
              <option value="" />
              <option value={"January"}>January</option>
              <option value={"Feb"}>Feb</option>
              <option value={"March"}>March</option>
              <option value={"April"}>April</option>
              <option value={"May"}>May</option>
              <option value={"June"}>June</option>
              <option value={"July"}>July</option>
              <option value={"Aug"}>Aug</option>
              <option value={"Sept"}>Sept</option>
              <option value={"Oct"}>Oct</option>
              <option value={"Nov"}>Nov</option>
              <option value={"Dex"}>Dec</option>
            </Select>
        </FormControl>
        </Grid>

        <Grid item xs={2} className="select_innergrid">
        <FormControl variant="outlined" >
            <InputLabel htmlFor="day_id">Day</InputLabel>
            <Select
              native
              value={day}
              onChange={handleChange}
              label="day"
              inputProps={{
                  name: 'day',
                  id: 'day_id',
              }}
              >
              <option value="" />
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
              <option value={4}>04</option>
              <option value={5}>05</option>
              <option value={6}>06</option>
              <option value={7}>07</option>
              <option value={8}>08</option>
              <option value={9}>09</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>


            </Select>
        </FormControl>
        </Grid>

        <Grid item xs={2} className="select_rightgrid">
        <FormControl variant="outlined" >
            <InputLabel htmlFor="location_id">Location</InputLabel>
            <Select
              native
              value={location}
              onChange={handleChange}
              label="location"
              inputProps={{
                  name: 'location',
                  id: 'location_id',
              }}
              >
              <option value="" />
              <option value={"Canada"}>Canada</option>
              <option value={"United States"}>United States of America</option>
              <option value={"Dubai"}>Dubai</option>
              <option value={"China"}>China</option>
              <option value={"Russia"}>Russia</option>
              <option value={"Namibia"}>Namibia</option>
              <option value={"Australia"}>Australia</option>
              {/* <option value={"France"}>France</option> */}
              <option value={"South Africa"}>South Africa</option>
            </Select>
        </FormControl>
        </Grid>

        <Box
          display="flex"
          width="100%"
          height={80}
          alignItems="center"
          justifyContent="center"
        >

        {/* {console.log(`select tab home: ${home}`)} */}

        <Link to={{pathname:'\SearchPage', year:year, month:month, day: day, location: location, home: home, isAdmin: isAdmin}} className="linked_button">
          <Button
            variant="outlined"
            size="large"
          >
            Search
          </Button>
        </Link>
      </Box>

    </Grid>
    </div>
  );
}
}

export default SelectTab;