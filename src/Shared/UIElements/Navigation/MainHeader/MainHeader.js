import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer
} from "@material-ui/core";
import  MenuIcon  from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";

import NavLinks from '../NavLinks/NavLinks';

const useStyles = makeStyles(() => ({
  root: {
  },
  menuButton: {
    marginRight: '2px',
    display : 'block',
    '@media(min-width : 600px)' : {
      display : 'none'
    }
  },
  title: {
    flexGrow: 1,
  },
  'horizontal-nav' : {
    display : 'none',
    '@media(min-width : 600px)' : {
      display : 'flex'
    }
  },

  'vertical-nav' : {
    display : 'none',
    '@media(max-width : 599px' : {
      display : 'flex',
      height : '100%'
    }
  }
}));
const MainHeader = (props) => {
  const classes = useStyles();

  const [ drawerVisibility, setDrawerVisibility] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    } 
    setDrawerVisibility(preState => {
      if (preState === false && open === false ) {
        return drawerVisibility
      } else {
        return open;
      }
    });
  };
  const headerBar = (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={ toggleDrawer(true)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Places
          </Typography>
          <span className="horizontal-nav">
            <NavLinks orientation="horizontal" closeDrawer={toggleDrawer}/>
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );

  const swipableDrawer = (
    <SwipeableDrawer 
      anchor="left"
      open={drawerVisibility}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <span className="vertical-nav">
        <NavLinks orientation="vertical" closeDrawer={toggleDrawer}/>
      </span>
    </SwipeableDrawer>
  );

  return (
    <React.Fragment>
      {headerBar}
      {swipableDrawer}
    </React.Fragment>
  );
};
export default MainHeader;
