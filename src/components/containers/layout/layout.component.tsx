import React from 'react';
import AppBar from '../appbar/appbar.component';
import Drawer from '../drawer/drawer.component';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';

import Content from '../content/content.component';
import useStyles from './layout.styles';

const Layout: React.FC = () => {
  const { root, content, contentShift, drawerHeader } = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={root}>
      <CssBaseline />
      <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Drawer handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(content, {
          [contentShift]: open,
        })}
      >
        <div className={drawerHeader} />
        <Content />
      </main>
    </div>
  );
};

export default Layout;
