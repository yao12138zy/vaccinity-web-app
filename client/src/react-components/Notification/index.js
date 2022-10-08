import React from 'react';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import './style.css'
export default class Notification extends React.Component {

  render(){
    const {number} = this.props;

    return(
      <div>
        <IconButton id='NotiButton' aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={number} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </div>
    )
  }


}
