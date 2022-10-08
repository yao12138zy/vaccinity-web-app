import React from "react";
import { Grid, Card, Box, withStyles, Button } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import data from './../Data';
import LoginButton from "../LoginButton";
import Logo from "../Logo";
import Notification from "../Notification";
import MenuBar from "../MenuBar";
import "./styles.css";
import { makeStyles } from "@material-ui/styles";


export default function InfoPages(props) {

    const id = props.location.article;
    const {
        loginStatus,
      } = props;
    const home = props.location.home;
    const isAdmin= props.location.isAdmin;


    const articles = data.map(article => {

      if (id == article.id)
      return (
        <div>
        <span className="LogoContainer">
            <Logo/>
        </span>
        <span className="LoginButtonContainer">
            {" "}
            <LoginButton app={home.props.app} />{" "}
        </span>
            <MenuBar articles= {home.state.article} home= {home} isAdmin= {isAdmin}/>
        <Box  className="info_box" display="flex" justifyContent="center" key={id}>
            <div className="info_div" >
                <Grid container spacing={5} >
                <Grid item md={9} >
                    <Card>
                    <Box pt={3} pr={3} pl={3} pb={2}>
                        <Typography variant="h3" >
                            {article.title1}
                        </Typography>
                    </Box>
                    <Box p={3} >
                        {article.content1}

                        <div className="info_innerdiv" >
                            <ExpansionPanel className="info_expcolor">
                                <ExpansionPanelSummary
                                id="panel1a-header"
                                >
                                <h5>{article.title2}</h5>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography>
                                    {article.content2}
                                    <ul>
                                        <li>{article.content25}</li>
                                    </ul>
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel className="info_expcolor">
                                <ExpansionPanelSummary
                                id="panel2a-header"
                                >
                                <h5>{article.title3}</h5>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography>
                                    {article.content3}
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel className="info_expcolor">
                                <ExpansionPanelSummary
                                id="panel3a-header"
                                >
                                <h5>{article.title4}</h5>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography>
                                    {article.content4}
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                        <Box pt={10}>
                        <Grid spacing={2} container>
                                <Grid item >
                                <Button variant="outlined" href="http://www.health.gov.on.ca/en/public/programs/immunization/static/immunization_tool.html">Ontario Vaccination Schedule</Button>
                                <Button variant="outlined" href="https://www.canada.ca/en/public-health/services/immunization-vaccines.html">Health Canada </Button>
                                </Grid>
                        </Grid>
                        </Box>
                    </Box>
                    </Card>
                </Grid>
                <Grid item md={3}>
                    <Typography variant="h6" paragraph>
                    Other People/ Quick Links
                    </Typography>
                        Find more information below:
                        <div style={{padding: 30}}>
                        </div>
                        <div>
                            <ExpansionPanel className="info_expcolor">
                                    <ExpansionPanelSummary
                                        id="panel1b-header"
                                        >
                                        <Typography>
                                            {article.sideTitle1}
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    <Box p={2}>
                                        <Typography>
                                            {article.sideContent1}
                                        </Typography>

                                        <Link to={{pathname:'\InfoPages', article: article.sideTitle1, home: home}}  className="info_link">
                                            <Button color="secondary">More Information</Button>
                                        </Link>
                                    </Box>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel className="info_expcolor">
                                    <ExpansionPanelSummary
                                        id="panel2b-header"
                                        >
                                        <Typography>
                                            {article.sideTitle2}
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    <Box p={2}>
                                        <Typography>
                                            {article.sideContent2}
                                        </Typography>

                                        <Link to={{pathname:'\InfoPages', article: article.sideTitle2, home: home}} className="info_link">
                                                <Button color="secondary">More Information</Button>
                                        </Link>
                                    </Box>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel className="info_expcolor">
                                    <ExpansionPanelSummary
                                        id="panel3b-header"
                                        >
                                        <Typography>
                                            {article.sideTitle3}
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    <Box p={2}>
                                        <Typography>
                                            {article.sideContent3}
                                        </Typography>
                                        <Link to={{pathname:'\InfoPages', article: article.sideTitle3, home: home}} className="info_link">
                                                <Button color="secondary">More Information</Button>
                                        </Link>
                                    </Box>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </div>
                </Grid>
                </Grid>
            </div>

            </Box>
        </div>
        );
    })

    // const { classes } = props;

    return (
      <div>
        {articles}
      </div>
    )

    }
