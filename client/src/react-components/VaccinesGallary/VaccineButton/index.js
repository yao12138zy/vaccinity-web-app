import React from 'react';
import Typography from '@material-ui/core/Typography';
import VaccineIcon from "../VaccineIcon";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import "./style.css";

export default class VaccineButton extends React.Component{

  render(){
    const {VaccineName}= this.props;


    return(
      <div>
        <span className="VaccineButtonContainer">
          <Button>
            <span>

              <span className="VaccineIconContainer">
                <VaccineIcon />
              </span>
              <span className="TypographyContainer">
                <Typography align="center">
                   {VaccineName}
                </Typography>
              </span>
            </span>
          </Button>
        </span>



      </div>
    )
  }



}
