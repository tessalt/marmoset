import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider, graphql} from 'react-apollo';
import { Router, Route, Link, browserHistory, useRouterHistory } from 'react-router'
import { createHistory } from 'history'

import Lists from './components/lists';
import List from './components/list';
import App from './components/app';
import Login from './components/login';
import Signup from './components/signup';
import Compose from './components/compose';
import Letter from './components/letter';
import LetterEdit from './components/letter-edit';

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

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (o) => {
    return o.id;
  }
});

const history = useRouterHistory(createHistory)({
  basename: '/app'
})

ReactDOM.render((
  <ApolloProvider client={client} >
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="lists" component={Lists} />
        <Route path="lists/:id" component={List}/>
        <Route path="lists/:list_id/compose" component={Compose}/>
        <Route path="lists/:list_id/letters/:id" component={Letter}/>
        <Route path="lists/:list_id/letters/:id/edit" component={LetterEdit}/>
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
