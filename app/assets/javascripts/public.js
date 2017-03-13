import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider, graphql} from 'react-apollo';
import { Router, Route, Link, browserHistory, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import Public from './components/public/index';
import Subscribe from './components/public/subscribe';
import Confirm from './components/public/confirm';
import Unsubscribe from './components/public/unsubscribe';

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
        <Route path=":list_id/confirm/:subscriber_id" component={Confirm}/>
        <Route path=":list_id/unsubscribe/:subscriber_id" component={Unsubscribe}/>
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
