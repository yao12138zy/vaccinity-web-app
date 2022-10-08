import React from 'react';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
export default class VaccineBasicButton extends React.Component{
  state = {
    anchorEl: null,
  }

  render(){
    const handleMenu = (event) => {
      this.setState({anchorEl:event.currentTarget});
    };
    const handleClose = () => {
      this.setState({anchorEl:null});
    };

    const {buttonInfo} = this.props;
    return (
      <div>
      <Button id='VaccineBasicButton'
        onClick={handleMenu}
        color="inherit"
        onMouseOver={handleMenu}
      >
        {buttonInfo.buttonName}
      </Button>
      <Menu
        className="simple-menu"
        anchorEl={this.state.anchorEl}
        
        open={Boolean(this.state.anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}

      >
        {buttonInfo.optionList.map(option=>(
          <MenuItem className = 'menuItem' onClick={handleClose}>{option}</MenuItem>
        ))}

      </Menu>
      </div>
    )

  }

}
