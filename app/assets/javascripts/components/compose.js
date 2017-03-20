import React, {PropTypes} from 'react';
import { graphql } from 'react-apollo';
import LetterForm from './letter-form';
import { Link } from 'react-router'
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
      <div className="cf">
        <div className="fl w-20 pa2">
          <Link to={`/lists/${this.props.params.list_id}`} className="db pv2 link">Back</Link>
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
  mutate: PropTypes.func.isRequired
}

export default graphql(createLetter)(Compose);
