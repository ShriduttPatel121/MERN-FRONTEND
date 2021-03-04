import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "../User/Pages/Users";
import PlaceForm from "../Places/Pages/PlaceForm";
import MainHeader from "../Shared/UIElements/Navigation/MainHeader/MainHeader";
import UserPlaces from "../Places/Pages/UserPlaces";
import UserAuth from "../User/Pages/UserAuth";
import { AuthContext } from "../Shared/context/auth-context";
import "./Main.css";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null)

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes = null;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/place/new">
          <PlaceForm />
        </Route>
        <Route path="/place/:placeId">
          <PlaceForm updateMode />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/Auth" exact>
          <UserAuth />
        </Route>
        <Redirect to="/Auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
    >
      <Router>
        <MainHeader />
        <main className="">
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default Main;
