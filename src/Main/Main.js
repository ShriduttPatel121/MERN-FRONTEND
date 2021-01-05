import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "../User/Pages/Users";
import NewPlaces from '../Places/Pages/NewPlaces';
import MainHeader from '../Shared/UIElements/Navigation/MainHeader/MainHeader';
import SideDrawer from '../Shared/UIElements/Navigation/SideDrawer/SideDrawer';

function Main() {
  
  return (
    <Router>
      <MainHeader />
      <main style={{marginTop : '64px'}}>
      <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/places/new" exact>
            <NewPlaces />
          </Route>
          <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
}

export default Main;
