import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider, graphql} from 'react-apollo';
import { Router, Route, Link, browserHistory } from 'react-router'

import Lists from './components/lists';
import App from './components/app';
import Login from './components/login';

const networkInterface = createNetworkInterface({
  uri: 'graphql',
  opts: {
    credentials: 'same-origin',
  }
});

const client = new ApolloClient({networkInterface});

ReactDOM.render((
  <ApolloProvider client={client} >
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="login" component={Login} />
        <Route path="lists" component={Lists} />
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
