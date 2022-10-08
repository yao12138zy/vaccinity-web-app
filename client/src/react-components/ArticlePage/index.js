import React from "react";
// import headerImage from "./static/1.jpg";
import { Grid, Card, Box, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import data from './../Data';
import LoginButton from "../LoginButton";
import Logo from "../Logo";
import Notification from "../Notification";
import MenuBar from "../MenuBar";
import {Link} from 'react-router-dom';
import "./styles.css"
import { getArticles,getOneArticle } from "../../actions/article";

class ArticlePage extends React.Component {

    // article property passed in Links in ArticleCard to identify specific article
    // const id = props.location.article;    
    // const article = props.location.article;    

    
    // Content for articles comes from data.js in Data folder and are mapped accordingly
    // Consulted T.A. and this is the recommended structure to use for static information

    /*
    Article object is passed in from ArticleCard
    {
        title1: "",
        content1: "",
        title2: "",
        content2: "",
        title3: "",
        content3: "",
        content4: "",
        date: "",
        author: "",
    }
    Should be able to access the JSON to render each part
    */
   constructor(props) {
       super(props);
       this.state = {
           article: {
            title1: "",
            date: "",
            author: "",
            content1: "",
            title2: "",
            content2: "",
            title3: "",
            content3: "",
            content4: "",}
       }
   }

   componentWillMount() {
        getOneArticle(this,this.props.location.article._id)
   }

    render() {

        //console.log(`this is after setState.... ${this.state.article}`);
        //console.log(`this is after setState.... ${this.state.article.title1}`);

    const article = this.props.location.article;
    const isAdmin = this.props.location.isAdmin;
    const home = this.props.location.home;

    //console.log(`this is after setState and const .... ${article}`);
    //console.log(`this is after setState.... ${article.title1}`);


    if (article) {
    return (
        <div>
        <span className="LogoContainer">
                <Logo />
            </span>
            <span className="LoginButtonContainer">
                {/* need to pass in loginStatus???*/}
                <LoginButton app={home.props.app}/>
            </span>
            <MenuBar articles={home.state.article} home={home} isAdmin={isAdmin}/>

        <Box className="box" display="flex" justifyContent="center" key={article.id}>
            <div>
                <Grid container spacing={5} >
                    <Grid item className="page_grid">
                        <Card>
                            {isAdmin ?
                                (<Link to={{pathname:'\EditArticle', artpage: this, article: this.state.article, home: home, isAdmin: isAdmin}} className= "cardclick">
                                    <Button variant="outlined" color="primary" className="editButton">Edit</Button>
                                </Link>) : (<div/>)
                            }
                            <Box pt={3} pr={3} pl={3} pb={2} >
                                <Typography variant="h3" >
                                {this.state.article.title1}
                                </Typography>
                                    <br/>
                                        {this.state.article.content1}
                                    <br/>
                                    <br/>
                                <Typography variant="h5" >
                                {this.state.article.title2}
                                </Typography>
                                    {this.state.article.content2}
                                    <br/>
                                    <br/>
                                <Typography variant="h5" >
                                    {this.state.article.title3}
                                </Typography>
                                    {article.content3}
                                    <br/>
                                    <br/>
                                    {this.state.article.content4}

                                <Box pt={10}>
                                    <Grid spacing={2} container>
                                            <Grid item >
                                            <Button variant="outlined" href="https://www.who.int/topics/vaccines/en/">WHO Vaccines</Button>
                                            <Button variant="outlined" href="https://www.canada.ca/en/public-health/services/immunization-vaccines.html">Health Canada </Button>
                                            </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </Box>
        </div>
        );        
    
    }
    else {
        return (
            <div className = "article_page">
                <span className="LogoContainer">
                    <Logo />
                </span>
                <span className="LoginButtonContainer">
                    {/* {this.isAdmin */}
                        {/* <LoginButton loginStatus={loginStatus} /> */}
                    {/* } */}
                </span>
                <span className="NotificationContainer">
                    <Notification number={0} />
                </span>
                <MenuBar />
                Cannot access articles from here, please return to Home page...
            </div>
            )
    }
}
}
export default ArticlePage;
    