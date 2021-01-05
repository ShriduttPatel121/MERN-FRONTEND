import React, { useState } from 'react';
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
                minWidth : '35vw'
            }
        }
    }
});
const NavLinks = (props) =>{
    const classes = useStyles();

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

    return(
        <React.Fragment>
            <Tabs value={tabValue} onChange={handleChange} className={ props.orientation === 'vertical'? classes.verticalRoot : classes.root} orientation={props.orientation}>
                <Tab label="All Users" to="/" exact component={NavLink}/>
                <Tab label="My Places" to="/u1/places" component={NavLink}/>
                <Tab label="Add Places" to="/places/new" component={NavLink}/>
                <Tab label="Authenticate" to="/Auth" component={NavLink}/>
            </Tabs>
        </React.Fragment>
    );
};
export default NavLinks;