import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './style.css';
import indigo from '@material-ui/core/colors/indigo';

export default class MenuBar extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      anchorEl: null,



  /* {buttonName:['Vaccine Basics',
                              'Vaccines by Disease',
                              'Countries',
                              'FAQs',
                              'Find a Clinic',
                              'Resources'],
                  optionList:[['name','year','test'],
                              ['HPV','Covid-19','NueJi'],
                              ['China','Canada','America'],
                              ['Frequently asked','online questioning'],
                              ['by location','by features']
                              ['Paper','Research']
                              ]
                  }

    */
    };
  };

  render(){
    const primary = indigo[400];
    const articles = this.props.articles; 
    const home = this.props.home;
    const isAdmin = this.props.isAdmin;

    return(
      <div>
        <AppBar id='AppBar' position="static" color="primary">
          <Toolbar color="primary">
            <Link to="/" className="HomeLink">
              <IconButton className='IconButton' edge="start" color="inherit">
                <HomeIcon />
                  Home
              </IconButton>
            </Link>
            <Link to={{pathname:'\AllArticles', articles: articles, home: home, isAdmin: isAdmin}} className="HomeLink">
              <Button id="ArticleButton"> Articles </Button>
            </Link>
            <Link to="/Appointments" className="HomeLink">
              <Button id="AppointmentButton"> Book Appointment </Button>
            </Link>
            
            <Link to={{pathname:'/login'}} className="HomeLink">
              <Button id="AccountButton"> My Account </Button>
            </Link>

          </Toolbar>

        </AppBar>
      </div>
    )


  }


}
