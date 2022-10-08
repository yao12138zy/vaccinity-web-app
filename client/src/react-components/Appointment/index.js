import React, { Fragment } from "react";
import {
    Grid,
    Typography,
    Container,
    Card,
    Button,
    Box,
    withStyles,
    withWidth,
    isWidthUp
  } from "@material-ui/core";

import {Link} from "react-router-dom";

import PropTypes from "prop-types";
import headerImage from "./static/appointment.png";

import LoginButton from "../LoginButton";
import Logo from "../Logo";
import Notification from "../Notification";
import MenuBar from "../MenuBar";

import "./styles.css";

const styles = theme => ({
    card: {
      [theme.breakpoints.up("lg")]: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(20),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
      },
    },
    wrapper: {
      position: "relative",
      backgroundColor: theme.palette.secondary.main,
      paddingBottom: theme.spacing(2)
    },
    image: {
      maxWidth: "100%",
      verticalAlign: "middle",
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[4]
    },
  });

function Appointment(props) {
    const { classes, width, app } = props;
    //props.history.push("/Appointments");

        return(
            <div className = "book_bg-image center">
                <span id="LogoContainer">
                <Logo />
                </span>
                <span id="LoginButtonContainer">
                {" "}
                <LoginButton  app = {app}/>

                </span>
                <span id="NotificationContainer">
                <Notification number={0} />
                </span>
                <MenuBar />




            <Fragment>
                <div>
                <Box display="flex" justifyContent="center" className="row">
                    <Card
                    className={classes.card}
                    style={{minWidth:'80%'}}
                    >
                    <Container maxWidth="lg" style={{minHeight:'600px', position:'relative'}}>
                        <Box justifyContent="space-between" className="row">
                        <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            height="100%"
                            >
                            <Box mb={6}>
                                <Typography
                                variant={isWidthUp("lg", width) ? "h3" : "h4"}
                                >
                                Appointment
                                </Typography>
                            </Box>
                            
                                <Box mb={5} >
                                    <Typography
                                        variant={isWidthUp("lg", width) ? "h5" : "body1"}
                                        color="textSecondary"
                                    >
                                        Ready to see a health professional? Let's get started! <br />
                                        You can book in the next three days.

                                    </Typography>
                                    
                                </Box>
 
                            
                            </Box>
                        </Grid>
                            <Grid item xs={6} >
                            <img
                                src={headerImage}
                                alt='booking homepage img'
                                className={classes.image}
                            />
                            </Grid>
                        </Grid>
                        </Box>
                        
                        <Link className="book_button-link" to={{pathname: "/Date"}}>
                            <Button className='book_button' variant='contained' color='secondary'>Book now!</Button>
                        </Link>
                        
                    </Container>
                            
                    </Card>
                    
                </Box>
            </div>
            </Fragment>
                            
                
                
                
                
                
                
                {/* <h1 className='Appointment_text'>
                Thank you for choosing us! 
                </h1>

                <h1 className='Appointment_text1'>Let's get started!</h1> */}
                
                    
                

            </div>
        )
    }

Appointment.propTypes = {
    classes: PropTypes.object,
    width: PropTypes.string,
    theme: PropTypes.object
  };

  export default withWidth()(
    withStyles(styles, { withTheme: true })(Appointment)
  );