import React from 'react';
import Layout from './hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
const Routes = props => {
   return (
      <div className='App'>
         <Layout>
            <Switch>
               <Route exact component={Home} path='/' />
            </Switch>
         </Layout>
      </div>
   );
};

export default Routes;
