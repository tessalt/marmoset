import React, {PropTypes} from 'react';
import { compose, graphql } from 'react-apollo';
import LetterForm from './letter-form';
import SideNav from './side-nav';
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
      this.props.router.replace(`/drafts`)
    });
  }

  render() {
    return (
      <div className="cf">
        <SideNav />
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
    name: 'createLetter',
  }),
)(Compose);
