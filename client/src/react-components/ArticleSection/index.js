import React from "react";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import ArticleCard from "../ArticleCard";
import { Link } from "react-router-dom";
import image1 from "./static/1.jpg";
import image2 from "./static/3.jpg";
import image3 from "./static/5.jpg";
import image4 from "./static/4.jpg";
import "./styles.css";

function ArticleSection(props) {
  // article id passed into the ArticleCard component in order to
  // retrive the corresponding article (title and summary is hardcoded)

  const { home, isAdmin } = props;

  // console.log(`article section top articles: ${articles}`);

  return (
    <Paper className="articleSection_paper">
      <Grid container justify="space-between">
        <Typography variant="h4">Articles</Typography>
        <Link
          to={{
            pathname: "AllArticles",
            articles: home.state.article,
            home: home,
            isAdmin: isAdmin,
          }}
          className="linked_button"
        >
          <Button color="primary">Explore All</Button>
        </Link>
      </Grid>
      <div>
        <Grid container>
          {home.state.article.slice(0, 4).map((article) => {
            // console.log(`this is in article section ${article}`);
            return (
              <div>
                <Grid container>
                  <Grid item className="articleSection_grid" xs={3} sm={12}>
                    <ArticleCard
                      home={home}
                      article={article}
                      isAdmin={isAdmin}
                    />
                  </Grid>
                </Grid>
              </div>
            );
          })}
          {/* <Grid item
            className="articleSection_grid"
            xs={12}
            sm={6}
            lg={3}
          >
            <ArticleCard id={'article1'} image={image1} title={'What are vaccines? Learn more...'} summary={'Vaccines are products that protect people...'}/>
          </Grid>
          
          <Grid item
            className="articleSection_grid"
            xs={12}
            sm={6}
            lg={3}
          >
              <ArticleCard id={'article2'} image={image4} title={'How do vaccines work?'} summary={'Vaccines give you immunity to a disease...'}/>
          </Grid>
          <Grid item
            className="articleSection_grid"
            xs={12}
            sm={6}
            lg={3}
          >
              <ArticleCard id={'article3'} image={image3} title={'Why vaccinate? Next Steps...'} summary={'Vaccines have saved more lives in Canada...'}/>
          </Grid>

          <Grid item
            className="articleSection_grid"
            xs={12}
            sm={6}
            lg={3}
          >
            <ArticleCard id={'article4'} image={image2} title={'If you choose not to vaccinate'} summary={'Vaccination is the best way to protect your...'}/>
          </Grid> */}
        </Grid>
      </div>
    </Paper>
  );
}

export default ArticleSection;
