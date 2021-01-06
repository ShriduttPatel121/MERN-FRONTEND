import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

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

    const [tabValue, setTabValue] = useState("/");

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

      useEffect(() => {
         if (window.location.href.includes('/places')) {
            setTabValue('/places');
         } else if (window.location.href.includes('/new')) {
             setTabValue('/place/new');
         }  else if (window.location.href === '/Auth') {
             setTabValue('/Auth');
         }  else {
             setTabValue('/');
         }
      }, []);

    return(
        <React.Fragment>
            <Tabs value={tabValue} onChange={handleChange} className={ props.orientation === 'vertical'? classes.verticalRoot : classes.root} orientation={props.orientation}>
                <Tab label="All Users" onClick={props.closeDrawer(false)} value="/" to="/" exact component={NavLink}/>
                <Tab label="My Places" onClick={props.closeDrawer(false)} value="/places" to="/u1/places" component={NavLink}/>
                <Tab label="Add Places" onClick={props.closeDrawer(false)} value="/place/new" to="/place/new" component={NavLink}/>
                <Tab label="Authenticate" onClick={props.closeDrawer(false)} value="/Auth" to="/Auth" component={NavLink}/>
            </Tabs>
        </React.Fragment>
    );
};
export default NavLinks;