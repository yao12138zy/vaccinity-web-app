import React, { Fragment } from "react";
import PropTypes from "prop-types";

import {
  Grid,
  Typography,
  Container,
  Card,
  Button,
  Box,
  withStyles,
  withWidth,
  isWidthUp,
} from "@material-ui/core";
import { BrowserRouter as Router, Link } from "react-router-dom";
import headerImage from "./static/1.jpg";
import "./styles.css";

const styles = (theme) => ({
  card: {
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(16),
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(6),
    },
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
});

function TopSection(props) {
  const { classes, theme, width } = props;
  return (
    <Fragment>
      <div>
        <Box display="flex" justifyContent="center" className="row">
          <Card className={classes.card}>
            <Container maxWidth="lg">
              <Box justifyContent="space-between" className="row">
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      height="100%"
                    >
                      <Box mb={10}>
                        <Typography
                          variant={isWidthUp("lg", width) ? "h3" : "h4"}
                        >
                          Vaccination
                        </Typography>
                      </Box>
                      <div>
                        <Box mb={5}>
                          <Typography
                            variant={isWidthUp("lg", width) ? "h6" : "body1"}
                            color="textSecondary"
                          >
                            Vaccination is one of the most effective ways to
                            prevent diseases. A vaccine helps the body’s immune
                            system to recognize and fight pathogens like viruses
                            or bacteria, which then keeps us safe from the
                            diseases they cause.
                          </Typography>
                        </Box>
                        <Link
                          to="/dashboard/bookingHistory"
                          className="LinkButton"
                        >
                          <Button
                            size="large"
                            variant="contained"
                            color="primary"
                          >
                            Get Schedule
                          </Button>
                        </Link>

                        <Link to="/dashboard/eir" className="LinkButton">
                          <Button
                            id="HistoryButton"
                            size="large"
                            variant="contained"
                            color="secondary"
                          >
                            View eIR
                          </Button>
                        </Link>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <img src={headerImage} className={classes.image} />
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Card>
        </Box>
      </div>
    </Fragment>
  );
}

TopSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object,
};

export default withWidth()(withStyles(styles, { withTheme: true })(TopSection));
