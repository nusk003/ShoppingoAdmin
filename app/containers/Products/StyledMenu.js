import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  menu: {
    maxWidth: 400,
    margin: '20 auto'
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

function StyledMenu(props) {
  const { classes,onChange } = props;

  return (
    <Paper className={classes.menu}>
      <MenuList defaultValue = "General"  >
        <MenuItem onClick = {()=>onChange("General")}   className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <SendIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} variant="inset" primary="General" />
        </MenuItem>
        <MenuItem onClick = {()=>onChange("Combinations")}  className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} variant="inset" primary="Combinations" />
        </MenuItem>
        <MenuItem onClick = {()=>onChange("Images")}  className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} variant="inset" primary="Images" />
        </MenuItem>
        <MenuItem onClick = {()=>onChange("Keywords")}  className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} variant="inset" primary="Keywords" />
        </MenuItem>
        <MenuItem onClick = {()=>onChange("Description")}  className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} variant="inset" primary="Description" />
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

StyledMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StyledMenu);