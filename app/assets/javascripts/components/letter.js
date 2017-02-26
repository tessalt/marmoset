import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import LetterForm from './letter-form';
import {updateLetter, sendLetter} from '../mutations/letter';
import {showLetter} from '../queries/letter';

class Letter extends React.Component {
  updateLetter(letter) {
    this.props.updateLetter({
      variables: {
        letter: {
          id: this.props.params.id,
          contents: letter.contents,
          subject: letter.subject
        }
      }
    }).then((response) => {
    });
  }

  send() {
    this.props.sendLetter({
      variables: {
        letter: {
          id: this.props.params.id,
          list_id: this.props.params.list_id
        }
      }
    }).then((response) => {
    });
  }

  render() {
    return (
      <div>
        <h2></h2>
        {!this.props.data.loading &&
          <div>
            <LetterForm onSubmit={this.updateLetter.bind(this)} letter={this.props.data.letter} action="update"/>
            <button onClick={this.send.bind(this)} type="button">Send</button>
          </div>
        }
      </div>
    )
  }
}

Letter.propTypes = {
  updateLetter: PropTypes.func.isRequired,
  sendLetter: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    letter: PropTypes.obj
  }),
}

export default compose(
  graphql(updateLetter, {name: 'updateLetter'}),
  graphql(sendLetter, {name: 'sendLetter'}),
  graphql(showLetter, {
    options: ({params}) => {
      return {
        variables: {
          letter: params.id,
          list: params.list_id
        }
      }
    }
  }),
)(Letter)
