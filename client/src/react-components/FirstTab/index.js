import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import "./styles.css";

/////NO CSS IS BEING TRACKED????

export default function FirstTab(props) {

  const home = props.home;
  const isAdmin = props.isAdmin;

  return (
    <div>
        <p>Please select a role of interest to see which vaccinations you should get: 
        </p>
        <Grid container spacing={3}>
              <Grid item xs={4} spacing={5} className="FirstTab_grid">
                <Link to={{pathname:'\InfoPages', article: "Infants", home: home, isAdmin: isAdmin}}
                      className="linked_button">
                  <Button fullWidth color="secondary" variant="outlined" size="large" className="FirstTab_button">
                    Infants
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4} spacing={5} className="FirstTab_grid">
                <Link to={{pathname:'\InfoPages', article: "Teens", home: home, isAdmin: isAdmin}}
                      className="linked_button">
                  <Button fullWidth color="primary" variant="outlined" size="large" className="FirstTab_button">
                    Teens
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4} spacing={5} className="FirstTab_grid">
                <Link to={{pathname:'\InfoPages', article: "Pregnancy", home: home, isAdmin: isAdmin}}
                      className="linked_button">
                  <Button fullWidth color="secondary" variant="outlined" size="large" className="FirstTab_button">
                    Pregnancy
                  </Button>
                </Link>
              </Grid>


              <Grid item xs={4} className="FirstTab_grid">
                  <Link to={{pathname:'\InfoPages', article: "Travelers", home: home, isAdmin: isAdmin}}
                        className="linked_button">
                    <Button fullWidth color="primary" variant="outlined" size="large" className="FirstTab_button">
                      Travelers
                    </Button>
                  </Link>
              </Grid>
              <Grid item xs={4} className="FirstTab_grid">
                  <Link to={{pathname:'\InfoPages', article: "Adults", home: home, isAdmin: isAdmin}}
                        className="linked_button">
                    <Button fullWidth color="secondary" variant="outlined" size="large" className="FirstTab_button">
                      Adults
                    </Button>
                  </Link>
              </Grid>
              <Grid item xs={4} className="FirstTab_grid">
                  <Link to={{pathname:'\InfoPages', article: "Immigrants", home: home, isAdmin: isAdmin}}
                        className="linked_button">
                  <Button fullWidth color="primary" variant="outlined" size="large" className="FirstTab_button">
                    Immigrants
                  </Button>
                  </Link>
              </Grid>
        </Grid>

    </div>
  );
}