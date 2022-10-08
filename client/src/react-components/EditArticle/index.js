import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import data from './../Data';
import LoginButton from "../LoginButton";
import Logo from "../Logo";
import Notification from "../Notification";
import MenuBar from "../MenuBar";
import {Link} from 'react-router-dom';
import {updateArticle} from "../../actions/article";

import "./styles.css";
import { Button } from "@material-ui/core";

/* Component for the user information form in My Profile page */
class EditArticle extends React.Component {
  // Fields that could be modified
  state = {
    title1: "",
    date: "",
    author: "",
    title2: "",
    title3: "",
    content1: "",
    content2: "",
    content3: "",
    content4: "",
    sections: [],
    disable:false,
  };

  // Generic handler for input change
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    //!!!!!!!!!!!!!
    // NOT WORKING NEED TO FIX
    // const {
    //     loginStatus,
    //   } = this.props;

    this.setState({
      [name]: value,
    });
  };

  render() {

    const article = this.props.location.article; 
    const home = this.props.location.home;
    const isAdmin = this.props.location.isAdmin;
    const artpage = this.props.location.artpage;
    
    return (
      <div>
      <span className="LogoContainer">
          <Logo />
        </span>
        <span className="LoginButtonContainer">
            <LoginButton app={home.props.app} />{" "}
        </span>
        <MenuBar articles= {home.state.article} home= {home} isAdmin= {isAdmin}/>

        <Grid className="articleEdit" container spacing={1}>
          <Grid className="row" container item spacing={1}>
            <Grid className="title" item xs={12}>
              Title
            </Grid>
            <Grid item xs={9}>
              <TextField
                disabled={this.state.disable}
                multiline
                fullWidth
                name="title1"
                defaultValue={article.title1}
                margin="dense"
                variant="outlined"
                onChange={this.handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid className="title" item xs={12}>
              Summary
            </Grid>
            <Grid item xs={9}>
              <TextField
                disabled={this.state.disable}
                multiline
                fullWidth
                name="content1"
                defaultValue={article.content1}
                margin="dense"
                variant="outlined"
                size="small"
                onChange={this.handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid className="row" container item spacing={1}>
            <Grid className="title" item xs={12}>
              Section Title 1
            </Grid>
            <Grid item xs={9}>
              <TextField
                disabled={this.state.disable}
                multiline
                fullWidth
                name="title2"
                defaultValue={article.title2}
                margin="dense"
                variant="outlined"
                size="small"
                onChange={this.handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid className="title" item xs={12}>
              Content 1
            </Grid>
            <Grid item xs={9}>
              <TextField
                disabled={this.state.disable}
                multiline
                fullWidth
                name="content2"
                defaultValue={article.content2}
                margin="dense"
                variant="outlined"
                size="small"
                onChange={this.handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid className="row" container item spacing={1}>
            <Grid className="title" item xs={12}>
              Section Title 2
            </Grid>
            <Grid item xs={9}>
              <TextField
                disabled={this.state.disable}
                multiline
                fullWidth
                name="title3"
                defaultValue={article.title3}
                margin="dense"
                variant="outlined"
                size="small"
                onChange={this.handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={1}>
            <Grid className="title" item xs={12}>
              Content 2
            </Grid>
            <Grid item xs={9}>
              <TextField
                disabled={this.state.disable}
                multiline
                fullWidth
                name="content3"
                defaultValue={article.content3}
                margin="dense"
                variant="outlined"
                size="small"
                onChange={this.handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid className="row" container item spacing={1}>
            <Grid className="title" item xs={12}>
              Content 3
            </Grid>
            <Grid item xs={9}>
              <TextField
                disabled={this.state.disable}
                multiline
                fullWidth
                name="content4"
                defaultValue={article.content4}
                margin="dense"
                variant="outlined"
                size="small"
                onChange={this.handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid className="row" container item spacing={6}>

              <Grid item xs={6}>
                <Link to={{pathname:'\ArticlePage', article: article, home: home, isAdmin: isAdmin}} className= "cardclick">
                    <Button
                    onClick={() => updateArticle(home, artpage, article._id, this)}
                    className = "ProfileButton"
                    id="saveButton"
                    color="primary"
                    variant="outlined"
                    >
                    Save Changes
                    </Button>
                </Link>
              </Grid>

          </Grid>
        </Grid>
      </div>
    );
  }

}

export default EditArticle;
