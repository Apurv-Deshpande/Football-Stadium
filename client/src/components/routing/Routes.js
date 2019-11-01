import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import AddStadium from "../stadium-forms/AddStadium";
import PrivateRoute from "../routing/PrivateRoute";
import Stadiums from "../stadiums/Stadiums";
import Stadium from "../stadium/Stadium";
import EditStadium from "../stadium-forms/EditStadium";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/stadiums" component={Stadiums} />
        <Route exact path="/stadium/:id" component={Stadium} />
        <PrivateRoute exact path="/add-stadium" component={AddStadium} />
        <PrivateRoute exact path="/edit-stadium" component={EditStadium} />
      </Switch>
    </section>
  );
};

export default Routes;
