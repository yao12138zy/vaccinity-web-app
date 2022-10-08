import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    year: '',
    month: '',
    day: '',
    location: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>

    <Grid container > 
        <Grid item xs={2} style={{padding: 20, marginLeft:100, marginTop: 10, marginBottom: 10}}>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="year_id">Year</InputLabel>
                <Select
                    native
                    value={state.year}
                    onChange={handleChange}
                    label="year"
                    inputProps={{
                    name: 'year',
                    id: 'year_id',
                    }}
                >
                    <option  value="" />
                    <option value={2001}>2001</option>
                    <option value={2000}>2000</option>
                    <option value={1999}>1999</option>
                    <option value={1998}>1998</option>
                    <option value={1997}>1997</option>
                </Select>
            {/* <FormHelperText>Some important helper text</FormHelperText> */}
        </FormControl>
        </Grid>

        <Grid item xs={2} style={{padding: 20, marginLeft:80, marginTop: 10, marginBottom: 10}}>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="month_id">Month</InputLabel>
            <Select
            native
            value={state.month}
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
        
        <Grid item xs={2} style={{padding: 20, marginLeft:80, marginTop: 10, marginBottom: 10}}>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="day_id">Day</InputLabel>
            <Select
            native
            value={state.day}
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

            </Select>
        </FormControl>
        </Grid>

        <Grid item xs={2} style={{padding: 20, marginRight:100, marginTop: 10, marginBottom: 10}}>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="location_id">Location</InputLabel>
            <Select
            native
            value={state.location}
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
            <option value={"UK"}>UK</option>
            <option value={"China"}>China</option>
            <option value={"Japan"}>Japan</option>
            <option value={"Russia"}>Russia</option>
            <option value={"Romania"}>Romania</option>
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
        <Button variant="outlined" size="large">Search </Button>
      </Box>
        
      
    </Grid>
    </div>
  );
}