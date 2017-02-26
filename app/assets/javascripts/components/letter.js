import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import LetterForm from './letter-form';
import {updateLetter} from '../mutations/letter';
import {showLetter} from '../queries/letter';

class Letter extends React.Component {
  updateLetter(letter) {
    this.props.mutate({
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

  render() {
    // console.log(this.props)
    return (
      <div>
        <h2></h2>
        {!this.props.data.loading &&
          <LetterForm onSubmit={this.updateLetter.bind(this)} letter={this.props.data.letter} action="update"/>
        }
      </div>
    )
  }
}

Letter.propTypes = {
  mutate: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    letter: PropTypes.obj
  }),
}

export default compose(
  graphql(updateLetter),
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
