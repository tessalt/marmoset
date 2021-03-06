import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router'
import {indexLetters} from '../queries/letter';
import SideNav from './side-nav';
import Letters from './letters';

class Drafts extends React.Component {
  render() {
    const letters = this.props.data.letters ? this.props.data.letters.filter((letter) => {
      return !letter.sent;
    }) : null;
    return (
      <div className="cf">
        <SideNav />
        <div className="fl w-60">
          <h1>Drafts</h1>
          <Letters letters={letters} edit={true} />
        </div>
      </div>
    )
  }
}

export default graphql(indexLetters, {
  options: props => ({
    forceFetch: true,
  })
})(Drafts);
