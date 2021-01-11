import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import { AuthContext } from '../../../context/auth-context';

const useStyles = makeStyles({
    root : {
        '& .MuiTabs-flexContainer' : {
            height : '64px',
            display : 'none',
            '@media(min-width : 600px)' : {
                display : 'flex'
            }
        }
    },

    verticalRoot : {
        '& .MuiTabs-flexContainer' : {
            '@media(max-width : 599px)' : {
                height : '100%',
                display : 'flex',
                minWidth : '40vw'
            }
        }
    }
});
const NavLinks = (props) =>{
    const classes = useStyles();

    const auth = useContext(AuthContext);

    const { pathname } = useLocation();

    const [tabValue, setTabValue] = useState("/");

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

      useEffect(() => {
         if (pathname.includes('/places')) {
            if (auth.isLoggedIn) {
                setTabValue('/places');
            } else {
                setTabValue(0);
            }
         } else if (pathname.includes('/new')) {
             setTabValue('/place/new');
         }  else if (pathname === '/Auth') {
             setTabValue('/Auth');
         }  else if (pathname === '/') {
             setTabValue('/');
         } else {
             setTabValue(0);
         }
         console.log(pathname);
      }, [pathname, auth.isLoggedIn]);

    return(
        <React.Fragment>
            <Tabs value={tabValue} onChange={handleChange} className={ props.orientation === 'vertical'? classes.verticalRoot : classes.root} orientation={props.orientation}>
                <Tab label="All Users" onClick={props.closeDrawer(false)} value="/" to="/" exact component={NavLink}/>
                { auth.isLoggedIn ? <Tab label="My Places" onClick={props.closeDrawer(false)} value="/places" to="/u1/places" component={NavLink}/> : null}
                { auth.isLoggedIn ? <Tab label="Add Places" onClick={props.closeDrawer(false)} value="/place/new" to="/place/new" component={NavLink}/> : null}
                { auth.isLoggedIn ? <Tab label="Logout" onClick={auth.logout} value="/logout" to="/Auth" component={NavLink}/> : null}
                { !auth.isLoggedIn ? <Tab label="Authenticate" onClick={props.closeDrawer(false)} value="/Auth" to="/Auth" component={NavLink}/> : null}
                <Tab disabled value={0} style={{display : 'none'}}/>
            </Tabs>
        </React.Fragment>
    );
};
export default NavLinks;