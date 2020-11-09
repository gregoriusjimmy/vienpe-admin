import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { default as DrawerMUI } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { Link } from 'react-router-dom';
import navigations from '../_nav';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import classes from '*.module.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    divider: {
      margin: '8px 0px',
    },
  })
);

interface Props {
  handleDrawerClose: () => void;
  open: boolean;
}

const Drawer: React.FC<Props> = ({ handleDrawerClose, open }) => {
  const classes = useStyles();
  const theme = useTheme();
  const createElement = (nav, index) => {
    console.log(nav);
    if (nav.tag === 'nav') {
      console.log(nav);
      return (
        <ListItem button key={index} component={Link} to={nav.to}>
          <ListItemIcon> {React.createElement(nav.icon)} </ListItemIcon>
          <ListItemText primary={nav.name} />
        </ListItem>
      );
    }
    return <Divider className={classes.divider} />;
  };
  return (
    <DrawerMUI
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List component='nav'>{navigations.map((nav, index) => createElement(nav, index))}</List>
    </DrawerMUI>
  );
};

export default Drawer;
