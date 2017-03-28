import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router'
import {indexLetters} from '../queries/letter';

const LetterLink = (props) => {
  return (
    <tr>
      <td className="pv2"><Link to={`/letters/${props.id}`} className="light-purple dim"> {props.subject} </Link></td>
    </tr>
  )
}

class Letters extends React.Component {

  render() {
    const letters = this.props.data.letters ? this.props.data.letters.map((letter, key) => {
      return <LetterLink key={key} {...letter} />
    }) : null;
    return (
      <table>
        <tbody>
          {letters}
        </tbody>
      </table>
    )
  }
}

export default graphql(indexLetters)(Letters);
