import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Public extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Marmoset</h2>
        {this.props.children}
      </div>
    )
  }
}


