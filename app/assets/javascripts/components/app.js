import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/login">Log in</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/lists">Lists</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}


