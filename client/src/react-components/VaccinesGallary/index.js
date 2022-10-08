import React from "react";
import Typography from "@material-ui/core/Typography";
import VaccineButton from "./VaccineButton";
import Grid from "@material-ui/core/Grid";
import "./style.css";

export default class VaccineCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Web: [
        { name: "WHO", link: "https://www.who.int/topics/vaccines/en/" },
        { name: "Immunize", link: "https://immunize.ca/diseases-vaccines" },
        { name: "Ontario", link: "https://www.ontario.ca/page/vaccines" },
        {
          name: "CDC",
          link: "https://www.cdc.gov/vaccines/adults/rec-vac/index.html",
        },
      ],
    };
  }
  render() {
    let i = 0;

    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Typography id="TypoOnCard" variant="h4">
              Useful Links
            </Typography>
          </Grid>
        </Grid>

        <Grid container justify="center" alignItems="center">
          {this.state.Web.map((each) => (
            <a href={each.link}>
              <Grid item>
                <span className="VaccineButtonContainer">
                  <VaccineButton VaccineName={each.name} />
                </span>
              </Grid>
            </a>
          ))}
        </Grid>
      </div>
    );
  }
}
