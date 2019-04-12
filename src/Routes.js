import React from "react";
import Layout from "./hoc/Layout";
import { Switch } from "react-router-dom";
import Home from "./components/home";
import SignIn from "./components/sign_in";
import Dashboard from "./components/admin/Dashboard";
import AdminMatches from "./components/admin/matches";
import AddEditMatch from "./components/admin/matches/AddEditMatch";
import AdminPlayers from "./components/admin/players";
import AddEditPlayer from "./components/admin/players/AddEditPlayer";
import TheTeam from "./components/theTeam";

import PrivateRoutes from "./components/authRoutes/PrivateRoutes";
import PublicRoutes from "./components/authRoutes/PublicRoutes";
const Routes = props => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <PrivateRoutes
            {...props}
            path="/admin_players/add_player/:id"
            exact
            component={AddEditPlayer}
          />
          <PrivateRoutes
            {...props}
            path="/admin_players/add_player"
            exact
            component={AddEditPlayer}
          />
          <PrivateRoutes
            {...props}
            path="/admin_players"
            exact
            component={AdminPlayers}
          />
          <PrivateRoutes
            {...props}
            path="/admin_matches/edit_match"
            exact
            component={AddEditMatch}
          />
          <PrivateRoutes
            {...props}
            path="/admin_matches/edit_match/:id"
            exact
            component={AddEditMatch}
          />
          <PrivateRoutes
            {...props}
            path="/admin_matches"
            exact
            component={AdminMatches}
          />
          <PrivateRoutes
            {...props}
            path="/dashboard"
            exact
            component={Dashboard}
          />
          <PublicRoutes
            restricted={true}
            {...props}
            path="/sign_in"
            exact
            component={SignIn}
          />
          <PublicRoutes
            restricted={false}
            {...props}
            path="/the_team"
            exact
            component={TheTeam}
          />
          <PublicRoutes
            restricted={false}
            {...props}
            path="/"
            exact
            component={Home}
          />

          {/* <Route exact component={SignIn} path="/sign_in" />
          <Route exact component={Home} path="/" /> */}
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
