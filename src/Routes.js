import React from "react";
import Layout from "./hoc/Layout";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import SignIn from "./components/sign_in";
import Dashboard from "./components/admin/Dashboard";

import PrivateRoutes from "./components/authRoutes/PrivateRoutes";
import PublicRoutes from "./components/authRoutes/PublicRoutes";
const Routes = props => {
  console.log(props);
  return (
    <div className="App">
      <Layout>
        <Switch>
          <PrivateRoutes
            {...props}
            path="/dashboard"
            exact
            component={Dashboard}
          />
          <PublicRoutes
            restricted={false}
            {...props}
            path="/"
            exact
            component={Home}
          />
          <PublicRoutes
            restricted={true}
            {...props}
            path="/sign_in"
            exact
            component={SignIn}
          />

          {/* <Route exact component={SignIn} path="/sign_in" />
          <Route exact component={Home} path="/" /> */}
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
