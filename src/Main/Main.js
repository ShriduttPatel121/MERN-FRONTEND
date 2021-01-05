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

function Main() {
  
  return (
    <Router>
      <MainHeader />
      <Switch>
        <main style={{marginTop : '64px'}}>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/places/new" exact>
            <NewPlaces />
          </Route>
          <Redirect to="/" />
        </main>
      </Switch>
    </Router>
  );
}

export default Main;
