import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import LetterForm from './letter-form';
import Errors from './errors';
import {updateLetter, sendLetter} from '../mutations/letter';
import {showLetter} from '../queries/letter';

class LetterEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

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
      if (!response.data.updateLetter.letter.errors.length) {
        this.setState({
          message: 'successfully updated'
        })
      }
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
      if (response.data.sendLetter.letter.sent) {
        this.setState({
          message: 'letter sent!'
        });
      }
    });
  }

  render() {
    return (
      <div>
        {!this.props.data.loading &&
          <div>
            <h2>{this.props.data.letter.subject}</h2>
            <LetterForm onSubmit={this.updateLetter.bind(this)} letter={this.props.data.letter} action="update"/>
            <button onClick={this.send.bind(this)} type="button">Send</button>
            <div>{this.state.message}</div>
            <Errors errors={this.props.data.letter.errors} />
          </div>
        }
      </div>
    )
  }
}

LetterEdit.propTypes = {
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
)(LetterEdit)
