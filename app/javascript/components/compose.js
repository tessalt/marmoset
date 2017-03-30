import React, {PropTypes} from 'react';
import { compose, graphql } from 'react-apollo';
import LetterForm from './letter-form';
import { Link } from 'react-router'
import {createLetter} from '../mutations/letter';

class Compose extends React.Component {
  createLetter(letter) {
    this.props.createLetter({
      variables: {
        letter: {
          list_id: letter.list_id || null,
          contents: letter.contents,
          subject: letter.subject
        }
      }
    }).then((response) => {
      this.props.router.replace(`/`)
    });
  }

  render() {
    return (
      <div className="cf">
        <div className="fl w-20 pa2">
          <Link to={`/app`} className="db pv2 link">Back</Link>
          <Link to="/lists" className="db pv2 link">Lists</Link>
          <Link to="/settings" className="db pv2 link black">Settings</Link>
        </div>
        <div className="fl w-60">
          <h2>Compose</h2>
          <LetterForm onSubmit={this.createLetter.bind(this)} action="create"/>
        </div>
      </div>
    )
  }
}

Compose.propTypes = {
  createLetter: PropTypes.func.isRequired
}

export default compose(
  graphql(createLetter, {
    name: 'createLetter'
  }),
)(Compose);
