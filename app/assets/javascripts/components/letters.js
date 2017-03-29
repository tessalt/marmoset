import React, {PropTypes} from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router'
import {indexLetters} from '../queries/letter';
import SideNav from './side-nav';

const LetterLink = (props) => {
  return (
    <tr>
      <td className="pa2">
        <Link to={`/letters/${props.id}`} className="light-purple dim"> {props.subject} </Link>
      </td>
      <td className="pa2">{props.list.name}</td>
    </tr>
  )
}

class Letters extends React.Component {

  render() {
    const letters = this.props.data.letters ? this.props.data.letters.map((letter, key) => {
      return <LetterLink key={key} {...letter} />
    }) : null;
    return (
      <div className="cf">
        <SideNav />
        <div className="fl w-60">
          <h1>Letters</h1>
          <table>
            <thead>
              <tr>
                <th className="tl pa2">Subject</th>
                <th className="tl pa2">List</th>
              </tr>
            </thead>
            <tbody>
              {letters}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default graphql(indexLetters)(Letters);
