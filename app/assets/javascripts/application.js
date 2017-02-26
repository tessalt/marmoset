import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider, graphql} from 'react-apollo';
import { Router, Route, Link, browserHistory } from 'react-router'

import Lists from './components/lists';
import List from './components/list';
import App from './components/app';
import Login from './components/login';
import Signup from './components/signup';
import Compose from './components/compose';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

networkInterface.useAfter([
  {
    applyAfterware({response}, next) {
      if (response.status === 401) {
        window.location.replace('/login');
      } else {
        next();
      }
    }
  }
])

const client = new ApolloClient({networkInterface});

ReactDOM.render((
  <ApolloProvider client={client} >
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="lists" component={Lists} />
        <Route path="lists/:id" component={List}/>
        <Route path="lists/:list_id/compose" component={Compose}/>
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
