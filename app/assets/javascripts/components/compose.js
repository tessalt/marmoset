import React, {PropTypes} from 'react';
import { graphql } from 'react-apollo';
import LetterForm from './letter-form';
import {createLetter} from '../mutations/letter';

class Compose extends React.Component {
  createLetter(letter) {
    this.props.mutate({
      variables: {
        letter: {
          list_id: this.props.params.list_id,
          contents: letter.contents,
          subject: letter.subject
        }
      }
    }).then((response) => {
      this.props.router.replace(`/lists/${this.props.params.list_id}`)
    });
  }

  render() {
    return (
      <div>
        <h2>Compose</h2>
        <LetterForm onSubmit={this.createLetter.bind(this)}/>
      </div>
    )
  }
}

Compose.propTypes = {
  mutate: PropTypes.func.isRequired
}

export default graphql(createLetter)(Compose);
