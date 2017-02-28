import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider, graphql} from 'react-apollo';
import { Router, Route, Link, browserHistory, useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import Public from './components/public/index'
import Subscribe from './components/public/subscribe'

const networkInterface = createNetworkInterface({
  uri: '/graphql',

  opts: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({
  dataIdFromObject: (o) => {
    return o.id;
  }
});

ReactDOM.render((
  <ApolloProvider client={client} >
    <Router history={browserHistory}>
      <Route path="/" component={Public}>
        <Route path=":user_id/:list_id" component={Subscribe}/>
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
