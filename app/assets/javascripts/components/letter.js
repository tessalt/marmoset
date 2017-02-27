import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import LetterForm from './letter-form';
import Errors from './errors';
import {updateLetter, sendLetter} from '../mutations/letter';
import {showLetter} from '../queries/letter';

class Letter extends React.Component {
  render() {
    return (
      <div>
        {!this.props.data.loading &&
          <div>
            <h2>{this.props.data.letter.subject}</h2>
            <p>{this.props.data.letter.contents}</p>
          </div>
        }
      </div>
    )
  }
}

Letter.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    letter: PropTypes.obj
  }),
}

export default compose(
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
