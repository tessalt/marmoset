import React, {PropTypes} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router'
import update from 'immutability-helper';
import {indexLists} from '../queries/list';
import ListForm from './list-form';
import SideNav from './side-nav';

const ListLink = (props) => {
  return (
    <tr>
      <td className="pa2">
        <Link to={`/lists/${props.id}/edit`} className="light-purple dim"> {props.name} </Link>
      </td>
      <td className="pa2">{props.subscribers.edges.length}</td>
    </tr>
  )
}

class Lists extends React.Component {
  render() {
    const lists = this.props.data.lists ? this.props.data.lists.map((list, key) => {
      return <ListLink key={key} {...list} />
    }) : null;
    return (
      <div className="cf">
        <SideNav />
        <div className="fl w-60">
          <div className="cf">
            <h1 className="f2 lh-copy normal fl mt0">Lists</h1>
            <Link className="fr f6 link dim bn ph3 pv2 bg-black-70 white" to="lists/new">Create List</Link>
          </div>
          <table cellSpacing="0" className="w-100">
            <thead>
              <tr>
                <th className="tl pa2">Name</th>
                <th className="tl pa2">Subscribers</th>
              </tr>
            </thead>
            <tbody>
              {lists}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Lists.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    lists: PropTypes.array
  }),
}

export default graphql(indexLists, {
  options: props => ({
    forceFetch: true,
  })
})(Lists);
