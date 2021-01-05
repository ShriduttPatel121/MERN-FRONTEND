import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
const NavLinks = (props) =>{
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

    return(
        <React.Fragment>
            <Tabs value={tabValue} onChange={handleChange}>
                <Tab label="/All Users" to="/" exact component={NavLink}/>
                <Tab label="My Places" to="/u1/places" component={NavLink}/>
                <Tab label="Add Places" to="/places/new" component={NavLink}/>
                <Tab label="Authenticate" to="/Auth" component={NavLink}/>
            </Tabs>
        </React.Fragment>
    );
};
export default NavLinks;