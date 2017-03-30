import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider, graphql} from 'react-apollo';
import { Router, Route, Link, browserHistory, useRouterHistory, IndexRoute } from 'react-router'
import { createHistory } from 'history'

import Lists from '../components/lists';
import List from '../components/list';
import ListNew from '../components/list-new';
import App from '../components/app';
import Login from '../components/login';
import Signup from '../components/signup';
import Compose from '../components/compose';
import Letter from '../components/letter';
import LettersIndex from '../components/letters-index';
import Drafts from '../components/drafts';
import LetterEdit from '../components/letter-edit';
import ListEdit from '../components/list-edit';
import Settings from '../components/settings';

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
        <IndexRoute component={LettersIndex} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="settings" component={Settings} />
        <Route path="lists" component={Lists} />
        <Route path="drafts" component={Drafts} />
        <Route path="lists/new" component={ListNew} />
        <Route path="lists/:id" component={List}/>
        <Route path="lists/:id/edit" component={ListEdit}/>
        <Route path="compose" component={Compose}/>
        <Route path="letters/:id" component={Letter}/>
        <Route path="letters/:id/edit" component={LetterEdit}/>
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
