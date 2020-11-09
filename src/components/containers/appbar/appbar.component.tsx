import React from 'react';
import { connect } from 'react-redux';
import { setCurrentAdmin } from '../../../redux/admin/admin.actions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { default as AppBarMUI } from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logoutButton: {
      position: 'absolute',
      right: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
  })
);
interface Props {
  handleDrawerOpen: () => void;
  setCurrentAdmin: (admin: null) => void;
  open: boolean;
}

const AppBar: React.FC<Props> = ({ handleDrawerOpen, setCurrentAdmin, open }) => {
  const classes = useStyles();

  const handleLogout = () => {
    setCurrentAdmin(null);
  };

  return (
    <AppBarMUI
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Button className={classes.logoutButton} onClick={handleLogout} color='inherit'>
          Logout
        </Button>
      </Toolbar>
    </AppBarMUI>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentAdmin: (admin) => dispatch(setCurrentAdmin(admin)),
});
export default connect(null, mapDispatchToProps)(AppBar);
