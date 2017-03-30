import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import Nav from './nav';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="">
        <Nav />
        <div className="fl w-100 pa2">
          {this.props.children}
        </div>
      </div>
    )
  }
}


