import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import LetterForm from './letter-form';
import Errors from './errors';
import SideNav from './side-nav';
import { Link } from 'react-router'
import {updateLetter, sendLetter, destroyLetter} from '../mutations/letter';
import {showLetter} from '../queries/letter';

class LetterEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  deleteLetter() {
    this.props.destroyLetter({
      variables: {
        letter: {
          id: this.props.params.id
        }
      }
    }).then((response) => {
      this.props.router.replace('/drafts');
    });
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
          <div className="cf">
            <SideNav />
            <div className="fl w-60">
              <div className="cf">
                <h2 className="fl">{this.props.data.letter.subject}</h2>
                <button className="fr" onClick={this.deleteLetter.bind(this)}>Delete</button>
              </div>
              <LetterForm onSubmit={this.updateLetter.bind(this)} letter={this.props.data.letter} action="update">
                <button className="f6 link dim bn ph3 pv2 bg-black-70 white fr" onClick={this.send.bind(this)} type="button">Send</button>
              </LetterForm>
              <div>{this.state.message}</div>
              <Errors errors={this.props.data.letter.errors} />
            </div>
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
  graphql(destroyLetter, {name: 'destroyLetter'}),
  graphql(showLetter, {
    options: ({params}) => {
      return {
        variables: {
          letter: params.id,
        }
      }
    }
  }),
)(LetterEdit)
