import React from "react";
import {Grid, Typography, Paper, Button} from "@material-ui/core";
import LoginButton from "../LoginButton";
import Logo from "../Logo";
import Notification from "../Notification";
import MenuBar from "../MenuBar";
import ArticleCard from "../ArticleCard";
import {Link} from 'react-router-dom';
import image1 from './static/1.jpg';
import image2 from './static/3.jpg';
import image3 from './static/5.jpg';
import image4 from './static/4.jpg';
import image5 from './static/2.jpg';
import image6 from './static/6.jpg';
import "./styles.css";
import AddArticle from "../AddArticle";
import {getArticles} from "../../actions/article";

class AllArticles extends React.Component {

    // This is a collection of all articles
    // article id passed into the ArticleCard component in order to 
    // retrive the corresponding article (title and summary is hardcoded)

    constructor(props) {
      super(props);
      this.state = {
        article: []
      }
    }

    componentWillMount() {
      // change this according to action file
      getArticles(this);
    }

    render() {

    const articles = this.props.location.articles;
    const home = this.props.location.home;
    const isAdmin = this.props.location.isAdmin;

  return (    

    // article is a list of all articles retrived by GET request from database
    // shuld loop through article list and feed in an article to ArticleCard


    <Paper>
      <span className="LogoContainer">
        <Logo />
      </span>
      <span className="LoginButtonContainer">
        <LoginButton app={home.props.app}/>
      </span>
      <MenuBar articles= {home.state.article} home= {home} isAdmin= {isAdmin}/>

      <div className="articleSection_grid" >
        <Grid container>
          <Typography variant="h3" className = "title">
            Articles
          </Typography>
        </Grid>

        {isAdmin ?
          (<Link to={{pathname:'\AddArticle', artpage: this, home: home, isAdmin: isAdmin}} className= "cardclick">
                <Button variant="outlined" color="primary" className="editButton">Add</Button>
            </Link>) : (<div/>)
        }
        <Grid container >
        {articles.map( (article) => {
          return (
            <div>
              <Grid container>
              <Grid item
                className="articleSection_grid"
                lg={3}
              >
                <ArticleCard home={home} article={article} isAdmin={isAdmin}/>
              </Grid>
              </Grid>
            </div>
          )
        })}

        </Grid>
      </div>
    </Paper>
  );
};
}

export default AllArticles;