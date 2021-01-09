import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "../User/Pages/Users";
import PlaceForm from '../Places/Pages/PlaceForm';
import MainHeader from '../Shared/UIElements/Navigation/MainHeader/MainHeader';
import UserPlaces from '../Places/Pages/UserPlaces';
import './Main.css';

function Main() {
  
  return (
    <Router>
      <MainHeader />
      <main className="">
      <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/place/new" >
            <PlaceForm />
          </Route>
          <Route path="/place/:placeId">
            <PlaceForm updateMode/>
          </Route>
          <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
}

export default Main;
