import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import "./style.css"
const useStyles = theme => ({
  root: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
});


class VaccineIcon extends React.Component{

  render(){
    const {classes} = this.props;

    return(
      <div>
      <span className="VaccineIconContainer">
        <Avatar
          className="VaccineIcon"
          alt="icon"
          src="/static/images/VaccineIcon.jpg"
          className={classes.root}
        />
      </span>
      </div>
    )
  }

}
export default withStyles(useStyles)(VaccineIcon)
