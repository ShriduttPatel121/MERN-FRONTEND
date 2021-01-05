import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  SwipeableDrawer
} from "@material-ui/core";
import  MenuIcon  from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '2px',
  },
  title: {
    flexGrow: 1,
  },
}));
const MainHeader = (props) => {
  const classes = useStyles();

  const [ drawerVisibility, setDrawerVisibility] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      console.log('test on button')
      return;
    }
    setDrawerVisibility(open);
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
            onClick={toggleDrawer(true)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
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
      <div>
        This A drawer
      </div>
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
