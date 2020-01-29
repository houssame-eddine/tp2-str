import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Main from './components/Main';
import Error from './components/Error';

const App = () => {
  return (
    <div className='app'>
      <Route component={Navbar} />
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/preemptif' component={Main} />
        <Route exact path='/non-preemptif' component={Main} />
        <Route component={Error} />
      </Switch>
    </div>
  );
};

export default App;
