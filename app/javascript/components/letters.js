import React, {PropTypes} from 'react';
import { Link } from 'react-router'

function LetterLink(props) {
  return (
    <tr>
      <td className="pa2">
        <Link to={`/letters/${props.id}/${props.edit ? 'edit' : ''}`} className="light-purple dim"> {props.subject} </Link>
      </td>
      <td className="pa2">{props.list.name}</td>
    </tr>
  )
}

export default function Letters(props) {
  const letters = props.letters ? props.letters.map((letter, key) => {
    return <LetterLink key={key} {...letter} edit={props.edit} />
  }) : null;
  return (
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
  );
}

